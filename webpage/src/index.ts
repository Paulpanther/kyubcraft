import {Mesh, BoxGeometry, Geometry, Vector3} from 'three';
import {saveAs} from 'file-saver';
import * as exportSTL from 'threejs-export-stl';

// Object needs to be scaled for Kyub
// 1 = 1mm
const SCALE = 100;

function toBoxes(encoded: string): Geometry[] {
    const points = encoded
        .split(';')  // Get separate points
        .map(point => point.split('.'))  // Split coordinates of point
        .filter(point => point.length === 3
            && point.every(number => !isNaN(Number(number)) && number !== ''))  // Check point is valid
        .map(point => {
            const numbers = point.map(Number);
            // Swap y and z because minecraft has a "special" system
            return new Vector3(numbers[0], numbers[2], numbers[1]);
        });
    const boxes = points.map(point => {
        const box = new BoxGeometry(1, 1, 1);
        box.translate(point.x, point.y, point.z);
        box.scale(SCALE, SCALE, SCALE);
        return box;
    });
    // const center = boxes
    //     .reduce((prev, current) => prev.clone().add(current.center()), new Vector3());
    return boxes;
}

function mergeIntoMesh(boxes: Geometry[]): Mesh {
    const allGeometry = new Geometry();
    for (const box of boxes) {
        allGeometry.mergeMesh(new Mesh(box));
        allGeometry.mergeVertices();
    }
    return new Mesh(allGeometry);
}

function showSavePrompt(mesh: Mesh) {
    const buffer = exportSTL.fromMesh(mesh, false);
    const blob = new Blob([buffer], {type: exportSTL.mimeType});

    saveAs(blob, 'kyub.stl');
}

if (window.location.hash) {
    const encoded = window.location.hash.substr(1);
    const boxes = toBoxes(encoded);
    const mesh = mergeIntoMesh(boxes);
    showSavePrompt(mesh);
}
