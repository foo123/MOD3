/**
*
* MOD3  Plugin for OSG.js
*
*
**/
!function(MOD3, undef){
"use strict";

var ModConstant = MOD3.ModConstant,
    X = ModConstant.X, Y = ModConstant.Y, Z = ModConstant.Z,
    XYZ = MOD3.XYZi,
    V = MOD3.VecArray, ceil = Math.ceil,
    VertexOSG, MeshOSG
;

VertexOSG = MOD3.VertexOSG = MOD3.Class( MOD3.VertexProxy, {
    
    constructor: function VertexOSG( vertex, mesh ) {
        var self = this;
        self.$super('constructor', vertex, mesh);
        self.name = "VertexOSG";
    },
    
    setVertex: function( vt ) {
        var self = this, v = self.mesh.mesh.getVertexAttributeList().Vertex.getElements();
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

MeshOSG = MOD3.MeshOSG = MOD3.Class( MOD3.MeshProxy, {
    
    constructor: function MeshOSG( mesh ) { 
        var self = this;
        self.$super('constructor', mesh);
        self.name = "MeshOSG";
    },
    
    init: function( mesh ) {
        var self = this;
        self.$super('init', mesh);
        
        var mesh = self.mesh, vertexArray = mesh.getVertexAttributeList().Vertex, vertices,
            vs = vertexArray ? vertexArray.getElements()||[] : [], vc = vs.length,
            i, j, ii = vertexArray ? vertexArray.getItemSize() : 0, nv, nt;
        
        self.faces = null;
        if ( vc > 0 && ii > 2 )
        {
            self.vertices = vertices = new Array( ceil(vc/ii) );
            for (j=0,i=0; i<vc; i+=ii) vertices[j++] = new VertexOSG( i, self );
        }
        else
        {
            self.vertices = [];
        }
        return self;
    },
    
    // use a batch update, instead of update vertex by vertex (faster??)
    update: function( )  {
        var self = this;
        // https://github.com/cedricpinson/osgjs/issues/623
        self.mesh.getVertexAttributeList().Vertex.dirty();
        //self.mesh.dirty();
        self.mesh.dirtyBound();
        return self;
    },

    preApply: function( )  {
        var self = this;
        self.v = self.mesh.getVertexAttributeList().Vertex.getElements();
        return self;
    },

    postApply: function( )  {
        var self = this;
        self.v = null;
        return self;
    }
});

MOD3.LibraryOSG = {
    id      : "OSG",
    Mesh    : MeshOSG,
    Vertex  : VertexOSG
};

}(MOD3);