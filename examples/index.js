'use strict';

var matrix = require( 'dstructs-matrix' ),
	 beta = require( './../lib' );

var data,
	mat,
	out,
	tmp,
	i;

// ----
// Plain arrays...
data = new Array( 10 );
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = Math.random()*20 - 10;
}
out = beta( data );
console.log( 'Arrays: %s\n', out );


// ----
// Object arrays (accessors)...
function getValue( d ) {
	return d.x;
}
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = {
		'x': data[ i ]
	};
}
out = beta( data, {
	'accessor': getValue
});
console.log( 'Accessors: %s\n', out );


// ----
// Deep set arrays...
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = {
		'x': [ i, data[ i ].x ]
	};
}
out = beta( data, {
	'path': 'x/1',
	'sep': '/'
});
console.log( 'Deepset:' );
console.dir( out );
console.log( '\n' );


// ----
// Typed arrays...
data = new Int32Array( 10 );
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = Math.random() * 100;
}
tmp = beta( data );
out = '';
for ( i = 0; i < data.length; i++ ) {
	out += tmp[ i ];
	if ( i < data.length-1 ) {
		out += ',';
	}
}
console.log( 'Typed arrays: %s\n', out );


// ----
// Matrices...
mat = matrix( data, [5,2], 'int32' );
out = beta( mat );
console.log( 'Matrix: %s\n', out.toString() );


// ----
// Matrices (custom output data type)...
out = beta( mat, {
	'dtype': 'uint8'
});
console.log( 'Matrix (%s): %s\n', out.dtype, out.toString() );