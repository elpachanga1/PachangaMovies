const nanoid = require("nanoid");

const TABLA = "comments";

module.exports = function(injectedStore) {
  let store = injectedStore;
  if (!store) {
    store = require("../../../Store/postgres");
  }

  function list() {
    return store.list(TABLA);
  }

  async function getPerMovie(id) {
    return await store.query(TABLA, { movie_id: id });
  }

  async function upsert(body) {
    const comment = {
      id: body.id ? body.id : nanoid(),
      paragraph: body.paragraph,
      user_id: body.user_id,
      stars: body.stars,
      movie_id: body.movie_id
    };

    return body.id
      ? store.update(TABLA, comment)
      : store.insert(TABLA, comment);
  }

  async function remove(id) {
    return await store.remove(TABLA, id);
  }

  return {
    list,
    getPerMovie,
    upsert,
    remove
  };
};
