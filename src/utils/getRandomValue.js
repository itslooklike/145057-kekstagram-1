const getRandomValue = (min = 0, max = 10) =>
  Math.floor(Math.random() * (max - min)) + min;

module.exports = getRandomValue;
