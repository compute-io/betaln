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
	betaln = require( './../lib/typedarray.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'typed-array betaln', function tests() {

	it( 'should export a function', function test() {
		expect( betaln ).to.be.a( 'function' );
	});


	it( 'should evaluate the function when x and y are typed arrays', function test() {
		var data, actual, expected, y, i;

		data = new Float64Array([
			1,
			2,
			3,
			4
		]);
		y = new Float64Array([
			1,
			2,
			3,
			4
		]);
		actual = new Float64Array( data.length );

		actual = betaln( actual, data, y );

		expected = new Float64Array([
			0,
			-1.79175946922805,
			-3.40119738166216,
			-4.9416424226093
		]);
		for ( i = 0; i < actual.length; i++ ) {
			assert.closeTo( actual[ i ], expected[ i ], 1e-14 );
		}

	});

	it( 'should throw an error if provided two typed arrays of differing lengths', function test() {
		expect( foo ).to.throw( Error );
		function foo() {
			betaln( new Array(2), new Int8Array( [1,2] ), new Int8Array( [1,2,3] ) );
		}

		expect( foo2 ).to.throw( Error );
		function foo2() {
			betaln( new Array(2), new Int8Array( [1,2] ), [ 1, 2, 3 ] );
		}
	});

	it( 'should handle non-numeric y values by setting the respective element to NaN', function test() {
		var data, actual, expected, y;

		data = new Float64Array([
			1,
			2,
			3,
			4
		]);
		actual = new Array( data.length );
		actual = betaln( actual, data, null );

		expected = [ NaN, NaN, NaN, NaN ];

		assert.deepEqual( actual, expected );

		actual = new Array( data.length );
		y = [ 1, 2, 3, null ];
		actual = betaln( actual, data, y );

		expected = [ 0, -1.79175946922805, -3.40119738166216, NaN ];

		assert.isTrue( deepCloseTo( actual, expected, 1e-7 ) );

	});

	it( 'should return an empty array if provided an empty array', function test() {
		assert.deepEqual( betaln( new Int8Array(), new Int8Array() ), new Int8Array() );
	});


	it( 'should throw an error if provided a matrix as y argument', function test() {
		expect( foo ).to.throw( Error );
		function foo() {
			betaln( [], [1,2,3,4], matrix( new Int32Array( [1,2,3,4] ), [2,2] ) );
		}
	});

});
