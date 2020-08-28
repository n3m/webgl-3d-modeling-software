class State {
  constructor() {
    this.storage = {
      objectArray: [],
    };
    this.editor = {
      zIndex: 0,
      modelCount: 0,
      vertexCount: 0,
      activeModel: false,
      activeSurface: false,
      surfaceCount: 0,
    };
    this.Model = null;
    this.Surface = null;
  }

  getObjectArray = () => {
    return this.storage.objectArray;
  };

  getZ = () => {
    return this.editor.zIndex;
  };

  setZ = (z) => {
    this.editor.zIndex = z;
  };

  updateZ = (val) => {
    this.editor.zIndex += val;
  };

  getVertexCount = () => {
    return this.editor.vertexCount;
  };

  increaseVertexCount = () => {
    this.editor.vertexCount++;
  };

  getSurfaceCount = () => {
    return this.editor.surfaceCount;
  };

  increaseSurfaceCount = () => {
    this.editor.surfaceCount++;
  };

  getModelCount = () => {
    return this.editor.modelCount;
  };

  increaseModelCount = () => {
    this.editor.modelCount++;
  };

  isCreating = () => {
    return this.editor.isCreating;
  };

  setIsCreating = (val) => {
    this.editor.isCreating = val;
  };
}

const _State = new State();
