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
    this.render();
  };

  render = () => {};

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
    } else {
      $.notify("No Active Surface to create Vertices!", {
        position: "bottom left",
        className: "error",
      });
    }
    UIRender.Refresh();
    return;
  };
}

const Start = () => {
  const App = new Application();
  App.Start();
};
