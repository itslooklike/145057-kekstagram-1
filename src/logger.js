const winston = require(`winston`);
const {combine, simple, json} = winston.format;

// error: 0,
// warn: 1,
// info: 2,
// verbose: 3,
// debug: 4,
// silly: 5

const logger = winston.createLogger({
  format: json(),
  transports: [
    new winston.transports.File({filename: `error.log`, level: `error`}),
    new winston.transports.File({filename: `combined.log`, level: `info`}),
  ],
  exitOnError: false,
});

if (process.env.NODE_ENV !== `production`) {
  logger.add(
      new winston.transports.Console({
        format: combine(simple()),
        level: `silly`,
      })
  );
}

module.exports = logger;
