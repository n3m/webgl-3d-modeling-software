class UIRender {
  static Refresh = () => {
    console.log({
      editor: _State.editor,
      storage: _State.storage,
      model: _State.Model,
      surface: _State.Surface,
      properties: _State.properties,
    });
    $("#info-data").html(refreshInfo());
    $("#modelEditor").html(refreshModelEditorButtons());
    $("#surfaceEditor").html(refreshSurfaceEditorButtons());

    $("#translationEditor").html(refreshTranslationEditor());
    $("#scalingEditor").html(refreshScaleEditor());
    $("#rotationEditor").html(refreshRotationEditor());

    $("#mCreate").click(() => {
      //Update State
      _State.Model = new Model();
      $.notify("A new Model has started!", {
        position: "bottom left",
        className: "warn",
      });
      //Send Notif
      _State.editor.activeModel = true;
      console.log("> Created Model");
      UIRender.Refresh();
    });

    $("#mSave").click(() => {
      //Update State
      if (_State.getSurfaceCount() < 1) {
        $.notify("There's no surfaces in this model!", {
          position: "bottom left",
          className: "success",
        });
        return;
      }
      //Update Storage
      _State.storage.objectArray.push(_State.Model);
      _State.increaseModelCount();
      resetValuesOnNewModel();
      //Send Notif
      $.notify("The Model has been saved!", {
        position: "bottom left",
        className: "success",
      });
      console.log("> Saved Model");
      UIRender.Refresh();
    });

    $("#sCreate").click(() => {
      //Update State
      _State.Surface = new Surface();
      _State.editor.activeSurface = true;
      //Send Notif
      $.notify("A new Surface has started!", {
        position: "bottom left",
        className: "warn",
      });
      console.log("> Created Surface");
      UIRender.Refresh();
    });

    $("#sSave").click(() => {
      //Validations
      if (_State.getVertexCount() < 3) {
        $.notify("There's less than 3 points in this Surface!", {
          position: "bottom left",
          className: "success",
        });
        return;
      }
      //Update Model
      _State.Model.pushSurface(_State.Surface);
      //Update State
      _State.increaseSurfaceCount();
      resetValuesOnNewSurface();
      //Send Notif
      $.notify("The Surface has been saved!", {
        position: "bottom left",
        className: "success",
      });
      console.log("> Saved Surface");

      UIRender.Refresh();
    });

    /** Colors */

    $("#colorPicker").change((v) => {
      let hex = $("#colorPicker")[0].value;
      _State.lastValues.lastColorPickerValue = hex;
    });

    /** Scale */

    $("#scale").change(() => {
      let scaleValue = $("#scale")[0].value;
      let StandardValue = parseFloat(scaleValue);
      if (_State.Model != null) {
        _State.Model.setScale(StandardValue);
      }
      _State.lastValues.lastScaleValue = StandardValue;
      UIRender.Refresh();
    });

    /** Traslation */
    $("#xTransalation").change(() => {
      let scaleValue = $("#xTransalation")[0].value;
      let StandardValue = parseFloat(scaleValue);
      if (_State.Model != null) {
        _State.Model.setTrasX(StandardValue);
      }
      _State.lastValues.lastTransXValue = StandardValue;
      UIRender.Refresh();
    });

    $("#yTransalation").change(() => {
      let scaleValue = $("#yTransalation")[0].value;
      let StandardValue = parseFloat(scaleValue);
      if (_State.Model != null) {
        _State.Model.setTrasY(StandardValue);
      }
      _State.lastValues.lastTransYValue = StandardValue;
      UIRender.Refresh();
    });

    $("#zTransalation").change(() => {
      let scaleValue = $("#zTransalation")[0].value;
      let StandardValue = parseFloat(scaleValue);
      if (_State.Model != null) {
        _State.Model.setTrasZ(StandardValue);
      }
      _State.lastValues.lastTransZValue = StandardValue;
      UIRender.Refresh();
    });

    /** Rotation */
    $("#xRotation").change(() => {
      let scaleValue = $("#xRotation")[0].value;
      let StandardValue = parseFloat(scaleValue);
      if (_State.Model != null) {
        _State.Model.setAngleX(StandardValue);
      }
      _State.lastValues.lastAngleXValue = StandardValue;
      UIRender.Refresh();
    });
    $("#yRotation").change(() => {
      let scaleValue = $("#yRotation")[0].value;
      let StandardValue = parseFloat(scaleValue);
      if (_State.Model != null) {
        _State.Model.setAngleY(StandardValue);
      }
      _State.lastValues.lastAngleYValue = StandardValue;
      UIRender.Refresh();
    });
    $("#zRotation").change(() => {
      let scaleValue = $("#zRotation")[0].value;
      let StandardValue = parseFloat(scaleValue);
      if (_State.Model != null) {
        _State.Model.setAngleZ(StandardValue);
      }
      _State.lastValues.lastAngleZValue = StandardValue;
      UIRender.Refresh();
    });

    Application.render(GlobalGLInstance);
  };
}

const resetValuesOnNewModel = () => {
  _State.Model = null;
  _State.editor.activeModel = false;
  _State.editor.surfaceCount = 0;
  _State.lastValues.lastScaleValue = 1;
  _State.lastValues.lastAngleXValue = 0;
  _State.lastValues.lastAngleYValue = 0;
  _State.lastValues.lastAngleZValue = 0;
  _State.lastValues.lastTransXValue = 0;
  _State.lastValues.lastTransYValue = 0;
  _State.lastValues.lastTransZValue = 0;
};

const resetValuesOnNewSurface = () => {
  _State.Surface = null;
  _State.editor.activeSurface = false;
  _State.editor.vertexCount = 0;
};

const refreshTranslationEditor = () => {
  return `
  <h3>X${_State.Model != null ? `: ${_State.Model.trasX}` : ""}</h3>
  <input type="range" id="xTransalation" step="0.1" min="-1" max="1" value=${_State.lastValues.lastTransXValue} ${_State.editor.surfaceCount > 0 ? "" : "disabled"}>
  <hr>
  <h3>Y${_State.Model != null ? `: ${_State.Model.trasY}` : ""}</h3>
  <input type="range" id="yTransalation" step="0.1" min="-1" max="1" value=${_State.lastValues.lastTransYValue} ${_State.editor.surfaceCount > 0 ? "" : "disabled"}>
  <hr>
  <h3>Z${_State.Model != null ? `: ${_State.Model.trasZ}` : ""}</h3>
  <input type="range" id="zTransalation" step="0.1" min="-1" max="1" value=${_State.lastValues.lastTransZValue} ${_State.editor.surfaceCount > 0 ? "" : "disabled"}>`;
};

const refreshRotationEditor = () => {
  return `
  <label>X${_State.Model != null ? `: ${_State.Model.angleX}` : ""}</label>
  <br>
  <label>-360</label>
  <input type="range" id="xRotation" step="30" min="-360" max="360" value=${_State.lastValues.lastAngleXValue} ${_State.editor.surfaceCount > 0 ? "" : "disabled"}>
  <label>360</label>
  <br>
  <label>Y${_State.Model != null ? `: ${_State.Model.angleY}` : ""}</label>
  <br>
  <label>-360</label>
  <input type="range" id="yRotation" step="30" min="-360" max="360" value=${_State.lastValues.lastAngleYValue} ${_State.editor.surfaceCount > 0 ? "" : "disabled"}>
  <label>360</label>
  <br>
  <label>Z${_State.Model != null ? `: ${_State.Model.angleZ}` : ""}</label>
  <br>
  <label>-360</label>
  <input type="range" id="zRotation" step="30" min="-360" max="360" value=${_State.lastValues.lastAngleZValue} ${_State.editor.surfaceCount > 0 ? "" : "disabled"}>
  <label>360</label>
  `;
};

const refreshScaleEditor = () => {
  return `
  <h1>Scale${_State.Model != null ? `: ${_State.Model.scale}` : ""}</h1>
               <hr>
  <input type="range" id="scale" step="0.1" min="0.1" max="5" value=${_State.lastValues.lastScaleValue} ${_State.editor.surfaceCount > 0 ? "" : "disabled"}>`;
};

const refreshModelEditorButtons = () => {
  return `
  <input type="button" id="mCreate" class="btn btn-primary"  value="Start a new Model" ${_State.editor.activeModel ? "disabled" : ""}>
  <input type="button" id="mSave" class="btn btn-success" value="Save Current Model" ${_State.getSurfaceCount() < 1 ? "disabled" : ""}>`;
};

const refreshSurfaceEditorButtons = () => {
  return `
  <input type="button" id="sCreate" class="btn btn-primary" value="Start a new Surface" ${!_State.editor.activeSurface && !_State.editor.activeModel ? "disabled" : ""}>
  <input type="button" id="sSave" class="btn btn-success" value="Save current Surface" ${_State.getVertexCount() < 3 ? "disabled" : ""}>`;
};

const refreshInfo = () => {
  // _State.editor.lastColorPickerValue = .value[0];
  return `
    <p><b>Z-Index Count: </b>${_State.getZ()}</p>
    <p><b>Vertex Count: </b>${_State.getVertexCount()}</p>
    <p><b>Surface Count: </b>${_State.getSurfaceCount()}</p>
    <p><b>Model Count: </b>${_State.getModelCount()}</p>
    <hr>
    <h1>Properties</h1>
    <hr>
    <p><input type="color" id="colorPicker" value=${_State.lastValues.lastColorPickerValue} ${_State.editor.activeSurface && _State.editor.vertexCount < 1 ? "" : "disabled"}> Vertex Color</p>
    `;
};
