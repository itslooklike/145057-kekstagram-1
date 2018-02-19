const getRandomValue = require(`./getRandomValue`);

const getUniqFromArray = (arr = [], amount = arr.length) => {
  const result = [];
  const tempArr = [...arr];

  while (result.length < amount) {
    const elem = tempArr.splice(getRandomValue(0, tempArr.length - 1), 1);
    result.push(elem.join(``));
  }

  return result;
};

module.exports = getUniqFromArray;
