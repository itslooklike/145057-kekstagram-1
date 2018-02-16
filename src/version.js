const packageJson = require(`../package.json`);

const getColoredVersion = (version) => {
  const colors = [`red`, `green`, `blue`];
  const versionArr = version.split(`.`);

  return versionArr.map((item, idx) => item[colors[idx]]).join(`.`);
};

module.exports = {
  name: `version`,
  description: `Печатает версию приложения`,
  execute() {
    console.log(`v${getColoredVersion(packageJson.version)}`);
  },
};
