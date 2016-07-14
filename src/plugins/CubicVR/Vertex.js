/**
*
* MOD3  CubicVR.js Vertex Class
*
*
**/
!function(MOD3, undef){
@@USE_STRICT@@

var ModConstant = MOD3.ModConstant,
    X = ModConstant.X, Y = ModConstant.Y, Z = ModConstant.Z,
    Vector3 = MOD3.Vector3, A = MOD3.VecArray
;

var VertexCubicVR = MOD3.VertexCubicVR = MOD3.Class( MOD3.VertexProxy, {
    
    constructor: function( sceneObject, vertex ) {
        var self = this;
        self.sceneObject = sceneObject;
        self.$super('constructor', vertex );
        self.name = "VertexCubicVR";
    },
    
    sceneObject: null,
    
    dispose: function( ) {
        var self = this;
        self.sceneObject = null;
        self.$super('dispose');
        
        return self;
    },
    
    setVertex: function( vertex ) {
        var self = this;
        self.vertex = vertex;
        self.original = new A( vertex );
        self.xyz = new A( vertex );
        
        return self;
    },
    
    getXYZ: function( ) {
        return new A( this.vertex );
    },
    
    getX: function( ) {
        return this.vertex[0];
    },
    
    getY: function( ) {
        return this.vertex[1];
    },
    
    getZ: function( ) {  
        return this.vertex[2];
    },
    
    setXYZ: function( xyz ) {
        var self = this,
            vt = self.vertex;
        
        vt[0] = xyz[0];
        vt[1] = xyz[1];
        vt[2] = xyz[2];
        //self.sceneObject.dirty=true;
        
        return self;
    },
    
    setX: function( v ) {
        var self = this;
        self.vertex[0] = v;
        return self;
    },
    
    setY: function( v ) {
        var self = this;
        self.vertex[1] = v;
        return self;
    },
    
    setZ: function( v ) {
        var self = this;
        self.vertex[2] = v;
        return self;
    },
    
    reset: function( ) {
        var self = this,
            vt = self.vertex, xyz = self.original;
        
        vt[0] = xyz[0];
        vt[1] = xyz[1];
        vt[2] = xyz[2];
        //self.sceneObject.dirty=true;
            
        return self;
    },

    collapse: function( ) {
        var self = this;
        self.original = new A( self.vertex );
        
        return self;
    },

    getValue: function( axis )  {
        var vt = this.vertex;
        return X === axis
            ? vt[0]
            : (Y === axis
            ? vt[1]
            : (Z === axis
            ? vt[2]
            : 0))
        ;
    },

    setValue: function( axis, v ) {
        var vt = this.vertex;
        if ( X === axis ) vt[0] = v;
        else if ( Y === axis ) vt[1] = v;
        else if ( Z === axis ) vt[2] = v;
        return this;
   },
   
   setVector: function( v ) {
        var self = this,
            vt = self.vertex, xyz = v.xyz;
        
        vt[0] = xyz[0];
        vt[1] = xyz[1];
        vt[2] = xyz[2];
        //self.sceneObject.dirty=true;
        
        return self;
    },

    getVector: function( ) {
        return new Vector3( this.vertex );
    }
});
// aliases
VertexCubicVR.prototype.getXYZRef = VertexCubicVR.prototype.getXYZ;
VertexCubicVR.prototype.setXYZRef = VertexCubicVR.prototype.setXYZ;

}(MOD3);