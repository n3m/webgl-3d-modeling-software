class UIRender {
  static Refresh = () => {
    console.log({
      editor: _State.editor,
      storage: _State.storage,
      model: _State.Model,
      surface: _State.Surface,
    });
    $("#info-data").html(refreshInfo());
    $("#modelEditor").html(refreshModelEditorButtons());
    $("#surfaceEditor").html(refreshSurfaceEditorButtons());

    $("#translationEditor").html();
    $("#scalingEditor").html();
    $("#rotationEditor").html();
    $("#rotationEditor").html();

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
      _State.Model = null;
      _State.increaseModelCount();
      _State.editor.activeModel = false;
      _State.editor.surfaceCount = 0;
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
      _State.Surface = null;
      _State.increaseSurfaceCount();
      _State.editor.activeSurface = false;
      _State.editor.vertexCount = 0;
      //Send Notif
      $.notify("The Surface has been saved!", {
        position: "bottom left",
        className: "success",
      });
      console.log("> Saved Surface");

      UIRender.Refresh();
    });
  };
}

const refreshTranslationEditor = () => {
  return ``;
};
const refreshRotationEditor = () => {
  return ``;
};
const refreshScaleEditor = () => {
  return ``;
};

const refreshModelEditorButtons = () => {
  return `
  <input type="button" id="mCreate" class="btn btn-primary"  value="Start a new Model" ${
    _State.editor.activeModel ? "disabled" : ""
  }>
  <input type="button" id="mSave" class="btn btn-success" value="Save Current Model" ${
    _State.getSurfaceCount() < 1 ? "disabled" : ""
  }>`;
};

const refreshSurfaceEditorButtons = () => {
  return `
  <input type="button" id="sCreate" class="btn btn-primary" value="Start a new Surface" ${
    !_State.editor.activeSurface && !_State.editor.activeModel ? "disabled" : ""
  }>
  <input type="button" id="sSave" class="btn btn-success" value="Save current Surface" ${
    _State.getVertexCount() < 3 ? "disabled" : ""
  }>`;
};

const refreshInfo = () => {
  return `
    <p><b>Z-Index Count: </b>${_State.getZ()}</p>
    <p><b>Vertex Count: </b>${_State.getVertexCount()}</p>
    <p><b>Surface Count: </b>${_State.getSurfaceCount()}</p>
    <p><b>Model Count: </b>${_State.getModelCount()}</p>
    <hr>
    <h1>Properties</h1>
    <hr>
    <p><input type="color" id="colorPicker" value="#00aaff" ${
      _State.editor.activeSurface ? "" : "disabled"
    }> Vertex Color</p>
    `;
};
