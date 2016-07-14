/**
*
* MOD3  osg.js Vertex Class
*
*
**/
!function(MOD3, undef){
@@USE_STRICT@@

var ModConstant = MOD3.ModConstant,
    X = ModConstant.X, Y = ModConstant.Y, Z = ModConstant.Z,
    Vector3 = MOD3.Vector3, A = MOD3.VecArray
;

var VertexOSG = MOD3.VertexOSG = MOD3.Class( MOD3.VertexProxy, {
    
    constructor: function( geometry, vertex ) {
        var self = this;
        self.geometry = geometry;
        self.$super('constructor', vertex );
        self.name = "VertexOSG";
    },
    
    geometry: null, 
    
    dispose: function( ) {
        var self = this;
        self.geometry = null;
        self.$super('dispose');
        return self;
    },
    
    setVertex: function( vt ) {
        var self = this, v = self.geometry;
        self.vertex = vt;
        self.original = new A( [v[vt], v[vt+1], v[vt+2]] );
        self.xyz = new A( self.original );
        
        return self;
    },
    
    getXYZ: function( ) {
        var vt = this.vertex, v = this.geometry;
        return new A( [v[vt], v[vt+1], v[vt+2]] );
    },
    
    getX: function( ) {
        return this.geometry[this.vertex];
    },
    
    getY: function( ) { 
        return this.geometry[this.vertex+1];
    },
    
    getZ: function( ) {
        return this.geometry[this.vertex+2];
    },
    
    setXYZ: function( xyz ) {
        var self = this,
            vt = self.vertex,
            geometry = self.geometry;
        
        geometry[vt] = xyz[0];
        geometry[vt+1] = xyz[1];
        geometry[vt+2] = xyz[2];
        
        return self;
    },
    
    setX: function( v ) {
        var self = this;
        self.geometry[self.vertex] = v;
        return self;
    },
    
    setY: function( v ) {
        var self = this;
        self.geometry[self.vertex+1] = v;
        return self;
    },
    
    setZ: function( v ) {
        var self = this;
        self.geometry[self.vertex+2] = v;
        return self;
    },
    
    reset: function( ) {
        var self = this,
            vt = self.vertex,
            geometry = self.geometry,
            xyz = self.original;
        
        geometry[vt] = xyz[0];
        geometry[vt+1] = xyz[1];
        geometry[vt+2] = xyz[2];
        
        return self;
    },

    collapse: function( ) {
        var self = this, v = self.geometry, vt = self.vertex;
        self.original = new A( [v[vt], v[vt+1], v[vt+2]] );
        
        return self;
    },

    getValue: function( axis )  {
        var self = this, v = self.geometry, vt = self.vertex;
        return X === axis
            ? v[vt]
            : (Y === axis
            ? v[vt+1]
            : (Z === axis
            ? v[vt+2]
            : 0))
        ;
    },

    setValue: function( axis, v ) {
        var self = this, v = self.geometry, vt = self.vertex;
        if ( X === axis ) v[vt] = v;
        else if ( Y === axis ) v[vt+1] = v;
        else if ( Z === axis ) v[vt+2] = v;
        return self;
   },
   
   setVector: function( v ) {
        var self = this, geometry = self.geometry,
            vt = self.vertex, xyz = v.xyz;
        
        geometry[vt] = xyz[0];
        geometry[vt+1] = xyz[1];
        geometry[vt+2] = xyz[2];
        
        return self;
    },

    getVector: function( ) {
        var vt = this.vertex, v = this.geometry;
        return new Vector3( [v[vt], v[vt+1], v[vt+2]] );
    }
});
// aliases
VertexOSG.prototype.getXYZRef = VertexOSG.prototype.getXYZ;
VertexOSG.prototype.setXYZRef = VertexOSG.prototype.setXYZ;

}(MOD3);