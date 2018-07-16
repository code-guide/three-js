import { BoxGeometry, Mesh, MeshBasicMaterial, PerspectiveCamera, Scene, Vector3, WebGLRenderer } from 'three';

export function GeometryDemo() {
	const { innerHeight: height, innerWidth: width } = window;

	// 初始化渲染器
	const renderer = new WebGLRenderer();
	renderer.setSize(width, height);
	document.body.appendChild(renderer.domElement);

	// 初始化场景
	const scene = new Scene();

	// 初始化相机
	const camera = new PerspectiveCamera(45, width / height, 1, 500);
	camera.position.set(3, 4, 5);
	camera.lookAt(new Vector3(0, 0, 0));

	// 创建立方体
	const cube = new Mesh(
		new BoxGeometry(1, 1, 1, 2, 2, 3),
		new MeshBasicMaterial({ color: 0xff0000, wireframe: true }),
	);
	scene.add(cube);

	// 创建平面

	// 创建球体

	renderer.render(scene, camera);

}
