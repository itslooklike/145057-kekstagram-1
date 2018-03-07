const isArrayUnique = (arr) => new Set(arr).size === arr.length;

const numberInRange = (value, min = 0, max) => {
  const num = parseInt(value, 10);
  return num >= min && num <= max;
};

const stringInRange = (text, min = 0, max) =>
  text.length >= min && text.length <= max;

module.exports = {
  isArrayUnique,
  numberInRange,
  stringInRange,
};
