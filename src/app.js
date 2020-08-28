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
      // console.log("\t> Obtained Canvas");
    }

    const webGLInstance = getWebGLContext(canvas);
    if (!webGLInstance) {
      console.error("Was not able to obtain the WebGL Instance");
      return;
    } else {
      // console.log("\t> Obtained WebGL Instance");
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
      // console.log("\t> Obtained VSHADER");
    }

    if (!this.SHADERS.FSHADER) {
      console.error("Was not able to obtain the FSHADER");
      return;
    } else {
      // console.log("\t> Obtained FSHADER");
    }

    if (!initShaders(this.gl, this.SHADERS.VSHADER, this.SHADERS.FSHADER)) {
      console.error("Failed to initialize shaders");
      return;
    } else {
      // console.log("\t> Initialized Shaders");
    }

    console.log("= Setup Complete!");
    this.main();
  };

  main = () => {
    /** Setup Controls */
    UIRender.Refresh();
    this._setup_controls();

    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.depthFunc(this.gl.LESS);
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    /** Setup Init Render */
    this.render(this.gl);
  };

  render = (gl) => {
    console.log("Called Render");
    gl.clear(gl.COLOR_BUFFER_BIT);

    if (_State.getObjectArray().length > 0) {
      console.log("\tWill render ObjectArray :: State");
    }
    _State.getObjectArray().map((mod) => {
      let vert = mod.getAllVertices();
      let col = mod.getAllColors();
      let n = this.initVertexBuffers(gl, new Float32Array(vert), new Float32Array(col));
      gl.drawArrays(gl.TRIANGLE_FAN, 0, n);
    });

    if (_State.Surface) {
      console.log("\tWill render vertexArray & colorArray");
      let vert = _State.Surface.getParsedVertices();
      let col = _State.Surface.getParsedColors();
      let n = this.initVertexBuffers(gl, new Float32Array(vert), new Float32Array(col));
      gl.drawArrays(gl.TRIANGLE_FAN, 0, n);
    }

    if (_State.Model) {
      if (_State.Model.surfaceArray.length > 0) {
        console.log("\tWill render surfaceArray :: Model");
        let vert = _State.Model.getAllVertices();
        let col = _State.Model.getAllColors();
        let n = this.initVertexBuffers(gl, new Float32Array(vert), new Float32Array(col));
        gl.drawArrays(gl.TRIANGLE_FAN, 0, n);
      }
    }
  };

  _setup_controls = () => {
    this.canvas.addEventListener("mousedown", (e) => {
      switch (e.button) {
        case 0: //Left Click
          this._leftClick(e);
          break;
        default:
          break;
      }
    });

    document.addEventListener("keydown", (e) => {
      switch (event.keyCode) {
        case 38: //A_Up
          _State.updateZ(1);
          UIRender.Refresh();
          break;
        case 40: //A_Down
          _State.updateZ(-1);
          UIRender.Refresh();
          break;
        default:
          break;
      }
    });
  };

  _leftClick = (ev) => {
    if (_State.editor.activeSurface) {
      let x = ev.clientX;
      let y = ev.clientY;
      let z = _State.getZ();

      let rect = ev.target.getBoundingClientRect();
      x = (x - rect.left - this.canvas.width / 2) / (this.canvas.width / 2);
      y = (this.canvas.height / 2 - (y - rect.top)) / (this.canvas.height / 2);

      let RGB = hexToRgb($("#colorPicker")[0].value);

      _State.Surface.pushVertex(x, y, z);
      _State.Surface.pushColor(RGB.r, RGB.g, RGB.b);
      _State.increaseVertexCount();
      $.notify("Added Vertex to Surface!", {
        position: "bottom left",
        className: "warn",
      });
      this.render(this.gl);
    } else {
      $.notify("No Active Surface to create Vertices!", {
        position: "bottom left",
        className: "error",
      });
    }
    UIRender.Refresh();
    return;
  };

  initVertexBuffers = (gl, vertices, colors) => {
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

    var modelMatrix = new Matrix4();
    modelMatrix.setRotate(_State.editor.angle, _State.editor.rotAxis[0], _State.editor.rotAxis[1], _State.editor.rotAxis[2]);

    var u_ModelMatrix = gl.getUniformLocation(gl.program, "u_ModelMatrix");
    if (!u_ModelMatrix) {
      console.log("Failed to get location of u_ModelMatrix");
      return;
    }
    gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements);

    var u_ViewMatrix = gl.getUniformLocation(gl.program, "u_ViewMatrix");
    if (!u_ViewMatrix) {
      console.log("Failed to get location of u_ViewMatrix");
      return;
    }
    var viewMatrix = new Matrix4();
    viewMatrix.setLookAt(0.0, 0.0, 1.5, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0);
    gl.uniformMatrix4fv(u_ViewMatrix, false, viewMatrix.elements);

    var u_ProjMatrix = gl.getUniformLocation(gl.program, "u_ProjMatrix");
    if (!u_ProjMatrix) {
      console.log("Failed to get location of u_ProjMatrix");
      return;
    }
    var projMatrix = new Matrix4();
    //projMatrix.setOrtho(-1.0,1.0,-1.0,1.0,1.0,2.0);
    projMatrix.setPerspective(60.0, 1.0, 0.1, 5.0);
    gl.uniformMatrix4fv(u_ProjMatrix, false, projMatrix.elements);

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
}

const Start = () => {
  const App = new Application();
  App.Start();
};
