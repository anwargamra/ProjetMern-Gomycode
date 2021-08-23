const mongoose = require("mongoose");

const dbconnect = async()=> { 
  try
   { await mongoose.connect('mongodb://localhost:27017/',    {
      useNewUrlParser: true, // allow users to fall back to the old parser if they find a bug in the new parser
      useUnifiedTopology: true,   //to opt in to using the MongoDB driver's new connection management engine
      useCreateIndex: true,  // make Mongoose's default index build use createIndex()
      useFindAndModify: false,
    } ) 
    console.log("Connected to MongoDB")}
   catch(err) { console.log("Failed to connect to MongoDB", err);
}
}
module.exports = dbconnect
