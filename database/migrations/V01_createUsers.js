module.exports = {
  async up(db, client) {
    await db.createCollection('users');

    await db.collection('users').deleteMany({});

    var result = await db.collection('users').insertMany([
      {
        _id: "100863077704936259112",
        username: "DandyAndy77",
        email: "david.j.anderson94@gmail.com",
        fName: "Dave",
        lName: "Anderson",
        eventsVisible: true,
      },
      {
        _id: "104944650666529248096",
        username: "Fladenbrot420",
        email: "mahirbahtija@gmail.com",
        fName: "Mahir",
        lName: "Bathija",
        eventsVisible: false
      },
      {
        _id: "108903236547046208087",
        username: "Emilit",
        email: "emilysoolee@gmail.com",
        fName: "Emily",
        lName: "Lee",
        eventsVisible: true
      },
      {
        _id: "116963747852830421789",
        username: "AngeloAlfonso",
        email: "angeloalfonso@gmail.com",
        fName: "Angelo",
        lName: "Alfonso",
        eventsVisible: false
      },
      {
        _id: "126",
        username: "Wes1004",
        email: "wesley_wong@gmail.com",
        fName: "Wesley",
        lName: "Wong",
        eventsVisible: true
      },
      {
        _id: "127",

        username: "Benson143",
        email: "bensonwakaba@gmail.com",
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
