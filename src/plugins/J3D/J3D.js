/**
*
* MOD3  Plugin for J3D
*
*
**/
!function(MOD3, undef){
"use strict";

var ModConstant = MOD3.ModConstant,
    X = ModConstant.X, Y = ModConstant.Y, Z = ModConstant.Z,
    XYZ = MOD3.XYZi,
    V = MOD3.VecArray, ceil = Math.ceil,
    VertexJ3D, MeshJ3D
;

VertexJ3D = MOD3.VertexJ3D = MOD3.Class( MOD3.VertexProxy, {
    
    constructor: function VertexJ3D( vertex, mesh ) {
        var self = this;
        self.$super('constructor', vertex, mesh);
        self.name = "VertexJ3D";
    },
    
    setVertex: function( vt )  {
        var self = this, v = self.mesh.mesh.geometry.arraysByName[J3D.Mesh.VERTEX_POSITION].data;
        self.vertex = vt;
        self.original = new V( [v[vt  ], v[vt+1], v[vt+2]] );
        return self;
    },
    
    getXYZ: function( ) {
        var self = this, vt = self.vertex, v = self.mesh.v, xyz = new V(3);
        xyz[0] = v[vt  ]; xyz[1] = v[vt+1]; xyz[2] = v[vt+2];
        return xyz;
    },
    
    getX: function( ) {
        return this.mesh.v[this.vertex  ];
    },
    
    getY: function( ) {
        return this.mesh.v[this.vertex+1];
    },
    
    getZ: function( ) {
        return this.mesh.v[this.vertex+2];
    },
    
    getValue: function( axis )  {
        return this.mesh.v[this.vertex + XYZ[axis]] || 0;
    },

    setXYZ: function( xyz ) {
        var self = this, vt = self.vertex, v = self.mesh.v;
        v[vt  ] = xyz[0]; v[vt+1] = xyz[1]; v[vt+2] = xyz[2];
        return self;
    },
    
    setX: function( vo ) {
        this.mesh.v[this.vertex  ] = vo;
        return this;
    },
    
    setY: function( vo ) {
        this.mesh.v[this.vertex+1] = vo;
        return this;
    },
    
    setZ: function( vo ) {
        this.mesh.v[this.vertex+2] = vo;
        return this;
    },

    setValue: function( axis, vo ) {
        this.mesh.v[this.vertex + XYZ[axis]] = vo;
        return this;
    },
    
    reset: function( ) {
        var self = this, vt = self.vertex, v = self.mesh.v, o = self.original;
        v[vt  ] = o[0]; v[vt+1] = o[1]; v[vt+2] = o[2];
        return self;
    },

    collapse: function( ) {
        var self = this, vt = self.vertex, v = self.mesh.v, o = self.original;
        o[0] = v[vt  ]; o[1] = v[vt+1]; o[2] = v[vt+2];
        return self;
    }
});

MeshJ3D = MOD3.MeshJ3D = MOD3.Class( MOD3.MeshProxy, {
    
    constructor: function MeshJ3D( mesh ) { 
        var self = this;
        self.$super('constructor', mesh);
        self.name = "MeshJ3D";
    },
    
    init: function( transformObject ) {
        var self = this;
        self.$super('init', transformObject);
        
        var geometry = transformObject.geometry,
            vbo = geometry.arraysByName[J3D.Mesh.VERTEX_POSITION],
            vs = vbo.data, vc = vs.length,
            ii = vbo.itemSize, i, j, vertices, nv;
        
        self.faces = null;
        self.vertices = vertices = new Array( ceil(vc/ii) );
        for (j=0,i=0; i<vc; i+=ii) vertices[j++] = new VertexJ3D( i, self );
        return self;
    },
    
    // use a batch update, instead of update vertex by vertex (faster??)
    update: function( )  {
        var self = this, geometry = self.mesh.geometry,
            vbo = geometry.arraysByName[J3D.Mesh.VERTEX_POSITION],
            data = vbo.data;
        geometry.replaceArray(vbo, data);
        return self;
    },

    preApply: function( )  {
        var self = this;
        self.v = self.mesh.geometry.arraysByName[J3D.Mesh.VERTEX_POSITION].data;
        return self;
    },

    postApply: function( )  {
        var self = this;
        self.v = null;
        return self;
    }
});

MOD3.LibraryJ3D = {
    id      : "J3D",
    Mesh    : MeshJ3D,
    Vertex  : VertexJ3D
};

}(MOD3);