const CREATIONSTATE = "CREATION";
const ROTATESTATE = "ROTATE";
const SCALESTATE = "SCALE";
const MOVEMENTSTATE = "MOVEMENT";

const GlobalStorage = {
  CurrentMode: CREATIONSTATE,
  Objects: [],
  create: {
    z: 0,
  },
};
