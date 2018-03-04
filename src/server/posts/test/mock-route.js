const createWizardsRouter = require(`../route`);
const generateEntity = require(`../../../data/generate-entity`);

const posts = ({limit = 50, skip = 0} = {}) => {
  const data = [];

  Array.from({length: limit}).forEach(() => data.push(generateEntity()));

  const response = {
    data,
    skip,
    limit,
    total: data.length,
  };

  return response;
};

class Cursor {
  constructor(data) {
    this.data = data;
  }

  skip(count) {
    return new Cursor(this.data.slice(count));
  }

  limit(count) {
    return new Cursor(this.data.slice(0, count));
  }

  async count() {
    return this.data.length;
  }

  async toArray() {
    return this.data;
  }
}

class PostsStore {
  constructor() {}

  async getPost(date) {
    return posts.data.find((it) => it.date === date);
  }

  async getAllPosts() {
    return new Cursor(posts());
  }

  async save() {}
}

class MockImageStore {
  async getBucket() {}

  async get() {}

  async save() {}
}

module.exports = createWizardsRouter(new PostsStore(), new MockImageStore());
