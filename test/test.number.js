/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	beta = require( './../lib/number.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'number beta', function tests() {

	it( 'should export a function', function test() {
		expect( beta ).to.be.a( 'function' );
	});

	it( 'should evaluate the function', function test() {
		assert.closeTo( beta( 0, 0 ), 0, 1e-4 );
	});

});
