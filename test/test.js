'use strict'
let assert = require( 'assert' )
let CoEvent = require( '../index' )
let count = 0

describe( 'Test for next', function ( ) {
  before( function ( ) {
    this.Myemmiter = new CoEvent( )
    this.fun1 = function ( arg, next ) {
      count++
      let res = next( 3 * arg )
      return res
    }

    this.fun2 = function ( arg, next ) {
      let res
      count++
      if ( arg < 100 ) {
        res = next( 2 * arg )
      } else {
        res = arg
      }
      return res
    }
    this.Myemmiter.on( 'test', this.fun1, this.fun2 )
  } )
  it( 'should count the calls and result', function ( done ) {
    this.Myemmiter.emit( 'test', 4 )
      .then( function ( res ) {
        assert.equal( count, 6 )
        assert.equal( res, 432 )
        done( )
      } )
      .catch( done )
  } )
} )