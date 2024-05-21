const mongoose = require('mongoose');
const mongoURI = "mongodb+srv://ABDSHIVA:AS325469817@cluster0.8t1ag.mongodb.net/goFood?retryWrites=true&w=majority&appName=Cluster0";

async function connectToMongoDB() {
  try {
    await mongoose.connect(mongoURI);
    console.log('Connected to MongoDB');

    const db = mongoose.connection.db;
    const collection = db.collection('food_items');

    const fetchedData = await collection.find({}).toArray();
    const foodCategory = await db.collection('food_Category').find({}).toArray();

    global.food_items = fetchedData;
    global.foodCategory = foodCategory;

    console.log('Fetched Data from food_items:', fetchedData);
    console.log('Fetched Data from food_Category:', foodCategory);

  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

module.exports = connectToMongoDB;
