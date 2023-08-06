const { MongoClient } = require('mongodb');
require('dotenv').config();

const giphyData = [
  {
    url: "https://media0.giphy.com/media/TUWgpM7cRDfXy/giphy.gif?cid=eb39d85b9bd8f8cbea50589405d88c29b6f1586a1660324a&ep=v1_gifs_random&rid=giphy.gif&ct=g"
  },
  {
    url: "https://media0.giphy.com/media/XmFXNCKrHcPw4/giphy.gif?cid=eb39d85bb4917a4c8f4ae68bbe8626940a94a8465a569930&ep=v1_gifs_random&rid=giphy.gif&ct=g"
  },
];

async function seedGiphyCollection() {
  const uri = process.env.MONGODB_URI;
    const collectionName = 'Giphy';
    
  const client = new MongoClient(uri, { useUnifiedTopology: true });

  try {
    await client.connect();
    const db = client.db();
    const collection = db.collection(collectionName);

    // Insert the sample Giphy data into the collection
    const result = await collection.insertMany(giphyData);
    console.log(`Inserted ${result.insertedCount} documents into the "${collectionName}" collection.`);
  } catch (err) {
    console.error('Error seeding Giphy collection:', err);
  } finally {
    client.close();
  }
}

seedGiphyCollection();
