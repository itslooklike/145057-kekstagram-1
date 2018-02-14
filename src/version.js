const packageJson = require(`../package.json`);

module.exports = {
  name: `version`,
  description: `Печатает версию приложения`,
  execute() {
    console.log(`v${packageJson.version}`);
  },
};
