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

  function changeAxis() {
    var xAxis = document.getElementById("x-axis");
    var yAxis = document.getElementById("y-axis");
    var zAxis = document.getElementById("z-axis");
    if(xAxis.checked){
      kendoConsole.log("X");
      rotAxis = [1,0,0];
    }
    if(yAxis.checked){
      kendoConsole.log("Y");
      rotAxis = [0,1,0];
    }
    if(zAxis.checked){
      kendoConsole.log("Z");
      rotAxis = [0,0,1];
    }
  }

  function restart(){
    index = 0;
    g_points = [];
    g_colors = [];
    kendoConsole.log("Restart");
    main();
  }

  function sliderOnSlide(e) {
    kendoConsole.log("Slide :: new slide value is: " + e.value);
    angle = e.value;
    main();
  }

  function sliderOnChange(e) {
    kendoConsole.log("Change :: new value is: " + e.value);
    angle = e.value;
    main();
  }

  function rangeSliderOnSlide(e) {
    kendoConsole.log("Slide :: new slide values are: " + e.value.toString().replace(",", " - "));
  }

  function rangeSliderOnChange(e) {
    kendoConsole.log("Change :: new values are: " + e.value.toString().replace(",", " - "));
    var slider = $("#slider").data("kendoSlider");
    slider.min(e.value[0]);
    slider.max(e.value[1]);

    if(slider.value() < e.value[0]){
      slider.value(e.value[0]);
    } else if(slider.value() > e.value[1]){
      slider.value(e.value[1]);
    }
    slider.resize();
    angle = slider.value();
    main();
  }

  var min = -360;
  var max = 360;
  $(document).ready(function() {
    $("#slider").kendoSlider({
      change: sliderOnChange,
      slide: sliderOnSlide,
      min: min,
      max: max,
      smallStep: 10,
      largeStep: 60,
      value: 0
    });

    $("#rangeslider").kendoRangeSlider({
      change: rangeSliderOnChange,
      slide: rangeSliderOnSlide,
      min: min,
      max: max,
      smallStep: 10,
      largeStep: 60,
      tickPlacement: "both"
    });
  });

function main(){
  canvas = document.getElementById('webgl');
  gl = getWebGLContext(canvas);

  if(!gl){
    console.log('Failed to get the WebGL context');
    return;
  }

  if(!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)){
    console.log('Failed to initialize shaders');
    return;
  }

  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);
  draw();
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

function setViewProjMatrices(){
  var u_ViewMatrix = gl.getUniformLocation(gl.program, 'u_ViewMatrix');
  if(!u_ViewMatrix){ console.log('Failed to get location of u_ViewMatrix'); return;  }
  var viewMatrix = new Matrix4();
  viewMatrix.setLookAt(0.0, 0.0, -4.0, 0.0,0.0,0.0, 0.0,1.0,0.0);
  gl.uniformMatrix4fv(u_ViewMatrix, false, viewMatrix.elements);

  var u_ProjMatrix = gl.getUniformLocation(gl.program, 'u_ProjMatrix');
  if(!u_ProjMatrix){ console.log('Failed to get location of u_ProjMatrix'); return;  }
  var projMatrix = new Matrix4();
  //projMatrix.setOrtho(-1.0,1.0,-1.0,1.0,1.0,2.0);
  projMatrix.setPerspective(60.0, 1, 0.1, 5.0);
  gl.uniformMatrix4fv(u_ProjMatrix, false, projMatrix.elements);
}

function createCube(){
  showCube = true;
  draw();
}

var index = 0;
var angle = 0.0;
var rotAxis = [1,0,0];
var g_points = [];
var colors = [];
var canvas;
var gl;
var showCube = false;
function draw(){

  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  if(showCube){
    var g_cube = [-1,1,0,  -1,-1,0,  1,1,0,  1,-1,0];
    setViewProjMatrices();

    //FRONT
    var modelMatrix = new Matrix4();
    modelMatrix.setRotate(angle, rotAxis[0], rotAxis[1], rotAxis[2]);
    modelMatrix.translate(0,0,-1);
    colors = [1,0,0,1];
    var n = initVertexBuffers(gl, new Float32Array(g_cube), modelMatrix, colors[0],colors[1],colors[2],colors[3]);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, n);

    //BACK
    modelMatrix = new Matrix4();
    modelMatrix.setRotate(angle, rotAxis[0], rotAxis[1], rotAxis[2]);
    modelMatrix.translate(0,0,1);
    colors = [0,1,0,1];
    n = initVertexBuffers(gl, new Float32Array(g_cube), modelMatrix, colors[0],colors[1],colors[2],colors[3]);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, n);

    //LEFT
    modelMatrix = new Matrix4();
    modelMatrix.setRotate(angle, rotAxis[0], rotAxis[1], rotAxis[2]);
    modelMatrix.translate(-1,0,0);
    modelMatrix.rotate(90, 0, 1, 0);
    colors = [0,0,1,1];
    n = initVertexBuffers(gl, new Float32Array(g_cube), modelMatrix, colors[0],colors[1],colors[2],colors[3]);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, n);

    //RIGHT
    modelMatrix = new Matrix4();
    modelMatrix.setRotate(angle, rotAxis[0], rotAxis[1], rotAxis[2]);
    modelMatrix.translate(1,0,0);
    modelMatrix.rotate(90, 0, 1, 0);
    colors = [1,1,1,1];
    n = initVertexBuffers(gl, new Float32Array(g_cube), modelMatrix, colors[0],colors[1],colors[2],colors[3]);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, n);
  }
}
