import express from 'express';
import * as bodyParser from 'body-parser';
import {UserModel} from '../../../database/model/UserModel';

class App {
  // ref to Express instance
  public expressApp: express.Application;
  public Users:UserModel;

  constructor(mongoDBConnection:string)
  {
    this.expressApp = express();
    this.middleware();
    this.routes();
    this.Users = new UserModel(mongoDBConnection);
  }

    // Configure Express middleware.
  private middleware(): void {
    this.expressApp.use(bodyParser.json());
    this.expressApp.use(bodyParser.urlencoded({ extended: false }));
    this.expressApp.use( (req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
    });
  }

    private routes(): void {
      let router = express.Router();
      router.get('/user/:name', async (req, res) => {
        var name = req.params.name;
        console.log('Query users by name: ' + name);
        try {
            const user = await this.Users.getUserByName(name);
            if (user) {
                res.json(user);
            } else {
                res.status(404).json({ message: "User not found" });
            }
        } catch (error) {
            console.error('Error accessing database:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
       });

       router.get('/user/:userId/friends', async (req, res) => {
        var userId = req.params.userId;
        console.log('Query friends for userId: ' + userId);
        try {
            const friends = await this.Users.getFriendsByUserId(userId);
            if (friends) {
                res.json(friends);
            } else {
                res.status(404).json({ message: "No friends to show" });
            }
        } catch (error) {
            console.error('Error accessing database:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
       });
       
       router.post('/user/create/', async (req, res) => {
        var payload = req.body;
        try {
            const newUser = await this.Users.createUser(payload);
            if (newUser) {
                res.json(newUser);
            } else {
                res.status(404).json({ message: "Failed" });
            }
        } catch (error) {
            console.error('Error accessing database:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
       });
       


      this.expressApp.use('/', router);

      this.expressApp.use('/app/json/', express.static(__dirname+'/app/json'));
      this.expressApp.use('/images', express.static(__dirname+'/img'));
      this.expressApp.use('/', express.static(__dirname+'/pages'));
    }
  
}

export {App}