/**
*
* MOD3  Plugin for CubicVR.js
*
*
**/
!function(MOD3, undef){
"use strict";

var ModConstant = MOD3.ModConstant,
    X = ModConstant.X, Y = ModConstant.Y, Z = ModConstant.Z,
    XYZ = MOD3.XYZi,
    V = MOD3.VecArray,
    VertexCubicVR, MeshCubicVR
;

VertexCubicVR = MOD3.VertexCubicVR = MOD3.Class( MOD3.VertexProxy, {
    
    constructor: function VertexCubicVR( vertex, mesh ) {
        var self = this;
        self.$super('constructor', vertex, mesh);
        self.name = "VertexCubicVR";
    },
    
    setVertex: function( vt ) {
        var self = this;
        self.vertex = vt;
        self.original = new V( [vt[0], vt[1], vt[2]] );
        return self;
    },
    
    getXYZ: function( ) {
        var vt = this.vertex, xyz = new V(3);
        xyz[0] = vt[0]; xyz[1] = vt[1]; xyz[2] = vt[2];
        return xyz;
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
    
    getValue: function( axis )  {
        return this.vertex[ XYZ[axis] ] || 0;
    },

    setXYZ: function( xyz ) {
        var vt = this.vertex;
        vt[0] = xyz[0]; vt[1] = xyz[1]; vt[2] = xyz[2];
        return this;
    },
    
    setX: function( vo ) {
        this.vertex[0] = vo;
        return this;
    },
    
    setY: function( vo ) {
        this.vertex[1] = vo;
        return this;
    },
    
    setZ: function( vo ) {
        this.vertex[2] = vo;
        return this;
    },

    setValue: function( axis, vo ) {
        this.vertex[ XYZ[axis] ] = vo;
        return this;
    },
    
    reset: function( ) {
        var self = this, vt = self.vertex, o = self.original;
        vt[0] = o[0]; vt[1] = o[1]; vt[2] = o[2];
        return self;
    },

    collapse: function( ) {
        var self = this, vt = self.vertex, o = self.original;
        o[0] = vt[0]; o[1] = vt[1]; o[2] = vt[2];
        return self;
    }
});

MeshCubicVR = MOD3.MeshCubicVR = MOD3.Class( MOD3.MeshProxy, {
    
    constructor: function MeshCubicVR( mesh ) { 
        var self = this;
        self.$super('constructor', mesh);
        self.name = "MeshCubicVR";
    },
    
    init: function( sceneObject )  {
        var self = this;
        self.$super('init', sceneObject/*.obj*/);
        
        var vs = sceneObject.obj.points, vc = vs.length,
            //ts = sceneObject.obj.faces, tc = ts.length,
            vertices, nv, nt, i;
        
        self.faces = null;
        self.vertices = vertices = new Array(vc);
        for (i=0; i<vc; i++) vertices[i] = new VertexCubicVR( vs[i], self );
        
        return self;
    },
    
    // use a batch update, instead of update vertex by vertex (faster??)
    update: function( )  {
        var self = this;
        self.mesh.dirty = true;
        return self;
    },

    updateMeshPosition: function( p ) {
        var self = this, position = self.mesh.position, xyz = p.xyz;
        position[0] += xyz[0];
        position[1] += xyz[1];
        position[2] += xyz[2];
        return self;
    }
});

MOD3.LibraryCubicVR = {
    id      : "CubicVR",
    Mesh    : MeshCubicVR,
    Vertex  : VertexCubicVR
};

}(MOD3);