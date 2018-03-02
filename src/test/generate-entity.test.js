const assert = require(`assert`);
const generateEntity = require(`../data/generate-entity`);

const data = generateEntity();
const minmax = (value, min, max) => {
  const num = parseInt(value, 10);
  return num >= min && num <= max;
};

describe(`Проверка тестовых данных`, () => {
  it(`"url": адрес изображения 600x600, например https://picsum.photos/600/?random`, () => {
    assert.ok(data.url.indexOf(`600`) !== -1);
  });

  it(`"scale": число, в пределах от 0 до 100`, () => {
    assert.ok(minmax(data.scale, 0, 100));
  });

  it(`"effect": строка, одно из предустановленных значений:`, () => {
    const effectsName = [`none`, `chrome`, `sepia`, `marvin`, `phobos`, `heat`];
    assert.ok(effectsName.indexOf(data.effect) !== -1);
  });

  it(`"description": строка — не более 140 символов`, () => {
    assert.ok(data.description.length <= 140);
  });

  it(`"likes": число, в пределах от 0 до 1000`, () => {
    assert.ok(minmax(data.likes, 0, 1000));
  });

  it(`"comments": массив строк, каждая строка не должна превышать 140 символов`, () => {
    const res = data.comments.find((text) => text.length > 140);
    assert.ok(!res);
  });
});

describe(`"hashtags" Проверка хештегов`, () => {
  const {hashtags} = data;

  it(`массив строк — не более 5 элементов`, () => {
    const checkTagsLength = (tags) => tags.length <= 5;
    assert.ok(checkTagsLength(hashtags));
  });

  it(`каждая строка начинается с символа '#'`, () => {
    const hashtagIsMissed = (tags) => tags.find((item) => item[0] !== `#`);
    assert.ok(!hashtagIsMissed(hashtags));
  });

  it(`должно содержать одно слово без пробелов`, () => {
    const containSpaces = (tags) =>
      tags.find((item) => item.indexOf(` `) !== -1);

    assert.ok(!containSpaces(hashtags));
  });

  it(`слова не должны повторяться (регистр не учитывается)`, () => {
    const result = hashtags.reduce((dublicates, value) => {
      const lowerValue = value.toLowerCase();

      if (dublicates.indexOf(lowerValue) > -1) {
        dublicates.push(lowerValue);
      }

      return dublicates;
    }, []);

    assert.ok(!(result.length > 0));
  });

  it(`длина одного слова не превышает 20 символов`, () => {
    const findLongString = (tags) => tags.find((item) => item.length > 20);
    assert.ok(!findLongString(hashtags));
  });
});
