/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Deep close to:
	deepCloseTo = require( './utils/deepcloseto.js' ),

	// Matrix data structure:
	matrix = require( 'dstructs-matrix' ),

	// Module to be tested:
	betaln = require( './../lib/accessor.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'accessor betaln', function tests() {

	it( 'should export a function', function test() {
		expect( betaln ).to.be.a( 'function' );
	});

	it( 'should evaluate the betaln function using an accessor when y is a scalar', function test() {
		var data, actual, expected;

		data = [
			{'x':1},
			{'x':2},
			{'x':3},
			{'x':300}
		];
		actual = new Array( data.length );
		actual = betaln( actual, data, 2, getValue );

		expected = [
			-0.693147180559945,
			-1.79175946922805,
			-2.484906649788,
			-11.4108927394051
		];

		assert.isTrue( deepCloseTo( actual, expected, 1e-12 ) );

		function getValue( d ) {
			return d.x;
		}

	});

	it( 'should evaluate the betaln function using an accessor when y is an array', function test() {
		var data, actual, expected, y;

		data = [
			{'x':10},
			{'x':20},
			{'x':30},
			{'x':40}
		];

		y = [
			10,
			20,
			30,
			40
		];

		actual = new Array( data.length );
		actual = betaln( actual, data, y, getValue );

		expected = [
			-13.7362292270366,
			-27.9519918862445,
			-42.0197509271135,
			-56.0275771297329
		];

		assert.isTrue( deepCloseTo( actual, expected, 1e-7 ) );

		function getValue( d, i ) {
			return d.x;
		}

	});

	it( 'should evaluate the betaln function for two object arrays using an accessor', function test() {
		var data, actual, expected, y;

		data = [
			{'x':100},
			{'x':200},
			{'x':300},
			{'x':400}
		];

		y = [
			{'y':400},
			{'y':300},
			{'y':200},
			{'y':100}
		];

		actual = new Array( data.length );
		actual = betaln( actual, data, y, getValue );

		expected = [
			-251.472411556025,
			-337.980113065465,
			-337.980113065465,
			-251.472411556025
		];

		assert.isTrue( deepCloseTo( actual, expected, 1e-7 ) );

		function getValue( d, i, j ) {
			if ( j === 0 ) {
				return d.x;
			} else {
				return d.y;
			}
		}

	});

	it( 'should return empty array if provided an empty array', function test() {
		assert.deepEqual( betaln( [], [], 1, getValue ), [] );
		function getValue( d ) {
			return d.x;
		}
	});

	it( 'should handle non-numeric values by setting the element to NaN', function test() {
		var data, actual, expected, y;

		// numeric value
		data = [
			{'x':1},
			{'x':null},
			{'x':3}
		];
		actual = new Array( data.length );
		actual = betaln( actual, data, 1, getValue );

		expected = [ 0, NaN, -1.09861228866811 ];
		assert.isTrue( deepCloseTo( actual, expected, 1e-7 ) );

		// single non-numeric value
		y = false;
		actual = new Array( data.length );
		actual = betaln( actual, data, y, getValue );
		expected = [ NaN, NaN, NaN ];

		assert.isTrue( deepCloseTo( actual, expected, 1e-7 ) );

		// numeric array
		y = [ 1, 2, 3 ];
		actual = new Array( data.length );
		actual = betaln( actual, data, y, getValue );
		expected = [ 0, NaN, -3.40119738166216 ];

		assert.isTrue( deepCloseTo( actual, expected, 1e-7 ) );

		function getValue( d, i ) {
			return d.x;
		}

		// typed array
		y = new Int32Array( [1,2,3] );
		actual = new Array( data.length );
		actual = betaln( actual, data, y, getValue );
		expected = [ 0, NaN, -3.40119738166216 ];

		assert.isTrue( deepCloseTo( actual, expected, 1e-7 ) );

		// object array
		y = [
			{'y':1},
			{'y':2},
			{'y':3}
		];
		actual = new Array( data.length );
		actual = betaln( actual, data, y, getValue2 );
		expected = [ 0, NaN, -3.40119738166216 ];

		assert.isTrue( deepCloseTo( actual, expected, 1e-7 ) );

		function getValue2( d, i, j ) {
			if ( j === 0 ) {
				return d.x;
			} else {
				return d.y;
			}
		}

	});

	it( 'should throw an error if provided a y array which is not of equal length to the x array', function test() {
		expect( foo ).to.throw( Error );
		function foo() {
			betaln( [], [1,2], [1,2,3], getValue );
		}
		function getValue( d ) {
			return d;
		}
	});

	it( 'should throw an error if provided a typed array as y which is not of equal length to the x array', function test() {
		expect( foo ).to.throw( Error );
		function foo() {
			betaln( [], [1,2], new Int32Array( [1,2,3] ), getValue );
		}
		function getValue( d ) {
			return d;
		}
	});

	it( 'should throw an error if provided a matrix as y argument', function test() {
		expect( foo ).to.throw( Error );
		function foo() {
			betaln( [], [1,2,3,4], matrix( new Int32Array( [1,2,3,4] ), [2,2] ), getValue );
		}
		function getValue( d ) {
			return d;
		}
	});

});
