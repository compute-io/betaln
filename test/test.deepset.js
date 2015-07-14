/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Deep close to:
	deepCloseTo = require( './utils/deepcloseto.js' ),

	// Module to be tested:
	betaln = require( './../lib/deepset.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'deepset betaln', function tests() {

	it( 'should export a function', function test() {
		expect( betaln ).to.be.a( 'function' );
	});

	it( 'should evaluate the betaln function when y is a scalar and deep set', function test() {
		var data, actual, expected;

		data = [
			{'x':1e-100},
			{'x':1e-50},
			{'x':1e-20},
			{'x':1e-5}
		];

		actual = betaln( data, 0.2, 'x' );

		expected = [
			{'x':230.258509299405},
			{'x':115.129254649702},
			{'x':46.0517018598809},
			{'x':11.5129725819815}
		];

		assert.strictEqual( data, actual );
		assert.isTrue( deepCloseTo( data, expected, 1e-7 ) );

		// Custom separator...
		data = [
			{'x':[9,1e-100]},
			{'x':[9,1e-50]},
			{'x':[9,1e-20]},
			{'x':[9,1e-5]}
		];

		data = betaln( data, 0.2, 'x/1', '/' );
		expected = [
			{'x':[9,230.258509299405]},
			{'x':[9,115.129254649702]},
			{'x':[9,46.0517018598809]},
			{'x':[9,11.5129725819815]}
		];

		assert.isTrue( deepCloseTo( data, expected, 1e-7 ), 'cutom separator' );
	});

	it( 'should evaluate the betaln function when y is an array and deep set', function test() {
		var data, actual, expected, y;

		data = [
			{'x':1},
			{'x':2},
			{'x':3},
			{'x':4}
		];

		y = [ 1, 2, 3, 4 ];

		actual = betaln( data, y, 'x' );

		expected = [
			{'x':0},
			{'x':-1.79175946922805},
			{'x':-3.40119738166216},
			{'x':-4.9416424226093}
		];

		assert.strictEqual( data, actual );
		assert.isTrue( deepCloseTo( data, expected, 1e-7 ) );

		// Custom separator...
		data = [
			{'x':[9,1]},
			{'x':[9,2]},
			{'x':[9,3]},
			{'x':[9,4]}
		];

		data = betaln( data, y, 'x/1', '/' );
		expected = [
			{'x':[9,0]},
			{'x':[9,-1.79175946922805]},
			{'x':[9,-3.40119738166216]},
			{'x':[9,-4.9416424226093]}
		];

		assert.isTrue( deepCloseTo( data, expected, 1e-7 ) );

	});

	it( 'should return an empty array if provided an empty array', function test() {
		var arr = [];
		assert.deepEqual( betaln( arr, 1, 'x' ), [] );
		assert.deepEqual( betaln( arr, 1, 'x', '/' ), [] );
	});

	it( 'should handle non-numeric values by setting the element to NaN', function test() {
		var data, actual, expected, y;

		// raising to a non-numeric value
		data = [
			{'x':[9,null]},
			{'x':[9,1]},
			{'x':[9,true]},
			{'x':[9,3]}
		];
		actual = betaln( data, null, 'x.1' );
		expected = [
			{'x':[9,NaN]},
			{'x':[9,NaN]},
			{'x':[9,NaN]},
			{'x':[9,NaN]}
		];
		assert.isTrue( deepCloseTo( data, expected, 1e-7 ) );

		// raising to a scalar
		data = [
			{'x':[9,null]},
			{'x':[9,1]},
			{'x':[9,true]},
			{'x':[9,3]}
		];
		actual = betaln( data, 1, 'x.1' );
		expected = [
			{'x':[9,NaN]},
			{'x':[9,0]},
			{'x':[9,NaN]},
			{'x':[9,-1.09861228866811]}
		];
		assert.isTrue( deepCloseTo( data, expected, 1e-7 ) );

		data = [
			{'x':[9,null]},
			{'x':[9,1]},
			{'x':[9,true]},
			{'x':[9,3]}
		];
		y = [ 0, 1, 2, 3];
		actual = betaln( data, y, 'x.1' );
		expected = [
			{'x':[9,NaN]},
			{'x':[9,0]},
			{'x':[9,NaN]},
			{'x':[9,-3.40119738166216]}
		];
		assert.isTrue( deepCloseTo( data, expected, 1e-7 ) );

		data = [
			{'x':[9,null]},
			{'x':[9,1]},
			{'x':[9,true]},
			{'x':[9,3]}
		];
		y = new Int32Array( [0,1,2,3] );
		actual = betaln( data, y, 'x.1' );
		expected = [
			{'x':[9,NaN]},
			{'x':[9,0]},
			{'x':[9,NaN]},
			{'x':[9,-3.4011973816621]}
		];
		assert.isTrue( deepCloseTo( data, expected, 1e-7 ) );
	});


});
