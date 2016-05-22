var express = require('express'),
	router = express.Router(),
	mongoose = require('mongoose'),
	Category = mongoose.model('Categorys');

module.exports = function(app) {
	app.use('/admin', router);
};

router.get('/category', function(req, res, next) {
	Category.find().sort("createOn").exec(function(err, categorys) {

		if (err) return next(err);
		res.render('admin/category/index', {
			title: 'my blog',
			categorys: categorys
		});
	});
});
router.get('/category/delete/:id', function(req, res, next) {
	Category.remove({
		_id: mongoose.Types.ObjectId(req.params.id)
	}).exec(function(err, delRow) {

		err && next(err)


		res.redirect('/admin/category')

	})
});

router.post('/category/oper/:oper', function(req, res, next) {
	var title = req.param("txtTitle")

	if (req.params.oper == "0") { //新增

		var category = new Category({
			title: title,
			createOn: new Date()
		})

		category.save(function(err, insertedRow) {


			err && next(err)

			res.redirect('/admin/category')
		})

	} else {

		Category.findOneAndUpdate({
			_id: req.params.oper
		}, {
			title: title
		}, {},function(err, updatedRow) {

			err && next(err)

			res.redirect('/admin/category')

		})

	}


});