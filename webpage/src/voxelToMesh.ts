import {arrayMax, arrayMin} from 'three/src/utils';
import {Vector3} from 'three';

const faces = [
    { // left
        dir: [ -1,  0,  0, ],
        corners: [
            [ 0, 1, 0 ],
            [ 0, 0, 0 ],
            [ 0, 1, 1 ],
            [ 0, 0, 1 ],
        ],
    },
    { // right
        dir: [  1,  0,  0, ],
        corners: [
            [ 1, 1, 1 ],
            [ 1, 0, 1 ],
            [ 1, 1, 0 ],
            [ 1, 0, 0 ],
        ],
    },
    { // bottom
        dir: [  0, -1,  0, ],
        corners: [
            [ 1, 0, 1 ],
            [ 0, 0, 1 ],
            [ 1, 0, 0 ],
            [ 0, 0, 0 ],
        ],
    },
    { // top
        dir: [  0,  1,  0, ],
        corners: [
            [ 0, 1, 1 ],
            [ 1, 1, 1 ],
            [ 0, 1, 0 ],
            [ 1, 1, 0 ],
        ],
    },
    { // back
        dir: [  0,  0, -1, ],
        corners: [
            [ 1, 0, 0 ],
            [ 0, 0, 0 ],
            [ 1, 1, 0 ],
            [ 0, 1, 0 ],
        ],
    },
    { // front
        dir: [  0,  0,  1, ],
        corners: [
            [ 0, 0, 1 ],
            [ 1, 0, 1 ],
            [ 0, 1, 1 ],
            [ 1, 1, 1 ],
        ],
    },
].map(obj => {
    return {
        dir: new Vector3(obj.dir[0], obj.dir[1], obj.dir[2]),
        corners: obj.corners.map(corner => new Vector3(corner[0], corner[1], corner[2]))
    }
});

interface VoxelMatrix {
    values: boolean[][][];
    offset: Vector3;
    size: Vector3;
}

const toMatrix = (voxels: Vector3[]): VoxelMatrix => {
    const xValues = voxels.map(v => v.x);
    const yValues = voxels.map(v => v.y);
    const zValues = voxels.map(v => v.z);

    const offset = new Vector3(-arrayMin(xValues), -arrayMin(yValues), -arrayMin(zValues));
    const size = new Vector3(arrayMax(xValues), arrayMax(yValues), arrayMax(zValues)).add(offset).addScalar(1);

    const values: boolean[][][] = [];
    for (let z = 0; z < size.z; z++) {
        values.push([]);
        for (let y = 0; y < size.y; y++) {
            values[z].push([]);
            for (let x = 0; x < size.x; x++) {
                values[z][y].push(false);
            }
        }
    }
    for (const voxel of voxels) {
        values[voxel.z + offset.z][voxel.y + offset.y][voxel.x + offset.x] = true;
    }
    return {values, offset, size};
}

const getValueAt = (matrix: VoxelMatrix, pos: Vector3): boolean => {
    if (pos.x >= 0 && pos.y >= 0 && pos.z >= 0 && pos.x < matrix.size.x && pos.y < matrix.size.y && pos.z < matrix.size.z) {
        return matrix.values[pos.z][pos.y][pos.x];
    }
    return null;
}

/**
 * @see https://threejsfundamentals.org/threejs/lessons/threejs-voxel-geometry.html
 */
export default (voxels: Vector3[]): {vertices: number[], normals: number[], indices: number[]} => {
    const matrix = toMatrix(voxels);

    const vertices = [];
    const normals = [];
    const indices = [];

    for (let z = 0; z < matrix.size.z; ++z) {
        for (let y = 0; y < matrix.size.y; ++y) {
            for (let x = 0; x < matrix.size.x; ++x) {
                const i = new Vector3(x, y, z);
                const hasVoxel = getValueAt(matrix, i);
                if (hasVoxel) {
                    for (const {dir, corners} of faces) {
                        const neighbor = getValueAt(matrix, i.clone().add(dir));
                        if (!neighbor) {
                            // this voxel has no neighbor in this direction so we need a face.
                            const ndx = vertices.length / 3;
                            for (const pos of corners) {
                                vertices.push(...i.clone().add(pos).toArray());
                                normals.push(...dir.toArray());
                            }
                            indices.push(
                                ndx, ndx + 1, ndx + 2,
                                ndx + 2, ndx + 1, ndx + 3,
                            );
                        }
                    }
                }
            }
        }
    }
    return {vertices, normals, indices};
};
