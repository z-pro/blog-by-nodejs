// Example model

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var UserSchema = new Schema({
  name: {type:String,required:true},
  email: {type:String,required:true},
  password: {type:String},
  createOn: {type:Date}
});

// PostSchema.virtual('date')
//   .get(function(){
//     return this._id.getTimestamp();
//   });

mongoose.model('User', UserSchema);