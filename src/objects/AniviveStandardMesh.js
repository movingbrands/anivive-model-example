import { MeshStandardMaterial, Color, Mesh, Object3D, Geometry } from 'three'
import { collectMeshesFromScene } from '../utils'

const smoothGeometry = (geometry) => {
  geometry.computeVertexNormals()
  const result = new Geometry().fromBufferGeometry(geometry)

  result.mergeVertices()
  result.computeVertexNormals()

  return result
}

/**
 * 
 * @class AniviveStandardMesh 
 * Renders a mesh with a standard Anivive look. Expects a GLTF object
 *
 * @author Toby Milner-Gulland / https://github.com/movingbrands
 * 
 * @param {object} gltfObject object returned from {@link GLTFLoader}, must contain THREE.Scene in scene prop
 */
export class AniviveStandardMesh extends Object3D {
  constructor({
    gltfObject,
    smooth = true
  }) {
    super()

    const baseMaterial = new MeshStandardMaterial({
      color: new Color(0xFFFFFF),
      roughness: 0.85,
      metalness: 0.2
    })
    collectMeshesFromScene(gltfObject.scene).forEach(child => {
      this.add(
        new Mesh(smooth ? smoothGeometry(child.geometry) : child.geometry.clone(), baseMaterial)
      )
    })
  }
} 