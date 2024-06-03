import express from 'express';
import * as bodyParser from 'body-parser';
import createUserRoutes from './UserRoutes';
import createEventRoutes from './EventRoutes';
import createUserEventRoutes from './UserEventRoutes';
import createMessageRoutes from './MessageRoutes';
import createPhotoRoutes from './PhotoRoutes';
import {DatabaseModels} from '../../../database/DatabaseModels';
import createAuthRoutes from './AuthRoutes';
import GooglePassport from '../GooglePassport';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import passport from 'passport'
import path from 'path';
import cors from 'cors';

class App {
    // ref to Express instance
    public expressApp: express.Application;
    public googlePassport:GooglePassport

    constructor() {
        this.googlePassport = new GooglePassport();
        this.expressApp = express();
        this.middleware();
    }
    // com
    async initializeDatabaseModels(mongoDBConnection: string): Promise<void> {
        await DatabaseModels.initialize(mongoDBConnection);
        this.routes();
    }

    // Configure Express middleware.
    private middleware(): void {
        this.expressApp.use(bodyParser.json());
        this.expressApp.use(bodyParser.urlencoded({ extended: false }));

        this.expressApp.use(cors({
            origin: process.env.CLIENT_URL,
            credentials: true,
            methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
            allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept'
        }));

        this.expressApp.use(cookieParser());
        this.expressApp.use(session({
            secret: process.env.SESSION_SECRET || 'keyboard cat',
            resave: false,
            saveUninitialized: true,
            cookie: {
                secure: false,
                maxAge: 60 * 60 * 1000
            }
        }));
        
        
        this.expressApp.use(passport.initialize());
        this.expressApp.use(passport.session());
    }

    private routes(): void {
        // auth routes
        this.expressApp.use('/', createAuthRoutes());
        // Use user routes
        this.expressApp.use('/api', createUserRoutes());
        this.expressApp.use('/api', createEventRoutes());
        this.expressApp.use('/api', createUserEventRoutes());
        this.expressApp.use('/api', createMessageRoutes());
        this.expressApp.use('/api', createPhotoRoutes());


        // Serve static files
        this.expressApp.use('/app/json/', express.static(__dirname + '/app/json'));
        this.expressApp.use('/images', express.static(__dirname + '/img'));
        this.expressApp.use('/', express.static(__dirname + '/../../dist/client/browser'));        
        this.expressApp.get('*', (req, res) => {
            res.sendFile(path.resolve(__dirname, '../../dist/client/browser/index.html'));
        });
    }
}

export { App };
