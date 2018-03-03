const effectsName = [`none`, `chrome`, `sepia`, `marvin`, `phobos`, `heat`];

const isArrOfStringsContainSymbol = (val, symbol) =>
  val.find((item) => item.indexOf(symbol) !== -1);

const isArrOfStringsContainFirstSymbol = (arr, symbol) => {
  const symbolIsMissing = arr.find((item) => item[0] !== symbol);
  return !symbolIsMissing;
};

const isStringInArrTooLong = (arr, long) =>
  arr.find((item) => item.length > long);

module.exports = {
  effectsName,
  isArrOfStringsContainSymbol,
  isArrOfStringsContainFirstSymbol,
  isStringInArrTooLong,
};
