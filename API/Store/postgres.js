const { Client } = require("pg");
const config = require("../config");
const { parseInsertData, parseQueryData } = require("./parsers");

const dbConfig = {
  user: config.pg.user,
  host: config.pg.host,
  database: config.pg.database,
  password: config.pg.password,
  port: config.pg.port
};

let connection;

function handleConn() {
  connection = new Client(dbConfig);
  connection.connect(err => {
    if (err) {
      console.error("[db err]", err);
      setTimeout(handleConn, 2000);
    } else {
      console.log("DB Connected");
    }
  });

  connection.on("error", err => {
    console.error("[db err]", err);
    if (err.code === "CONNECTION_EXCEPTION") {
      handleConn();
    } else {
      throw err;
    }
  });
}

handleConn();

function list(table) {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ${table}`, (error, result) => {
      if (error) return reject(error);

      resolve(result.rows);
    });
  });
}

function get(table, id) {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM ${table} WHERE id = '${id}'`,
      (error, result) => {
        if (error) return reject(error);

        resolve(result.rows);
      }
    );
  });
}

function insert(table, data) {
  return new Promise((resolve, reject) => {
    query = `INSERT INTO ${table} (${Object.keys(
      data
    )}) VALUES (${parseInsertData(Object.values(data))})`;

    connection.query(query, (error, result) => {
      if (error) return reject(error);

      resolve({
        command: result.command,
        rowCount: result.rowCount
      });
    });
  });
}

function update(table, data) {
  return new Promise((resolve, reject) => {
    query = `UPDATE ${table} SET ${parseQueryData(data)} WHERE id = '${
      data.id
    }'`;
    console.log(query);

    connection.query(query, (error, result) => {
      if (error) return reject(error);

      resolve({
        command: result.command,
        rowCount: result.rowCount
      });
    });
  });
}

function query(table, query, join) {
  let joinQuery = "";
  if (join) {
    const key = Object.keys(join)[0];
    const val = join[key];
    joinQuery = `JOIN ${key} ON ${table}.${val} = ${key}.id`;
  }

  return new Promise((resolve, reject) => {
    query = `SELECT * FROM ${table} ${joinQuery} WHERE ${parseQueryData(
      query
    )}`;
    console.log(query);

    connection.query(query, (error, result) => {
      if (error) return reject(error);

      resolve(result.rows);
    });
  });
}

function getCommentsPerMovie(data) {
  return new Promise((resolve, reject) => {
    query = `SELECT c.id, 
                    c.paragraph,
                    c.user_id,
                    c.stars,
                    c.movie_id,
                    c.created,
                    u.name,
                    u.username
            FROM comments c INNER JOIN users u ON u.id = c.user_id WHERE ${parseQueryData(
              data
            )}`;
    console.log(query);

    connection.query(query, (error, result) => {
      if (error) return reject(error);

      resolve(result.rows);
    });
  });
}

function remove(table, id) {
  return new Promise((resolve, reject) => {
    connection.query(
      `DELETE FROM ${table} WHERE id = '${id}'`,
      (error, result) => {
        if (error) return reject(error);

        resolve(result.rows);
      }
    );
  });
}

module.exports = {
  list,
  get,
  insert,
  update,
  remove,
  getCommentsPerMovie,
  query
};
