# Anivive Particle Demo

## About
This repository shows how you might load a GLTF/GLB 3D model and render it as particles using three.js. It contains a custom THREE class, [AniviveParticleMesh](./src/AniviveParticleMesh.js), which is created using a GLTF object. The children returned from the loader, converted into raw point data and used to create an instance of [THREE.Points](https://threejs.org/docs/#api/en/objects/Points).

```js
// load our GLTF binary
new GLTFLoader().load('./lungs.glb', gltfObject => {
  // create a new instance of AniviveParticleMesh and add to our scene
  const lungParticles = new AniviveParticleMesh(gltfObject)
  
  lungParticles.position.x = 150
  scene.add(lungParticles)
})

```
## Getting started

```bash
npm install
```

## Running locally (uses Parcel)

```bash
npm run dev
```

This command runs a local live reload server and typically hosts the site at [http://localhost:1234](http://localhost:1234).

## Build

```bash
npm run build
```

This command builds the JS and outputs a static app to the `/build` directory.
