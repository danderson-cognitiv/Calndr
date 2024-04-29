module.exports = {
    async up(db, client) {
      await db.createCollection('photos');
  
      await db.collection('photos').deleteMany({});
  
      const daveUser = await db.collection('users').findOne({ username: "DandyAndy77" });
      const mahirUser = await db.collection('users').findOne({ username: "Fladenbrot420" });

      const mahirBirthdayEvent = await db.collection('events').findOne({ name: "Mahir's Graduation party" });
      const daveUserEvent = await db.collection('userEvents').findOne({ event: mahirBirthdayEvent._id, user: daveUser._id });
      const mahirUserEvent = await db.collection('userEvents').findOne({ event: mahirBirthdayEvent._id, user: mahirUser._id });

      const daveMessage = await db.collection('messages').findOne({ userEvent: daveUserEvent._id });
      const mahirMessage = await db.collection('messages').findOne({ userEvent: mahirUserEvent._id });

      await db.collection('photos').insertMany([
        {
          message: daveMessage._id,
          path: 's3://path',
        },
        {
          message: mahirMessage._id,
          path: 's3://path',
        },
      ]);
    },
  
    async down(db, client) {
      await db.collection('photos').drop();
    }
  };
  