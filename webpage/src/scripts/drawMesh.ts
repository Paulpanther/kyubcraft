import {
    Box3,
    DirectionalLight, Matrix4,
    Mesh,
    PerspectiveCamera,
    Scene, Vector3,
    WebGLRenderer
} from 'three';

const canvas = document.getElementById("c") as HTMLCanvasElement;
const renderer = new WebGLRenderer({canvas});
const camera = new PerspectiveCamera(75, 2, 0.1, 5);
camera.position.z = 2;
const light = new DirectionalLight(0xFFFFFF, 1);
light.position.set(-1, 2, 4);

const scene = new Scene();
scene.add(light);
let mesh: Mesh = null;

/**
 * @see https://threejsfundamentals.org/threejs/lessons/threejs-responsive.html
 */
const resizeRendererToDisplaySize = () => {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
        renderer.setSize(width, height, false);
    }
    return needResize;
}

const render = (time: number) => {
    if (mesh) {
        if (resizeRendererToDisplaySize()) {
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
        }

        // mesh.rotation.x = time * 0.001;
        mesh.rotation.y = time * 0.001;
        renderer.render(scene, camera);
        requestAnimationFrame(render);
    }
};

export default (newMesh: Mesh): void => {
    mesh = newMesh.clone();
    const size = new Box3().setFromObject(mesh).getSize(new Vector3());
    const maxSize = Math.max(size.x, size.y, size.z);
    mesh.applyMatrix4(new Matrix4().scale(new Vector3(1, 1, 1).divideScalar(maxSize)));
    mesh.geometry.center();
    // mesh = new Mesh(new BoxGeometry(1, 1, 1), new MeshPhongMaterial({color: 'green'}));
    scene.add(mesh);
    render(Date.now());
};
