const logger = require(`../logger`);

const getRandomElement = (elem = []) => {
  if (Array.isArray(elem) && elem.length > 1) {
    return elem[Math.floor(Math.random() * elem.length)];
  }

  if (Object.keys(elem).length > 1) {
    const keys = Object.keys(elem);
    const result = keys[Math.floor(Math.random() * keys.length)];
    return result;
  }

  logger.error(`слишком мало элементов в массиве`);
  return -1;
};

module.exports = getRandomElement;
