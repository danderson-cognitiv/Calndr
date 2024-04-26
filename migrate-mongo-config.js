const dotenv = require('dotenv');
dotenv.config();

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const mongoDBConnection = 'mongodb://' + dbUser + ':' + encodeURIComponent("test") + process.env.DB_INFO;
console.log(mongoDBConnection);

// migrate-mongo-config.js
module.exports = {
    mongodb: {
      url: mongoDBConnection,
  
      databaseName: "cal",
    },
  
    // The migrations dir, can be an relative or absolute path. Only edit this when really necessary.
    migrationsDir: "database/migrations",
  
    // The MongoDB collection where the applied changes are stored. Only edit this when really necessary.
    changelogCollectionName: "changelog",
  
    // The file extension to create migrations and search for in migration dir
    migrationFileExtension: ".js",
  
    // Enable the algorithm to create a checksum of the file contents and use that in the comparison to determine
    // if the file should be run.  Requires that scripts are coded to be idempotent.
    useFileHash: false
  };
  