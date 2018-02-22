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

const printDirectory = (localPath, files) => {
  const link = localPath.replace(path.normalize(__dirname + STATIC_PATH), ``);

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

const readFile = async (localPath, res) => {
  const data = await readfile(localPath);
  const fileExt = path.extname(localPath).replace(`.`, ``);
  const contentType = MIME_MAP[fileExt];

  res.setHeader(`content-type`, contentType);
  res.setHeader(`content-length`, Buffer.byteLength(data));
  res.end(data);
};

const readDir = async (localPath, res) => {
  const files = await readdir(localPath);
  const content = printDirectory(localPath, files);

  res.setHeader(`content-type`, `text/html; charset=UTF-8`);
  res.setHeader(`content-length`, Buffer.byteLength(content));
  res.end(content);
};

const startServer = (port = DEFAULT_PORT) => {
  const server = http.createServer((req, res) => {
    (async () => {
      try {
        const staticRoot = path.normalize(__dirname + STATIC_PATH);

        // обрезаю слеш на конце урла
        const urlWithoutSlash = url.parse(req.url).pathname.replace(/\/$/, ``);

        const resPath = staticRoot + urlWithoutSlash;
        const dataStat = await stat(resPath);
        const isFolder = dataStat.isDirectory();

        // if (resPath === `раскоментить, чтобы потестить навигацию по папкам`) {
        if (resPath === staticRoot) {
          await readFile(resPath + `/index.html`, res);
        } else if (isFolder) {
          await readDir(resPath, res);
        } else {
          await readFile(resPath, res);
        }
      } catch (e) {
        res.writeHead(404, `Not Found`);
        res.end();
      }
    })().catch((e) => {
      res.writeHead(500, e.message, {
        "content-type": `text/plain`,
      });
      res.end(e.message);
    });
  });

  const serverAddress = `http://${HOSTNAME}:${port}`;

  server.listen(port, HOSTNAME, () => {
    console.log(`Server running at ${serverAddress}/`);
  });
};

module.exports = startServer;
