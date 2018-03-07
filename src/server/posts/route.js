const {Router} = require(`express`);
const bodyParser = require(`body-parser`);
const multer = require(`multer`);
const generateEntity = require(`../../data/generate-entity`);
const asyncWrap = require(`../../utils/asyncWrap`);
const ValidationError = require(`./validate/validation-error`);
const validator = require(`./validate/validator`);

const upload = multer({storage: multer.memoryStorage()});
const postsRouter = new Router();

const responsePosts = ({limit = 50, skip = 0} = {}) => {
  const data = [];

  Array.from({length: limit}).forEach(() => data.push(generateEntity()));

  const response = {
    data,
    skip,
    limit,
    total: data.length,
  };

  return response;
};

postsRouter.use(bodyParser.json());
postsRouter.get(``, asyncWrap(async (req, res) => res.send(responsePosts())));

postsRouter.get(
    `/:date`,
    asyncWrap(async (req, res) => {
      const post = responsePosts().data.find(
          (item) => item.date.toString() === req.params.date
      );

      if (post) {
        res.send(post);
      } else {
        res.status(404).send();
      }
    })
);

postsRouter.post(
    ``,
    upload.single(`filename`),
    asyncWrap(async (req, res) => {
      const data = Object.assign({}, req.body, {filename: req.file});

      const errors = validator(data);

      if (errors.length > 0) {
        throw new ValidationError(errors);
      } else {
        res.send(req.body);
      }
    })
);

postsRouter.use((exception, req, res, next) => {
  let error = exception;

  if (exception instanceof ValidationError) {
    error = exception.errors;
  }

  res.status(400).send(error);
  next();
});

module.exports = postsRouter;
