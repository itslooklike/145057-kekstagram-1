const packageJson = require(`../package.json`);

const getColoredVersion = (version) => {
  const colors = [`red`, `green`, `blue`];
  const versionArr = version.split(`.`);
  let result = [];

  versionArr.forEach((item, idx) => {
    result.push(item[colors[idx]]);
  });

  return result.join(`.`);
};

module.exports = {
  name: `version`,
  description: `Печатает версию приложения`,
  execute() {
    console.log(`v${getColoredVersion(packageJson.version)}`);
  },
};
