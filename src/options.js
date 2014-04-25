'use strict';

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

exports.parseQuery = function parseQuery(req) {
	return req.query;
};

exports.parseData = function parseData(req) {
	return req.body;
};

exports.idParam = 'id';


exports.middleware = {};
