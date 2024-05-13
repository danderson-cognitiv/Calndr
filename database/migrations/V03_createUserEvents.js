module.exports = {
    async up(db, client) {
      await db.createCollection('userEvents');
      await db.collection('userEvents').deleteMany({});
  
      const daveId = await db.collection('users').findOne({ username: "DandyAndy77" });
      const mahirId = await db.collection('users').findOne({ username: "Fladenbrot420" });
      const emilitId = await db.collection('users').findOne({ username: "Emilit" });
      const angeloId = await db.collection('users').findOne({ username: "AngeloAlfonso" });

      const davesBirthdayEventId = await db.collection('events').findOne({ name: "Dave's Birthday Party!" });
      const davesDuneMovieEventId = await db.collection('events').findOne({ name: "Dune Movie Night" });
      const davesPresEventId = await db.collection('events').findOne({ name: "Calndr Presentation" });
      const mahirGraduationEventId = await db.collection('events').findOne({ name: "Mahir's Graduation party" });
      const mahirSecretPartyEventId = await db.collection('events').findOne({ name: "Mahir's secret after party" });
      const emilysHousewarmigEventId = await db.collection('events').findOne({ name: "Emily's Housewarming Party!" });
      const emilysBirthdayEventId = await db.collection('events').findOne({ name: "Emily's Birthday Party!" });
      const emilysInternshipCelebrationEventId = await db.collection('events').findOne({ name: "I got the internship!" });
      const emilysGroupTherapyEventtId = await db.collection('events').findOne({ name: "Group Therapy Weekender at the Gorge!" });
      const angelosMoxEventId = await db.collection('events').findOne({ name: "Mox" });
      const angelosLeetCodeId = await db.collection('events').findOne({ name: "LeetCode Sessions" });
      
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
          event: davesDuneMovieEventId._id,
          user: daveId._id,
          rsvp: true
        },
        {
          event: davesDuneMovieEventId._id,
          user: mahirId._id,
          rsvp: true
        },
        {
          event: davesDuneMovieEventId._id,
          user: emilitId._id,
          rsvp: true
        },
        {
          event: davesDuneMovieEventId._id,
          user: angeloId._id,
          rsvp: true
        },
        {
          event: davesPresEventId._id,
          user: daveId._id,
          rsvp: true
        },
        {
          event: davesPresEventId._id,
          user: mahirId._id,
          rsvp: true
        },
        {
          event: davesPresEventId._id,
          user: emilitId._id,
          rsvp: true
        },
        {
          event: davesPresEventId._id,
          user: angeloId._id,
          rsvp: true
        },
        {
          event: mahirGraduationEventId._id,
          user: mahirId._id,
          rsvp: true
        },
        {
          event: mahirGraduationEventId._id,
          user: daveId._id,
          rsvp: true
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
          user: daveId._id,
          rsvp: true
        },
        {
          event: mahirSecretPartyEventId._id,
          user: angeloId._id,
          rsvp: true
        },
        {
          event: mahirSecretPartyEventId._id,
          user: angeloId._id,
          rsvp: true
        },
        {
          event: emilysHousewarmigEventId._id,
          user: emilitId._id,
          rsvp: true
        }, 
        {
          event: emilysHousewarmigEventId._id,
          user: mahirId._id,
          rsvp: true
        }, 
        {
          event: emilysBirthdayEventId._id,
          user: emilitId._id,
          rsvp: true
        }, 
        {
          event: emilysBirthdayEventId._id,
          user: daveId._id,
          rsvp: true
        }, 
        {
          event: emilysBirthdayEventId._id,
          user: mahirId._id,
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
          rsvp: true
        }, 
        {
          event: emilysInternshipCelebrationEventId._id,
          user: daveId._id,
          rsvp: true
        }, 
        {
          event: emilysInternshipCelebrationEventId._id,
          user: mahirId._id,
          rsvp: true
        }, 
        {
          event: angelosMoxEventId._id,
          user: angeloId._id,
          rsvp: true
        }, 
        {
          event: angelosMoxEventId._id,
          user: daveId._id,
          rsvp: true
        }, 
        {
          event: angelosMoxEventId._id,
          user: emilitId._id,
          rsvp: true
        }, 
        {
          event: angelosMoxEventId._id,
          user: mahirId._id,
          rsvp: true
        }, 
        {
          event: angelosLeetCodeId._id,
          user: angeloId._id,
          rsvp: true
        }, 
        {
          event: angelosLeetCodeId._id,
          user: daveId._id,
          rsvp: true
        }, 
        {
          event: angelosLeetCodeId._id,
          user: mahirId._id,
          rsvp: true
        }, 
        {
          event: angelosLeetCodeId._id,
          user: emilitId._id,
          rsvp: true
        }, 
        {
          event: emilysGroupTherapyEventtId._id,
          user: emilitId._id,
          rsvp: true
        }, 
        {
          event: emilysGroupTherapyEventtId._id,
          user: daveId._id,
          rsvp: true
        }, 
        {
          event: emilysGroupTherapyEventtId._id,
          user: mahirId._id,
          rsvp: true
        }, 
        {
          event: emilysGroupTherapyEventtId._id,
          user: angeloId._id,
          rsvp: true
        }, 
      ]);
    },
  
    async down(db, client) {
      await db.collection('userEvents').drop();
    }
  };
  