db = db.getSiblingDB('cal');
db.createCollection('users');
listsCollection = db.getCollection("users");
listsCollection.deleteMany({}); 

var result = listsCollection.insertMany([
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

listsCollection.updateOne(
    { _id: userId1 },
    { $set: { friends: [userId2] } }
);

listsCollection.updateOne(
    { _id: userId2 },
    { $set: { friends: [userId1] } }
);