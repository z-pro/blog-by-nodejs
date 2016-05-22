// Example model

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var PostSchema = new Schema({
  title: {type:String,required:true},
  content: {type:String,required:true},
  category: {type:Schema.Types.ObjectId,ref:'Categorys'},
  author: {type:Schema.Types.ObjectId,ref:'User'},
  published: {type:Boolean,default:false},
  createOn: {type:Date},
  comments: Schema.Types.Mixed
});

// PostSchema.virtual('date')
//   .get(function(){
//     return this._id.getTimestamp();
//   });

mongoose.model('Post', PostSchema);

