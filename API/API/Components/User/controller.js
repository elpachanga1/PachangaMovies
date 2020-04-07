//logica de negocios
const bcrypt = require("bcrypt");
const nanoid = require("nanoid");
const moment = require("moment");

const {
  validateUser,
  validateField,
} = require("../../../Utils/validateFields");
const auth = require("../../../Auth");

const TABLA = "users";

module.exports = function (injectedStore) {
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

  async function insert(body) {
    validateUser(body);

    const user = {
      name: body.name,
      username: body.username,
      id: nanoid(),
    };

    user.password = await bcrypt.hash(body.password, 5);

    return store.insert(TABLA, user);
  }

  //funcion para crear sesiones ante el controller de sesiones
  async function update(body) {
    validateField("user_id", body.user_id);

    const user = {
      id: body.user_id,
    };

    if (body.name) user.name = body.name;
    if (body.username) user.username = body.username;
    if (body.password) user.password = await bcrypt.hash(body.password, 5);

    return store.update(TABLA, user);
  }

  async function follow(from, to) {
    store.insert("users_follow", {
      user_from: from,
      user_to: to,
    });
  }

  async function following(user) {
    const join = {};
    join[TABLA] = "user_to";
    const query = { user_from: user };
    return await store.query("users_follow", query, join);
  }

  async function login(username, password) {
    const expirationDateTime = moment()
      .add(3, "hours")
      .format("YYYY-MM-DD HH:mm:ss");

    let data = await store.query(TABLA, { username: username });

    data = data[0];

    data = {
      ...data,
      expirationDateTime,
    };

    //validacion de encriptacion bidireccional (cliente manda contraseña sin encriptar)
    return bcrypt.compare(password, data.password).then((iguales) => {
      if (iguales) {
        //generar token
        return {
          token: auth.signature(data),
          expirationDateTime,
        };
      } else {
        throw new Error("Usuario o Contraseña Incorrectos");
      }
    });
  }

  return {
    list,
    get,
    insert,
    update,
    follow,
    following,
    login,
  };
};
