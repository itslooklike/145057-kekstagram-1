const {MongoClient} = require(`mongodb`);

module.exports = MongoClient.connect(
    `mongodb://${process.env.DB_HOST || `localhost:27017`}`
)
    .then((client) => client.db(`kekstagram`))
    .catch((e) => {
      console.log(`Failed to connect to MongoDB`, e);
      process.exit(1);
    });
