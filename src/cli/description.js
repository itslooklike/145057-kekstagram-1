const packageJson = require(`../../package.json`);

module.exports = {
  name: `description`,
  description: `Показывает описание проекта`,
  execute() {
    console.log(`v${packageJson.description}`);
  },
};
