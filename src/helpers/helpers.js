const Convert2DTo1DArr = (arr) => {
  resultsArr = [];
  for (let i = 0; i < arr.length; i++) {
    tempArr = arr[i];
    resultsArr = [...resultsArr, ...tempArr];
  }

  return resultsArr;
};

function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
