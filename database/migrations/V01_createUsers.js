module.exports = {
  async up(db, client) {
    await db.createCollection('users');

    await db.collection('users').deleteMany({});

    var result = await db.collection('users').insertMany([
      {
        username: "DandyAndy77",
        email: "david.j.anderson94@gmail.com",
        password: "password",
        fName: "Dave",
        lName: "Anderson",
        eventsVisible: true
      },
      {
        username: "Fladenbrot420",
        email: "mahir_email@gmail.com",
        password: "password",
        fName: "Mahir",
        lName: "Bathija",
        eventsVisible: false
      },
      {
        username: "Emilit",
        email: "emilysoolee@gmail.com",
        password: "password",
        fName: "Emily",
        lName: "Lee",
        eventsVisible: true
      }
    ]);

    var userId1 = result.insertedIds[0];
    var userId2 = result.insertedIds[1];

    await db.collection('users').updateOne(
      { _id: userId1 },
      { $set: { friends: [userId2] } }
    );

    await db.collection('users').updateOne(
      { _id: userId2 },
      { $set: { friends: [userId1] } }
    );
  },

  async down(db, client) {
    await db.collection('users').drop();
  }
};
