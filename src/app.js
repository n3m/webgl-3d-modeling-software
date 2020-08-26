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

    console.log("= Setup Complete!");
    this.main();
  };

  main = () => {
    const GameControlMaster = new Controls(this);
  };
}

const Start = () => {
  const App = new Application();
  App.Start();
};
