const packageJson = require(`../package.json`);

module.exports = {
  name: `license`,
  description: `Показывает лицензию проекта`,
  execute() {
    console.log(`v${packageJson.license}`);
  },
};
