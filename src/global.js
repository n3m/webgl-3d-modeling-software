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

/** Storage Functions */

const GlobalAddObject = (CObject) => {
  GlobalStorage.Objects.push(CObject);

  $.notify("Current Object has been saved!", {
    position: "bottom left",
    className: "success",
  });
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

/** Documentation */

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
  Pressing the <b>"Left Click"</b> anywhere in the canvas, will create a vertex for the current object.
  </p>
  <p>
  Pressing the <b>"Right Click"</b> anywhere in the canvas, will save the current Object and start a new
  one.
  </p>
  <p>
  Scrolling <b>"Up" or "Down"</b>, will modify the Z Index of the next Vertex placed with a "Left Click".
  </p>
  <hr>
  <h2>Vertex Data Manager</h2>
  <hr>
  <p><b>Z Index:</b> ${val}<p>
  <p><b>Vertex Color Picker: </b><input type="color" id="colorPicker" name="clrPcr" value="#e66465"></p>
  </div>
  `;
};

const getRotationDocs = () => {
  return `
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
    <hr>
    <br>
    ${getCurrentAvailableObjects()}
    <hr>
    
    
  </div>
  `;
};

const getScalingDocs = () => {
  return `
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
    <hr>
    <br>
    ${getCurrentAvailableObjects()}
    
  </div>
  `;
};

const getTranslationDocs = () => {
  return `
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
    <hr>
    <br>
    ${getCurrentAvailableObjects()}
    
  </div>
  `;
};

const getCurrentAvailableObjects = () => {
  let data = `
  <div class="ui selection dropdown" id="objDropdown">
    <input type="hidden" name="objects">
    <i class="dropdown icon"></i>
    <div class="default text">Select an Object</div>
    <div class="menu">
`;

  for (let i = 0; i < GlobalStorage.Objects.length; i++) {
    const element = GlobalStorage.Objects[i];
    data += `<div class="item" data-value="${element.id}">Object #${i}</div>`;
  }

  data += `
    </div>
  </div>
  `;
  return data;
};
