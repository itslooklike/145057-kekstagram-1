const express = require(`express`);
const imageStore = require(`./images/store`);
const postsStore = require(`./posts/store`);
const routePosts = require(`./posts/route`)(postsStore, imageStore);

const HOSTNAME = `127.0.0.1`;
const DEFAULT_PORT = 3000;
const app = express();

app.disable(`x-powered-by`);
app.use(express.static(`static`));
app.use(`/api/posts`, routePosts);

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
