//logica de negocios
const bcrypt = require("bcrypt");
const nanoid = require("nanoid");
const auth = require("../../../Auth");

const TABLA = "users";

module.exports = function(injectedStore) {
  let store = injectedStore;
  if (!store) {
    store = require("../../../Store/postgres");
  }

  function list() {
    return store.list(TABLA);
  }

  function get(id) {
    return store.get(TABLA, id);
  }

  //funcion para crear sesiones ante el controller de sesiones
  async function upsert(body) {
    const user = {
      name: body.name,
      username: body.username,
      id: body.id ? body.id : nanoid()
    };

    if (body.password) {
      user.password = await bcrypt.hash(body.password, 5);
    }

    return body.id ? store.update(TABLA, user) : store.insert(TABLA, user);
  }

  async function follow(from, to) {
    store.insert("users_follow", {
      user_from: from,
      user_to: to
    });
  }

  async function following(user) {
    const join = {};
    join[TABLA] = "user_to";
    const query = { user_from: user };
    return await store.query("users_follow", query, join);
  }

  async function login(username, password) {
    let data = await store.query(TABLA, { username: username });
    data = data[0];

    //validacion de encriptacion bidireccional (cliente manda contraseña sin encriptar)
    return bcrypt.compare(password, data.password).then(iguales => {
      if (iguales) {
        //generar token
        return auth.signature(data);
      } else {
        throw new Error("Informacion Invalida");
      }
    });

    //validacion de encriptacion unidireccional (cliente manda contraseña encriptada)
    /*if (data.password === password) {
      //generar token
      return auth.signature(data);
    } else {
      throw new Error("Informacion Invalida");
    }
    return data;*/
  }

  return {
    list,
    get,
    upsert,
    follow,
    following,
    login
  };
};
