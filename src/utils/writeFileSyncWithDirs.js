const fs = require(`fs`);
const path = require(`path`);
const logger = require(`../logger`);

const writeFileSyncWithDirs = (url, data) => {
  const dirname = path.dirname(url);

  dirname.split(path.sep).reduce((acc, nextFolder) => {
    const curDir = path.resolve(acc, nextFolder);

    if (!fs.existsSync(curDir)) {
      fs.mkdirSync(curDir);
      logger.info(`👊  папка: '${curDir}' создана!`);
    }

    return curDir;
  }, `/`);

  fs.writeFileSync(url, data);
};

module.exports = writeFileSyncWithDirs;
