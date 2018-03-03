const assert = require(`assert`);
const generateEntity = require(`../data/generate-entity`);

const {
  isArrayUnique,
  numberInRange,
  stringInRange,
} = require(`../utils/assertions`);

const {
  effectsName,
  isStringInArrTooLong,
  isArrOfStringsContainFirstSymbol,
  isArrOfStringsContainSymbol,
} = require(`../server/posts/validate/assertions`);

const data = generateEntity();

describe(`Проверка тестовых данных`, () => {
  it(`"url": адрес изображения содержит '600'`, () => {
    assert.ok(data.url.indexOf(`600`) !== -1);
  });

  it(`"scale": число, в пределах от 0 до 100`, () => {
    assert.ok(numberInRange(data.scale, 0, 100));
  });

  it(`"effect": строка, одно из предустановленных значений:`, () => {
    assert.ok(effectsName.indexOf(data.effect) !== -1);
  });

  it(`"description": строка — не более 140 символов`, () => {
    assert.ok(stringInRange(data.description, void 0, 140));
  });

  it(`"likes": число, в пределах от 0 до 1000`, () => {
    assert.ok(numberInRange(data.likes, 0, 1000));
  });

  it(`"comments": массив строк, каждая строка не должна превышать 140 символов`, () => {
    assert.ok(isStringInArrTooLong(data.comments, 140));
  });
});

describe(`"hashtags" Проверка хештегов`, () => {
  const {hashtags} = data;

  it(`массив строк — не более 5 элементов`, () => {
    assert.ok(hashtags.length <= 5);
  });

  it(`каждая строка начинается с символа '#'`, () => {
    assert.ok(isArrOfStringsContainFirstSymbol(hashtags, `#`));
  });

  it(`должно содержать одно слово без пробелов`, () => {
    assert.ok(isArrOfStringsContainSymbol(hashtags, ` `));
  });

  it(`слова не должны повторяться (регистр не учитывается)`, () => {
    assert.ok(isArrayUnique(hashtags));
  });

  it(`длина одного слова не превышает 20 символов`, () => {
    assert.ok(isStringInArrTooLong(hashtags, 20));
  });
});
