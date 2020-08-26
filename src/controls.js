class Controls {
  constructor(app) {
    console.log("= ControlMaster Setup Initializing...");
    if (!app) {
      console.error("The controls were not initialized correctly!");
      return;
    }

    this.app = app;
    this.setup();
    console.log("= ControlMaster Setup Complete...");
  }

  setup = () => {
    const canvas = document.querySelector("#webgl");
    if (!canvas) {
      console.error("\t> Was not able to obtain the Canvas");
      return;
    } else {
      console.log("\t> Obtained Canvas");
    }

    canvas.addEventListener("mousedown", (e) => {
      switch (e.button) {
        case 0: //Left Click
          console.log("Left Click");
          break;
        case 1: //Middle Click
          console.log("Middle Click");
          break;
        case 2: //Right Click
          e.preventDefault();
          console.log("Right Click");
          break;
        default:
          console.error("Default Case in MouseDown Event Listener");
      }
    });
  };
}
