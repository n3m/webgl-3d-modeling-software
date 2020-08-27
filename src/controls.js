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
      // console.log("\t> Obtained Canvas");
    }

    // canvas.addEventListener("mousedown", (e) => {
    //   switch (e.button) {
    //     case 0: //Left Click
    //       console.log("Left Click");
    //       break;
    //     case 1: //Middle Click
    //       console.log("Middle Click");
    //       break;
    //     case 2: //Right Click
    //       e.preventDefault();
    //       console.log("Right Click");
    //       break;
    //     default:
    //       console.error("Default Case in MouseDown Event Listener");
    //   }
    // });

    document.addEventListener("keydown", (e) => {
      switch (event.keyCode) {
        case 81:
          //Rotate Mode
          GlobalStorage.CurrentMode = "ROTATION";
          console.log("ROTATION Mode Enabled");
          break;
        case 82:
          //Scale Mode
          GlobalStorage.CurrentMode = "SCALE";
          console.log("SCALE Mode Enabled");
          break;
        case 87:
          //MOVEMENT Mode
          GlobalStorage.CurrentMode = "MOVEMENT";
          console.log("MOVEMENT Mode Enabled");
          break;
        case 27:
          //Creation Mode
          GlobalStorage.CurrentMode = "CREATION";
          console.log("CREATION Mode Enabled");
          $("#documentation").html(documentationCreation);
          break;
        default:
          break;
      }
    });
  };
}

const documentationCreation = `
<div>
   <hr>
   <h1>Creation Mode</h1>
   <hr>
   <p>
      In this mode, you're able to create any kind Object.
   </p>
   <p>
      Pressing the "Left Click" anywhere in the canvas, will create a vertex for the current object.
   </p>
   <p>
      Pressing the "Right Click" anywhere in the canvas, will save the current Object and start a new
      one.
   </p>
   <p>
      Scrolling "Up" or "Down", will modify the Z Index of the next Vertex placed with a "Left Click".
   </p>
   <hr>
   <h2>Current Data</h2>
   ${GlobalStorage.CREATION_DATA.z_index}
</div>
`;
