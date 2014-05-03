/**
*
* MOD3  Worker Interface
*
*
**/
!function(root, MOD3, undef){
    
    @@USE_STRICT@@
    
    var OP = Object.prototype, FP = Function.prototype, AP = Array.prototype
        ,slice = FP.call.bind( AP.slice ), toString = FP.call.bind( OP.toString )
        
        ,isNode = MOD3.isNode = "undefined" !== typeof( global ) && '[object global]' === toString( global )
        ,isBrowser = MOD3.isBrowser = !isNode && "undefined" !== typeof( navigator )
        ,isWorker = MOD3.isWorker = "function" === typeof( importScripts ) && navigator instanceof WorkerNavigator
        ,supportsWorker = MOD3.supportsWorker = "function" === typeof( Worker )
    ;
    
    // Get current filename/path
    MOD3.getPath = function( ) {
        var file = null, scripts;
        
        if ( isNode ) 
        {
            // http://nodejs.org/docs/latest/api/globals.html#globals_filename
            // this should hold the current file in node
            return { path: __dirname, file: __filename };
        }
        else if ( isWorker )
        {
            // https://developer.mozilla.org/en-US/docs/Web/API/WorkerLocation
            // this should hold the current url in a web worker
            file = self.location.href;
        }
        else if ( isBrowser && (scripts = document.getElementsByTagName('script')) && scripts.length )
        {
            // get last script (should be the current one) in browser
            file  = scripts[ scripts.length - 1 ].src;
        }
        
        return file 
                ? { path: file.split('/').slice(0, -1).join('/'), file: ''+file }
                : { path: null, file: null }
        ;
    };
    
    //
    //
    // logging
    if ( isWorker )
    {
        var modifier = null;
        
        root.console = {
            log: function(s){
                postMessage({event: 'console.log', data: {output: s||''}});
            },
            error: function(s){
                postMessage({event: 'console.error', data: {output: s||''}});
            },
        };
        
        onmessage = function( evt ) {
            var event = evt.data.event, data = evt.data.data || null;
            switch( event )
            {
                case 'init':
                    if ( modifier ) 
                    {
                        modifier.dispose( true );
                        modifier = null;
                    }
                    if ( data && data.modifier )
                    {
                        modifier = MOD3.Factory.getModifier( data );
                    }
                    break;
                case 'import':
                    if ( data && data["import"] && data["import"].length )
                    {
                        importScripts( data["import"].join(',') );
                    }
                    break;
                case 'apply':
                    if ( data && modifier )
                    {
                        if ( data.modifiable ) modifier.setModifiable( MOD3.Factory.getMesh( data.modifiable ) );
                        if ( data.params ) modifier.unserialize( data.params );
                        modifier.send( 'apply', { modifiable: modifier._apply( ).mod.serialize( ) } );
                    }
                    break;
                case 'dispose':
                default:
                    if ( modifier ) 
                    {
                        modifier.dispose( true );
                        modifier = null;
                    }
                    close( );
                    break;
            }
        };        
    }
    
    var WorkerInterface = MOD3.WorkerInterface = MOD3.Class({
        
        path: MOD3.getPath( )
        ,name: null
        
        ,_worker: null
        ,_workerListeners: null
        
        ,disposeWorker: function( ) {
            var self = this;
            if ( self._worker )
            {
                self.send( 'dispose' );
                //self._worker.terminate( );
                self._worker = null;
                self._workerListeners = null;
            }
            return self;
        }
        
        ,scripts: function( ) {
            var scripts = slice( arguments );
            if ( scripts.length )
            {
                this.send('import', {'import': scripts});
            }
            return this;
        }
        
        // get or de-activate a worker filter
        ,worker: function( bool ) {
            var self = this, worker;
            
            if ( !arguments.length ) bool = true;
            bool = !!bool;
            
            // de-activate worker (if was activated before)
            if ( false === bool )
            {
                if ( self._worker ) self.disposeWorker( );
                return self;
            }
            
            if ( !self._worker )
            {
                if ( !supportsWorker )
                {
                    throw new Error('Worker is not supported');
                    return;
                }
                
                self._workerListeners = { };
                
                worker = self._worker = new Worker( this.path.file );
                
                worker.onmessage = function( evt ) {
                    if ( evt.data.event )
                    {
                        var event = evt.data.event, data = evt.data.data || null;
                        if ( self._workerListeners && self._workerListeners[ event ] ) 
                        {
                            self._workerListeners[ event ]( data );
                        }
                        
                        if ( "console.log" === event || "console.error" === event )
                        {
                            log( 'Worker: ' + data.output );
                        }
                    }
                };
                
                worker.onerror = function( evt ) {
                    if ( self._workerListeners && self._workerListeners.error )
                    {
                        self._workerListeners.error( evt );
                    }
                    else
                    {
                        throw new Error( 'Worker Error: ' + evt.message + ' file: ' + evt.filename + ' line: ' + evt.lineno );
                    }
                };
                
                self.send( 'init', { modifier: self.name } );
            }
            
            return self;
        }
        
        ,bind: function( event, handler ) {
            if ( event && handler && this._workerListeners )
            {
                this._workerListeners[ event ] = handler.bind( this );
            }
            return this;
        }
        
        ,unbind: function( event ) {
            if ( event && this._workerListeners && this._workerListeners[ event ] )
            {
                delete this._workerListeners[ event ];
            }
            return this;
        }
        
        ,send: function( event, data ) {
            if ( event )
            {
                if ( isWorker )
                {
                    postMessage({event: event, data: data || null});
                }
                else if ( this._worker )
                {
                    this._worker.postMessage({event: event, data: data || null});
                }
            }
            return this;
        }
    });
    
}(this, MOD3);