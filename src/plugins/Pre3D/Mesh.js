/**
*
* MOD3  Pre3D Mesh Class
*
*
**/
!function(MOD3, undef){
@@USE_STRICT@@

var VertexPre3D = MOD3.VertexPre3D,
    FaceProxy = MOD3.FaceProxy
;

var MeshPre3D = MOD3.MeshPre3D = MOD3.Class( MOD3.MeshProxy, {
    
    constructor: function( mesh ) { 
        var self = this;
        self.$super('constructor', mesh );
        self.name = "MeshPre3D";
    },
    
    setMesh: function( mesh ) {
        var self = this;
        self.$super('setMesh', mesh );
        
        var vs = self.mesh.vertices,
            ts = self.mesh.quads,
            vc = vs.length,
            tc = ts.length,
            vertices, nv, nt, i
        ;
        
        self.faces = null;
        self.vertices = vertices = new Array( vc );
        for (i=0; i<vc; i++) vertices[i] = new VertexPre3D( vs[i] );
        
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

}(MOD3);