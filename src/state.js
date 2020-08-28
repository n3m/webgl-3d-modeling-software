class State {
  constructor() {
    this.storage = {
      ObjectArray: [],
      zIndex: 0,
    };
  }

  getObjectArray = () => {
    return this.storage.ObjectArray;
  };

  getZ = () => {
    return this.storage.zIndex;
  };
}
