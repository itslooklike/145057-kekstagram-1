const supertest = require(`supertest`);
const assert = require(`assert`);
const {app} = require(`../server/server`);

const apiUrl = `/api/posts`;

const responseKeysMap = [
  `url`,
  `scale`,
  `effect`,
  `hashtags`,
  `description`,
  `likes`,
  `comments`,
  `date`,
];

describe(`GET ${apiUrl}`, function () {
  it(`отвечает джейсоном и длинна совпадает`, () => {
    return supertest(app)
        .get(apiUrl)
        .expect(200)
        .expect(`Content-Type`, /json/)
        .then((res) => {
          assert.equal(res.body.total, res.body.data.length);
          assert.equal(
              Object.keys(res.body.data[0]).length,
              responseKeysMap.length
          );
        });
  });

  it(`ответ содержит необходимые поля`, () => {
    const checkForKeys = (obj, requireKeys) => {
      requireKeys.forEach((item) => assert.ok(obj[item]));
    };

    return supertest(app)
        .get(apiUrl)
        .expect(200)
        .expect(`Content-Type`, /json/)
        .then((res) => checkForKeys(res.body.data[0], responseKeysMap));
  });

  it(`не существующий адрес должен вернуть 404`, () => {
    return supertest(app)
        .get(`/api/unknown-address`)
        .expect(404)
        .expect(`Content-Type`, /html/);
  });
});
