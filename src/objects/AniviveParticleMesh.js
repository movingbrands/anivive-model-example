import { Points, Float32BufferAttribute, BufferGeometry, PointsMaterial, Color, Object3D } from 'three'
import { concatFloat32Arrays, collectMeshesFromScene, randomPointsInBufferGeometry } from '../utils'

// this helper merges all the vertices of the children in a GLTF object 
// and returns then in a single THREE.BufferGeometry
const gltfObjectToBufferGeometry = ({ scene }) => {
  const geometry = new BufferGeometry()
  const positions = concatFloat32Arrays(
    collectMeshesFromScene(scene).map(child => child.geometry.attributes.position.array)
  )

  geometry.addAttribute('position', new Float32BufferAttribute(positions, 3))
  return geometry
}

// this is an experimental example showing how you distribute particles evenly
// across the surface of a model (to avoid clustering at detailed areas of the geometry)
const childToDistributedPoints = (child, particleCount) => {
  const geometry = new BufferGeometry()
  const positions = randomPointsInBufferGeometry(child.geometry, particleCount)
  geometry.addAttribute('position', new Float32BufferAttribute(positions, 3))
  return geometry
}

/**
 * 
 * @class AniviveParticleMesh 
 * Renders a particle mesh. Expects a GLTF object, whose children
 * are converted into raw point data and used to create an instance of THREE.Points
 *
 * @author Toby Milner-Gulland / https://github.com/movingbrands
 * 
 * @param {object} gltfObject object returned from {@link GLTFLoader}, must contain THREE.Scene in scene prop
 * @param {number} size visual size of the particles
 * @param {boolean} transparent whether particle material uses transparency
 * @param {boolean} alphatest whether particle material uses transparency
 * @param {boolean} sizeAttenuation whether particles change in size based on distance from camera
 * @param {THREE.Color} color particles color
 */
export class AniviveParticleMesh extends Object3D {
  constructor({
    gltfObject,
    size = 2,
    transparent = true,
    alphaTest = 0.5,
    sizeAttenuation = false,
    color = new Color(0x000000)
  }) {
    super()
    const particles = new Points(
      gltfObjectToBufferGeometry(gltfObject, distributed, particleCount),
      new PointsMaterial({
        size,
        sizeAttenuation,
        alphaTest,
        transparent
      })
    )
    this.add(particles)
    particles.material.color.copy(color)

  }
  // this method provides a utility to update the object every frame
  // if required for animation or similar
  update(dt) {
    console.log(dt)
  }
}
