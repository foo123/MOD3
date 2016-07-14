/**
*
* MOD3  Three.js Vertex Class
*
*
**/
!function(MOD3, undef){
@@USE_STRICT@@

var ModConstant = MOD3.ModConstant,
    X = ModConstant.X, Y = ModConstant.Y, Z = ModConstant.Z,
    Vector3 = MOD3.Vector3, A = MOD3.VecArray
;

var VertexThree = MOD3.VertexThree = MOD3.Class( MOD3.VertexProxy, {
    
    constructor: function( vertex ) {
        var self = this;
        self.$super('constructor', vertex );
        self.name = "VertexThree";
    },
    
    dispose: function( ) {
        var self = this;
        self.$super('dispose');
        
        return self;
    },
    
    setVertex: function( vt ) {
        var self = this;
        /* Three js uses vector3 now instead of vertex */
        self.vertex = vt;
        self.original = new A( [vt.x, vt.y, vt.z] );
        self.xyz = new A( self.original );
        
        return self;
    },
    
    getXYZ: function( ) {
        var vt = this.vertex;
        return new A( [vt.x, vt.y, vt.z] );
    },
    
    getX: function( ) {
        return this.vertex.x;
    },
    
    getY: function( ) { 
        return this.vertex.y;
    },
    
    getZ: function( ) {
        return this.vertex.z;
    },
    
    setXYZ: function( xyz ) {
        var self = this, vt = self.vertex;
        
        vt.x = xyz[0];
        vt.y = xyz[1];
        vt.z = xyz[2];
        
        return self;
    },
    
    setX: function( v ) {
        var self = this;
        self.vertex.x = v;
        return self;
    },
    
    setY: function( v ) {
        var self = this;
        self.vertex.y = v;
        return self;
    },
    
    setZ: function( v ) {
        var self = this;
        self.vertex.z = v;
        return self;
    },
    
    reset: function( ) {
        var self = this,
            vt = self.vertex,
            xyz = self.original;
        
        vt.x = xyz[0];
        vt.y = xyz[1];
        vt.z = xyz[2];
        
        return self;
    },

    collapse: function( ) {
        var self = this,
            vt = self.vertex;
        self.original = new A( [vt.x, vt.y, vt.z] );
        
        return self;
    },

    getValue: function( axis )  {
        var vt = this.vertex;
        return X === axis
            ? vt.x
            : (Y === axis
            ? vt.y
            : (Z === axis
            ? vt.z
            : 0))
        ;
    },

    setValue: function( axis, v ) {
        var vt = this.vertex;
        if ( X === axis ) vt.x = v;
        else if ( Y === axis ) vt.y = v;
        else if ( Z === axis ) vt.z = v;
        return this;
   },
   
   setVector: function( v ) {
        var self = this,
            vt = self.vertex, xyz = v.xyz;
        
        vt.x = xyz[0];
        vt.y = xyz[1];
        vt.z = xyz[2];
        
        return self;
    },

    getVector: function( ) {
        var vt = this.vertex;
        return new Vector3( [vt.x, vt.y, vt.z] );
    }
});
// aliases
VertexThree.prototype.getXYZRef = VertexThree.prototype.getXYZ;
VertexThree.prototype.setXYZRef = VertexThree.prototype.setXYZ;

}(MOD3);