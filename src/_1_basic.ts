import { BoxGeometry, Mesh, MeshBasicMaterial, PerspectiveCamera, Scene, WebGLRenderer } from 'three';

export function Basic() {

	const { innerWidth: width, innerHeight: height } = window;

	// 初始化渲染器
	const renderer = new WebGLRenderer();
	renderer.setSize(width, height);

	// 插入canvas节点
	document.body.appendChild(renderer.domElement);

	// 初始化场景
	const scene = new Scene();

	// 初始化立方体
	const geometry = new BoxGeometry(1, 1, 1);
	const material = new MeshBasicMaterial({ color: 'yellow' });
	const cube = new Mesh(geometry, material);

	// 添加立方体到场景
	scene.add(cube);

	// 初始化相机
	const camera = new PerspectiveCamera(45, width / height, 1, 500);

	// 调整相机位置
	camera.position.z = 10;

	// 动画循环
	(function animate() {
		// 动画循环
		requestAnimationFrame(animate);

		// 改变立方体旋转角度
		cube.rotation.x += 0.01;
		cube.rotation.y += 0.01;

		// 渲染
		renderer.render(scene, camera);
	})();
}
