import { Points, Float32BufferAttribute, BufferGeometry, PointsMaterial } from 'three'
import { concatFloat32Arrays, collectMeshesFromScene } from './utils'

// this helper merges all the vertices of the children in a GLTF object 
// and returns then in a single THREE.BufferGeometry
const gltfObjectToFloat32ArrayGeometry = ({ scene }) => {
  const geometry = new BufferGeometry()
  const positions = concatFloat32Arrays(
    collectMeshesFromScene(scene).map(child => child.geometry.attributes.position.array)
  )

  geometry.addAttribute('position', new Float32BufferAttribute(positions, 3))
  return geometry
}

// custom AniviveParticleMesh object expects a GLTF object, whose children
// are converted into raw point data and used to create an instance of THREE.Points
export default class AniviveParticleMesh extends Points {
  constructor(gltfObject) {
    super(
      gltfObjectToFloat32ArrayGeometry(gltfObject),
      new PointsMaterial({
        size: 2,
        sizeAttenuation: false,
        alphaTest: 0.5,
        transparent: true
      })
    )
    this.material.color.setHSL(0, 0, 0)
  }
  // this method provides a utility to update the object every frame
  // if required for animation or similar
  update(dt) {
    console.log(dt)
  }
}

