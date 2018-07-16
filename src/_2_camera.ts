import { BoxGeometry, Mesh, MeshBasicMaterial, OrthographicCamera, PerspectiveCamera, Scene, Vector3, WebGLRenderer } from 'three';

export function CameraDemo() {

	const { innerHeight: height, innerWidth: width } = window;

	const renderer = new WebGLRenderer();
	renderer.setSize(width, height);
	document.body.appendChild(renderer.domElement);

	const scene = new Scene();

	// 正交相机
	const camera = new OrthographicCamera(-2, 2, 2, -2, 1, 10);

	// 透视相机
	// const camera = new PerspectiveCamera(45, width / height, 1, 500);

	// 变更相机位置
	camera.position.set(3, 4, 5);
	camera.lookAt(new Vector3(0, 0, 0));

	// 立方体
	const cube = new Mesh(
		new BoxGeometry(1, 1, 1),
		new MeshBasicMaterial({ color: 0xff0000, wireframe: true }),
	);

	scene.add(cube);
	renderer.render(scene, camera);

}
