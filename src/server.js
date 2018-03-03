const express = require(`express`);
const bodyParser = require(`body-parser`);
const multer = require(`multer`);
const generateEntity = require(`./data/generate-entity`);

const upload = multer({storage: multer.memoryStorage()});
const app = express();
const HOSTNAME = `127.0.0.1`;
const DEFAULT_PORT = 3000;

app.disable(`x-powered-by`);
app.use(express.static(`static`));
app.use(bodyParser.json());

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

app.get(`/api/posts`, (req, res) => res.send(responsePosts()));

app.get(`/api/posts/:date`, (req, res) => {
  const post = responsePosts().data.find(
      (item) => item.date.toString() === req.params.date
  );

  if (post) {
    res.send(post);
  } else {
    res.status(404).send();
  }
});

app.post(`/api/posts`, upload.none(), (req, res) => {
  res.send(req.body);
});

module.exports = {
  name: `server`,
  description: `Запускает сервер`,
  execute(port = DEFAULT_PORT) {
    const serverAddress = `http://${HOSTNAME}:${port}`;

    app.listen(port, HOSTNAME, () => {
      console.log(`Server running at ${serverAddress}/`);
    });
  },
  app,
};
