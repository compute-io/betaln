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
	betaln = require( './../lib/array.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'array betaln', function tests() {

	it( 'should export a function', function test() {
		expect( betaln ).to.be.a( 'function' );
	});

	it( 'should evaluate the function when y is a scalar', function test() {
			var data, actual, expected;

			data = [
				0.1,
				0.2,
				0.3,
				0.4,
				0.5,
			];
			actual = new Array( data.length );

			actual = betaln( actual, data, 2 );

			expected = [
				2.20727491318972,
				1.42711635564015,
				0.941608539858445,
				0.579818495252942,
				0.287682072451781
			];

			assert.isTrue( deepCloseTo( actual, expected, 1e-12 ) );

			// Typed arrays...
			data = new Float32Array( data );
			actual = new Float64Array( data.length );

			actual = betaln( actual, data, 2 );
			expected = new Float64Array( expected );

			assert.isTrue( deepCloseTo( actual.data, expected.data, 1e-7 ) );
		});

		it( 'should evaluate the function when y is an array', function test() {
			var data, actual, expected, y;

			data = [
				1,
				2,
				3,
				4
			];

		 	y = [
				1,
				2,
				3,
				4
			];
			actual = new Array( data.length );

			actual = betaln( actual, data, y );

			expected = [
				0,
				-1.79175946922805,
				-3.40119738166216,
				-4.9416424226093
			];

			assert.isTrue( deepCloseTo( actual, expected, 1e-7 ) );

			// Typed arrays...
			data = new Int32Array( data );
			actual = new Float32Array( data.length );

			actual = betaln( actual, data, y );
			expected = new Float32Array( expected );

			assert.isTrue( deepCloseTo( actual.data, expected.data, 1e-7 ) );
		});

		it( 'should return an empty array if provided an empty array', function test() {
			assert.deepEqual( betaln( [], [], 1 ), [] );
			assert.deepEqual( betaln( new Int8Array(), new Int8Array(), 1 ), new Int8Array() );
		});

		it( 'should handle non-numeric values by setting the element to NaN', function test() {
			var data, actual, expected, y;

			data = [ true, null, [], {} ];
			actual = new Array( data.length );
			actual = betaln( actual, data, 1 );

			expected = [ NaN, NaN, NaN, NaN ];

			assert.deepEqual( actual, expected );

			actual = new Array( data.length );
			y = [ 1, 2, 3, 4 ];
			actual = betaln( actual, data, y );

			expected = [ NaN, NaN, NaN, NaN ];

			assert.deepEqual( actual, expected );

			data = [ 1, 2, 3 ];
			y = null;
			actual = new Array( data.length );
			actual = betaln( actual, data, y );
			expected = [ NaN, NaN, NaN ];

			assert.deepEqual( actual, expected );

			data = [ 1, null, 3 ];
			y = new Int32Array( [1,2,3] );
			actual = new Array( data.length );
			actual = betaln( actual, data, y );
			expected = [ 0, NaN, -3.40119738166216 ];

			assert.isTrue( deepCloseTo( actual, expected, 1e-7 ) );

		});

		it( 'should throw an error if provided a y array which is not of equal length to the input x array', function test() {
			expect( foo ).to.throw( Error );
			function foo() {
				betaln( [], [1,2], [1,2,3] );
			}
			expect( foo2 ).to.throw( Error );
			function foo2() {
				betaln( [], [1,2], new Int32Array( [1,2,3] ) );
			}
		});

		it( 'should throw an error if provided a matrix as y argument', function test() {
			expect( foo ).to.throw( Error );
			function foo() {
				betaln( [], [1,2,3,4], matrix( new Int32Array( [1,2,3,4] ), [2,2] ) );
			}
		});



});
