'use strict';

exports.parseQuery = function parseQuery(req) {
	return req.query;
};

exports.parseData = function parseData(req) {
	return req.body;
};

exports.parseProjection = function projection(req) {
	return req.query.projection;
};

exports.skip = function skip(req) {

	return req.query.skip;
};

exports.limit = function limit(req) {

	return req.body.limit;
};

exports.idParam = 'id';

exports.middleware = {};
