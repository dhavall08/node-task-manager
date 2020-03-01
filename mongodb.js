const { MongoClient, ObjectID } = require('mongodb'); // mongodb driver api

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

MongoClient.connect(connectionURL, { useUnifiedTopology: true }, (error, client) => {
  if (error) {
    return console.log('Unable to conenct to database!');
  }
  console.log('Conencted correctly!');
  const db = client.db(databaseName);

  // insert one document in collection

  /* db.collection('users').insertOne({
    name: 'Dhaval',
    age: 22,
  }, (error, result) => {
    if (error) {
      return console.log('Unable to insert user.');
    }
    console.log(result, 'ops:', result.ops);
  }); */


  // insert more documents in collection

  /* db.collection('tasks').insertMany([{
    description: 'Purchase one mouse from amazon.',
    completed: true,
  }, {
    description: 'Book a bus for next journey.',
    completed: false,
  }, {
    description: 'Look for the security measures of site.',
    completed: false,
  }
  ], (error, result) => {
    if (error) {
      return console.log('Unable to insert user.');
    }
    console.log('Result:', result.ops);
  }); */

  db.collection('tasks').findOne({ _id: new ObjectID("5e08e04afcdd4f1f189913d2") }, (error, user) => {
    if (error) {
      console.log('Error occurred while finding task.');
    }
    console.log(user);
  });

  db.collection('tasks').find({ completed: false }).toArray((error, tasks) => {
    if (error) {
      console.log('Error occurred while finding tasks.');
    }
    console.log(tasks);
  });
})