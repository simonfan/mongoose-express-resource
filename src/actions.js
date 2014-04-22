'use strict';

var _ = require('lodash');

/**
 *
 *
 *
 *
 */
exports.index = function index(req, res, next) {

	req.Model.find(function (err, entities) {
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

		// get the id
	var idParam = req.options.idParam,
		id = req.params[idParam];

	var model = req.Model.findById(id, function (err, model) {
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
