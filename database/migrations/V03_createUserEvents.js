module.exports = {
    async up(db, client) {
      // Ensure the 'userEvents' collection exists
      await db.createCollection('userEvents');
  
      // Clear existing documents in the 'userEvents' collection
      await db.collection('userEvents').deleteMany({});
  
      // Retrieve user IDs
      const daveId = await db.collection('users').findOne({ name: "DandyAndy77" });
      const mahirId = await db.collection('users').findOne({ name: "FladenBrot420" });
  
      // Retrieve event IDs
      const davesBirthdayEventId = await db.collection('events').findOne({ name: "Dave's Birthday Party!" });
      const mahirGraduationEventId = await db.collection('events').findOne({ name: "Mahir's Graduation party" });
  
      // Insert relationships into 'userEvents' collection
      var result = await db.collection('userEvents').insertMany([
        {
          event_id: davesBirthdayEventId._id,
          user_id: daveId._id,
          rsvp: true
        },
        {
          event_id: mahirGraduationEventId._id,
          user_id: daveId._id,
          rsvp: false
        },
        {
          event_id: mahirGraduationEventId._id,
          user_id: mahirId._id,
          rsvp: true
        },
        {
          event_id: davesBirthdayEventId._id,
          user_id: mahirId._id,
          rsvp: true
        }
      ]);
    },
  
    async down(db, client) {
      // Rollback: Remove the 'userEvents' collection
      await db.collection('userEvents').drop();
    }
  };
  