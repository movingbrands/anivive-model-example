import { Vector3, BufferGeometry, Float32BufferAttribute, SpotLight, PointLight } from "three"

export const ready = fn => {
  document.addEventListener('DOMContentLoaded', fn)
}

/**
 * Collects all the meshes in a Scene and puts them into an array
 * @param {THREE.Scene} scene an instance of THREE.Scene
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
 * @param {array} arrays an array of Float32Arrays
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

export const createSpotlight = ({
  position,
  color = 0xFFFFFF,
  intensity = 1,
  distance = 0,
  angle,
  penumbra = 0,
  decay = 0
}) => {
  const s = new SpotLight(color, intensity, distance, angle, penumbra, decay)
  s.position.set(position.x, position.y, position.z)
  return s
}

export const createPointLight = ({
  position,
  color = 0xFFFFFF,
  intensity = 0.5,
  distance = 0, decay = 1
}) => {
  const p = new PointLight(color, intensity, distance, decay)
  p.position.set(position.x, position.y, position.z)
  return s
}

/**
 * derived from https://github.com/mrdoob/three.js/blob/b342ef5907ce15353fc63e647afa33f6d4f20c56/examples/jsm/utils/GeometryUtils.js
 * @author mrdoob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 */

export const randomPointInTriangle = (vectorA, vectorB, vectorC) => {
  const vector = new Vector3();

  const point = new Vector3();

  let a = Math.random();
  let b = Math.random();

  if ((a + b) > 1) {
    a = 1 - a;
    b = 1 - b;
  }

  const c = 1 - a - b;

  point.copy(vectorA);
  point.multiplyScalar(a);

  vector.copy(vectorB);
  vector.multiplyScalar(b);

  point.add(vector);

  vector.copy(vectorC);
  vector.multiplyScalar(c);

  point.add(vector);

  return point;

}

// Get random point in face (triangle)
// (uniform distribution)
export const randomPointInFace = (face, geometry) => {
  const vA = geometry.vertices[face.a];
  const vB = geometry.vertices[face.b];
  const vC = geometry.vertices[face.c];

  return randomPointInTriangle(vA, vB, vC)

}


export const randomPointsInBufferGeometry = (geometry, n) => {

  let i;
  const vertices = geometry.attributes.position.array
  let totalArea = 0
  const cumulativeAreas = []

  // precompute face areas
  let vA = new Vector3();
  let vB = new Vector3();
  let vC = new Vector3();

  // geometry._areas = [];
  let il = vertices.length / 9;

  for (i = 0; i < il; i++) {

    vA.set(vertices[i * 9 + 0], vertices[i * 9 + 1], vertices[i * 9 + 2]);
    vB.set(vertices[i * 9 + 3], vertices[i * 9 + 4], vertices[i * 9 + 5]);
    vC.set(vertices[i * 9 + 6], vertices[i * 9 + 7], vertices[i * 9 + 8]);

    totalArea += triangleArea(vA, vB, vC);

    cumulativeAreas.push(totalArea);

  }

  // binary search cumulative areas array

  const binarySearchIndices = (value) => {

    const binarySearch = (start, end) => {

      // return closest larger index
      // if exact number is not found

      if (end < start)
        return start;

      const mid = start + Math.floor((end - start) / 2);

      if (cumulativeAreas[mid] > value) {
        return binarySearch(start, mid - 1);
      } else if (cumulativeAreas[mid] < value) {
        return binarySearch(mid + 1, end);
      } else {
        return mid;
      }
    }

    return binarySearch(0, cumulativeAreas.length - 1);
  }

  // pick random face weighted by face area
  let r
  let index
  const result = new Float32Array(n * 3)

  for (i = 0; i < n; i++) {

    r = Math.random() * totalArea;

    index = binarySearchIndices(r);

    vA.set(vertices[index * 9 + 0], vertices[index * 9 + 1], vertices[index * 9 + 2]);
    vB.set(vertices[index * 9 + 3], vertices[index * 9 + 4], vertices[index * 9 + 5]);
    vC.set(vertices[index * 9 + 6], vertices[index * 9 + 7], vertices[index * 9 + 8]);
    const v = randomPointInTriangle(vA, vB, vC);
    result[(i * 3)] = v.x
    result[(i * 3) + 1] = v.y
    result[(i * 3) + 2] = v.z

  }

  const resultGeometry = new BufferGeometry()
  resultGeometry.addAttribute('position', new Float32BufferAttribute(result, 3))
  return resultGeometry
}

// Get triangle area (half of parallelogram)
// http://mathworld.wolfram.com/TriangleArea.html
const triangleArea = (vectorA, vectorB, vectorC) => {
  const vector1 = new Vector3();
  const vector2 = new Vector3();

  vector1.subVectors(vectorB, vectorA);
  vector2.subVectors(vectorC, vectorA);
  vector1.cross(vector2);

  return 0.5 * vector1.length();
}
