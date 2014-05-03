/**
*
* MOD3  Modifier Super Class
*
*
**/
!function(MOD3, undef){
    
    @@USE_STRICT@@
    
    var _modCount = 0, NONE = MOD3.ModConstant.NONE;
    
    var Modifier = MOD3.Modifier = MOD3.Class( MOD3.WorkerInterface, {
        
        constructor: function( mod ) {
            this.id = ++_modCount;
            this.name = 'Modifier';
            this.mod = mod || null;
            this.axes = NONE;
            this.constraint = NONE;
            this.enabled = true;
        },
        
        id: null,
        name: 'Modifier',
        mod : null,
        axes: null,
        constraint: null,
        enabled: true,

        dispose: function( withModifiable ) {
            this.disposeWorker( );
            if ( true === withModifiable && this.mod ) this.mod.dispose( );
            this.mod = null;
            this.name = null;
            this.axes = null;
            this.constraint = null;
            
            return this;
        },
        
        serialize: function( ) {
            return { 
                modifier: this.name, 
                params: {
                    axes: this.axes,
                    constraint: this.constraint,
                    enabled: !!this.enabled
                }
            };
            
        },
        
        unserialize: function( json ) {
            if ( json && this.name === json.modifier )
            {
                var params = json.params;
                this.axes = params.axes;
                this.constraint = params.constraint;
                this.enabled = params.enabled;
            }
            return this;
        },
        
        enable: function( enabled ) {
            if ( arguments.length )
            {
                this.enabled = !!enabled;
                return this;
            }
            return this.enabled;
        },
        
        constraintAxes: function( axes ) {
            this.axes = axes || NONE;
            return this;
        },
        
        setConstraint: function( c ) {
            this.constraint = c || NONE;
            return this;
        },
        
        setModifiable: function( mod ) {
            this.mod = mod;
            
            return this;
        },

        getVertices: function( ) {
            return this.mod ? this.mod.getVertices( ) : null;
        },

        // override
        _apply: function( ) {
            return this;
        },
        
        // override
        apply: function( cb ) {
            var self = this;
            if ( self._worker )
            {
                self
                    .bind( 'apply', function( data ) { 
                        self.unbind('apply');
                        if ( data && data.modifiable )
                        {
                            self.mod.unserialize( data.modifiable );
                            self.mod.update( );
                        }
                        if ( cb ) cb.call( self );
                    })
                    .send( 'apply', { params: self.serialize( ), modifiable: self.mod.serialize( ) } )
                ;
            }
            else
            {
                self._apply( );
                if ( cb ) cb.call( self );
            }
            return self;
        },
        
        toString: function( ) {
            return '[Modifier '+this.name+']';
        }
    });
    
}(MOD3);