const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let connection;

const connect = async () => {
  try {
    const connection = await mongoose.connect("mongodb://127.0.0.1:27017", {
      useNewUrlParser: false,
    });

    mongoose.connection.on("error", (error) => {
      console.log("MongoDB Connection Error", error);
    });

    //////////
    // Define Schema
    // const personSchema = new mongoose.Schema({
    //   name: String,
    //   age: Number,
    //   email: String,
    //   location: String,
    //   isHappy: Boolean,
    // });

    // const Person = mongoose.model("Person", personSchema);

    // const gonzalo = new Person({
    //   name: "Gonzalo",
    //   age: 30,
    //   email: "a@b.c",
    //   location: "Madrid",
    //   isHappy: true,
    // });

    // gonzalo.save();

    // const result = await Person.findOneAndUpdate(
    //   { name: "Gonzalo" },
    //   { name: "Gonnie" }
    // );

    // console.log("Result", result);

    // const deleteResult = await Person.deleteMany({ name: "Gonnie" });

    // console.log("Delete Result", deleteResult);
  } catch (error) {
    console.log("Are you sure MongoDB is running", error);
  }
};

connect();

module.exports = connection;
