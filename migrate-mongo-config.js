const dotenv = require('dotenv');
dotenv.config();

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const mongoDBConnection = process.env.CLOUD_DB_CONNECTION_STRING || 'mongodb://' + dbUser + ':' + encodeURIComponent("test") + process.env.DB_INFO;console.log(mongoDBConnection);

module.exports = {
    mongodb: {
      url: mongoDBConnection,
  
      databaseName: "cal",
    },
  
    // The migrations dir, can be an relative or absolute path
    migrationsDir: "./database/migrations",
  
    changelogCollectionName: "changelog",
  
    // The file extension
    migrationFileExtension: ".js",
  
    useFileHash: false
  };
  