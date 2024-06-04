import passport from 'passport';
import * as dotenv from 'dotenv';
let GoogleStrategy = require('passport-google-oauth20-with-people-api').Strategy;
let Profile = require('passport-google-oauth20-with-people-api').Profile;
let VerifyCallBack = require('passport-google-oauth20-with-people-api').VerifyCallBack;
import { DatabaseModels } from '../../database/DatabaseModels';

dotenv.config();

class GooglePassport {
    clientId: string;
    secretId: string;

    constructor() {
        this.clientId = process.env.OAUTH_ID || '';
        this.secretId = process.env.OAUTH_SECRET || '';

        passport.use(new GoogleStrategy({
            clientID: this.clientId,
            clientSecret: this.secretId,
            callbackURL: `${process.env.CLIENT_URL}/auth/google/callback`
        },
        async (accessToken: string, refreshToken: string, profile: typeof Profile, done: typeof VerifyCallBack) => {
            console.log("Inside new Google Strategy");
            console.log(profile)
            try {
                let user = await DatabaseModels.UserModel.getUserById(profile.id);
                if (!user) {
                    user = await DatabaseModels.UserModel.createUser({
                        _id: profile.id,
                        email: profile.emails[0].value,
                        username: profile.displayName,
                        fName: profile.givenName,
                        lName: profile.familyName
                    });
                }
                return done(null, user);
            } catch (error) {
                console.error('Error accessing database:', error);
                return done(error);
            }
        }
        ));

        passport.serializeUser((user: any, done) => {
            done(null, user);
        });

        passport.deserializeUser((user: any, done) => {
            done(null, user);
        });
    }
}

export default GooglePassport;
