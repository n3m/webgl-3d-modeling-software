const Convert2DTo1DArr = (arr) => {
  resultsArr = [];
  for (let i = 0; i < arr.length; i++) {
    tempArr = arr[i];
    resultsArr = [...resultsArr, ...tempArr];
  }

  return resultsArr;
};
