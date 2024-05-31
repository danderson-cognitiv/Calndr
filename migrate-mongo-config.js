const dotenv = require('dotenv');
dotenv.config();

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
// const mongoDBConnection = 'mongodb+srv://' + dbUser + ':' + dbPassword + '@' + process.env.DB_INFO;
const mongoDBConnection = 'mongodb+srv://dbAdmin:test@calndr.tmbdgpo.mongodb.net/?retryWrites=true&w=majority&appName=Calndr'
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
  