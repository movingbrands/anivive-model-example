import * as THREE from 'three'
import threeOrbitViewer from 'three-orbit-viewer'

import { ready, createSpotlight, createPointLight } from './utils'
import GLTFLoader from './loaders/GLTFLoader'

import * as aniviveMeshTypes from './objects'

const defaults = {
  model: "dog",
  type: "AniviveStandardMesh",
  smooth: true,
  background: "B1B4B4",
  scale: 1.0
}

const props = () => {
  const urlParams = new URLSearchParams(window.location.search);

  return {
    model: urlParams.get('model') || defaults.model,
    smooth: urlParams.get('smooth') || defaults.smooth,
    background: urlParams.get('background') || defaults.background,
    type: urlParams.get('type') || defaults.type,
    scale: urlParams.get('scale') || defaults.scale
  }
}

ready(() => {
  // example props
  const { model, smooth, background, type, scale } = props()

  // boilerplate three.js app
  const { scene } = threeOrbitViewer(THREE)({
    clearColor: new THREE.Color(background ? `#${background}` : defaults.background),
    clearAlpha: 1.0,
    fov: 65,
    position: new THREE.Vector3(-200, 0, -200),
    contextAttributes: {
      antialias: false,
      alpha: false
    }
  })


  new GLTFLoader().load(`./${model}.glb`, gltfObject => {
    if (gltfObject) {

      const TargetMeshType = aniviveMeshTypes[type] || aniviveMeshTypes[defaults.type]

      const mesh = new TargetMeshType({ gltfObject, smooth })

      scene.add(mesh)
      mesh.scale.set(scale, scale, scale)

      scene.add(new THREE.AmbientLight(0xFFFFFF, 0.5))
      
      scene.add(createSpotlight({ position: { x: 0, y: -100, z: 0 } }))
      scene.add(createPointLight({ position: { x: -40, y: -50, z: 0 }, color: 0xEBFFFF }))
    }
  })
})