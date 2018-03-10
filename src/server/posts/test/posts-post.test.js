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
    const mockData = {
      url: `/api/posts/1234/image`,
      scale: 5,
      effect: `chrome`,
      hashtags: [`#биткоин`],
      description: `Губерниев в шоке от новости про мельдоний Крушельницкого`,
      likes: 432,
      comments: [
        `Губерниев в шоке от новости про мельдоний Крушельницкого`,
        `Ученые предположили человеческую реакцию на встречу с пришельцами`,
      ],
      date: 1234,
    };

    return supertest(app)
        .post(apiUrl)
        .attach(`filename`, path.join(__dirname, `./keks.png`))
        .field(`scale`, 5)
        .field(`effect`, `chrome`)
        .field(`hashtags[]`, `#биткоин`)
        .field(
            `description`,
            `Губерниев в шоке от новости про мельдоний Крушельницкого`
        )
        .field(`likes`, 432)
        .field(
            `comments[]`,
            `Губерниев в шоке от новости про мельдоний Крушельницкого`
        )
        .field(
            `comments[]`,
            `Ученые предположили человеческую реакцию на встречу с пришельцами`
        )
        .field(`date`, 1234)
        .expect(200, mockData);
  });

  it(`не существующий адрес должен вернуть 404`, () => {
    return supertest(app)
        .post(`/api/unknown-address`)
        .expect(404)
        .expect(`Content-Type`, /html/);
  });
});
