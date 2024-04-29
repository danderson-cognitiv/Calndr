module.exports = {
    async up(db, client) {
      await db.createCollection('userEvents');
  
      await db.collection('userEvents').deleteMany({});
  
      const daveId = await db.collection('users').findOne({ username: "DandyAndy77" });
      const mahirId = await db.collection('users').findOne({ username: "Fladenbrot420" });

      const davesBirthdayEventId = await db.collection('events').findOne({ name: "Dave's Birthday Party!" });
      const mahirGraduationEventId = await db.collection('events').findOne({ name: "Mahir's Graduation party" });
      const mahirSecretParty = await db.collection('events').findOne({ name: "Mahir's secret after party" });

      await db.collection('userEvents').insertMany([
        {
          event: davesBirthdayEventId._id,
          user: daveId._id,
          rsvp: true
        },
        {
          event: mahirGraduationEventId._id,
          user: daveId._id,
          rsvp: false
        },
        {
          event: mahirGraduationEventId._id,
          user: mahirId._id,
          rsvp: true
        },
        {
          event: davesBirthdayEventId._id,
          user: mahirId._id,
          rsvp: true
        },
        {
          event: mahirSecretParty._id,
          user: mahirId._id,
          rsvp: true
        }
      ]);
    },
  
    async down(db, client) {
      await db.collection('userEvents').drop();
    }
  };
  