/**
*
* MOD3  Modifier Super Class
*
*
**/
!function(MOD3, undef){
@@USE_STRICT@@

var _modCount = 0, NONE = MOD3.ModConstant.NONE;

var Modifier = MOD3.Modifier = MOD3.Class({
    
    constructor: function( mod ) {
        var self = this;
        self.id = ++_modCount;
        self.name = 'Modifier';
        self.mod = mod || null;
        self.axes = NONE;
        self.constraint = NONE;
        self.enabled = true;
    },
    
    id: null,
    name: 'Modifier',
    mod : null,
    axes: null,
    constraint: null,
    enabled: true,

    dispose: function( withModifiable ) {
        var self = this;
        if ( true === withModifiable && self.mod ) self.mod.dispose( );
        self.mod = null;
        self.name = null;
        self.axes = null;
        self.constraint = null;
        
        return self;
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
    apply: function( ) {
        return this;
    },
    
    toString: function( ) {
        return '[Modifier '+this.name+']';
    }
});
    
}(MOD3);