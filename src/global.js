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

const GlobalAddObject = (CObject) => {
  GlobalStorage.Objects.push(CObject);

  $.notify("Current Object has been saved!", {
    position: "bottom left",
    className: "success",
  });
  console.log("GlobalStorage", GlobalStorage);
};

const GlobalFindObject = (id) => {
  let index = 0;
  let obj = null;
  let hasBeenFound = false;
  for (let i = 0; i < GlobalStorage.Objects.length; i++) {
    if (GlobalStorage.Objects[i].id === id) {
      index = i;
      obj = GlobalStorage.Objects[i];
      hasBeenFound = true;
      break;
    }
  }

  return {
    index: index,
    data: obj,
    error: hasBeenFound,
  };
};
