const effectsName = [`none`, `chrome`, `sepia`, `marvin`, `phobos`, `heat`];

const isArrOfStringsContainSymbol = (val, symbol) =>
  val.find((item) => item.indexOf(symbol) !== -1);

const isArrOfStringsContainFirstSymbol = (tags, symbol) =>
  tags.find((item) => item[0] === symbol);

const isStringInArrTooLong = (arr, long) =>
  arr.find((item) => item.length > long);

module.exports = {
  effectsName,
  isArrOfStringsContainSymbol,
  isArrOfStringsContainFirstSymbol,
  isStringInArrTooLong,
};
