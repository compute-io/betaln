/* global require, describe, it */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Matrix data structure:
	matrix = require( 'dstructs-matrix' ),

	// Validate a value is NaN:
	isnan = require( 'validate.io-nan' ),

	// Deep close to:
	deepCloseTo = require( './utils/deepcloseto.js' ),

	// Module to be tested:
	betaln = require( './../lib' ),

	// Function to apply element-wise:
	BETALN = require( './../lib/number.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'compute-betaln', function tests() {

	it( 'should export a function', function test() {
		expect( betaln ).to.be.a( 'function' );
	});

	it( 'should throw an error if provided only one argument', function test() {

		expect( badValue ).to.throw( Error );

		function badValue() {
				betaln( [1,2,3] );
		}
	});

	it( 'should throw an error if provided an invalid option', function test() {
		var values = [
			'5',
			5,
			true,
			undefined,
			null,
			NaN,
			[],
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				betaln( [1,2,3], 1, {
					'accessor': value
				});
			};
		}
	});

	it( 'should throw an error if provided an array and an unrecognized/unsupported data type option', function test() {
		var values = [
			'beep',
			'boop'
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( Error );
		}
		function badValue( value ) {
			return function() {
				betaln( [1,2,3], 1,  {
					'dtype': value
				});
			};
		}
	});

	it( 'should throw an error if provided a typed-array and an unrecognized/unsupported data type option', function test() {
		var values = [
			'beep',
			'boop'
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( Error );
		}
		function badValue( value ) {
			return function() {
				betaln( new Int8Array([1,2,3]), 1,  {
					'dtype': value
				});
			};
		}
	});

	it( 'should throw an error if provided a matrix and an unrecognized/unsupported data type option', function test() {
		var values = [
			'beep',
			'boop'
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( Error );
		}
		function badValue( value ) {
			return function() {
				betaln( matrix( [2,2] ), 1,  {
					'dtype': value
				});
			};
		}
	});

	it( 'should return NaN if the first argument is neither a number, array-like, or matrix-like', function test() {
		var values = [
			// '5', // valid as is array-like (length)
			true,
			undefined,
			null,
			// NaN, // allowed
			function(){},
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			assert.isTrue( isnan( betaln( values[ i ], 1 ) ) );
		}
	});


	it( 'should throw an error if provided a number as the first argument and an not applicable option', function test() {
		var values = [
			{'accessor': function getValue( d ) { return d; } },
			{'copy': false},
			{'path': 'x'},
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( Error );
		}
		function badValue( value ) {
			return function() {
				betaln( 1, [1,2,3], value );
			};
		}
	});

	it( 'should return NaN if the first argument is a number and the second argument is neither numberic, array-like, or matrix-like', function test() {
		var values = [
			// '5', // valid as is array-like (length)
			true,
			undefined,
			null,
			NaN,
			function(){},
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			assert.isTrue( isnan( betaln( 1, values[ i ] ) ) );
		}
	});

	it( 'should evaluate the  betaln function for two numbers', function test() {
		assert.closeTo( betaln( 2, 4 ), -2.99573227355399, 1e-12 );
		assert.closeTo( betaln( 3, 3 ), -3.40119738166216, 1e-12 );
	});

	it( 'should evaluate the  betaln function for a scalar and an array', function test() {
		var data, actual, expected;
		data = [ 1, 2 ];
		actual = betaln( 2, data );
		expected = [ -0.693147180559945, -1.791759469228055 ];
		assert.isTrue( deepCloseTo( actual, expected, 1e-7 ) );
	});

	it( 'should evaluate the  betaln function for a scalar and a matrix', function test() {
		var data, actual, expected, i;
		data = matrix( new Int8Array( [ 1,2,3,4 ] ), [2,2] );
		actual = betaln( 2, data );
		expected = matrix( new Float64Array( [-0.693147180559945,-1.79175946922805,-2.484906649788,-2.99573227355399] ), [2,2] );

		for ( i = 0; i < actual.length; i++ ) {
			assert.closeTo( actual.data[ i ], expected.data[ i ], 1e-7 );
		}
	});


	it( 'should evaluate the betaln function for a scalar and an array and cast result to a different dtype', function test() {
		var data, actual, expected;
		data = [ 1, 2 ];
		actual = betaln( 10, data, {
			'dtype':'int32'
		});
		expected = new Int32Array( [-2,-4] );
		assert.isTrue( deepCloseTo( actual, expected, 1e-7 ) );
	});


	it( 'should evaluate the betaln function for a scalar and a matrix and cast to a different dtype', function test() {
		var data, actual, expected;
		data = matrix( new Int8Array( [ 1,2,3,4 ] ), [2,2] );
		actual = betaln( 2, data, {
			'dtype': 'int32'
		});
		expected = matrix( new Int32Array( [0,-1,-2,-2] ), [2,2] );

		assert.strictEqual( actual.dtype, 'int32' );
		assert.deepEqual( actual.data, expected.data );
	});

	it( 'should evaluate the betaln function for a matrix and a scalar and cast to a different dtype', function test() {
		var data, actual, expected;
		data = matrix( new Int8Array( [1,2,3,4] ), [2,2] );
		actual = betaln( data, 2, {
			'dtype': 'int32'
		});
		expected = matrix( new Int32Array( [0,-1,-2,-2] ), [2,2] );

		assert.strictEqual( actual.dtype, 'int32' );
		assert.deepEqual( actual.data, expected.data );
	});

	it( 'should evaluate the betaln function for a plain array and a scalar', function test() {
		var data, actual, expected;

		data = [
			0.1,
			0.2,
			0.3,
			0.4,
			0.5
		];
		expected = [
			2.20727491318972,
			1.42711635564015,
			0.941608539858445,
			0.579818495252942,
			0.287682072451781
		];

		actual = betaln( data, 2 );
		assert.notEqual( actual, data );

		assert.isTrue( deepCloseTo( actual, expected, 1e-7 ) );

		// Mutate...
		actual = betaln( data, 2, {
			'copy': false
		});
		assert.strictEqual( actual, data );

		assert.isTrue( deepCloseTo( actual, expected, 1e-7 ) );

	});

	it( 'should evaluate the betaln function for a plain array and another array', function test() {
		var data, actual, expected;

		data = [ 1, 2, 3, 4 ];
		expected = [
			0,
			-1.79175946922805,
			-3.40119738166216,
			-4.9416424226093
		];

		actual = betaln( data, data );
		assert.notEqual( actual, data );

		assert.isTrue( deepCloseTo( actual, expected, 1e-7 ) );

		// Mutate...
		actual = betaln( data, data, {
			'copy': false
		});
		assert.strictEqual( actual, data );

		assert.isTrue( deepCloseTo( actual, expected, 1e-7 ) );

	});

	it( 'should evaluate the betaln function for a typed array and a scalar', function test() {
		var data, actual, expected, i;

		data = new Int8Array( [ 10, 20, 30, 40 ] );

		expected = new Float64Array( [
			-6.49223983502047,
			-8.43814998407579,
			-9.60777330838708,
			-10.4469739585417
		]);

		actual = betaln( data, 3 );
		assert.notEqual( actual, data );

		for ( i = 0; i < actual.length; i++ ) {
			assert.closeTo( actual[ i ], expected[ i ], 1e-7 );
		}

		// Mutate:
		actual = betaln( data, 3, {
			'copy': false
		});
		assert.strictEqual( actual, data );
		expected = new Int8Array( [ -6, -8, -9, -10 ] );

		assert.deepEqual( data, expected );
	});

	it( 'should evaluate the betaln function for a typed array and another typed array', function test() {
		var data, actual, expected, i;

		data = new Int8Array( [ 1, 2, 3, 4 ] );

		expected = new Float64Array( [
			0,
			-1.79175946922805,
			-3.40119738166216,
			-4.9416424226093
		]);

		actual = betaln( data, data );
		assert.notEqual( actual, data );
		for ( i = 0; i < actual.length; i++ ) {
			assert.closeTo( actual[ i ], expected[ i ], 1e-14 );
		}

		// Mutate
		actual = betaln( data, data, {
			'copy': false
		});
		expected = new Int8Array( [ 0, -1, -3, -4 ] );
		assert.strictEqual( actual, data );

		for ( i = 0; i < actual.length; i++ ) {
			assert.closeTo( actual[ i ], expected[ i ], 1e-14 );
		}

	});

	it( 'should evaluate the betaln function for a typed array and a scalar and return an array of a specific type', function test() {
		var data, actual, expected;

		data = [ 4, 8, 12, 16 ];
		expected = new Int8Array([
			-4.9416424226093,
			-7.18538701558042,
			-8.60520406873895,
			-9.64885333413055
		]);

		actual = betaln( data, 4, {
			'dtype': 'int8'
		});
		assert.notEqual( actual, data );
		assert.strictEqual( actual.BYTES_PER_ELEMENT, 1 );
		assert.isTrue( deepCloseTo( actual, expected, 1e-7 ) );
	});

	it( 'should evaluate the betaln function for an object array and a scalar using an accessor', function test() {
		var data, actual, expected;

		data = [
			[3,1],
			[4,2],
			[5,3],
			[6,300]
		];

		expected = [
			-0.693147180559945,
			-1.79175946922805,
			-2.484906649788,
			-11.4108927394051
		];

		actual = betaln( data, 2, {
			'accessor': getValue
		});
		assert.notEqual( actual, data );

		assert.isTrue( deepCloseTo( actual, expected, 1e-7 ) );

		// Mutate:
		actual = betaln( data, 2, {
			'accessor': getValue,
			'copy': false
		});
		assert.strictEqual( actual, data );

		assert.isTrue( deepCloseTo( data, expected, 1e-7 ) );

		function getValue( d ) {
			return d[ 1 ];
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

		actual = betaln( data, y, {
			'accessor': getValue
		});

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

	it( 'should evaluate the betaln function for an array and a scalar and deep set', function test() {
		var data, actual, expected;

		data = [
			{'x':[9,1e-100]},
			{'x':[9,1e-50]},
			{'x':[9,1e-20]},
			{'x':[9,1e-5]}
		];
		expected = [
			{'x':[9,230.258509299405]},
			{'x':[9,115.129254649702]},
			{'x':[9,46.0517018598809]},
			{'x':[9,11.5129725819815]}
		];

		actual = betaln( data, 0.2, {
			'path': 'x.1'
		});

		assert.strictEqual( actual, data );

		assert.isTrue( deepCloseTo( actual, expected, 1e-7 ) );

		// Specify a path with a custom separator...
		data = [
			{'x':[9,1e-100]},
			{'x':[9,1e-50]},
			{'x':[9,1e-20]},
			{'x':[9,1e-5]}
		];
		actual = betaln( data, 0.2, {
			'path': 'x/1',
			'sep': '/'
		});
		assert.strictEqual( actual, data );

		assert.isTrue( deepCloseTo( actual, expected, 1e-7 ) );
	});

	it( 'should evaluate the betaln function for an array with another array and deep set', function test() {
		var data, actual, expected, y;

		data = [
			{'x':1},
			{'x':2},
			{'x':3},
			{'x':4}
		];

		y = [ 1, 2, 3, 4 ];

		actual = betaln( data, y, {
			path: 'x'
		});

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

		data = betaln( data, y, {
			'path': 'x/1',
			'sep': '/'
		});
		expected = [
			{'x':[9,0]},
			{'x':[9,-1.79175946922805]},
			{'x':[9,-3.40119738166216]},
			{'x':[9,-4.9416424226093]}
		];

		assert.isTrue( deepCloseTo( data, expected, 1e-7 ), 'custom separator' );
	});

	it( 'should evaluate the betaln function for a matrix and a scalar', function test() {
		var mat,
			out,
			d1,
			d2,
			d3,
			i;

		d1 = new Int32Array( 100 );
		d2 = new Int32Array( 100 );
		d3 = new Int32Array( 100 );
		for ( i = 0; i < d1.length; i++ ) {
			d1[ i ] = i;
			d2[ i ] = BETALN( i, i );
			d3[ i ] = BETALN( i, 2 );
		}

		// Raise matrix elements to a scalar power
		mat = matrix( d1, [10,10], 'int32' );
		out = betaln( mat, 2, {
			'dtype': 'int32'
		});

		assert.deepEqual( out.data, d3 );

		mat = matrix( d1, [10,10], 'int32' );
		out = betaln( mat, mat, {
			'dtype': 'int32'
		});

		assert.deepEqual( out.data, d2 );

		out = betaln( mat, 2, {
			'copy': false
		});

		assert.strictEqual( mat, out );
		assert.deepEqual( mat.data, d3 );
	});

	it( 'should evaluate the betaln function for a matrix and a scalar and return a matrix of a specific type', function test() {
		var mat,
			out,
			d1,
			d2,
			i;

		d1 = new Int16Array( 100 );
		d2 = new Uint16Array( 100 );
		for ( i = 0; i < d1.length; i++ ) {
			d1[ i ] = i;
			d2[ i ] = BETALN( i, 2 );
		}
		mat = matrix( d1, [10,10], 'int16' );
		out = betaln( mat, 2, {
			'dtype': 'uint16'
		});

		assert.strictEqual( out.dtype, 'uint16' );
		assert.deepEqual( out.data, d2 );
	});

	it( 'should return an empty data structure if provided an empty data structure', function test() {
		assert.deepEqual( betaln( [], 1 ), [] );
		assert.deepEqual( betaln( matrix( [0,0] ), 1 ).data, matrix( [0,0] ).data );
		assert.deepEqual( betaln( new Int8Array(), 1 ), new Float64Array() );
	});


});
