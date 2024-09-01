const sql = require("mssql/msnodesqlv8");
const dotenv = require("dotenv");
dotenv.config();
const config = {
  server: "localhost,1433",
  database: "ChatAppDB",
  options: {
    trustedConnection: true, // Set to true if using Windows Authentication
    trustServerCertificate: true, // Set to true if using self-signed certificates
  },
  driver: "msnodesqlv8", // Required if using Windows Authentication
};

const poolPromise = new sql.connect(config)
  .then((pool) => {
    console.log("Connected to MSSQL");
    return pool;
  })
  .catch((err) => console.log("Database Connection Failed! Bad Config: ", err));

module.exports = {
  sql,
  poolPromise,
};
