/**
*
* MOD3  Plugin for Pre3D
*
*
**/
!function(MOD3, undef){
"use strict";

var ModConstant = MOD3.ModConstant,
    X = ModConstant.X, Y = ModConstant.Y, Z = ModConstant.Z,
    XYZ = MOD3.xyz, XYZi = MOD3.XYZi,
    V = MOD3.VecArray,
    VertexPre3D, MeshPre3D
;

VertexPre3D = MOD3.VertexPre3D = MOD3.Class( MOD3.VertexProxy, {
    
    constructor: function VertexPre3D( vertex, mesh ) {
        var self = this;
        self.$super('constructor', vertex, mesh);
        self.name = "VertexPre3D";
    },
    
    setVertex: function( vt ) {
        var self = this;
        self.vertex = vt;
        self.original = new V( [vt.x, vt.y, vt.z] );
        return self;
    },
    
    getXYZ: function( ) {
        var vt = this.vertex, xyz = new V(3);
        xyz[0] = vt.x; xyz[1] = vt.y; xyz[2] = vt.z;
        return xyz;
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
    
    getValue: function( axis )  {
        return this.vertex[ XYZ[XYZi[axis]] ] || 0;
    },

    setXYZ: function( xyz ) {
        var vt = this.vertex;
        vt.x = xyz[0]; vt.y = xyz[1]; vt.z = xyz[2];
        return this;
    },
    
    setX: function( vo ) {
        this.vertex.x = vo;
        return this;
    },
    
    setY: function( vo ) {
        this.vertex.y = vo;
        return this;
    },
    
    setZ: function( vo ) {
        this.vertex.z = vo;
        return this;
    },
    
    setValue: function( axis, vo ) {
        this.vertex[ XYZ[XYZi[axis]] ] = vo;
        return self;
    },
    
    reset: function( ) {
        var self = this, vt = self.vertex, o = self.original;
        vt.x = o[0]; vt.y = o[1]; vt.z = o[2];
        return self;
    },

    collapse: function( ) {
        var self = this, vt = self.vertex, o = self.original;
        o[0] = vt.x; o[1] = vt.y; o[2] = vt.z;
        return self;
    }
});

MeshPre3D = MOD3.MeshPre3D = MOD3.Class( MOD3.MeshProxy, {
    
    constructor: function MeshPre3D( mesh ) { 
        var self = this;
        self.$super('constructor', mesh);
        self.name = "MeshPre3D";
    },
    
    init: function( mesh ) {
        var self = this;
        self.$super('init', mesh);
        
        var vs = self.mesh.vertices, vc = vs.length,
            //ts = self.mesh.quads, tc = ts.length,
            vertices, nv, nt, i
        ;
        
        self.faces = null;
        self.vertices = vertices = new Array( vc );
        for (i=0; i<vc; i++) vertices[i] = new VertexPre3D( vs[i], self );
        
        return self;
    }
    
    // Pre3D does not support this operation
    /*,updateMeshPosition : function(p) {
        var self = this;
        self.mesh.position.x += p.x;
        self.mesh.position.y += p.y;
        self.mesh.position.z += p.z;
        return self;
    }*/
});

MOD3.LibraryPre3D = {
    id      : "Pre3D",
    Mesh    : MeshPre3D,
    Vertex  : VertexPre3D
};

}(MOD3);