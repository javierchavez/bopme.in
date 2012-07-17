var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

mongoose.connect('mongodb:localhost/bopmein');

var User = exports.User = mongoose.model("User", new Schema({
  name: String,
  location: String
}));

var Room = exports.Room = mongoose.model("Room", new Schema({
  name: String,
  users: [User],
  lat: Number,
  lon: Number
}));

mongoose.connection.on("open", function(){
  console.log("mongodb is connected!!");

});