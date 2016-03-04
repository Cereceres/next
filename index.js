'use strict'
const EventEmitter = require( 'events' );
const chaining = require( './chaining' )
  /**
   * slice() reference.
   */

let slice = Array.prototype.slice;
/**
 * @param {Object} to be use as thisArg in every generator
 * @return {Object} instance of coEvent
 * @api public
 */
let Next = function ( ctx ) {
    /**
     * if is not called with new, a instance of coEvent is returned
     */
    if ( !( this instanceof Next ) ) {
      return new Next( )
    }
    /**
     *  EventEmitter is instanced and added to object
     */
    this.emitter = new EventEmitter( )
    this.events = {}
      /**
       *  ctx to be used in every generator
       */
    this.ctx = ctx || this
    var _this = this
      /**on method to be added to instance*/
      /**
       * @param {String} event {Array} _eventHandler of generator to be used, can be too onle one generator
       * @return {Boolean} is listener was added
       * @api public
       */
    this.on = function ( event, eventHandler ) {
      eventHandler = arguments.length > 2 ? slice.call( arguments, 1 ) :
        Array.isArray( eventHandler ) ? eventHandler : [
          eventHandler
        ]
      this.events[ event ] = this.events[ event ] || {}
      this.events[ event ].eventHandlerGen = this.events[ event ].eventHandlerGen !==
        undefined ? this.events[ event ].eventHandlerGen : [ ]
        /**The news generator are added*/
      this.events[ event ].eventHandlerGen = this.events[ event ].eventHandlerGen
        .concat( eventHandler )
        /**The old generators are removed*/
      this.emitter.removeAllListeners( event )
      this.emitter.addListener( event, function ( arg, res, rej ) {
        let chained = chaining.apply( _this.ctx, [ _this.events[ event ].eventHandlerGen,
          0
        ] )
        try {
          res( chained.apply( _this.ctx, arg ) )
        } catch ( err ) {
          /**If there are a error error event is ammited and promise es rejected*/
          _this.emitter.emit( 'error', err )
          rej( err )
        }
      } )
      return this
    }

    /**
     * @param {String} event {Array} _eventHandler of generator to be used, can be too onle one generator
     * @return {Boolean} is listener was added once
     * @api public
     */
    this.once = function ( event, eventHandler ) {
        eventHandler = arguments.length > 2 ? slice.call( arguments, 1 ) :
          Array.isArray( eventHandler ) ? eventHandler : [
            eventHandler
          ]
        this.events[ event ] = this.events[ event ] || {}
        this.events[ event ].eventHandlerGen = eventHandler
        this.emitter.removeAllListeners( event )
        this.emitter.once( event, function ( arg, res, rej ) {
          let chained = chaining.apply( _this.ctx, _this.events[ event ]
            .eventHandlerGen,
            0 )
          try {
            res( chained.apply( _this.ctx, arg ) )
          } catch ( err ) {
            /**If there are a error error event is ammited and promise es rejected*/
            _this.emit( 'error', err )
            rej( err )
          }

        } )
        return this
      }
      /**
       * @param {String} _event to be emitted {Array} arg to be send the listener
       * @return {Promise} to be resolved when every iterator finish or rejected
       * if a error is catched
       * @api public
       */
    this.emit = function ( _event, arg ) {
      arg = arguments.length > 2 ?
        slice.call( arguments, 1 ) : [ arg ];
      return new Promise( function ( resolve, reject ) {
        let test = _this.emitter.emit( _event, arg, resolve, reject )
        if ( !test ) {
          _this.emitter.emit( 'NotListener', arg )
          resolve( arg )
        }
      } );
    }

  }
  /**
   * Expose `coEvent`.
   */
module.exports = Next