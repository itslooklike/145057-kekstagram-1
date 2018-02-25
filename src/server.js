const http = require(`http`);
const url = require(`url`);
const path = require(`path`);
const fs = require(`fs`);
const {promisify} = require(`util`);

const stat = promisify(fs.stat);
const readdir = promisify(fs.readdir);
const readfile = promisify(fs.readFile);

const HOSTNAME = `127.0.0.1`;
const DEFAULT_PORT = 3000;
const STATIC_PATH = `/../static`;
const MIME_MAP = {
  css: `text/css`,
  html: `text/html; charset=UTF-8`,
  jpg: `image/jpeg`,
  png: `image/png`,
  ico: `image/x-icon`,
};

const getStaticPath = (fileName) => path.join(__dirname, STATIC_PATH, fileName);

const printDirectory = (absPath, files) => {
  const link = absPath.replace(
      path.normalize(__dirname + STATIC_PATH) + `/`,
      ``
  );
  console.log(`link`, link);
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>Directory content</title>
      </head>
      <body>
        <ul>${files
      .map((it) => `<li><a href="${link + `/` + it}">${it}</a></li>`)
      .join(``)}</ul>
      </body>
    </html>
  `;
};

const readFile = async (fileName, res) => {
  const data = await readfile(fileName);
  const fileExt = path.extname(fileName).replace(`.`, ``);
  const contentType = MIME_MAP[fileExt];

  res.setHeader(`content-type`, contentType);
  res.setHeader(`content-length`, Buffer.byteLength(data));
  res.end(data);
};

const readDir = async (absPath, res) => {
  const files = await readdir(absPath);
  const content = printDirectory(absPath, files);

  res.setHeader(`content-type`, `text/html; charset=UTF-8`);
  res.setHeader(`content-length`, Buffer.byteLength(content));
  res.end(content);
};

const startServer = (port = DEFAULT_PORT) => {
  const server = http.createServer(async (req, res) => {
    try {
      const requestPathname = url.parse(req.url).pathname;
      const reqAbsPath = getStaticPath(requestPathname);
      const dataStat = await stat(reqAbsPath);

      // if (requestPathname === `forFoldersTest`) {
      if (requestPathname === `/`) {
        await readFile(reqAbsPath + `index.html`, res);
      } else if (dataStat.isDirectory()) {
        await readDir(reqAbsPath, res);
      } else {
        await readFile(reqAbsPath, res);
      }
    } catch (e) {
      res.writeHead(404, `Not Found`);
      res.end();
    }
  });

  const serverAddress = `http://${HOSTNAME}:${port}`;

  server.listen(port, HOSTNAME, () => {
    console.log(`Server running at ${serverAddress}/`);
  });
};

module.exports = startServer;
