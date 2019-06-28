export const ready = fn => {
  document.addEventListener('DOMContentLoaded', fn)
}

/**
 * Collects all the meshes in a Scene and puts them into an array
 * @param   {THREE.Scene} scene an instance of THREE.Scene
 *
 * @returns {array} flat array of meshes
 */
export const collectMeshesFromScene = scene => {
  const result = []
  scene.traverse(child => {
    if (child.type === 'Mesh') result.push(child)
  })
  return result
}
/**
 * Concatenates Float32Arrays
 * @param   {array} arrays an array of Float32Arrays
 *
 * @returns {Float32Array}
 */
export const concatFloat32Arrays = (arrays) => {
  let totalLength = 0;
  for (let arr of arrays) {
    totalLength += arr.length;
  }
  let result = new Float32Array(totalLength);
  let offset = 0;
  for (let arr of arrays) {
    result.set(arr, offset);
    offset += arr.length;
  }
  return result;
}

export const difference = (a, b) => Math.abs(a - b)
