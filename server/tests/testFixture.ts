import { startApiServer } from '../src/AppServer';
import { before, after } from 'mocha';


declare global {
    var serverInstance: { close: (callback: () => void) => void; };
    var serverReady: Promise<{serverInstance: any, message: string}>;
}

before((done) => {
    global.serverReady = startApiServer();
    global.serverReady.then((result) => {
      global.serverInstance = result.serverInstance;
      console.log(result.message);
      done();
    }).catch(err => {
      console.error("Failed to start the server:", err);
      done(err);
    });
  });
  
  after((done) => {
    if (global.serverInstance) {
      global.serverInstance.close(() => {
        console.log('Server stopped');
        done();
      });
    } else {
      console.log('No server instance found');
      done();
    }
  });
