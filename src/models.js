class CustomObject {
  constructor() {
    this.id = uuidv4();
    this.tempVertexArray = [];
    this.tempColorArray = [];
  }

  getID = () => {
    return this.id;
  };

  pushCoord = (x, y, z) => {
    this.tempVertexArray.push(x);
    this.tempVertexArray.push(y);
    this.tempVertexArray.push(z);

    console.log(`\t[${this.id}] New Vertex > (${x},${y},${z})`);
  };

  pushColor = (r, g, b) => {
    this.tempColorArray.push(r);
    this.tempColorArray.push(g);
    this.tempColorArray.push(b);

    console.log(`\t[${this.id}] New Color > (${r},${g},${b})`);
  };

  getVertices = () => {
    return new Float32Array(this.tempVertexArray);
  };
  getColors = () => {
    return new Float32Array(this.tempColorArray);
  };
}
