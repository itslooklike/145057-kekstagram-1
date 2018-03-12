const {MongoError} = require(`mongodb`);
const ValidationError = require(`../posts/validate/validation-error`);

const BAD_DATA_CODE = 400;

const renderErrorHtml = (errors, backUrl) => {
  return `
    <!DOCTYPE html>
    <html lang="ru">
    <head>
        <meta charset="UTF-8">
        <title>Ошибка в отправленной форме</title>
    </head>
    <body>
    <h1>Отправленная форма неверна:</h1>
    <pre>
    ${errors.errorMessage}
    </pre>
    <a href="${backUrl}">Назад</a>
    </body>
    </html>`;
};

const render = (req, res, data) => {
  const badStatusCode = data.code || BAD_DATA_CODE;

  res.status(badStatusCode);

  switch (req.accepts([`json`, `html`])) {
    case `html`:
      res.set(`Content-Type`, `text/html`);
      const referer = req.header(`Referer`);
      res.send(renderErrorHtml(data, referer));
      break;
    default:
      res.json(data);
  }
};

const renderException = (req, res, exception) => {
  let data = exception;

  if (exception instanceof ValidationError) {
    data = exception.errors;
  } else if (exception instanceof MongoError) {
    data = {};
    data.code = 501;
    data.errorMessage = exception.message;
  }

  render(req, res, data);
};

module.exports = {
  renderException,
};
