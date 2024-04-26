db = db.getSiblingDB('cal');
db.createCollection('users');
usersCollection = db.getCollection("users");
usersCollection.deleteMany({}); 

var result = usersCollection.insertMany([
    {
        name: "DandyAndy77",
        email: "david.j.anderson94@gmail.com",
        password: "password",
        f_name: "Dave",
        l_name: "Anderson",
        events_visible: true
    },
    {
        name: "FladenBrot420",
        email: "mahir_email@gmail.com",
        password: "password",
        f_name: "Mahir",
        l_name: "Bathija",
        events_visible: false
    }
]);

var userId1 = result.insertedIds[0];
var userId2 = result.insertedIds[1];

usersCollection.updateOne(
    { _id: userId1 },
    { $set: { friends: [{userId: userId2, name: "FladenBrot420"}] } }
);

usersCollection.updateOne(
    { _id: userId2 },
    { $set: { friends: [{userId: userId1, name: "DandyAndy77"}] } }
);