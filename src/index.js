'use strict';

var express = require('express'),
	_ = require('lodash');


var defaultActions = require('./actions'),
	defaultOptions = require('./options');


/**
 *
 *
 *
 * @method resource
 * @param options {Object}
 *     @param Model   MongooseModel
 *     @param actions Object
 *         @param index   Function|Boolean
 *         @param create  Function|Boolean
 *         @param read    Function|Boolean
 *         @param update  Function|Boolean
 *         @param destroy Function|Boolean
 */
// returns a built router
module.exports = function resource(options) {

	options = options || {};
	_.defaults(options, defaultOptions);

	// [1] get default actions
	var actions = options.actions || {};
	_.defaults(actions, defaultActions);

	// [2] middleware
	var middleware = options.middleware;




	// [3] create router
	var router = express.Router(options);

	// [3.1] // make variables available through middleware
	router.use(function (req, res, next) {
		// Make Model available
		req.Model = options.Model;

		// make action options available
		req.options = options;

		next();
	});

	// [4] place routes
	// [4.1] on the base endpoint
	var endpoint = router.route('/');
	if (actions.index) {
		if (middleware.index) {
			endpoint.post(middleware.index);
		}
		endpoint.get(actions.index);
	}

	if (actions.create) {
		if (middleware.create) {
			endpoint.post(middleware.create);
		}
		endpoint.post(actions.create);
	}

	// [4.2] on the id endpoint
	var idEndpoint = router.route('/:' + options.idParam);

	if (actions.read) {
		if (middleware.read) {
			idEndpoint.get(middleware.read);
		}
		idEndpoint.get(actions.read);
	}

	if (actions.update) {
		if (middleware.update) {
			idEndpoint.put(middleware.update);
		}
		idEndpoint.put(actions.update);
	}

	if (actions.destroy) {
		if (middleware.destroy) {
			idEndpoint.delete(middleware.destroy);
		}
		idEndpoint.delete(actions.destroy);
	}

	// [5] return the router
	return router;
};
