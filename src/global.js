const CREATIONSTATE = "CREATION";
const ROTATESTATE = "ROTATE";
const SCALESTATE = "SCALE";
const MOVEMENTSTATE = "MOVEMENT";

const GlobalStorage = {
  CurrentMode: CREATIONSTATE,
  Objects: [],
  CREATION_DATA: {
    z_index: 0,
  },
};
