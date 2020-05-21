import {
    BufferAttribute,
    BufferGeometry,
    Matrix4,
    Mesh,
    MeshLambertMaterial,
    Vector3
} from 'three';
import {saveAs} from 'file-saver';
import * as exportSTL from 'threejs-export-stl';
import voxelToMesh from './voxelToMesh';
import drawMesh from './drawMesh';

// Object needs to be scaled for Kyub
// 1 = 1mm
const SCALE = 100;

function decode(base64message: string): string {
    return Buffer.from(base64message, 'base64').toString('hex');
}

const deserializeVoxels = (encoded: string): Vector3[] => {
    return encoded
        .split('b')  // Get separate points
        .map(point => point.split('a'))  // Split coordinates of point
        .filter(point => point.length === 3
            && point.every(number => !isNaN(Number(number)) && number !== ''))  // Check point is valid
        .map(point => {
            const numbers = point.map(Number);
            return new Vector3(numbers[0], numbers[1], numbers[2]);
        });
};

const centerVoxelsAtOrigin = (voxels: Vector3[]): void => {
    const center = voxels
        .reduce((sum, current) => sum.add(current), new Vector3())
        .divideScalar(voxels.length)
        .round();
    voxels.forEach(point => point.sub(center));
};

const toThreeMesh = (voxels: Vector3[]): Mesh => {
    const {vertices, normals, indices} = voxelToMesh(voxels);
    const geometry = new BufferGeometry();
    const material = new MeshLambertMaterial({color: 0xFFFFFF});

    geometry.setAttribute(
        'position',
        new BufferAttribute(new Float32Array(vertices), 3));
    geometry.setAttribute(
        'normal',
        new BufferAttribute(new Float32Array(normals), 3));
    geometry.setIndex(indices);
    const mesh = new Mesh(geometry, material);
    mesh.applyMatrix4(new Matrix4().scale(new Vector3(SCALE, SCALE, SCALE)));
    return mesh;
};

function showSavePrompt(mesh: Mesh) {
    const buffer = exportSTL.fromMesh(mesh, false);
    const blob = new Blob([buffer], {type: exportSTL.mimeType});

    saveAs(blob, 'kyub.stl');
}

const save = document.getElementById("save");

let mesh: Mesh = null;

if (window.location.hash) {
    const encodedShort = window.location.hash.substr(1);
    const decoded = decode(encodedShort);
    const voxels = deserializeVoxels(decoded);
    centerVoxelsAtOrigin(voxels);
    mesh = toThreeMesh(voxels);
    drawMesh(mesh);
}

window.addEventListener("hashchange", () => {
    window.location.reload();
});

save.addEventListener("click", () => {
    if (mesh) {
        showSavePrompt(mesh);
    }
});
