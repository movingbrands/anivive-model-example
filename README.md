# Anivive Particle Example

## Examples
* [Lungs](https://anivive-model-example.movingbrands.now.sh/?model=lungs)
* [Platelets](https://anivive-model-example.movingbrands.now.sh/?model=platelets)
* [Virus](https://anivive-model-example.movingbrands.now.sh/?model=virus)

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

## 3D assets
This repository also includes assets in GLTF binary (.glb) format which have been formatted for use on the web.


* [Lungs (lungs.glb)](./assets/lungs.glb)
* [Platelets (platelets.glb)](./assets/platelets.glb)
* [Virus (virus.glb)](./assets/virus.glb)

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
