module.exports = {
    async up(db, client) {
  
      await db.createCollection('events');
  
      await db.collection('events').deleteMany({});
  
      const dandyAndy77Id = await db.collection('users').findOne({ username: "DandyAndy77" });
      const fladenbrot420Id = await db.collection('users').findOne({ username: "Fladenbrot420" });
      const emilitId = await db.collection('users').findOne({ username: "Emilit" });
      const angeloalfonsoId = await db.collection('users').findOne({ username: "AngeloAlfonso" });
  
      await db.collection('events').insertMany([
        {
          createdBy: dandyAndy77Id._id,
          name: "Dave's Birthday Party!",
          startTime: new Date("2024-11-16T19:00:00"),
          endTime: new Date("2024-11-17T00:00:00"),
          location: "420 69th Ave, Seattle WA, 98119",
          description: "Hey guys, I'm turning 30 pretty soon come hang out with me as I celebrate!"
        },
        {
          createdBy: dandyAndy77Id._id,
          name: "Dune Movie Night",
          startTime: new Date("2024-05-07T19:00:00"),
          endTime: new Date("2024-05-07T21:00:00"),
          location: "Pacific Science Center",
          description: "Dune 2 finally came out. Lets go watch it!"
        },
        {
          createdBy: dandyAndy77Id._id,
          name: "Calndr Presentation",
          startTime: new Date("2024-05-16T18:00:00"),
          endTime: new Date("2024-05-16T20:00:00"),
          location: "Bannan 429",
          description: "We got this!"
        },
        {
          createdBy: fladenbrot420Id._id,
          name: "Mahir's Graduation party",
          startTime: new Date("2024-06-09T19:00:00"),
          endTime: new Date("2024-06-10T00:00:00"),
          location: "123 12th Ave, Seattle WA, 98119",
          description: "I'm finally graduating guys!!! Come get lit with me, BYOB"
        },
        {
          createdBy: fladenbrot420Id._id,
          name: "Mahir's secret after party",
          startTime: new Date("2024-06-10T00:00:00"),
          endTime: new Date("2024-06-10T04:00:00"),
          location: "123 12th Ave, Seattle WA, 98119",
          description: "Super secret party! dont tell dave!"
        },
        {
          createdBy: emilitId._id,
          name: "Emily's Housewarming Party!",
          startTime: new Date("2024-06-09T15:00:00"),
          endTime: new Date("2024-06-19T21:00:00"),
          location: "159th 21st St, Seattle, WA 98122",
          description: "Ya girl finally got her own place. Come check out my roof and celebrate with me!"
        },
        {
          createdBy: emilitId._id,
          name: "Emily's Birthday Party!",
          startTime: new Date("2024-05-13T19:00:00"),
          endTime: new Date("2024-05-14T00:00:00"),
          location: "159th 21st St, Seattle, WA 98122",
          description: "It's Emilit! Come celebrate my birthday with me at my new place!"
        },
        {
          createdBy: emilitId._id,
          name: "I got the internship!",
          startTime: new Date("2024-05-07T14:00:00"),
          endTime: new Date("2024-05-07T18:00:00"),
          location: "Meet Korean BBQ",
          description: "Celebrating a job lined up finally!"
        },
        {
          createdBy: emilitId._id,
          name: "Group Therapy Weekender at the Gorge!",
          startTime: new Date("2024-05-24T19:00:00"),
          endTime: new Date("2024-05-26T19:00:00"),
          location: "The Gorge Amphitheater",
          description: "Who's ready for another weekend of Above and Beyond?!"
        },
        {
          createdBy: angeloalfonsoId._id,
          name: "LeetCode Sessions",
          startTime: new Date("2024-05-28T12:00:00"),
          endTime: new Date("2024-05-28T18:00:00"),
          location: "SU Campus, LEML 240",
          description: "Lets prep for coding interviews!"
        },
        {
          createdBy: angeloalfonsoId._id,
          name: "Mox",
          startTime: new Date("2024-05-04T19:00:00"),
          endTime: new Date("2024-005-05T00:00:00"),
          location: "Mox Boarding House",
          description: "Reunion with the classmates over table top games!"
        },
      ]);
    },
  
    async down(db, client) {
      await db.collection('events').drop();
    }
  };
  