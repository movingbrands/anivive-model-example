import {
  LinearFilter,
  LinearMipMapLinearFilter,
  RepeatWrapping,
  DoubleSide,
  VertexColors,
  UnsignedByteType,
  NearestFilter,
  FlatShading,
  TriangleStripDrawMode,
  TriangleFanDrawMode,
  NearestMipMapNearestFilter,
  LinearMipMapNearestFilter,
  NearestMipMapLinearFilter,
  ClampToEdgeWrapping,
  MirroredRepeatWrapping,
  AlphaFormat,
  RGBFormat,
  RGBAFormat,
  LuminanceFormat,
  LuminanceAlphaFormat,
  UnsignedShort4444Type,
  UnsignedShort5551Type,
  UnsignedShort565Type,
  BackSide,
  FrontSide,
  NeverDepth,
  LessDepth,
  EqualDepth,
  LessEqualDepth,
  GreaterEqualDepth,
  NotEqualDepth,
  AlwaysDepth,
  AddEquation,
  SubtractEquation,
  ReverseSubtractEquation,
  ZeroFactor,
  OneFactor,
  SrcColorFactor,
  OneMinusSrcColorFactor,
  SrcAlphaFactor,
  OneMinusSrcAlphaFactor,
  DstAlphaFactor,
  OneMinusDstAlphaFactor,
  DstColorFactor,
  OneMinusDstColorFactor,
  SrcAlphaSaturateFactor,
  InterpolateSmooth,
  InterpolateLinear,
  InterpolateDiscrete
} from 'three'

import { 
  Number,
  Matrix3,
   Matrix4,
  Vector2,
  Vector3,
  Vector4,
  Texture
} from 'three'

const WEBGL_CONSTANTS = {
  FLOAT: 5126,
  //FLOAT_MAT2: 35674,
  FLOAT_MAT3: 35675,
  FLOAT_MAT4: 35676,
  FLOAT_VEC2: 35664,
  FLOAT_VEC3: 35665,
  FLOAT_VEC4: 35666,
  LINEAR: 9729,
  REPEAT: 10497,
  SAMPLER_2D: 35678,
  POINTS: 0,
  LINES: 1,
  LINE_LOOP: 2,
  LINE_STRIP: 3,
  TRIANGLES: 4,
  TRIANGLE_STRIP: 5,
  TRIANGLE_FAN: 6,
  UNSIGNED_BYTE: 5121,
  UNSIGNED_SHORT: 5123
}

const WEBGL_TYPE = {
  5126: Number,
  //35674: Matrix2,
  35675: Matrix3,
  35676: Matrix4,
  35664: Vector2,
  35665: Vector3,
  35666: Vector4,
  35678: Texture
}

const WEBGL_COMPONENT_TYPES = {
  5120: Int8Array,
  5121: Uint8Array,
  5122: Int16Array,
  5123: Uint16Array,
  5125: Uint32Array,
  5126: Float32Array
}

const WEBGL_FILTERS = {
  9728: NearestFilter,
  9729: LinearFilter,
  9984: NearestMipMapNearestFilter,
  9985: LinearMipMapNearestFilter,
  9986: NearestMipMapLinearFilter,
  9987: LinearMipMapLinearFilter
}

const WEBGL_WRAPPINGS = {
  33071: ClampToEdgeWrapping,
  33648: MirroredRepeatWrapping,
  10497: RepeatWrapping
}

const WEBGL_TEXTURE_FORMATS = {
  6406: AlphaFormat,
  6407: RGBFormat,
  6408: RGBAFormat,
  6409: LuminanceFormat,
  6410: LuminanceAlphaFormat
}

const WEBGL_TEXTURE_DATATYPES = {
  5121: UnsignedByteType,
  32819: UnsignedShort4444Type,
  32820: UnsignedShort5551Type,
  33635: UnsignedShort565Type
}

const WEBGL_SIDES = {
  1028: BackSide, // Culling front
  1029: FrontSide // Culling back
  //1032: NoSide   // Culling front and back, what to do?
}

const WEBGL_DEPTH_FUNCS = {
  512: NeverDepth,
  513: LessDepth,
  514: EqualDepth,
  515: LessEqualDepth,
  516: GreaterEqualDepth,
  517: NotEqualDepth,
  518: GreaterEqualDepth,
  519: AlwaysDepth
}

const WEBGL_BLEND_EQUATIONS = {
  32774: AddEquation,
  32778: SubtractEquation,
  32779: ReverseSubtractEquation
}

const WEBGL_BLEND_FUNCS = {
  0: ZeroFactor,
  1: OneFactor,
  768: SrcColorFactor,
  769: OneMinusSrcColorFactor,
  770: SrcAlphaFactor,
  771: OneMinusSrcAlphaFactor,
  772: DstAlphaFactor,
  773: OneMinusDstAlphaFactor,
  774: DstColorFactor,
  775: OneMinusDstColorFactor,
  776: SrcAlphaSaturateFactor
  // The followings are not supported by js yet
  //32769: CONSTANT_COLOR,
  //32770: ONE_MINUS_CONSTANT_COLOR,
  //32771: CONSTANT_ALPHA,
  //32772: ONE_MINUS_CONSTANT_COLOR
}

const WEBGL_TYPE_SIZES = {
  'SCALAR': 1,
  'VEC2': 2,
  'VEC3': 3,
  'VEC4': 4,
  'MAT2': 4,
  'MAT3': 9,
  'MAT4': 16
}

const ATTRIBUTES = {
  POSITION: 'position',
  NORMAL: 'normal',
  TEXCOORD_0: 'uv',
  TEXCOORD0: 'uv', // deprecated
  TEXCOORD: 'uv', // deprecated
  TEXCOORD_1: 'uv2',
  COLOR_0: 'color',
  COLOR0: 'color', // deprecated
  COLOR: 'color', // deprecated
  WEIGHTS_0: 'skinWeight',
  WEIGHT: 'skinWeight', // deprecated
  JOINTS_0: 'skinIndex',
  JOINT: 'skinIndex' // deprecated
}

const PATH_PROPERTIES = {
  scale: 'scale',
  translation: 'position',
  rotation: 'quaternion',
  weights: 'morphTargetInfluences'
}

const INTERPOLATION = {
  CUBICSPLINE: InterpolateSmooth,
  LINEAR: InterpolateLinear,
  STEP: InterpolateDiscrete
}

const STATES_ENABLES = {
  2884: 'CULL_FACE',
  2929: 'DEPTH_TEST',
  3042: 'BLEND',
  3089: 'SCISSOR_TEST',
  32823: 'POLYGON_OFFSET_FILL',
  32926: 'SAMPLE_ALPHA_TO_COVERAGE'
}

const ALPHA_MODES = {
  OPAQUE: 'OPAQUE',
  MASK: 'MASK',
  BLEND: 'BLEND'
}

export {
  WEBGL_CONSTANTS,
  WEBGL_TYPE,
  WEBGL_COMPONENT_TYPES,
  WEBGL_FILTERS,
  WEBGL_WRAPPINGS,
  WEBGL_TEXTURE_FORMATS,
  WEBGL_TEXTURE_DATATYPES,
  WEBGL_SIDES,
  WEBGL_BLEND_EQUATIONS,
  WEBGL_BLEND_FUNCS,
  WEBGL_TYPE_SIZES,
  ATTRIBUTES,
  PATH_PROPERTIES,
  INTERPOLATION,
  STATES_ENABLES,
  ALPHA_MODES,
  EXTENSIONS
}

var EXTENSIONS = {
  KHR_BINARY_GLTF: 'KHR_binary_glTF',
  KHR_DRACO_MESH_COMPRESSION: 'KHR_draco_mesh_compression',
  KHR_LIGHTS: 'KHR_lights',
  KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS: 'KHR_materials_pbrSpecularGlossiness',
  KHR_MATERIALS_UNLIT: 'KHR_materials_unlit',
  MSFT_TEXTURE_DDS: 'MSFT_texture_dds'
};
