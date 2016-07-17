/**
*
* MOD3  Plugin for Copperlicht
*
*
**/
!function(MOD3, undef){
"use strict";

var ModConstant = MOD3.ModConstant,
    X = ModConstant.X, Y = ModConstant.Y, Z = ModConstant.Z,
    XYZ = MOD3.XYZ, XYZi = MOD3.XYZi,
    V = MOD3.VecArray, each = MOD3.List.each,
    VertexCopperlicht, MeshCopperlicht
;

VertexCopperlicht = MOD3.VertexCopperlicht = MOD3.Class( MOD3.VertexProxy, {
    
    constructor: function VertexCopperlicht( vertex, mesh ) {
        var self = this;
        self.$super('constructor', vertex, mesh);
        self.name = "VertexCopperlicht";
    },
    
    setVertex: function( vt ) {
        var self = this;
        self.vertex = vt;
        self.original = new V( [vt.X, vt.Y, vt.Z] );
        return self;
    },
    
    getXYZ: function( ) {
        var vt = this.vertex, xyz = new V(3);
        xyz[0] = vt.X; xyz[1] = vt.Y; xyz[2] = vt.Z;
        return xyz;
    },
    
    getX: function( ) {
        return this.vertex.X;
    },
    
    getY: function( ) {
        return this.vertex.Y;
    },
    
    getZ: function( ) {
        return this.vertex.Z;
    },
    
    getValue: function( axis ) {
        return this.vertex[ XYZ[XYZi[axis]] ] || 0;
    },

    setXYZ: function( xyz ) {
        var vt = this.vertex;
        vt.X = xyz[0]; vt.Y = xyz[1]; vt.Z = xyz[2];
        return self;
    },
    
    setX: function( vo ) {
        this.vertex.X = vo;
        return this;
    },
    
    setY: function( vo ) {
        this.vertex.Y = vo;
        return this;
    },
    
    setZ: function( vo ) {
        this.vertex.Z = vo;
        return this;
    },

    setValue: function( axis, vo ) {
        this.vertex[ XYZ[XYZi[axis]] ] = vo;
        return this;
    },
    
    reset: function( ) {
        var self = this, vt = self.vertex, o = self.original;
        vt.X = o[0]; vt.Y = o[1]; vt.Z = o[2];
        return self;
    },

    collapse: function( ) {
        var self = this, vt = self.vertex, o = self.original;
        o[0] = vt.X; o[1] = vt.Y; o[2] = vt.Z;
        return self;
    }
});

MeshCopperlicht = MOD3.MeshCopperlicht = MOD3.Class( MOD3.MeshProxy, {
    
    constructor: function MeshCopperlicht( mesh ) { 
        var self = this;
        self.$super('constructor', mesh);
        self.name = "MeshCopperlicht";
    },
    
    init: function( mesh ) {
        var self = this;
        self.$super('init', mesh);
        
        var i, b, bl,
            buffers = self.mesh.getMesh().GetMeshBuffers(),
            vertices, vs, vc, nv;
            
        self.faces = null;
        self.vertices = vertices = [];
        for (b=0,bl=buffers.length; b<bl; b++)
            for (i=0,vs=buffers[b].Vertices,vc=vs.length; i<vc; i++) 
                vertices.push( new VertexCopperlicht( vs[i].Pos, self ) );
        
        return self;
    },
    
    // use a batch update, instead of update vertex by vertex (faster??)
    update: function( )  {
        var self = this;
        each(self.mesh.getMesh().GetMeshBuffers(), function( b ){ b.update( true ); });
        return self;
    },

    updateMeshPosition: function( p ) {
        var self = this, Pos = self.mesh.Pos, xyz = p.xyz;
        Pos.X += xyz[0];
        Pos.Y += xyz[1];
        Pos.Z += xyz[2];
        return self;
    }
});

MOD3.LibraryCopperlicht = {
    id      : "Copperlicht",
    Mesh    : MeshCopperlicht,
    Vertex  : VertexCopperlicht
};

}(MOD3);