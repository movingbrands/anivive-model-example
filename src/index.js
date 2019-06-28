import * as THREE from 'three'
import threeOrbitViewer from 'three-orbit-viewer'

import { ready } from './utils'
import GLTFLoader from './loaders/GLTFLoader'
import AniviveParticleMesh from './AniviveParticleMesh';

const defaultModel = 'lungs'

ready(() => {
  // boilerplate three.js app
  const { scene } = threeOrbitViewer(THREE)({
    clearColor: 0xFFFFFF,
    clearAlpha: 1.0,
    fov: 65,
    position: new THREE.Vector3(0, 0, -200),
    contextAttributes: {
      antialias: false,
      alpha: false
    }
  })

  const urlParams = new URLSearchParams(window.location.search);
  const targetModel = urlParams.get('model')

  new GLTFLoader().load(`./${targetModel ? targetModel : defaultModel}.glb`, gltfObject => {
    const lungParticles = new AniviveParticleMesh(gltfObject)
    scene.add(lungParticles)
  })
})