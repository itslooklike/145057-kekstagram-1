const assert = require(`assert`);
const supertest = require(`supertest`);
const path = require(`path`);
const app = require(`express`)();
const postsRouter = require(`./mock-route`);
const generateEntity = require(`../../../data/generate-entity`);

const apiUrl = `/api/posts`;

app.use(`${apiUrl}`, postsRouter);

describe(`POST ${apiUrl}`, function () {
  it(`должен вернуть 400, тк приаттачиный файл обязателен`, () => {
    const mockData = generateEntity();

    return supertest(app)
        .post(apiUrl)
        .send(mockData)
        .expect(400);
  });

  it(`должен совпадать form-data`, () => {
    return supertest(app)
        .post(apiUrl)
        .attach(`filename`, path.join(__dirname, `./keks.png`))
        .field(`scale`, 5)
        .field(`effect`, `chrome`)
        .field(`hashtags`, `#биткоин`)
        .field(
            `description`,
            `Губерниев в шоке от новости про мельдоний Крушельницкого`
        )
        .field(`likes`, 432)
        .field(
            `comments`,
            `Губерниев в шоке от новости про мельдоний Крушельницкого`
        )
        .field(
            `comments`,
            `Ученые предположили человеческую реакцию на встречу с пришельцами`
        )
        .expect(200)
        .then((res) => {
          assert(res.body.url.length > 0);
          assert(res.body.date.length > 0);
          assert(res.body.scale === `5`);
          assert(res.body.effect === `chrome`);
          assert(res.body.hashtags[0] === `#биткоин`);
          assert(
              res.body.description ===
            `Губерниев в шоке от новости про мельдоний Крушельницкого`
          );
          assert(
              res.body.comments[0] ===
            `Губерниев в шоке от новости про мельдоний Крушельницкого`
          );
          assert(
              res.body.comments[1] ===
            `Ученые предположили человеческую реакцию на встречу с пришельцами`
          );
        });
  });

  it(`не существующий адрес должен вернуть 404`, () => {
    return supertest(app)
        .post(`/api/unknown-address`)
        .expect(404)
        .expect(`Content-Type`, /html/);
  });
});
