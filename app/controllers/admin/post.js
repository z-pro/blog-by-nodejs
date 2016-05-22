var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Category = mongoose.model('Categorys'),
  Post = mongoose.model('Post');
  var filter = require('../../filters/filter');

module.exports = function(app) {
  app.use('/admin', router);
};

router.get('/post',filter.authorize, function(req, res, next) {
  Post.find().populate("author").populate("category").sort("createOn").exec(function(err, posts) {


    Category.find().exec(function(error, categorys) {
      if (err || error) return next(err);
      res.render('admin/post/index', {
        title: 'my blog@zpro.com',
        posts: posts,
        categorys: categorys
      });


    })


  });
});

router.post('/post/oper/:oper', function(req, res, next) {
  var title = req.param("txtTitle")
  var content = req.param('txtContent')
  var category = req.param("txtCategory")
  var isPublished = req.param('isPublished')=="on"
  var author = req.session.user_id;


  if (req.params.oper == "0") { //新增

    var post = new Post({
      title: title,
      content: content,
      author:author,
      category: category,
      published: isPublished,
      createOn: new Date()
    })

    post.save(function(err, insertedRow) {


      err && next(err)

      res.redirect('/admin/post')
    })

  } else {

  }


});


router.get('/post/delete/:id', function(req, res, next) {
  Post.remove({
    _id: mongoose.Types.ObjectId(req.params.id)
  }).exec(function(err, delRow) {

    err && next(err)


    res.redirect('/admin/post')

  })
});