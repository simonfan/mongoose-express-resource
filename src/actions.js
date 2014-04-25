'use strict';

var _ = require('lodash');

/**
Person
.find({ occupation: /host/ })
.where('name.last').equals('Ghost')
.where('age').gt(17).lt(66)
.where('likes').in(['vaporizing', 'talking'])
.limit(10)
.sort('-occupation')
.select('name occupation')
.exec(callback);
*/
exports.index = function index(req, res, next) {

	var options = req.options;

	// get the query object
	var query = options.parseQuery(req);

	// get criteria
	var criteria = query.criteria,
		limit = query.limit || options.limit,
		sort = query.sort || options.sort,
		select = query.select || options.select;


	var q = req.Model
		.find(criteria);

	if (limit) {
		q.limit(limit);
	}

	if (sort) {
		q.sort(sort);
	}

	if (select) {
		q.select(select);
	}

	// exec
	q.exec(function (err, entities) {
		if (err) next(err);

		res.json(entities);
	});
};


/**
 *
 *
 *
 *
 */
exports.create = function create(req, res, next) {

	// get model data
	var data = req.options.parseData(req);

	var model = new req.Model();

	// set values
	_.assign(model, data);

	// save the model and check for errors
	model.save(function (err) {
		if (err) next(err);

		res.json({
			message: 'success'
		});
	});

};

/**
 *
 *
 *
 *
 */
exports.read = function read(req, res, next) {

	var options = req.options,
		// get the id
		id = req.params[options.idParam],
		// get the query
		query = options.parseQuery(req),
		// get whatever is to be selected.
		select = query.select || options.select;


	var q = req.Model.findById(id);

	if (select) {
		q.select(select);
	}

	q.exec(function (err, model) {
		if (err) next(err);

		res.json(model);
	});
};

/**
 *
 *
 *
 *
 */
exports.update = function update(req, res, next) {

		// get the id
	var idParam = req.options.idParam,
		id = req.params[idParam],
		// get the data to be set on model
		data = req.options.parseData(req);


	// use our model model to find the model we want
	req.Model.findById(id, function (err, model) {

		if (err) next(err);

		// update the models info
		_.assign(model, data);

		// save the model
		model.save(function (err) {
			if (err) 	next(err);

			res.json({ message: 'Model updated!' });
		});

	});
};

/**
 *
 *
 *
 *
 */
exports.destroy = function destroy(req, res, next) {

		// get id
	var idParam = req.options.idParam,
		id = req.params[idParam];

	req.Model.remove({
		_id: id
	}, function (err, model) {
		if (err) next(err);

		res.json({ message: 'Successfully deleted' });
	});
};
