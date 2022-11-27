import * as mysql from "mysql2/promise";

let poolConfig = {
  host: "pro.freedb.tech",
  user: "Channatt_ku_root",
  password: "%y8dJ@vV*syVQ3Y",
  database: "Channatt_ku",
};

let pool = mysql.createPool(poolConfig);

export default async function connect() {
  const connection = await pool.getConnection();
  // Use the connection
  await connection.ping();
  return connection;
  const rows = await connection.query("SELECT * FROM users");
  // And done with the connection.
  connection.release();
}


export * from "mysql2/promise";
