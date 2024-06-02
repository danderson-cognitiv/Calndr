import * as dotenv from 'dotenv';
import {App} from './routes/App';
const cors = require('cors');


dotenv.config();

//todo check these for null
const port = process.env.PORT;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;

const mongoDBConnection = process.env.CLOUD_DB_CONNECTION_STRING || 'mongodb://' + dbUser + ':' + encodeURIComponent("test") + process.env.DB_INFO;
console.log("server db connection URL " + mongoDBConnection);

const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE']
};

const app = new App();

export function startApiServer(): Promise<{ serverInstance: any; message: string }> {
  let server = app.expressApp;
  server.use(cors(corsOptions));
  return app.initializeDatabaseModels(mongoDBConnection).then(() => {
    return new Promise<{ serverInstance: any; message: string }>((resolve) => {
      const listener = server.listen(port, () => {
        console.log(`Server running on port ${port}`);
        resolve({
          serverInstance: listener,
          message: 'Server is up and running'
        });
      });
    });
  }).catch(err => {
    console.error('Failed to initialize database models:', err);
    throw err;
  });
}

if (require.main === module) {
  startApiServer().then(({ message }) => console.log(message))
    .catch(err => console.error('Server failed to start:', err));
}