const server = require(`./server`);

module.exports = {
  name: `server`,
  description: `Запускает сервер`,
  execute(port) {
    server(port);
  },
};
