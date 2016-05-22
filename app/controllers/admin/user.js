var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  User = mongoose.model('User');

module.exports = function(app) {
  app.use('/admin', router);
};

router.get('/user', function(req, res, next) {
  User.find().sort("createOn").exec(function(err, users) {

    if (err) return next(err);
    res.render('admin/user/index', {
      title: 'my blog@zpro.com',
      users: users
    });
  });
});

router.get('/login', function(req, res, next) {

  if (req.session.user_id) {
    res.redirect("/admin/post")
    return;
  }

  User.find().sort("createOn").exec(function(err, users) {

    if (err) return next(err);
    res.render('admin/login', {
      title: 'my blog@zpro.com',
      users: users
    });
  });
});
router.get('/loginout', function(req, res, next) {

  if (req.session.user_id) {

    req.session.user_id = null;



  }

  res.redirect("/admin/login")
});


router.post('/login', function(req, res, next) {
  var uName = req.param("uname")

  var pwd = req.param("pwd")


  User.find({
    name: uName,
    password: pwd
  }).exec(function(err, users) {

    if (err) return next(err);
    if (users.length > 0) {
      req.session.user_id = users[0]._id;
      res.redirect("/admin/post")
    } else {

      res.redirect("/admin/login")
    }
  });
});


router.post('/user/oper/:oper', function(req, res, next) {
  var uName = req.param("txtName")
  var email = req.param('txtEmail')
  var pwd = req.param("txtPwd")
  if (req.params.oper == "0") { //新增

    var user = new User({
      name: uName,
      password: pwd,
      email: email,
      createOn: new Date()
    })

    user.save(function(err, insertedRow) {


      err && next(err)

      res.redirect('/admin/user')
    })

  } else {



  }


});


router.get('/user/delete/:id', function(req, res, next) {
  User.remove({
    _id: mongoose.Types.ObjectId(req.params.id)
  }).exec(function(err, delRow) {

    err && next(err)


    res.redirect('/admin/user')

  })
});