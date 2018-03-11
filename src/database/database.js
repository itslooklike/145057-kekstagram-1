const {MongoClient} = require(`mongodb`);
const logger = require(`../logger`);

module.exports = MongoClient.connect(
    `mongodb://${process.env.DB_HOST || `localhost:27017`}`
)
    .then((client) => client.db(`kekstagram`))
    .catch((e) => {
      logger.error(`Failed to connect to MongoDB: ${e}`);
      process.exit(1);
    });
