class Surface {
  constructor() {
    this.tempVertexArray = [];
    this.tempColorArray = [];
    this.rotationY = null;
    this.rotationX = null;
    this.rotationZ = null;
  }

  Render = (gl, angleX = 0, angleY = 0, angleZ = 0, trasX = 0, trasY = 0, trasZ = 0, scale = 1) => {
    var modelMatrix = new Matrix4();
    this.rotationY = angleY;
    this.rotationX = angleX;
    this.rotationZ = angleZ;

    modelMatrix.setRotate(this.rotationX, _State.properties.RotationAxisX[0], _State.properties.RotationAxisX[1], _State.properties.RotationAxisX[2]);

    if (angleY > 0 || angleY < 0) {
      console.log("Rotating y");
      modelMatrix.rotate(this.rotationY, _State.properties.RotationAxisY[0], _State.properties.RotationAxisY[1], _State.properties.RotationAxisY[2]);
    }

    if (angleZ > 0 || angleZ < 0) {
      console.log("Rotating  z");
      modelMatrix.rotate(this.rotationZ, _State.properties.RotationAxisZ[0], _State.properties.RotationAxisZ[1], _State.properties.RotationAxisZ[2]);
    }

    if (trasX > 0 || trasX < 0 || trasY > 0 || trasY < 0 || trasZ > 0 || trasZ < 0) {
      console.log("Translating X Y or Z");

      modelMatrix.translate(trasX, trasY, trasZ);
    }

    if (scale > 1 || scale < 1) {
      modelMatrix.scale(scale, scale, scale);
    }

    let n = this._initVertexBuffers(gl, new Float32Array(this.tempVertexArray), modelMatrix, this.tempColorArray[0], this.tempColorArray[1], this.tempColorArray[2], 1);
    gl.drawArrays(gl.TRIANGLE_FAN, 0, n);
  };

  _initVertexBuffers = (gl, vertices, modelMatrix, red, green, blue, alpha) => {
    var n = vertices.length / 3;
    var vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.DYNAMIC_DRAW);

    var a_Position = gl.getAttribLocation(gl.program, "a_Position");
    if (a_Position < 0) {
      console.log("Failed to get program for a_Position");
      return;
    }
    gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(a_Position);

    var u_ModelMatrix = gl.getUniformLocation(gl.program, "u_ModelMatrix");
    if (!u_ModelMatrix) {
      console.log("Failed to get location of u_ModelMatrix");
      return;
    }
    gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements);

    var u_FragColor = gl.getUniformLocation(gl.program, "u_FragColor");
    if (!u_FragColor) {
      console.log("Failed to get the storage location of u_FragColor");
      return;
    }
    gl.uniform4f(u_FragColor, red, green, blue, alpha);

    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LESS);
    return n;
  };

  pushVertex = (x, y, z) => {
    this.tempVertexArray.push(x);
    this.tempVertexArray.push(y);
    this.tempVertexArray.push(z);

    // console.log(`\tNew Vertex > (${x},${y},${z})`);
  };

  pushColor = (r, g, b) => {
    this.tempColorArray.push(r);
    this.tempColorArray.push(g);
    this.tempColorArray.push(b);

    // console.log(`\t New Color > (${r},${g},${b})`);
  };

  setRotationOnAxis = (rot, data) => {
    if (!rot || !data) {
    }
    switch (rot) {
      case "X":
        this.rotationX = data;
        break;
      case "Y":
        this.rotationY = data;
        break;
      case "Z":
        this.rotationZ = data;
        break;
      default:
        break;
    }
  };

  getVertices = () => {
    return this.tempVertexArray;
  };

  getParsedVertices = () => {
    return new Float32Array(this.tempVertexArray);
  };

  getColors = () => {
    return this.tempColorArray;
  };
  getParsedColors = () => {
    return new Float32Array(this.tempColorArray);
  };
}

class Model {
  constructor() {
    this.surfaceArray = [];
    this.trasX = 0;
    this.trasY = 0;
    this.trasZ = 0;
    this.scale = 1;
    this.angleX = 0;
    this.angleY = 0;
    this.angleZ = 0;
  }

  setScale = (sc) => {
    this.scale = sc;
  };

  setTrasX = (x) => {
    this.trasX = x;
  };

  setTrasY = (y) => {
    this.trasY = y;
  };

  setTrasZ = (z) => {
    this.trasZ = z;
  };

  setAngleX = (ang) => {
    this.angleX = ang;
  };

  setAngleY = (ang) => {
    this.angleY = ang;
  };

  setAngleZ = (ang) => {
    this.angleZ = ang;
  };

  pushSurface = (surface) => {
    this.surfaceArray.push(surface);
  };

  getAllVertices = () => {
    let vert = [];

    this.surfaceArray.map((sur) => {
      vert = [...vert, sur.getVertices()];
    });
    return vert;
  };

  getAllColors = () => {
    let col = [];

    this.surfaceArray.map((sur) => {
      col = [...col, sur.getColors()];
    });
    return col;
  };
}
