var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Post = mongoose.model('Post');

module.exports = function (app) {
  app.use('/', router);
};

router.get('/post', function (req, res, next) {
  Post.find({published:true}).populate("author").populate("category").sort("createOn").exec(function (err, posts) {

    if (err) return next(err);
    res.render('blog/index', {
      title: 'my blog@zpro.com',
      posts: posts.slice(1,3)
    });
  });
});
router.get('/post/:cid', function (req, res, next) {
  Post.find({published:true,category:req.params.cid}).populate("author").populate("category").sort("createOn").exec(function (err, posts) {

//var con=mongoose.Types.ObjectId(req.params.cid)

    if (err) return next(err);
    res.render('blog/index', {
      title: 'my blog',
      posts: posts.slice(0,3)
    });
  });
});



router.get('/view/:id', function (req, res, next) {
  Post.findOne({_id:req.params.id}).populate("author").populate("category").exec(function (err, post) {

//req.flash('info','hhhah')
    if (err) return next(err);
    res.render('blog/view', {
      title: post.title,
      post: post
    });
  });
});
router.get('/comment/:id', function (req, res, next) {
  Post.findOne({_id:req.params.id}).populate("author").populate("category").exec(function (err, post) {
//post.comments.push({})//unshift
// post.markModified('comments')
// post.save(function (err,post) {
//   // body...
// })

    if (err) return next(err);
    res.render('blog/view', {
      title: 'my blog',
      post: post
    });
  });
});


router.get('/about', function (req, res, next) {
  Post.find().populate("author").populate("category").exec(function (err, posts) {

    if (err) return next(err);
    res.render('blog/index', {
      title: 'my blog',
      posts: posts
    });
  });
});
router.get('/contact', function (req, res, next) {
  Post.find().populate("author").populate("category").exec(function (err, posts) {

    if (err) return next(err);
    res.render('blog/index', {
      title: 'my blog',
      posts: posts
    });
  });
});

