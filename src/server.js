const express = require(`express`);
const app = express();

const HOSTNAME = `127.0.0.1`;
const DEFAULT_PORT = 3000;

module.exports = {
  name: `server`,
  description: `Запускает сервер`,
  execute(port = DEFAULT_PORT) {
    const serverAddress = `http://${HOSTNAME}:${port}`;

    app.get(`/api/posts`, (req, res) => res.send(`Hello World!`));
    app.get(`/api/posts/:date`, (req, res) =>
      res.send(`hello from ${req.params.date}`)
    );
    app.use(express.static(`static`));

    app.listen(port, HOSTNAME, () => {
      console.log(`Server running at ${serverAddress}/`);
    });
  },
};
