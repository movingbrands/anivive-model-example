# Anivive 3D model examples

## About

![Blender Decimate](./guide/particlemesh-example.png)
![Blender Decimate](./guide/standardmesh-example.png) 

This repository shows how you might load a GLTF/GLB 3D model and render it using three.js in the Anivive digital brand style. It contains two custom three classes, [AniviveParticleMesh](./src/objects/AniviveParticleMesh.js) and [AniviveStandardMesh](./src/objects/AniviveStandardMesh.js).

## Examples (particle)
* [Lungs](https://anivive-model-example.movingbrands.now.sh/?model=lungs&type=AniviveParticleMesh&background=FFFFFF)
* [Platelets](https://anivive-model-example.movingbrands.now.sh/?model=platelets&type=AniviveParticleMesh&background=FFFFFF)
* [Virus](https://anivive-model-example.movingbrands.now.sh/?model=virus&type=AniviveParticleMesh&background=FFFFFF)

## Examples (standard with lighting)
* [Dog](https://anivive-model-example.movingbrands.now.sh/?model=dog&type=AniviveStandardMesh)
* [Cat](https://anivive-model-example.movingbrands.now.sh/?model=cat&type=AniviveStandardMesh)

### Particle Mesh

```js
// import the module
import { AniviveParticleMesh } from './objects';

// load our GLTF binary
new GLTFLoader().load('./lungs.glb', result => {
  const lungParticles = new AniviveParticleMesh({
    gltfObject: result, // the object returned from the gltf loader
    size: 2 // size of particles
  })
  scene.add(lungParticles)
})
```

### Standard Mesh

```js
// import the module
import { AniviveStandardMesh } from './objects';

// load our GLTF binary
new GLTFLoader().load('./dog.glb', result => {
  const dog = new AniviveStandardMesh({
    gltfObject: result
  })
  scene.add(dog)
})
```

## 3D assets
This repository also includes assets in GLTF binary (.glb) format which have been formatted for use on the web.

### Included assets
* [Lungs (lungs.glb)](https://github.com/movingbrands/anivive-model-example/raw/prototype/assets/lungs.glb)
* [Platelets (platelets.glb)](https://github.com/movingbrands/anivive-model-example/raw/prototype/assets/platelets.glb)
* [Virus (virus.glb)](https://github.com/movingbrands/anivive-model-example/raw/prototype/assets/virus.glb)
* [Dog (dog.glb)](https://github.com/movingbrands/anivive-model-example/raw/prototype/assets/dog.glb)
* [Cat (cat.glb)](https://github.com/movingbrands/anivive-model-example/raw/prototype/assets/cat.glb)

### Principles
* Aim to keep all 3d files below 500kb – the smaller the better. For the particle mesh, for example, this might means using 3d artwork with fewer than 10000 verts as a starting point.
* Avoid using very large (>2048px) textures as these will affect GPU performance and loading time.
* Bundling as many assets as possible into .glb can help with overall loading time.
* Be sparing in use of [MeshStandardMaterial](https://threejs.org/docs/#api/en/materials/MeshStandardMaterial) ([AniviveStandardMesh](./src/objects/AniviveStandardMesh.js) is derived from this).
* Shadows and dynamic lighting tend to be expensive and a texture-baking approach (as described below) often gives better performance.
* The [detect-gpu](https://github.com/TimvanScherpenzeel/detect-gpu) library can be a useful resource for providing tiered versions of the experience depending on the user's device capabilities.


### Creating new 3D assets (from OBJ)

#### Process
1. All normals and material properties aren't needed and can be stripped from the model.
2. You can use the Decimate operation in Blender to simplify the model's geometry and cut down its size. This will remove geometry whilst trying to retain the original form. The process will require trial and error testing the model 

	![Blender Decimate](./guide/blender-decimate-menu.png) 
	![Blender Decimate](./guide/blender-decimate-tool.png)

3. Convert to GLTF:
	* with command line using node.js and [obj2gltf](https://github.com/AnalyticalGraphicsInc/obj2gltf):
	
		```bash
		npm install -g obj2gltf
		obj2gltf -i /path/to/model.obj -o ./assets/model.glb
		```

	* Using [cesiumjs.org/convertModel](https://cesiumjs.org/convertModel/)

#### More complex lighting
The best approach for more complex shadows and lighting involves 'baking' textures in Blender or Maya rather than rendering them programmatically using the PBR-style [AniviveStandardMesh](./src/objects/AniviveStandardMesh.js) shown above. 

Using this approach you would design and export all the core appearance and lighting in 3D software, load its elements in three.js and use the [AniviveStandardMesh](./src/objects/AniviveStandardMesh.js) in situations where you need animation or interactivity with the scene.

##### Example
[This example](https://threejs.org/examples/#webgl_materials_lightmap) shows shadows baked into the surfaces of the scene's geometry. The assets used are available [here](https://github.com/mrdoob/three.js/tree/master/examples/models/json/lightmap). The image below shows the texture with detailed shadows:

![Shadow example](https://github.com/mrdoob/three.js/raw/master/examples/models/json/lightmap/lightmap-ao-shadow.png)

##### Examples and guides on baking textures
* [How do you bake ambient occlusion for a model?
](https://blender.stackexchange.com/questions/13956/how-do-you-bake-ambient-occlusion-for-a-model)
* [Baked Cycles Lightmaps in Blender 2](http://charliehoey.com/threejs-demos/cycles-baking-2.html)

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
