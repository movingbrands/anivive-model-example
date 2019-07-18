# Anivive Particle Example

## Examples
* [Lungs](https://anivive-model-example.movingbrands.now.sh/?model=lungs)
* [Platelets](https://anivive-model-example.movingbrands.now.sh/?model=platelets)
* [Virus](https://anivive-model-example.movingbrands.now.sh/?model=virus)

## About
This repository shows how you might load a GLTF/GLB 3D model and render it as particles using three.js. It contains a custom THREE class, [AniviveParticleMesh](./src/AniviveParticleMesh.js), which is created using a GLTF object. The object returned from the GLTFLoader is converted into raw point data and used to create an instance of [THREE.Points](https://threejs.org/docs/#api/en/objects/Points).

```js
// import the module
import AniviveParticleMesh from './AniviveParticleMesh';

// load our GLTF binary
new GLTFLoader().load('virus.glb', result => {
  const lungParticles = new AniviveParticleMesh({
    gltfObject: result, // the object returned from the gltf loader
    size: 2 // size of particles
  })
  scene.add(lungParticles)
})
```

## 3D assets
This repository also includes assets in GLTF binary (.glb) format which have been formatted for use on the web.

### Included assets
* [Lungs (lungs.glb)](https://github.com/movingbrands/anivive-model-example/raw/prototype/assets/lungs.glb)
* [Platelets (platelets.glb)](https://github.com/movingbrands/anivive-model-example/raw/prototype/assets/platelets.glb)
* [Virus (virus.glb)](https://github.com/movingbrands/anivive-model-example/raw/prototype/assets/virus.glb)

### Creating new 3D assets
1. All normals and material properties aren't needed and can be stripped from the model.
2. Convert to GLTF:
	* with command line using [obj2gltf](https://github.com/AnalyticalGraphicsInc/obj2gltf):
	
	```bash
	npm install -g obj2gltf
	obj2gltf -i model.obj -o model.glb
	```

	* Using [cesiumjs.org/convertModel](https://cesiumjs.org/convertModel/) to drop OBJ file in and convert to .glb.

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

This command builds the JS and outputs a static app to the `/dist` directory.
