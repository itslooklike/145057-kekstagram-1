const packageJson = require(`../../package.json`);

module.exports = {
  name: `author`,
  description: `Показывает автора`,
  execute() {
    console.log(`v${packageJson.author}`);
  },
};
