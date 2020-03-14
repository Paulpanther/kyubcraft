import {Mesh, BoxGeometry, Geometry} from 'three';
import {saveAs} from 'file-saver';
import * as exportSTL from 'threejs-export-stl';

function toBoxes(encoded: string): Geometry[] {
    return encoded
        .split(';')  // Get separate points
        .map(point => point.split('.'))  // Split coordinates of point
        .filter(point => point.length === 3
            && point.every(number => !isNaN(Number(number)) && number !== ''))  // Check point is valid
        .map(point => {
            const numbers = point.map(Number);
            const box = new BoxGeometry(1, 1, 1);
            box.translate(numbers[0], numbers[2], numbers[1]);  // Swap y and z because minecraft has a "special" system
            return box;
        });
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
    const buffer = exportSTL.fromMesh(mesh);
    const blob = new Blob([buffer], {type: exportSTL.mimeType});

    saveAs(blob, 'kyub.stl');
}

if (window.location.hash) {
    const encoded = window.location.hash.substr(1);
    const boxes = toBoxes(encoded);
    const mesh = mergeIntoMesh(boxes);
    showSavePrompt(mesh);
}
