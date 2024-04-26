db = db.getSiblingDB('cal')
db.createCollection('users')
listsCollection = db.getCollection("users")
listsCollection.remove({})
listsCollection.insert(
{
	  name: "David Anderson"
})