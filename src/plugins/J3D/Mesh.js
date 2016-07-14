/**
*
* MOD3  Three.js Mesh Class
*
*
**/
!function(MOD3, undef){
@@USE_STRICT@@

var VertexJ3D = MOD3.VertexJ3D, ceil = Math.ceil,
    FaceProxy = MOD3.FaceProxy, A = MOD3.VecArray
;

var MeshJ3D = MOD3.MeshJ3D = MOD3.Class( MOD3.MeshProxy, {
    
    constructor: function MeshJ3D( mesh ) { 
        var self = this;
        VertexJ3D.VERTEX_POSITION = J3D.Mesh.VERTEX_POSITION;
        self.$super('constructor', mesh );
        self.name = "MeshJ3D";
    },
    
    dispose: function( ) {
        var self = this;
        self.$super('dispose');
        
        return self;
    },
    
    setMesh: function( transformObject ) {
        var self = this;
        self.$super('setMesh', transformObject );
        
        var geometry = transformObject.geometry,
            vbo = geometry.arraysByName[VertexJ3D.VERTEX_POSITION],
            vs = vbo.data, vc = vs.length,
            ii = vbo.itemSize, i, j, vertices, nv;
        
        self.faces = null;
        self.vertices = vertices = new Array( ceil(vc/ii) );
        for (j=0,i=0; i<vc; i+=ii) vertices[j++] = new VertexJ3D( geometry, i );
        
        return self;
    },
    
    // use a batch update, instead of update vertex by vertex (faster??)
    update: function( )  {
        var self = this,
            geometry = self.mesh.geometry,
            vbo = geometry.arraysByName[VertexJ3D.VERTEX_POSITION],
            data = vbo.data;
        
        geometry.replaceArray(vbo, data);
        
        return self;
    },

    updateMeshPosition: function( p ) {
        var self = this,
            position = self.mesh.position, xyz = p.xyz;
        position.x += xyz[0];
        position.y += xyz[1];
        position.z += xyz[2];
        
        return self;
    }
});

}(MOD3);