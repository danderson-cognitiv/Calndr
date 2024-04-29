module.exports = {
    async up(db, client) {
  
      await db.createCollection('events');
  
      await db.collection('events').deleteMany({});
  
      const dandyAndy77Id = await db.collection('users').findOne({ username: "DandyAndy77" });
      const fladenbrot420Id = await db.collection('users').findOne({ username: "Fladenbrot420" });
      const emilitId = await db.collection('users').findOne({ username: "Emilit" });
      const angeloalfonsoId = await db.collection('users').findOne({ username: "AngeloAlfonso" });
      const wesleywongId = await db.collection('users').findOne({ username: "Wes1004" });
      const bensonwakabaId = await db.collection('users').findOne({ username: "Benson143" });
  
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
          startTime: new Date("2024-09-09T19:00:00"),
          endTime: new Date("2024-09-10T00:00:00"),
          location: "159th 21st St, Seattle, WA 98122",
          description: "Ya girl finally got her own place. Come check out my roof and celebrate with me!"
        },
        {
          createdBy: emilitId._id,
          name: "Emily's Birthday!",
          startTime: new Date("2024-11-29T19:00:00"),
          endTime: new Date("2024-11-30T00:00:00"),
          location: "159th 21st St, Seattle, WA 98122",
          description: "It's Emilit! Come celebrate my birthday with me at my new place!"
        },
        {
          createdBy: emilitId._id,
          name: "I got the internship!",
          startTime: new Date("2024-11-29T19:00:00"),
          endTime: new Date("2024-11-30T00:00:00"),
          location: "Meet Korean BBQ",
          description: "Celebrating a job lined up finally!"
        },
        {
          createdBy: wesleywongId._id,
          name: "Pre-graduation Party!",
          startTime: new Date("2024-06-04T19:00:00"),
          endTime: new Date("2024-06-05T00:00:00"),
          location: "Chieftan's",
          description: "Grabbing drinks with the classmates before the ceremony"
        },
        {
          createdBy: wesleywongId._id,
          name: "Mox",
          startTime: new Date("2024-07-04T19:00:00"),
          endTime: new Date("2024-07-05T00:00:00"),
          location: "Mox Boarding House",
          description: "Reunion with the classmates over table top games!"
        },
        {
          createdBy: bensonwakabaId._id,
          name: "Benson's Birthday Party!",
          startTime: new Date("2024-08-07T19:00:00"),
          endTime: new Date("2024-07-08T00:00:00"),
          location: "Umi Sake House",
          description: "Celebrate my 23rd Birthday with me at Umi! I reserved the private room!"
        },
        {
          createdBy: bensonwakabaId._id,
          name: "I heard back from Amazon! Lets Celebrate",
          startTime: new Date("2024-05-02T19:00:00"),
          endTime: new Date("2024-05-03T00:00:00"),
          location: "Hillside Bar",
          description: "I finally heard back from Amazon. Lets celebrate!!"
        },
      ]);
    },
  
    async down(db, client) {
      await db.collection('events').drop();
    }
  };
  