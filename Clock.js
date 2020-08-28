var VSHADER_SOURCE =
  'attribute vec4 a_Position;\n' +
  'uniform mat4 u_ModelMatrix;\n' +
  'uniform mat4 u_ViewMatrix;\n' +
  'uniform mat4 u_ProjMatrix;\n' +
  'void main() {\n' +
  ' gl_Position = u_ProjMatrix * u_ViewMatrix * u_ModelMatrix * a_Position;\n'+
  '}\n';

var FSHADER_SOURCE =
  'precision mediump float;\n' +
  'uniform vec4 u_FragColor;\n' +
  'void main(){\n'+
  ' gl_FragColor = u_FragColor;\n'+
  '}\n';

function main(){
  var canvas = document.getElementById('webgl');
  var gl = getWebGLContext(canvas);

  if(!gl){
    console.log('Failed to get the WebGL context');
    return;
  }

  if(!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)){
    console.log('Failed to initialize shaders');
    return;
  }

  canvas.oncontextmenu = function(ev){ rightClick(ev, gl); return false;};

  draw(gl);
}

var time = 0.0;
var hour = 0.0;
function rightClick(ev, gl) {
  time += (360.0/60.0) * 5.0;
  hour = (360.0/12.0) * Math.floor(time / 360);
  draw(gl);
}

function initVertexBuffers(gl, vertices, modelMatrix, red, green, blue, alpha){
  var n = vertices.length/3;
  var vertexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.DYNAMIC_DRAW);

  var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  if(a_Position<0){
    console.log('Failed to get program for a_Position');
    return;
  }
  gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(a_Position);

  var u_ModelMatrix = gl.getUniformLocation(gl.program, 'u_ModelMatrix');
  if(!u_ModelMatrix){ console.log('Failed to get location of u_ModelMatrix'); return;  }
  gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements);

  var u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');
  if (!u_FragColor) {
    console.log('Failed to get the storage location of u_FragColor');
    return;
  }
  gl.uniform4f(u_FragColor, red, green, blue, alpha);

  gl.enable(gl.DEPTH_TEST);
  gl.depthFunc(gl.LESS);
  return n;
}

function setViewProjMatrices(gl){
  var u_ViewMatrix = gl.getUniformLocation(gl.program, 'u_ViewMatrix');
  if(!u_ViewMatrix){ console.log('Failed to get location of u_ViewMatrix'); return;  }
  var viewMatrix = new Matrix4();
  viewMatrix.setLookAt(0.0, 0.0, -2.0, 0.0,0.0,0.0, 0.0,1.0,0.0);
  gl.uniformMatrix4fv(u_ViewMatrix, false, viewMatrix.elements);

  var u_ProjMatrix = gl.getUniformLocation(gl.program, 'u_ProjMatrix');
  if(!u_ProjMatrix){ console.log('Failed to get location of u_ProjMatrix'); return;  }
  var projMatrix = new Matrix4();
  //projMatrix.setOrtho(-1.0,1.0,-1.0,1.0,1.0,2.0);
  projMatrix.setPerspective(60.0, 1, 0.1, 5.0);
  gl.uniformMatrix4fv(u_ProjMatrix, false, projMatrix.elements);
}

function draw(gl){
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  var g_cube = [-1,1,0,  -1,-1,0,  1,1,0,  1,-1,0];
  setViewProjMatrices(gl);

  //[Hours]
  var modelMatrix = new Matrix4();
  modelMatrix.setRotate(hour, 0, 0, 1);
  modelMatrix.translate(0,0.20,0);
  modelMatrix.scale(0.05,0.25,0.05);

  var n = initVertexBuffers(gl, new Float32Array(g_cube), modelMatrix, 0,0.5,0.5,1);
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, n);

  //[Minutes]
  modelMatrix = new Matrix4();
  modelMatrix.setRotate(time, 0, 0, 1);
  modelMatrix.translate(0,0.45,0);
  modelMatrix.scale(0.05,0.5,0.05);

  n = initVertexBuffers(gl, new Float32Array(g_cube), modelMatrix, 1,0,0,1);
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, n);

}
