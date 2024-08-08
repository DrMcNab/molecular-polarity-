<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Molecule Visualization and Polarity</title>
    <style>
        body { margin: 0; }
        canvas { display: block; }
        #info {
            position: absolute;
            top: 20px;
            left: 20px;
            color: white;
            font-family: Arial, sans-serif;
            background-color: rgba(0, 0, 0, 0.5);
            padding: 10px;
            border-radius: 5px;
        }
        select {
            margin-top: 10px;
        }
    </style>
</head>
<body>
    <div id="info">
        <h1>Molecule Visualization</h1>
        <p id="moleculeName">Select a molecule:</p>
        <select id="moleculeSelect" onchange="loadMolecule()">
            <option value="CH4">Methane (CH₄)</option>
            <option value="H2O">Water (H₂O)</option>
            <option value="CO2">Carbon Dioxide (CO₂)</option>
        </select>
        <p id="polarity"></p>
    </div>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
    <script>
        let scene, camera, renderer;

        function init() {
            // Create scene, camera, and renderer
            scene = new THREE.Scene();
            camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            renderer = new THREE.WebGLRenderer();
            renderer.setSize(window.innerWidth, window.innerHeight);
            document.body.appendChild(renderer.domElement);

            camera.position.z = 3;

            loadMolecule();
        }

        function loadMolecule() {
            // Clear existing objects
            while (scene.children.length > 0) {
                scene.remove(scene.children[0]);
            }

            const moleculeSelect = document.getElementById('moleculeSelect');
            const molecule = moleculeSelect.value;

            if (molecule === "CH4") {
                displayMethane();
            } else if (molecule === "H2O") {
                displayWater();
            } else if (molecule === "CO2") {
                displayCO2();
            }
        }

        function createAtom(position, color) {
            const sphereGeometry = new THREE.SphereGeometry(0.2, 32, 32);
            const material = new THREE.MeshBasicMaterial({ color: color });
            const atom = new THREE.Mesh(sphereGeometry, material);
            atom.position.set(...position);
            scene.add(atom);
            return atom;
        }

        function createBond(start, end) {
            const bondGeometry = new THREE.CylinderGeometry(0.05, 0.05, start.distanceTo(end), 32);
            const bondMaterial = new THREE.MeshBasicMaterial({ color: 0x888888 });
            const bond = new THREE.Mesh(bondGeometry, bondMaterial);
            bond.position.copy(start).lerp(end, 0.5);
            bond.lookAt(end);
            scene.add(bond);
        }

        function displayMethane() {
            document.getElementById('moleculeName').textContent = "Methane (CH₄)";
            document.getElementById('polarity').textContent = "Polarity: Non-Polar";

            const carbon = createAtom([0, 0, 0], 0x000000);
            const hydrogenPositions = [
                [1, 1, 1],
                [-1, -1, 1],
                [1, -1, -1],
                [-1, 1, -1]
            ];

            hydrogenPositions.forEach(position => {
                const hydrogen = createAtom(position, 0xffffff);
                createBond(carbon.position, hydrogen.position);
            });
        }

        function displayWater() {
            document.getElementById('moleculeName').textContent = "Water (H₂O)";
            document.getElementById('polarity').textContent = "Polarity: Polar";

            const oxygen = createAtom([0, 0, 0], 0xff0000);
            const hydrogenPositions = [
                [1, 0.6, 0],
                [-1, 0.6, 0]
            ];

            hydrogenPositions.forEach(position => {
                const hydrogen = createAtom(position, 0xffffff);
                createBond(oxygen.position, hydrogen.position);
            });
        }

        function displayCO2() {
            document.getElementById('moleculeName').textContent = "Carbon Dioxide (CO₂)";
            document.getElementById('polarity').textContent = "Polarity: Non-Polar";

            const carbon = createAtom([0, 0, 0], 0x000000);
            const oxygenPositions = [
                [-1.5, 0, 0],
                [1.5, 0, 0]
            ];

            oxygenPositions.forEach(position => {
                const oxygen = createAtom(position, 0xff0000);
                createBond(carbon.position, oxygen.position);
            });
        }

        function animate() {
            requestAnimationFrame(animate);
            scene.rotation.y += 0.01;
            renderer.render(scene, camera);
        }

        init();
        animate();
    </script>
</body>
</html>
