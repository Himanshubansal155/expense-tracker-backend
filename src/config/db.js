const mongoose = require("mongoose");

exports.dbConnection = async () => {
  try {
    const uri = process.env.DATABASE;
    const connectionParams = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
    await mongoose.connect(uri, connectionParams);
    console.log("DB connected");
  } catch (error) {
    console.log("DB CONNECTION ERR", error);
  }
};
