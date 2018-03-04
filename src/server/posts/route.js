const {Router} = require(`express`);
const bodyParser = require(`body-parser`);
const multer = require(`multer`);
const aw = require(`../../utils/asyncWrap`);
const ValidationError = require(`./validate/validation-error`);
const validator = require(`./validate/validator`);
const createStreamFromBuffer = require(`../utils/buffer-to-stream`);
const imageStore = require(`../images/imageStore`);
const postsStore = require(`./store`);

const upload = multer({storage: multer.memoryStorage()});
const postsRouter = new Router();

const allPosts = async (cursor, skip = 0, limit = 50) => {
  if (limit > 50) {
    limit = 50;
  }

  const result = await cursor
      .skip(skip)
      .limit(limit)
      .toArray();

  return {
    data: result,
    skip,
    limit,
    total: result.length,
  };
};

postsRouter.use(bodyParser.json());

postsRouter.get(
    ``,
    aw(async (req, res) => {
      const skip = parseInt(req.query.skip, 10) || void 0;
      const limit = parseInt(req.query.limit, 10) || void 0;

      try {
        res.send(await allPosts(await postsStore.getAllPosts(), skip, limit));
      } catch (error) {
        console.log(error);
      }
    })
);

postsRouter.get(
    `/:date`,
    aw(async (req, res) => {
      try {
        const {date} = req.params;
        const result = await postsStore.getPost({date});
        const posts = await result.toArray();

        if (posts.length > 0) {
          res.send(posts);
        } else {
          res.status(404).send();
        }
      } catch (error) {
        console.log(error);
      }
    })
);

postsRouter.get(
    `/:date/image`,
    aw(async (req, res) => {
      try {
        const {date} = req.params;
        const result = await postsStore.getPost({date});
        const posts = await result.toArray();

        if (posts.length > 0) {
          const {info, stream} = await imageStore.get(posts[0].url);

          res.set(`content-type`, info.contentType);
          res.set(`content-length`, info.length);
          res.status(200);
          stream.pipe(res);
        } else {
          res.status(404).send();
        }
      } catch (error) {
        console.log(error);
      }
    })
);

postsRouter.post(
    ``,
    upload.single(`filename`),
    aw(async (req, res) => {
      const data = Object.assign(req.body, {filename: req.file});
      const errors = validator(data);

      if (errors.length > 0) {
        throw new ValidationError(errors);
      } else {
        try {
          const imageInfo = {
            path: `/api/posts/${data.date}/image`,
            mimetype: data.filename.mimetype,
          };

          await imageStore.save(imageInfo.path, imageInfo.mimetype, createStreamFromBuffer(data.filename.buffer));

          data.url = imageInfo.path;
          delete data.filename;
          await postsStore.save(data);

          res.send(req.body);
        } catch (error) {
          console.log(error);
        }
      }
    })
);

postsRouter.use((exception, req, res, next) => {
  let error = exception;

  if (exception instanceof ValidationError) {
    error = exception.errors;
  }

  res.status(400).send(error);
  next();
});

module.exports = postsRouter;
