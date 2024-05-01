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
        eventsVisible: true,
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
      },
      {
        username: "AngeloAlfonso",
        email: "angeloalfonso@gmail.com",
        password: "password",
        fName: "Angelo",
        lName: "Alfonso",
        eventsVisible: false
      },
      {
        username: "Wes1004",
        email: "wesley_wong@gmail.com",
        password: "password",
        fName: "Wesley",
        lName: "Wong",
        eventsVisible: true
      },
      {
        username: "Benson143",
        email: "bensonwakaba@gmail.com",
        password: "password",
        fName: "Benson",
        lName: "Wakaba",
        eventsVisible: false
      },
    ]);

    var userId1 = result.insertedIds[0];
    var userId2 = result.insertedIds[1];
    var userId3 = result.insertedIds[2];
    var userId4 = result.insertedIds[3];
    var userId5 = result.insertedIds[4];
    var userId6 = result.insertedIds[5];

    await db.collection('users').updateOne(
      { _id: userId1 },
      { $set: { friends: [userId2, userId3, userId4] } }
    );

    await db.collection('users').updateOne(
      { _id: userId2 },
      { $set: { friends: [userId1, userId3, userId4] } }
    );
    await db.collection('users').updateOne(
      { _id: userId3 },
      { $set: { friends: [userId1, userId2, userId4] } }
    );
    await db.collection('users').updateOne(
      { _id: userId4 },
      { $set: { friends: [userId1, userId2, userId3, userId4] } }
    );
    await db.collection('users').updateOne(
      { _id: userId5 },
      { $set: { friends: [userId1, userId2, userId3, userId6] } }
    );
    await db.collection('users').updateOne(
      { _id: userId6 },
      { $set: { friends: [userId1, userId6] } }
    );
  },

  async down(db, client) {
    await db.collection('users').drop();
  }
};
