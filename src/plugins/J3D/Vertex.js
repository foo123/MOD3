/**
*
* MOD3  J3D Vertex Class
*
*
**/
!function(MOD3, undef){
@@USE_STRICT@@

var ModConstant = MOD3.ModConstant,
    X = ModConstant.X, Y = ModConstant.Y, Z = ModConstant.Z,
    Vector3 = MOD3.Vector3, A = MOD3.VecArray
;

var VertexJ3D = MOD3.VertexJ3D = MOD3.Class( MOD3.VertexProxy, {
    
    constructor: function( geometry, vertex ) {
        var self = this;
        self.geometry = geometry;
        self.$super('constructor', vertex );
        self.name = "VertexJ3D";
    },
    
    geometry: null,
    
    dispose: function( ) {
        var self = this;
        self.geometry = null;
        self.$super('dispose');
        return self;
    },
    
    setVertex: function( vertex )  {
        var self = this,
            data = self.geometry.arraysByName[VertexJ3D.VERTEX_POSITION].data
        ;
        self.vertex = vertex;
        self.original = new A( [data[vertex], data[vertex+1], data[vertex+2]] );
        self.xyz = new A( self.original );
        
        return self;
    },
    
    getXYZ: function( ) {
        var self = this,
            vt = self.vertex, 
            data = self.geometry.arraysByName[VertexJ3D.VERTEX_POSITION].data
        ;
        return new A( [data[vt], data[vt+1], data[vt+2]] );
    },
    
    getX: function( ) {
        var self = this;
        return self.geometry.arraysByName[VertexJ3D.VERTEX_POSITION].data[self.vertex];
    },
    
    getY: function( ) {
        var self = this;
        return self.geometry.arraysByName[VertexJ3D.VERTEX_POSITION].data[self.vertex+1];
    },
    
    getZ: function( ) {
        var self = this;
        return self.geometry.arraysByName[VertexJ3D.VERTEX_POSITION].data[self.vertex+2];
    },
    
    setXYZ: function( xyz ) {
        var self = this,
            vt = self.vertex, 
            data = self.geometry.arraysByName[VertexJ3D.VERTEX_POSITION].data
        ;
        
        data[vt] = xyz[0];
        data[vt+1] = xyz[1];
        data[vt+2] = xyz[2];
        
        return self;
    },
    
    setX: function( v ) {
        var self = this;
        self.geometry.arraysByName[VertexJ3D.VERTEX_POSITION].data[self.vertex] = v;
        return self;
    },
    
    setY: function( v ) {
        var self = this;
        self.geometry.arraysByName[VertexJ3D.VERTEX_POSITION].data[self.vertex+1] = v;
        return self;
    },
    
    setZ: function( v ) {
        var self = this;
        self.geometry.arraysByName[VertexJ3D.VERTEX_POSITION].data[self.vertex+2] = v;
        return self;
    },
    
    reset: function( ) {
        var self = this,
            vt = self.vertex, 
            data = self.geometry.arraysByName[VertexJ3D.VERTEX_POSITION].data,
            xyz = self.original
        ;
        
        data[vt] = xyz[0];
        data[vt+1] = xyz[1];
        data[vt+2] = xyz[2];
        
        return self;
    },

    collapse: function( ) {
        var self = this,
            vt = self.vertex, 
            data = self.geometry.arraysByName[VertexJ3D.VERTEX_POSITION].data
        ;
        self.original = new A( [data[vt], data[vt+1], data[vt+2]] );
        return self;
    },

    getValue: function( axis )  {
        var self = this,
            vt = self.vertex, 
            data = self.geometry.arraysByName[VertexJ3D.VERTEX_POSITION].data
        ;
        return X === axis
            ? data[vt]
            : (Y === axis
            ? data[vt+1]
            : (Z === axis
            ? data[vt+2]
            : 0))
        ;
    },

    setValue: function( axis, v ) {
        var self = this,
            vt = self.vertex, 
            data = self.geometry.arraysByName[VertexJ3D.VERTEX_POSITION].data
        ;
        if ( X === axis ) data[vt] = v;
        else if ( Y === axis ) data[vt+1] = v;
        else if ( Z === axis ) data[vt+2] = v;
        return self;
   },
   
   setVector: function( v ) {
        var self = this,
            vt = self.vertex, 
            data = self.geometry.arraysByName[VertexJ3D.VERTEX_POSITION].data,
            xyz = v.xyz
        ;
        data[vt] = xyz[0];
        data[vt+1] = xyz[1];
        data[vt+2] = xyz[2];
        //geometry.replaceArray(vbo, data);
        
        return self;
    },

    getVector: function( ) {
        var self = this,
            vt = self.vertex, 
            data = self.geometry.arraysByName[VertexJ3D.VERTEX_POSITION].data
        ;
        return new Vector3( [data[vt], data[vt+1], data[vt+2]] );
    }
});
// aliases
VertexJ3D.prototype.getXYZRef = VertexJ3D.prototype.getXYZ;
VertexJ3D.prototype.setXYZRef = VertexJ3D.prototype.setXYZ;

}(MOD3);