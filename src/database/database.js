const {MongoClient} = require(`mongodb`);

module.exports = MongoClient.connect(`mongodb://localhost:27017`)
    .then((client) => client.db(`myproject`))
    .catch((e) => {
      console.log(`Failed to connect to MongoDB`, e);
      process.exit(1);
    });
