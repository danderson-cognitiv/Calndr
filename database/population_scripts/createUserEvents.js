db = db.getSiblingDB('cal');
db.createCollection('events');
userEventsCollection = db.getCollection("userEvents");
usersCollection = db.getCollection("users");
eventsCollection = db.getCollection("events");

userEventsCollection.deleteMany({}); 

daveId = usersCollection.findOne({ name: "DandyAndy77" })._id
mahirID = usersCollection.findOne({ name: "FladenBrot420" })._id

davesBirthDayEventId = eventsCollection.findOne({ name: "Dave's Birthday Party!"})._id
mahirGraduationEventId = eventsCollection.findOne({ name: "Mahir's Graduation party"})._id

var result = userEventsCollection.insertMany([
    {
        event_id: davesBirthDayEventId,
        user_id: daveId,
        rsvp: true
    },
    {
        event_id: mahirGraduationEventId,
        user_id: daveId,
        rsvp: false
    },
    {
        event_id: mahirGraduationEventId,
        user_id: mahirID,
        rsvp: true
    },
    {
        event_id: davesBirthDayEventId,
        user_id: mahirID,
        rsvp: true
    }

]);