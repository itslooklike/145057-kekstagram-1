const {Router} = require(`express`);
const bodyParser = require(`body-parser`);
const multer = require(`multer`);
const generateEntity = require(`../../data/generate-entity`);
const validate = require(`./validate`);

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
postsRouter.get(``, (req, res) => res.send(responsePosts()));

postsRouter.get(`/:date`, (req, res) => {
  const post = responsePosts().data.find(
      (item) => item.date.toString() === req.params.date
  );

  if (post) {
    res.send(post);
  } else {
    res.status(404).send();
  }
});

postsRouter.post(``, upload.single(`image`), (req, res) => {
  const data = Object.assign({}, req.body, {image: req.file});

  const errors = validate(data);

  if (errors.length > 0) {
    res.status(400).send(JSON.stringify(errors));
  } else {
    res.send(req.body);
  }
});

module.exports = postsRouter;
