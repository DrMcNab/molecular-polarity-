<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>3D Methane Molecule</title>
    <style>
        body { margin: 0; }
        canvas { display: block; }
    </style>
</head>
<body>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
    <script>
        // Create scene, camera, and renderer
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

        // Create a sphere geometry for atoms
        const sphereGeometry = new THREE.SphereGeometry(0.2, 32, 32);

        // Create materials for carbon and hydrogen atoms
        const carbonMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
        const hydrogenMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });

        // Create carbon atom at the center
        const carbon = new THREE.Mesh(sphereGeometry, carbonMaterial);
        scene.add(carbon);

        // Create and position hydrogen atoms around carbon
        const hydrogenPositions = [
            [1, 1, 1],
            [-1, -1, 1],
            [1, -1, -1],
            [-1, 1, -1]
        ];

        hydrogenPositions.forEach(position => {
            const hydrogen = new THREE.Mesh(sphereGeometry, hydrogenMaterial);
            hydrogen.position.set(...position);
            scene.add(hydrogen);
        });

        // Create and position bonds as cylinders
        hydrogenPositions.forEach(position => {
            const bondGeometry = new THREE.CylinderGeometry(0.05, 0.05, Math.sqrt(3), 32);
            const bondMaterial = new THREE.MeshBasicMaterial({ color: 0x888888 });
            const bond = new THREE.Mesh(bondGeometry, bondMaterial);
            bond.position.set(...position.map(p => p / 2));
            bond.lookAt(0, 0, 0);
            scene.add(bond);
        });

        // Set camera position
        camera.position.z = 3;

        // Animation loop
        function animate() {
            requestAnimationFrame(animate);
            carbon.rotation.y += 0.01;
            scene.children.forEach(child => {
                if (child !== carbon) child.rotation.y += 0.01;
            });
            renderer.render(scene, camera);
        }

        animate();
    </script>
</body>
</html>
