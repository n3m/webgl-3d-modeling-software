const VSHADER_SOURCE = `
  attribute vec4 a_Position;
  attribute vec4 a_Color;
  varying vec4 u_FragColor;
  uniform mat4 u_ModelMatrix;
  uniform mat4 u_ViewMatrix;
  uniform mat4 u_ProjMatrix;

  void main(){
    gl_Position = u_ProjMatrix * u_ViewMatrix * u_ModelMatrix * a_Position;
    u_FragColor = a_Color;
  }
`;

const FSHADER_SOURCE = `
  precision mediump float;
  uniform vec4 u_FragColor;

  void main(){
    gl_FragColor = u_FragColor;
  }
`;
