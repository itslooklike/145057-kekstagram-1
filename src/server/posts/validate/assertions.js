const effectsName = [`none`, `chrome`, `sepia`, `marvin`, `phobos`, `heat`];

const isArrOfStringsContainSymbol = (arr, symbol) => {
  const symbolExist = arr.find((item) => item.indexOf(symbol) !== -1);
  return !symbolExist;
};

const isArrOfStringsContainFirstSymbol = (arr, symbol) => {
  const symbolIsMissing = arr.find((item) => item[0] !== symbol);
  return !symbolIsMissing;
};

const isStringInArrTooLong = (arr, long) => {
  const stringTooLong = arr.find((item) => item.length > long);
  return !stringTooLong;
};

module.exports = {
  effectsName,
  isArrOfStringsContainSymbol,
  isArrOfStringsContainFirstSymbol,
  isStringInArrTooLong,
};
