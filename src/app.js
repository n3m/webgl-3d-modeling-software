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
    /** Setup Controller */
    const GameControlMaster = new Controls(this);
    this.GCMaster = GameControlMaster;
    this._setup_controls();
    /** Setup Init Render */

    /** End Params */
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.depthFunc(this.gl.LESS);
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    this.render();
  };

  render = () => {};

  _setup_controls = () => {
    this.CREATION_OBJ_INSTANCE = null;
    this.canvas.addEventListener("mousedown", (e) => {
      if (
        GlobalStorage.CurrentMode === CREATIONSTATE &&
        this.CREATION_OBJ_INSTANCE === null
      ) {
        this.CREATION_OBJ_INSTANCE = new CustomObject();
      }

      switch (e.button) {
        case 0: //Left Click
          this._leftClick(e);
          break;
        case 2: //Right Click
          e.preventDefault();
          this._rightClick(e);
          break;
        default:
          break;
      }

      console.log("this.CREATION_OBJ_INSTANCE", this.CREATION_OBJ_INSTANCE);
    });

    document.addEventListener("keydown", (e) => {
      switch (event.keyCode) {
        case 38: //A_Up
          if (GlobalStorage.CurrentMode === CREATIONSTATE) {
            GlobalStorage.create.z++;
            this.GCMaster.UpdateCreationInfo();
            break;
          }
          break;
        case 40: //A_Down
          if (GlobalStorage.CurrentMode === CREATIONSTATE) {
            GlobalStorage.create.z--;
            this.GCMaster.UpdateCreationInfo();
            break;
          }
          break;
        default:
          break;
      }
    });
  };

  _leftClick = (ev) => {
    if (GlobalStorage.CurrentMode === CREATIONSTATE) {
      console.log(CREATIONSTATE + " > Left Click");

      var x = ev.clientX;
      var y = ev.clientY;
      var rect = ev.target.getBoundingClientRect();

      x = (x - rect.left - this.canvas.width / 2) / (this.canvas.width / 2);
      y = (this.canvas.height / 2 - (y - rect.top)) / (this.canvas.height / 2);

      let RGB = hexToRgb($("#colorPicker")[0].value);
      this.CREATION_OBJ_INSTANCE.pushVertex(x, y, GlobalStorage.create.z);
      this.CREATION_OBJ_INSTANCE.pushColor(RGB.r, RGB.g, RGB.b);
      return;
    }
  };

  _rightClick(ev) {
    if (GlobalStorage.CurrentMode === CREATIONSTATE) {
      console.log(CREATIONSTATE + "Right Click");
      return;
    }
  }
}

const Start = () => {
  const App = new Application();
  App.Start();
};
