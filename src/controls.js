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

    $("document").ready(() => {
      switch (GlobalStorage.CurrentMode) {
        case CREATIONSTATE:
          $("#documentation").html(getCreationDocs(GlobalStorage.create.z));
          break;
        case ROTATESTATE:
          $("#documentation").html(documentationRotation);
          break;
        case SCALESTATE:
          $("#documentation").html(documentationScaling);
          break;
        case MOVEMENTSTATE:
          $("#documentation").html(documentationTranslation);
          break;
      }
    });

    document.addEventListener("keydown", (e) => {
      switch (event.keyCode) {
        case 81:
          //Rotate Mode
          GlobalStorage.CurrentMode = "ROTATION";
          console.log("ROTATION Mode Enabled");
          $("#documentation").html(documentationRotation);
          break;
        case 82:
          //Scale Mode
          GlobalStorage.CurrentMode = "SCALE";
          console.log("SCALE Mode Enabled");
          $("#documentation").html(documentationScaling);
          break;
        case 87:
          //MOVEMENT Mode
          GlobalStorage.CurrentMode = "MOVEMENT";
          console.log("MOVEMENT Mode Enabled");
          $("#documentation").html(documentationTranslation);
          break;
        case 27:
          //Creation Mode
          GlobalStorage.CurrentMode = "CREATION";
          console.log("CREATION Mode Enabled");
          $("#documentation").html(getCreationDocs(GlobalStorage.create.z));
          break;
        default:
          break;
      }
    });
  };

  UpdateCreationInfo = () => {
    const documentationCreation = $("#documentation").html(
      getCreationDocs(GlobalStorage.create.z)
    );
  };
}

const getCreationDocs = (val) => {
  return `
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
  <h2>Vertex Data Manager</h2>
  <hr>
  <p><b>Z Index:</b> ${val}<p>
  <p><b>Vertex Color Picker: </b><input type="color" id="colorPicker" name="clrPcr" value="#e66465"></p>
  </div>
  `;
};

const documentationRotation = `
<div>
  <hr>
  <h1>Rotation Mode</h1>
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
  
</div>
`;

const documentationScaling = `
<div>
  <hr>
  <h1>Scaling Mode</h1>
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
  
</div>
`;

const documentationTranslation = `
<div>
  <hr>
  <h1>Translation Mode</h1>
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
  
</div>
`;
