// Example model

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var CategorySchema = new Schema({
  title: {type:String,required:true},
  createOn: {type:Date}
});

// PostSchema.virtual('date')
//   .get(function(){
//     return this._id.getTimestamp();
//   });

mongoose.model('Categorys', CategorySchema);