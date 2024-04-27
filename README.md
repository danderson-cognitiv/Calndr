# Calndr

## Starting the Mongo Database
We need to install mongodb, follow the instructions here `https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-os-x/`
And then `cd Calndr/database`
Create the `db` directory by running `mkdir db`
Then run `mongod -port 3000 -dbpath "./db"`
This will create a background process that is running the mongo database. It also creates a `database/db` directory that holds metadata about the database

## Connecting to the DB
Run `brew install mongosh`
Mongosh is how connect to the database in a shell script.
While in the `database` directory run `mongosh -port 3000`. 

## Running Migration Scripts
I'm fancy so we're going to automate migration scripts.
Install migrate-mongo with `npm install -g migrate-mongo` or if you just run `npm install` maybe it will just work because it's in `package.json`... not sure.

First you have to manually create the admin user.
Go back to the mongosh shell and run `load("createAdminUser.js")`. This creates the admin user that we have credentials for.
Next run `npm install --save dotenv` to install dotenv.
Then in another terminal run from the `Calndr` directory run `migrate-mongo up`. You should see the Migration scripts being written to the console
```
migrate-mongo up
mongodb://dbAdmin:test@127.0.0.1:3000/cal?authSource=admin
MIGRATED UP: V01_createUsers.js
MIGRATED UP: V02_createEvents.js
MIGRATED UP: V03_createUserEvents.js
```

If you run into an error for dotenv not found, run `npm install --save dotenv`


## Starting the App Server
In the `Calndr` directory run `npm start`. You should see 
```
npm start 

> calndr@1.0.0 start
> ts-node server/src/AppServer.ts

server db connection URL mongodb://dbAdmin:test@127.0.0.1:3000/cal?authSource=admin
server running in port 8080
```

## Hitting the API
Open Postman or Insomnia and create a `GET` route with this url
`http://localhost:8080/user/DandyAndy77` while the app server is running on port 8080 and you should get this response
```
{
    "_id": "662be19bd48969bde466f788",
    "name": "DandyAndy77",
    "email": "david.j.anderson94@gmail.com",
    "password": "password",
    "fName": "Dave",
    "lName": "Anderson",
    "eventsVisible": true,
    "friends": [
        {
            "_id": "662be1ffa01fd430dcf4ab0f",
            "userId": "662be19bd48969bde466f789",
            "name": "FladenBrot420"
        }
    ]
}
```
