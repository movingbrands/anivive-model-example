import { Points, Float32BufferAttribute, BufferGeometry, PointsMaterial, Color } from 'three'
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
  constructor({
    gltfObject,
    size = 2,
    transparent = true,
    alphaTest = 0.5,
    sizeAttenuation = false,
    color = new Color(0x000000)
  }) {
    super(
      gltfObjectToFloat32ArrayGeometry(gltfObject),
      new PointsMaterial({
        size,
        sizeAttenuation,
        alphaTest,
        transparent
      })
    )
    this.material.color.copy(color)
  }
  // this method provides a utility to update the object every frame
  // if required for animation or similar
  update(dt) {
    console.log(dt)
  }
}

