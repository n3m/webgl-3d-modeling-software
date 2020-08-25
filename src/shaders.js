const VSHADER_SOURCE = `
  attribute vec4 a_Position;
  attribute vec4 a_Color;
  varying lowp vec4 vColor;

  void main(){
    gl_Position = a_Position;
    gl_PointSize = 10.0;
    vColor = a_Color;
  }
`;

const FSHADER_SOURCE = `
  precision mediump float;
  varying lowp vec4 vColor;

  void main(){
    gl_FragColor = vColor;
  }
`;
