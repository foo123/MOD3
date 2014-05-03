/**
*
* MOD3  ModifierStack Class
*
*
**/
!function(MOD3, undef){
    
    @@USE_STRICT@@
    
    var getMeshProxy = MOD3.Factory.getMeshProxy, serialize = function( m ){ return m ? m.serialize( ) : m; };
    
    var ModifierStack = MOD3.ModifierStack = MOD3.Class( MOD3.WorkerInterface, {
        
        constructor: function( lib3d, mesh ) {
            this.mod = null;
            this.stack = [ ];
            
            if ( MOD3.isWorker )
            {
                this.lib3d = new MOD3.Library3d( );
                this.mod = getMeshProxy( this.lib3d );
            }
            else
            {
                this.lib3d = lib3d;
                this.mod = getMeshProxy( this.lib3d );
            }
            if ( mesh )
            {
                this.mod.setMesh( mesh );
                this.mod.analyzeGeometry( );
            }
        },

        name: "ModifierStack",
        
        lib3d: null,
        mod: null,
        stack: null,

        dispose: function( withModifiers ) {
            this.lib3d = null;
            if ( withModifiers && this.stack )
            {
                while ( this.stack.length ) 
                    this.stack.pop( ).dispose( );
            }
            this.stack = null;
            if ( this.mod ) this.mod.dispose( );
            this.mod = null;
            
            return this;
        },
        
        serialize: function( ) {
            return { 
                modifier: this.name, 
                params: {
                    modifiers: this.stack.map( serialize )
                }
            };
            
        },
        
        unserialize: function( json ) {
            if ( json && this.name === json.modifier )
            {
                var modifiers = json.params.modifiers, stack = this.stack, i;
                if ( modifiers.length !== stack.length )
                {
                    stack.length = 0;
                    for (i=0; i<modifiers.length; i++)
                    {
                        stack.push( MOD3.Factory.getModifier( modifiers[ i ] ) );
                    }
                }
                for (i=0; i<stack.length; i++)
                {
                    stack[ i ] = stack[ i ].unserialize( modifiers[ i ] ).setModifiable( this.mod );
                }
                this.stack = stack;
            }
            return this;
        },
        
        setModifiable: function( mod ) {
            this.mod = mod;
            return this;
        },

        add: function( modifier ) {
            if ( modifier )
            {
                modifier.setModifiable( this.mod );
                this.stack.push( modifier );
            }
            return this;
        },

        _apply: function( ) {
            if ( this.mod && this.stack && this.stack.length )
            {
                var stack = this.stack, sl = stack.length, 
                   mod = this.mod, i = 0;

                mod.resetGeometry( );
                
                // optimize loop using while
                while ( i < sl )
                {
                    stack[ i ].enabled && stack[ i ]._apply( );
                    i++;
                }
                mod.update( );
                
                // do any post-process if needed
                //mod.postApply( );
            }
            return this;
        },

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
                            // do any post-process if needed
                            //self.mod.postApply( );
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
        
        collapse: function( ) {
            if ( this.mod && this.stack && this.stack.length )
            {
                this.apply( );
                this.mod.collapseGeometry( );
                this.stack.length = 0;
            }
            
            return this;
        },

        clear: function( ) {
            if ( this.stack ) this.stack.length = 0;
            return this;
        },

        getMeshInfo: function( ) {
            return this.mod;
        }
    });
    // aliases
    ModifierStack.prototype.addModifier = ModifierStack.prototype.add;
    
}(MOD3);