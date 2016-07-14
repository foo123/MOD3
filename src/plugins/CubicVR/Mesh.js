/**
*
* MOD3  CubicVR.js Mesh Class
*
*
**/
!function(MOD3, undef){
@@USE_STRICT@@

var VertexCubicVR = MOD3.VertexCubicVR,
    FaceProxy = MOD3.FaceProxy
;

var MeshCubicVR = MOD3.MeshCubicVR = MOD3.Class( MOD3.MeshProxy, {
    
    constructor: function( mesh ) { 
        var self = this;
        self.$super('constructor', mesh );
        self.name = "MeshCubicVR";
    },
    
    setMesh: function( sceneObject )  {
        var self = this;
        self.$super('setMesh', sceneObject/*.obj*/ );
        
        var vs = sceneObject.obj.points, vc = vs.length,
            ts = sceneObject.obj.faces, tc = ts.length,
            vertices, nv, nt, i;
        
        self.faces = null;
        self.vertices = vertices = new Array(vc);
        for (i=0; i<vc; i++) vertices[i] = new VertexCubicVR( sceneObject, vs[i] );
        
        return self;
    },
    
    // use a batch update, instead of update vertex by vertex (faster??)
    update: function( )  {
        var self = this;
        self.mesh.dirty = true;
        
        return self;
    },

    updateMeshPosition: function( p ) {
        var self = this;
        var position = self.mesh.position, xyz = p.xyz;
        position[0] += xyz[0];
        position[1] += xyz[1];
        position[2] += xyz[2];
        
        return self;
    }
});

}(MOD3);