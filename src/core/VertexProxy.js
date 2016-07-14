/**
*
* MOD3  VertexProxy Super Class
*
*
**/
!function(MOD3, undef){
@@USE_STRICT@@

var ModConstant = MOD3.ModConstant,
    X = ModConstant.X, Y = ModConstant.Y, Z = ModConstant.Z,
    Vector3 = MOD3.Vector3, A = MOD3.VecArray
;

var VertexProxy = MOD3.VertexProxy = MOD3.Class({
    
    constructor: function( vertex ) {
        var self = this;
        // use internal typed-arrays for speed
        self.xyz = new A( [0,0,0] );
        self.original = new A( [0,0,0] );
        self.ratio = new A( [0,0,0] );
        
        // vertex can be zero
        if ( null != vertex ) self.setVertex( vertex );
    },
    
    name: "VertexProxy",
    
    vertex: null,
    xyz: null,
    original: null,
    ratio: null,
    
    dispose: function( ) {
        var self = this;
        self.vertex = null;
        self.xyz = null;
        self.original = null;
        self.ratio = null;
        
        return self;
    },
    
    setVertex: function( vertex )  { 
        var self = this;
        // override
        self.vertex = vertex;
        return self;
    },

    getRatioVector: function( ) {
        return new Vector3( this.ratio );
    },

    getRatio: function( axis ) {
        var r = this.ratio;
        return X === axis
            ? r[0]
            : (Y === axis
            ? r[1]
            : (Z === axis
            ? r[2]
            : -1))
        ;
    },

    getOriginalValue: function( axis ) {
        var o = this.original;
        return X === axis
            ? o[0]
            : (Y === axis
            ? o[1]
            : (Z === axis
            ? o[2]
            : 0))
        ;
    },

    setRatios: function( rx, ry, rz ) {
        var self = this;
        rx = (rx===undef) ? 0 : rx;
        ry = (ry===undef) ? 0 : ry;
        rz = (rz===undef) ? 0 : rz;
        self.ratio = new A( [rx, ry, rz] );
        
        return self;
    },

    setOriginalPosition: function( ox, oy, oz ) {
        var self = this;
        ox = (ox===undef) ? 0 : ox;
        oy = (oy===undef) ? 0 : oy;
        oz = (oz===undef) ? 0 : oz;
        self.original = new A( [ox, oy, oz] );
        
        return self;
    },

    getXYZ: function( ) {
        // override
        return new A( this.xyz );
    },
    
    getXYZRef: function( ) {
        // override
        return this.xyz;
    },
    
    getX: function( ) {
        // override
        return this.xyz[0];
    },

    getY: function( ) {
        // override
        return this.xyz[1];
    },

    getZ: function( ) {
        // override
        return this.xyz[2];
    },

    setXYZ: function( xyz ) {
        var self = this;
        // override
        self.xyz = new A( xyz );
        return self;
    },
    
    setXYZRef: function( xyz ) {
        var self = this;
        // override
        self.xyz = xyz;
        return self;
    },
    
    setX: function( v ) {
        var self = this;
        // override
        self.xyz[0] = v;
        return self;
    },

    setY: function( v ) {
        var self = this;
        // override
        self.xyz[1] = v;
        return self;
    },

    setZ: function( v ) {
        var self = this;
        // override
        self.xyz[2] = v;
        return self;
    },

    getValue: function( axis )  {
        var self = this;
        // override
        return X === axis
            ? self.getX( )
            : (Y === axis
            ? self.getY( )
            : (Z === axis
            ? self.getZ( )
            : 0))
        ;
    },

    setValue: function( axis, v ) {
        var self = this;
        // override
        if ( X === axis ) self.setX( v );
        else if ( Y === axis ) self.setY( v );
        else if ( Z === axis ) self.setZ( v );
        return self;
    },

    reset: function( ) {
        var self = this;
        // override ??
        self.setXYZ( self.original );
        return self;
    },

    collapse: function( ) {
        var self = this;
        // override ??
        self.original = self.getXYZ( );
        return self;
    },

    getVector: function( ) {
        // override
        return new Vector3( this.getXYZ( ) );
    },

    setVector: function( v ) {
        // override
        this.setXYZ( v.xyz );
    }
});

}(MOD3);