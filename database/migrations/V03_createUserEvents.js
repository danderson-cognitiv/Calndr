module.exports = {
    async up(db, client) {
      await db.createCollection('userEvents');
  
      await db.collection('userEvents').deleteMany({});
  
      const daveId = await db.collection('users').findOne({ username: "DandyAndy77" });
      const mahirId = await db.collection('users').findOne({ username: "Fladenbrot420" });

      const davesBirthdayEventId = await db.collection('events').findOne({ name: "Dave's Birthday Party!" });
      const mahirGraduationEventId = await db.collection('events').findOne({ name: "Mahir's Graduation party" });
  
      await db.collection('userEvents').insertMany([
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
      await db.collection('userEvents').drop();
    }
  };
  