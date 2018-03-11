const isArrayUnique = (arr) => new Set(arr).size === arr.length;

const isNumberInRange = (value, min = 0, max) => {
  const num = parseInt(value, 10);
  return num >= min && num <= max;
};

const isStringInRange = (text, min = 0, max) =>
  text.length >= min && text.length <= max;

module.exports = {
  isArrayUnique,
  isNumberInRange,
  isStringInRange,
};
