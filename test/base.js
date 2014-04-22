'use strict';

var should = require('should');

var MongooseExpressResource = require('.././src');

describe('MongooseExpressResource base', function () {
	beforeEach(function (done) {
		done();
	});

	it('is fine (:', function () {
		var fruit = { name: 'banana' }
		fruit.should.have.property('name', 'banana');
	});
});
