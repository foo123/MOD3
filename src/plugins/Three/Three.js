/**
*
* MOD3  Plugin for Three.js
*
*
**/
!function(MOD3, undef){
"use strict";

var ModConstant = MOD3.ModConstant,
    X = ModConstant.X, Y = ModConstant.Y, Z = ModConstant.Z,
    XYZ = MOD3.xyz, XYZi = MOD3.XYZi, V = MOD3.VecArray,
    VertexThree, MeshThree
;

VertexThree = MOD3.VertexThree = MOD3.Class( MOD3.VertexProxy, {
    
    constructor: function VertexThree( vertex, mesh ) {
        var self = this;
        self.$super('constructor', vertex, mesh);
        self.name = "VertexThree";
    },
    
    setVertex: function( vt ) {
        var self = this;
        /* Three js uses vector3 now instead of vertex */
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
        return this;
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

MeshThree = MOD3.MeshThree = MOD3.Class( MOD3.MeshProxy, {
    
    constructor: function MeshThree( mesh ) { 
        var self = this;
        self.$super('constructor', mesh);
        self.name = "MeshThree";
    },
    
    init: function( mesh ) {
        var self = this;
        self.$super('init', mesh);
        
        var mesh = self.mesh, vertices,
            vs = mesh.geometry.vertices, vc = vs.length,
            //ts = mesh.geometry.faces, tc = ts.length,
            nv, nt, i;
        
        self.faces = null;
        self.vertices = vertices = new Array( vc );
        for (i=0; i<vc; i++) vertices[i] = new VertexThree( vs[ i ], self );
        return self;
    },
    
    // use a batch update, instead of update vertex by vertex (faster??)
    update: function( )  {
        var self = this, geometry = self.mesh.geometry;
        // three.js r78 geometry update flags
        geometry.verticesNeedUpdate = true;
        geometry.elementsNeedUpdate = true;
        geometry.uvsNeedUpdate = true;
        geometry.normalsNeedUpdate = true;
        geometry.colorsNeedUpdate = true;
        geometry.lineDistancesNeedUpdate = true;
        geometry.groupsNeedUpdate = true;
        // three.js r66 geometry update flags
        geometry.buffersNeedUpdate = true;
        geometry.dynamic = true;
        return self;
    },

    updateMeshPosition: function( p ) {
        var self = this, position = self.mesh.position, xyz = p.xyz;
        position.x += xyz[0];
        position.y += xyz[1];
        position.z += xyz[2];
        return self;
    }
});

MOD3.LibraryThree = {
    id      : "Three",
    Mesh    : MeshThree,
    Vertex  : VertexThree
};

}(MOD3);