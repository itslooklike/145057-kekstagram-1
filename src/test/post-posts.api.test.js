const supertest = require(`supertest`);
const {app} = require(`../server`);

const apiUrl = `/api/posts`;

describe(`POST ${apiUrl}`, function () {
  it(`должен совпадать JSON`, () => {
    const mockData = {
      url: `https://picsum.photos/600/?random`,
      scale: 5,
      effect: `chrome`,
      hashtags: [`#биткоин`],
      description: `Губерниев в шоке от новости про мельдоний Крушельницкого`,
      likes: 432,
      comments: [
        `Губерниев в шоке от новости про мельдоний Крушельницкого`,
        `Ученые предположили человеческую реакцию на встречу с пришельцами`,
        `Американские ученые объяснили, почему земляне обрадуются встрече с инопланетянами`,
      ],
      date: 1234,
    };

    return supertest(app)
        .post(apiUrl)
        .send(mockData)
        .expect(200, mockData);
  });

  it(`должен совпадать form-data`, () => {
    const mockData = {
      url: `https://picsum.photos/600/?random`,
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
        .field(`url`, `https://picsum.photos/600/?random`)
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

  // этот тест на валидацию пока ненужен
  // it(`должен вернуть 400, если неверно указан description и comments`, () => {
  //   return supertest(app)
  //       .post(apiUrl)
  //       .field(`url`, `https://picsum.photos/600/?random`)
  //       .field(`scale`, 5)
  //       .field(`effect`, `chrome`)
  //       .field(`hashtags[]`, `#биткоин`)
  //       .field(`description`, 547)
  //       .field(`likes`, 432)
  //       .field(`comments`, 666)
  //       .expect(400, [
  //         {
  //           fieldName: `description`,
  //           fieldValue: 547,
  //           errorMessage: `should be a string`,
  //         },
  //         {
  //           fieldName: `comments`,
  //           fieldValue: 666,
  //           errorMessage: `should be a array of strings`,
  //         },
  //       ]);
  // });

  it(`не существующий адрес должен вернуть 404`, () => {
    return supertest(app)
        .post(`/api/unknown-address`)
        .expect(404)
        .expect(`Content-Type`, /html/);
  });
});
