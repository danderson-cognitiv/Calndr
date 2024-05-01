module.exports = {
    async up(db, client) {
      await db.createCollection('messages');
  
      await db.collection('messages').deleteMany({});
  
      const daveUser = await db.collection('users').findOne({ username: "DandyAndy77" });
      const mahirUser = await db.collection('users').findOne({ username: "Fladenbrot420" });
      
      const mahirGraduationEvent = await db.collection('events').findOne({ name: "Mahir's Graduation party" });
      const daveUserEvent = await db.collection('userEvents').findOne({ event: mahirGraduationEvent._id, user: daveUser._id });
      const mahirUserEvent = await db.collection('userEvents').findOne({ event: mahirGraduationEvent._id, user: mahirUser._id });

      await db.collection('messages').insertMany([
        {
          userEvent: daveUserEvent._id,
          content: 'Hey Mahir Im excited to celebrate with you',
          sentAt: Date.now()
        },
        {
          userEvent: mahirUserEvent._id,
          content: 'Yeah dude im super stoked',
          sentAt: new Date(Date.now() + 1 * 60000)
        },
        {
          userEvent: daveUserEvent._id,
          content: 'Is it cool if I bring my dog?',
          sentAt: new Date(Date.now() + 2 * 60000)
        },
        {
          userEvent: mahirUserEvent._id,
          content: 'nahhh idk if luna would be cool with kiki',
          sentAt: new Date(Date.now() + 3 * 60000)
        },
        {
          userEvent: daveUserEvent._id,
          content: 'word, cya then!',
          sentAt: new Date(Date.now() + 4 * 60000)
        }

      ]);
    },
  
    async down(db, client) {
      await db.collection('messages').drop();
    }
  };
  