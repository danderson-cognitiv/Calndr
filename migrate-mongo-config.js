const dotenv = require('dotenv');
dotenv.config();

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const mongoDBConnection = 'mongodb+srv://' + dbUser + ':' + dbPassword + '@' + process.env.DB_INFO;
// const mongoDBConnection = 'mongodb+srv://elee5:D0bJC1CCLDrCdK9O@calndr.akrrre6.mongodb.net/'
console.log(mongoDBConnection);

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
  