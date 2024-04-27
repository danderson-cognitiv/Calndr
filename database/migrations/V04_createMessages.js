module.exports = {
    async up(db, client) {
      await db.createCollection('messages');
  
      await db.collection('messages').deleteMany({});
  
      const daveUser = await db.collection('users').findOne({ username: "DandyAndy77" });
      const mahirUser = await db.collection('users').findOne({ username: "Fladenbrot420" });

      const daveUserEvent = await db.collection('userEvents').findOne({ user: daveUser._id });
      const mahirUserEvent = await db.collection('userEvents').findOne({ user: mahirUser._id });

      await db.collection('messages').insertMany([
        {
          userEvent: daveUserEvent._id,
          content: 'Hi',
          sentAt: Date.now()
        },
        {
          userEvent: mahirUserEvent._id,
          content: 'Hi',
          sentAt: Date.now()
        }
      ]);
    },
  
    async down(db, client) {
      await db.collection('userEvents').drop();
    }
  };
  