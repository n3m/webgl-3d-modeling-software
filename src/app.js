/**
 * Tasks:
 *  - Create 3D Figures
 *  - Rotate
 *  - Scale
 *  - Reposition
 */

class Application {
  Start = () => {
    console.log("= Application Start =");
    console.log("= Setup Initializing...");

    const canvas = document.querySelector("#webgl");
    if (!canvas) {
      console.error("Was not able to obtain the Canvas");
      return;
    } else {
      console.log("\t> Obtained Canvas");
    }

    const CP = document.querySelector("#colorP");
    if (!CP) {
      console.error("Was not able to obtain the Color Picker");
      return;
    } else {
      console.log("\t> Obtained Color Picker");
    }

    const webGLInstance = getWebGLContext(canvas);
    if (!webGLInstance) {
      console.error("Was not able to obtain the WebGL Instance");
      return;
    } else {
      console.log("\t> Obtained WebGL Instance");
    }

    this.canvas = canvas;
    this.gl = webGLInstance;

    this.SHADERS = {
      VSHADER: VSHADER_SOURCE,
      FSHADER: FSHADER_SOURCE,
    };

    if (!this.SHADERS.VSHADER) {
      console.error("Was not able to obtain the VSHADER");
      return;
    } else {
      console.log("\t> Obtained VSHADER");
    }

    if (!this.SHADERS.FSHADER) {
      console.error("Was not able to obtain the FSHADER");
      return;
    } else {
      console.log("\t> Obtained FSHADER");
    }

    if (!initShaders(this.gl, this.SHADERS.VSHADER, this.SHADERS.FSHADER)) {
      console.error("Failed to initialize shaders");
      return;
    } else {
      console.log("\t> Initialized Shaders");
    }

    console.log("= Setup Complete!");
    this.main();
  };

  main = () => {
    /** Setup Controller */
    const GameControlMaster = new Controls(this);
    /** Setup Init Render */
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.depthFunc(this.gl.LESS);
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    this.render();
  };

  render = () => {};
}

const Start = () => {
  const App = new Application();
  App.Start();
};

const initVertexBuffers = (gl, vertices, colors) => {
  var n = vertices.length / 3;
  var vertexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.DYNAMIC_DRAW);

  var a_Position = gl.getAttribLocation(gl.program, "a_Position");
  if (a_Position < 0) {
    console.log("Failed to get program for a_Position");
    return;
  }
  gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(a_Position);

  // var radian = (delta * Math.PI) / 180.0;
  // var cosB = Math.cos(radian);
  // var sinB = Math.sin(radian);

  // var transformMatrix = new Float32Array([
  //   cosB,
  //   -sinB,
  //   0,
  //   0,
  //   sinB,
  //   cosB,
  //   0,
  //   0,
  //   0,
  //   0,
  //   1,
  //   0,
  //   0,
  //   0,
  //   0,
  //   1,
  // ]);
  // var u_TransformMatrix = gl.getUniformLocation(
  //   gl.program,
  //   "u_TransformMatrix"
  // );
  // if (!u_TransformMatrix) {
  //   console.log("Failed to get location for u_TransformMatrix");
  //   return;
  // }
  // gl.uniformMatrix4fv(u_TransformMatrix, false, transformMatrix);

  gl.bindBuffer(gl.ARRAY_BUFFER, null);

  var colorBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, colors, gl.DYNAMIC_DRAW);

  var a_Color = gl.getAttribLocation(gl.program, "a_Color");
  if (a_Color < 0) {
    console.log("Failed to get location of a_Color");
    return;
  }
  gl.vertexAttribPointer(a_Color, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(a_Color);
  gl.enable(gl.DEPTH_TEST);
  gl.depthFunc(gl.LESS);
  return n;
};
