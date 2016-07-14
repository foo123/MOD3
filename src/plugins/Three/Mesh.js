/**
*
* MOD3  Three.js Mesh Class
*
*
**/
!function(MOD3, undef){
@@USE_STRICT@@

var VertexThree = MOD3.VertexThree, FaceProxy = MOD3.FaceProxy;

var MeshThree = MOD3.MeshThree = MOD3.Class( MOD3.MeshProxy, {
    
    constructor: function( mesh ) { 
        var self = this;
        self.$super('constructor', mesh );
        self.name = "MeshThree";
    },
    
    setMesh: function( mesh ) {
        var self = this;
        self.$super('setMesh', mesh );
        
        var mesh = self.mesh, vertices,
            vs = mesh.geometry.vertices, vc = vs.length,
            ts = mesh.geometry.faces, tc = ts.length,
            nv, nt, i;
        
        self.faces = null;
        self.vertices = vertices = new Array( vc );
        for (i=0; i<vc; i++) vertices[i] = new VertexThree( vs[ i ] );
        
        return self;
    },
    
    // use a batch update, instead of update vertex by vertex (faster??)
    update: function( )  {
        var self = this,
            geometry = self.mesh.geometry;
        
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
        var self = this,
            position = self.mesh.position, xyz = p.xyz;
        position.x += xyz[0];
        position.y += xyz[1];
        position.z += xyz[2];
        
        return self;
    }
});

}(MOD3);