module.exports = {
    async up(db, client) {
      await db.createCollection('userEvents');
  
      await db.collection('userEvents').deleteMany({});
  
      const daveId = await db.collection('users').findOne({ username: "DandyAndy77" });
      const mahirId = await db.collection('users').findOne({ username: "Fladenbrot420" });
      const emilitId = await db.collection('users').findOne({ username: "Emilit" });
      const angeloId = await db.collection('users').findOne({ username: "AngeloAlfonso" });
      const wesId = await db.collection('users').findOne({ username: "Wes1004" });
      const benId = await db.collection('users').findOne({ username: "Benson143" });

      const davesBirthdayEventId = await db.collection('events').findOne({ name: "Dave's Birthday Party!" });
      const mahirGraduationEventId = await db.collection('events').findOne({ name: "Mahir's Graduation party" });
      const mahirSecretPartyEventId = await db.collection('events').findOne({ name: "Mahir's secret after party" });
      const emilysHousewarmigEventId = await db.collection('events').findOne({ name: "Emily's Housewarming Party!" });
      const emilysBirthdayEventId = await db.collection('events').findOne({ name: "Emily's Birthday Party!" });
      const emilysInternshipCelebrationEventId = await db.collection('events').findOne({ name: "I got the internship!" });
      const wesleysPregradEventId = await db.collection('events').findOne({ name: "Pre-graduation Party!" });
      const wesleysMoxEventId = await db.collection('events').findOne({ name: "Mox" });
      const bensonsBirthdayEventId = await db.collection('events').findOne({ name: "Benson's Birthday Party!" });
      const bensonsNewCareerEventId = await db.collection('events').findOne({ name: "I heard back from Amazon! Lets Celebrate" });
      
      await db.collection('userEvents').insertMany([
        {
          event: davesBirthdayEventId._id,
          user: daveId._id,
          rsvp: true
        },
        {
          event: davesBirthdayEventId._id,
          user: mahirId._id,
          rsvp: true
        },
        {
          event: davesBirthdayEventId._id,
          user: emilitId._id,
          rsvp: true
        },
        {
          event: davesBirthdayEventId._id,
          user: angeloId._id,
          rsvp: true
        },
        {
          event: mahirGraduationEventId._id,
          user: daveId._id,
          rsvp: false
        },
        {
          event: mahirGraduationEventId._id,
          user: emilitId._id,
          rsvp: true
        },
        {
          event: mahirGraduationEventId._id,
          user: mahirId._id,
          rsvp: true
        },
        {
          event: mahirSecretPartyEventId._id,
          user: mahirId._id,
          rsvp: true
        },
                {
          event: mahirSecretPartyEventId._id,
          user: angeloId._id,
          rsvp: true
        },
        {
          event: emilysHousewarmigEventId._id,
          user: mahirId._id,
          rsvp: true
        }, 
        {
          event: emilysBirthdayEventId._id,
          user: daveId._id,
          rsvp: true
        }, 
        {
          event: emilysBirthdayEventId._id,
          user: wesId._id,
          rsvp: true
        }, 
        {
          event: emilysBirthdayEventId._id,
          user: angeloId._id,
          rsvp: true
        }, 
        {
          event: emilysInternshipCelebrationEventId._id,
          user: angeloId._id,
          rsvp: false
        }, 
        {
          event: wesleysPregradEventId._id,
          user: benId._id,
          rsvp: false
        }, 
        {
          event: wesleysPregradEventId._id,
          user: angeloId._id,
          rsvp: true
        }, 
        {
          event: wesleysMoxEventId._id,
          user: daveId._id,
          rsvp: false
        }, 
        {
          event: wesleysMoxEventId._id,
          user: emilitId._id,
          rsvp: true
        }, 
        {
          event: wesleysMoxEventId._id,
          user: benId._id,
          rsvp: true
        }, 
        {
          event: bensonsBirthdayEventId._id,
          user: emilitId._id,
          rsvp: true
        }, 
        {
          event: bensonsBirthdayEventId._id,
          user: mahirId._id,
          rsvp: false
        }, 
        {
          event: bensonsNewCareerEventId._id,
          user: wesId._id,
          rsvp: true
        }, 
        {
          event: bensonsNewCareerEventId._id,
          user: mahirId._id,
          rsvp: true
        }, 
      ]);
    },
  
    async down(db, client) {
      await db.collection('userEvents').drop();
    }
  };
  