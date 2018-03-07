const db = require(`../../database/database`);

const setupCollection = async () => {
  const dBase = await db;
  const collection = dBase.collection(`posts`);

  return collection;
};

class PostsStore {
  constructor(collection) {
    this.collection = collection;
  }

  async getPost(date) {
    return (await this.collection).find(date);
  }

  async getAllPosts() {
    return (await this.collection).find({});
  }

  async save(post) {
    return (await this.collection).insertOne(post);
  }
}

module.exports = new PostsStore(
    setupCollection().catch((e) =>
      console.error(`Failed to set up "posts"-collection`, e)
    )
);
