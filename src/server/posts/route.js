const {Router} = require(`express`);
const bodyParser = require(`body-parser`);
const multer = require(`multer`);
const asyncWrap = require(`../../utils/asyncWrap`);
const ValidationError = require(`./validate/validation-error`);
const validator = require(`./validate/validator`);
const createStreamFromBuffer = require(`../utils/buffer-to-stream`);
const logger = require(`../../logger`);

const upload = multer({storage: multer.memoryStorage()});
const postsRouter = new Router();

const allPosts = async (cursor, skip = 0, limit = 50) => {
  limit = Math.min(limit, 50);

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

postsRouter.use((req, res, next) => {
  res.header(`Access-Control-Allow-Origin`, `*`);
  res.header(
      `Access-Control-Allow-Headers`,
      `Origin, X-Requested-With, Content-Type, Accept`
  );
  next();
});

postsRouter.get(
    ``,
    asyncWrap(async (req, res) => {
      const skip = parseInt(req.query.skip, 10) || void 0;
      const limit = parseInt(req.query.limit, 10) || void 0;

      logger.info(`получение всех постов`);
      res.send(
          await allPosts(await postsRouter.postsStore.getAllPosts(), skip, limit)
      );
    })
);

postsRouter.get(
    `/:date`,
    asyncWrap(async (req, res) => {
      try {
        const {date} = req.params;
        const result = await postsRouter.postsStore.getPost({date});
        const posts = await result.toArray();

        if (posts.length > 0) {
          res.send(posts);
        } else {
          res.status(404).send(`пост ${date} не найден`);
        }
      } catch (error) {
        logger.error(`не удалось найти пост: ${error.message}`);
      }
    })
);

postsRouter.get(
    `/:date/image`,
    asyncWrap(async (req, res) => {
      try {
        const {date} = req.params;
        const result = await postsRouter.postsStore.getPost({date});
        const posts = await result.toArray();

        if (posts.length > 0) {
          const {info, stream} = await postsRouter.imageStore.get(posts[0].url);

          res.set(`content-type`, info.contentType);
          res.set(`content-length`, info.length);
          res.status(200);
          stream.pipe(res);
        } else {
          res.status(404).send(`пост ${date} не найден`);
        }
      } catch (error) {
        logger.error(`не удалось найти картинку поста: ${error.message}`);
      }
    })
);

postsRouter.post(
    ``,
    upload.single(`filename`),
    asyncWrap(async (req, res) => {
      const data = Object.assign(req.body, {
        filename: req.file,
        date: Date.now().toString(),
      });

      // хардкод для клиента, ему всегда нужен массив с комментами
      if (!data.comments) {
        Object.assign(data, {comments: []});
      }

      // конвертим строку в массив
      // тк с клиента приходит строка, а в базу нужно класть массив
      if (data.hashtags && typeof data.hashtags === `string`) {
        Object.assign(data, {hashtags: data.hashtags.split(` `)});
      }

      const errors = validator(data);

      if (errors.length > 0) {
        throw new ValidationError(errors);
      } else {
        try {
          const url = `/api/posts/${data.date}/image`;
          const mimetype = data.filename.mimetype;

          await postsRouter.imageStore.save(
              url,
              mimetype,
              createStreamFromBuffer(data.filename.buffer)
          );

          data.url = url;
          delete data.filename;
          await postsRouter.postsStore.save(data);

          res.send(req.body);
        } catch (error) {
          logger.error(`не удалось сохранить пост: ${error.message}`);
        }
      }
    })
);

postsRouter.use((exception, req, res, next) => {
  let error = exception;
  let errorText = `неизвестная ошибка`;

  if (exception instanceof ValidationError) {
    error = exception.errors;
    errorText = `ошибка валидации`;
  }

  logger.error(`${errorText}: ${JSON.stringify(error)}`);
  res.status(400).send(error);
  next();
});

module.exports = (postsStore, imageStore) => {
  postsRouter.postsStore = postsStore;
  postsRouter.imageStore = imageStore;
  return postsRouter;
};
