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
      $(".ui.dropdown").dropdown();
      switch (GlobalStorage.CurrentMode) {
        case CREATIONSTATE:
          $("#documentation").html(getCreationDocs(GlobalStorage.create.z));
          break;
        case ROTATESTATE:
          $("#documentation").html(getRotationDocs());
          break;
        case SCALESTATE:
          $("#documentation").html(getScalingDocs());
          break;
        case MOVEMENTSTATE:
          $("#documentation").html(getTranslationDocs());
          break;
      }
    });

    document.addEventListener("keydown", (e) => {
      switch (event.keyCode) {
        case 81:
          //Rotate Mode
          GlobalStorage.CurrentMode = "ROTATION";
          console.log("ROTATION Mode Enabled");
          $("#documentation").html(getRotationDocs());
          $("#objDropdown").dropdown();
          break;
        case 82:
          //Scale Mode
          GlobalStorage.CurrentMode = "SCALE";
          console.log("SCALE Mode Enabled");
          $("#documentation").html(getScalingDocs());
          $("#objDropdown").dropdown();
          break;
        case 87:
          //MOVEMENT Mode
          GlobalStorage.CurrentMode = "MOVEMENT";
          console.log("MOVEMENT Mode Enabled");
          $("#documentation").html(getTranslationDocs());
          $("#objDropdown").dropdown();
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
    switch (GlobalStorage.CurrentMode) {
      case CREATIONSTATE:
        $("#documentation").html(getCreationDocs(GlobalStorage.create.z));
        break;
      case ROTATESTATE:
        $("#documentation").html(getRotationDocs());
        break;
      case SCALESTATE:
        $("#documentation").html(getScalingDocs());
        break;
      case MOVEMENTSTATE:
        $("#documentation").html(getTranslationDocs());
        break;
    }
  };
}
