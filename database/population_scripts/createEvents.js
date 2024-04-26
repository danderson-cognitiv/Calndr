db = db.getSiblingDB('cal');
db.createCollection('events');
eventsCollection = db.getCollection("events");
usersCollection = db.getCollection("users");

eventsCollection.deleteMany({}); 

var result = eventsCollection.insertMany([
    {
        created_by_user_id: usersCollection.findOne({ name: "DandyAndy77" })._id,
        name: "Dave's Birthday Party!",
        start_time: new Date("2024-11-16T19:00:00"),
        end_time: new Date("2024-11-17T00:00:00"),
        location: "420 69th Ave, Seattle WA, 98119",
        description: "Hey guys, I'm turning 30 pretty soon come hang out with me as I celebrate!"
    },
    {
        created_by_user_id: usersCollection.findOne({ name: "FladenBrot420" })._id,
        name: "Mahir's Graduation party",
        start_time: new Date("2024-06-09T19:00:00"),
        end_time: new Date("2024-06-10T00:00:00"),
        location: "123 12th Ave, Seattle WA, 98119",
        description: "I'm finally graduating guys!!! Come get lit with me, BYOB"
    },

]);