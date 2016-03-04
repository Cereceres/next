'use strict'
let slice = Array.prototype.slice;

/**
 * @param {Object}arg {Array} generators {Number} index of array of generators
 * @return {function} chained
 * @api private
 */
let _next = [ ]
let chaining = function ( array, index ) {
  if ( array.length === 1 ) {
    _next[ 0 ] = ( function ( arg ) {
        arg = arguments.length > 1 ? slice.call( arguments ) : [
          arg
        ]
        return array[ 0 ].apply( this, arg.concat( _next[ 0 ] ) )
      } )
      .bind( this )
    return _next[ 0 ]
  } else if ( array.length === 2 ) {
    _next[ 1 ] = ( function ( arg ) {
        arg = arguments.length > 1 ? slice.call( arguments ) : [
          arg
        ]
        return array[ 1 ].apply( this, arg.concat( _next[ 0 ] ) )
      } )
      .bind( this )

    _next[ 0 ] = ( function ( arg ) {
        arg = arguments.length > 1 ? slice.call( arguments ) : [
          arg
        ]
        return array[ 0 ].apply( this, arg.concat( _next[ 1 ] ) )
      } )
      .bind( this )
    return _next[ 0 ]
  } else if ( index < ( array.length - 2 ) ) {
    _next[ index ] = ( function ( arg ) {
        arg = arguments.length > 1 ? slice.call( arguments ) : [
          arg
        ]
        return array[ index ].apply( this, arg.concat( chaining(
          arg,
          array,
          index + 1 ) ) )
      } )
      .bind( this )
    return _next[ index ]
  } else {
    _next[ index + 1 ] = ( function ( arg ) {
        arg = arguments.length > 1 ? slice.call( arguments ) : [
          arg
        ]
        return array[ ( index + 1 ) % array.length ].apply( this,
          arg
          .concat(
            _next[ 0 ] ) )
      } )
      .bind( this )
    _next[ index ] = ( function ( arg ) {
        arg = arguments.length > 1 ? slice.call( arguments ) : [
          arg
        ]
        return array[ index ].apply( this, arg.concat( _next[
          index +
          1 ] ) )
      } )
      .bind( this )
    return _next[ index ]
  }
}

module.exports = chaining