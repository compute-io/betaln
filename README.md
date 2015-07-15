betaln
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Dependencies][dependencies-image]][dependencies-url]

> Evaluates the natural logarithm of the [Beta function](http://en.wikipedia.org/wiki/Beta_function).

This function evaluates the natural logarithm of the [Beta function](http://en.wikipedia.org/wiki/Beta_function) which can be defined as follows:

<div class="equation" align="center" data-raw-text="\ln \operatorname{Beta}(x,y)= \ln \Gamma(x) + \ln \Gamma(y) - \ln \Gamma(x+y)" data-equation="eq:betaln_function">
	<img src="https://cdn.rawgit.com/compute-io/betaln/3df019ad7e83d93d7e9f31b90a6f9c52a2cb377f/docs/img/eqn.svg" alt="Equation for the natural logarithm of the beta function.">
	<br>
</div>


## Installation

``` bash
$ npm install compute-betaln
```

For use in the browser, use [browserify](https://github.com/substack/node-browserify).


## Usage

``` javascript
var betaln = require( 'compute-betaln' );
```

#### betaln( x, y[, options] )

Evaluates the natural logarithm of the [Beta function](http://en.wikipedia.org/wiki/Beta_function) (element-wise). . `x` may be either a [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number), an [`array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array), a [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays), or a [`matrix`](https://github.com/dstructs/matrix). `y` has to be either an `array` or `matrix` of equal dimensions as `x` or a single number. Correspondingly, the function returns either an `array` with the same length as the input `array(s)`, a `matrix` with the same dimensions as the input `matrix/matrices` or a single number.

``` javascript
var matrix = require( 'dstructs-matrix' ),
	data,
	mat,
	out,
	i;

out = betaln( 0, 0 );
// returns +Infinity

out = betaln( 0.001, 0.001 );
// returns ~7.601

out = betaln( -1, 2 );
// return NaN

out = betaln( [1,2,3,4], 1 );
// returns [ ~0, ~-0.693, ~-1.099, ~-1.386 ]

out = betaln( 1, [1,2,3,4] );
// returns [ ~0, ~-0.693, ~-1.099, ~-1.386 ]

out = betaln( [ -10, -1, 0, 1, 10 ] );
// returns [ -1, -0.8427, 0, 0.8427, 1 ]

data = [ 0, 0.5, 1, 1.5, 2 ];
out = betaln( data, 100 );
// returns [ +Infintiy, ~-1.729, ~-4.605, ~-7.032, ~-9.22 ]

data = new Int8Array( data );
out = betaln( data, 100 );
// returns Float64Array( [ +Infintiy, +Infinity, ~-4.605, ~-4.605, ~-9.22 ] )

data = new Float64Array( 6 );
for ( i = 0; i < 6; i++ ) {
	data[ i ] = i / 2;
}
mat = matrix( data, [3,2], 'float64' );
/*
	[ 0  0.5
	  1  1.5
	  2  2.5 ]
*/

out = betaln( mat, 0.5  );
/*
	[ +Inf   ~1.145
	  ~0.693 ~0.452
	  ~0.288 ~0.164 ]
*/
```

The function accepts the following `options`:

* 	__accessor__: accessor `function` for accessing `array` values.
* 	__dtype__: output [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays) or [`matrix`](https://github.com/dstructs/matrix) data type. Default: `float64`.
*	__copy__: `boolean` indicating if the `function` should return a new data structure. Default: `true`.
*	__path__: [deepget](https://github.com/kgryte/utils-deep-get)/[deepset](https://github.com/kgryte/utils-deep-set) key path.
*	__sep__: [deepget](https://github.com/kgryte/utils-deep-get)/[deepset](https://github.com/kgryte/utils-deep-set) key path separator. Default: `'.'`.

For non-numeric `arrays`, provide an accessor `function` for accessing `array` values.

``` javascript
var data = [
	['beep', 0],
	['boop', 0.5],
	['bip', 1],
	['bap', 1.5],
	['baz', 2]
];

function getValue( d, i ) {
	return d[ 1 ];
}

var out = betaln( data, 100, {
	'accessor': getValue
});
// returns [ +Infintiy, ~-1.729, ~-4.605, ~-7.032, ~-9.22 ]
```

When evaluating the `betaln` function for values of two object `arrays`, provide an accessor `function` which accepts `3` arguments.

``` javascript
var data = [
	['beep', 2],
	['boop', 3],
	['bip', 4],
	['bap', 5],
	['baz', 6]
];

var arr = [
	{'x': 2},
	{'x': 3},
	{'x': 4},
	{'x': 5},
	{'x': 6}
];

function getValue( d, i, j ) {
	if ( j === 0 ) {
		return d[ 1 ];
	}
	return d.x;
}

var out = beta( data, arr, {
	'accessor': getValue
});
// returns [ ~-1.792, ~-3.402, ~-4.942, ~-6.446, ~-7.927 ]
```

__Note__: `j` corresponds to the input `array` index, where `j=0` is the index for the first input `array` and `j=1` is the index for the second input `array`.

To [deepset](https://github.com/kgryte/utils-deep-set) an object `array`, provide a key path and, optionally, a key path separator.

``` javascript
var data = [
	{'x':[0,10]},
	{'x':[1,100]},
	{'x':[2,1000]},
	{'x':[3,10000]},
	{'x':[4,100000]}
];

var out = betaln( data, 0.1, 'x|1', '|' );
/*
	[
		{'x':[0,~2.0.27]},
		{'x':[1,~1.793]},
		{'x':[2,~1.562]},
		{'x':[3,~1.332]},
		{'x':[4,~1.101]}
	]
*/

var bool = ( data === out );
// returns true
```

By default, when provided a [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays) or [`matrix`](https://github.com/dstructs/matrix), the output data structure is `float64` in order to preserve precision. To specify a different data type, set the `dtype` option (see [`matrix`](https://github.com/dstructs/matrix) for a list of acceptable data types).

``` javascript
var data, out;

data = new Int8Array( [1,2,3,4] );

out = betaln( data, 8, {
	'dtype': 'int32'
});
// returns Int32Array( [-2,-4,-5,-7] )

// Works for plain arrays, as well...
out = betaln( [ 1, 2, 3, 4 ], 8, {
	'dtype': 'int8'
});
// returns Int8Array( [-2,-4,-5,-7] )
```

By default, the function returns a new data structure. To mutate the input data structure (e.g., when input values can be discarded or when optimizing memory usage), set the `copy` option to `false`.

``` javascript
var data,
	bool,
	mat,
	out,
	i;

var data = [ 1, 2, 3, 4 ];

var out = betaln( data, 100, {
	'copy': false
});
// returns [ ~0, ~-0.693, ~-1.099, ~-1.386 ]

bool = ( data === out );
// returns true

data = new Float64Array( 6 );
for ( i = 0; i < 6; i++ ) {
	data[ i ] = i / 2;
}
mat = matrix( data, [3,2], 'float64' );
/*
	[ 0  0.5
	  1  1.5
	  2  2.5 ]
*/

out = betaln( mat, 0.5, {
	'copy': false
});
/*
	[ +Inf   ~1.145
	  ~0.693 ~0.452
	  ~0.288 ~0.164 ]
*/

bool = ( mat === out );
// returns true
```


## Notes

*	If an element is __not__ a numeric value, the evaluated [error function](http://en.wikipedia.org/wiki/Error_function) is `NaN`.

	``` javascript
	var data, out;

	out = betaln( null, 1 );
	// returns NaN

	out = betaln( true, 1 );
	// returns NaN

	out = betaln( {'a':'b'}, 1 );
	// returns NaN

	out = betaln( [ true, null, [] ], 1 );
	// returns [ NaN, NaN, NaN ]

	function getValue( d, i ) {
		return d.x;
	}
	data = [
		{'x':true},
		{'x':[]},
		{'x':{}},
		{'x':null}
	];

	out = betaln( data, 1, {
		'accessor': getValue
	});
	// returns [ NaN, NaN, NaN, NaN ]

	out = betaln( data, 1, {
		'path': 'x'
	});
	/*
		[
			{'x':NaN},
			{'x':NaN},
			{'x':NaN,
			{'x':NaN}
		]
	*/
	```

*	Be careful when providing a data structure which contains non-numeric elements and specifying an `integer` output data type, as `NaN` values are cast to `0`.

	``` javascript
	var out = betaln( [ true, null, [] ], 1, {
		'dtype': 'int8'
	});
	// returns Int8Array( [0,0,0] );
	```


## Examples

``` javascript
var matrix = require( 'dstructs-matrix' ),
	betaln = require( 'compute-betaln' );

var data,
	mat,
	out,
	tmp,
	i;

// Plain arrays...
data = new Array( 10 );
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = Math.random();
}
out = betaln( data, 0.5 );

// Object arrays (accessors)...
function getValue( d ) {
	return d.x;
}
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = {
		'x': data[ i ]
	};
}
out = betaln( data, 0.5, {
	'accessor': getValue
});

// Deep set arrays...
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = {
		'x': [ i, data[ i ].x ]
	};
}
out = betaln( data, 0.5, {
	'path': 'x/1',
	'sep': '/'
});

// Typed arrays...
data = new Float32Array( 10 );
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = Math.random();
}
tmp = betaln( data, 0.5 );
out = '';
for ( i = 0; i < data.length; i++ ) {
	out += tmp[ i ];
	if ( i < data.length-1 ) {
		out += ',';
	}
}

// Matrices...
mat = matrix( data, [5,2], 'float32' );
out = betaln( mat, 0.5 );

// Matrices (custom output data type)...
out = betaln( mat, 0.5, {
	'dtype': 'uint8'
});
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


## Tests

### Unit

Unit tests use the [Mocha](http://mochajs.org/) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul](https://github.com/gotwarlost/istanbul) as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


---
## License

[MIT license](http://opensource.org/licenses/MIT).


## Copyright

Copyright &copy; 2015. The [Compute.io](https://github.com/compute-io) Authors.


[npm-image]: http://img.shields.io/npm/v/compute-betaln.svg
[npm-url]: https://npmjs.org/package/compute-betaln

[travis-image]: http://img.shields.io/travis/compute-io/betaln/master.svg
[travis-url]: https://travis-ci.org/compute-io/betaln

[coveralls-image]: https://img.shields.io/coveralls/compute-io/betaln/master.svg
[coveralls-url]: https://coveralls.io/r/compute-io/betaln?branch=master

[dependencies-image]: http://img.shields.io/david/compute-io/betaln.svg
[dependencies-url]: https://david-dm.org/compute-io/betaln

[dev-dependencies-image]: http://img.shields.io/david/dev/compute-io/betaln.svg
[dev-dependencies-url]: https://david-dm.org/dev/compute-io/betaln

[github-issues-image]: http://img.shields.io/github/issues/compute-io/betaln.svg
[github-issues-url]: https://github.com/compute-io/betaln/issues
