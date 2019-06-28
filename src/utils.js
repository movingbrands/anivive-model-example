export const ready = fn => {
  document.addEventListener('DOMContentLoaded', fn)
}

export const collectMeshesFromScene = scene => {
  const result = []
  scene.traverse(child => {
    if (child.type === 'Mesh') result.push(child)
  })
  return result
}
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
