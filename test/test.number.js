/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Validate a value is NaN:
	isnan = require( 'validate.io-nan' ),

	// Matrix data structure:
	matrix = require( 'dstructs-matrix' ),

	// Module to be tested:
	betaln = require( './../lib/number.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'number betaln', function tests() {

	it( 'should export a function', function test() {
		expect( betaln ).to.be.a( 'function' );
	});

	it( 'should evaluate the function', function test() {
		assert.strictEqual( betaln( 0, 0 ), Number.POSITIVE_INFINITY );
		assert.closeTo( betaln( 1e-200, 1e-200 ), 461.210165779369, 1e-10 );
		assert.closeTo( betaln( 10000, 10000 ), -13866.2832567614, 1e-10 );
	});

	it( 'should return NaN for negative values', function test() {
		isnan( betaln( -2, 5 ), NaN );
		isnan( betaln( 4, -3 ), NaN );
	});

});
