const http = require(`http`);
const url = require(`url`);
const fs = require(`fs`);

const HOSTNAME = `127.0.0.1`;
const PORT = 3000;

const printDirectory = (files) => `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Directory content</title>
    </head>
    <body>
      <ul>${files
      .map((it) => `<li><a href="${it}">${it}</a></li>`)
      .join(``)}</ul>
    </body>
  </html>
`;

const readFile = (path, res) => {
  const data = fs.readFileSync(path);

  res.setHeader(`content-type`, `text/plain`);
  res.setHeader(`content-length`, Buffer.byteLength(data));
  res.end(data);
};

const readDir = async (path, res) => {
  const files = fs.readdirSync(path);
  const content = printDirectory(files);

  res.setHeader(`content-type`, `text/html`);
  res.setHeader(`content-length`, Buffer.byteLength(content));
  res.end(content);
};

const server = http.createServer((req, res) => {
  const staticPath = __dirname + `/static`;
  const resPath = staticPath + url.parse(req.url).pathname;

  if (fs.statSync(resPath).isDirectory()) {
    readDir(resPath, res);
  } else {
    readFile(resPath, res);
  }
});

const serverAddress = `http://${HOSTNAME}:${PORT}`;

server.listen(PORT, HOSTNAME, () => {
  console.log(`Server running at ${serverAddress}/`);
});
