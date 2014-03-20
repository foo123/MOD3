/**
*
* MOD3  Modifier Super Class
*
*
**/
(function(MOD3, undef){
    
    var _modCount = 0, NONE = MOD3.ModConstant.NONE;
    
    var Modifier = MOD3.Modifier = MOD3.Class( Object, {
        
        constructor: function( mod ) {
            this.id = ++_modCount;
            this.name = 'Generic';
            this.mod = mod || null;
            this.axes = NONE;
            this.constraint = NONE;
            this.enabled = true;
        },
        
        id: null,
        name: null,
        mod : null,
        axes: null,
        constraint: null,
        enabled: true,

        dispose: function( ) {
            this.mod = null;
            this.name = null;
            this.axes = null;
            this.constraint = null;
            return this;
        },
        
        enable: function( enabled ) {
            if ( undef !== enabled )
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
            return this.mod.getVertices( );
        },

        // override
        apply: function( ) {
            return this;
        },
        
        toString: function( ) {
            return '[Modifier '+this.name+']';
        }
    });
    
})(MOD3);