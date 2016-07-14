/**
*
* MOD3  osg.js Mesh Class
*
*
**/
!function(MOD3, undef){
@@USE_STRICT@@

var VertexOSG = MOD3.VertexOSG, FaceProxy = MOD3.FaceProxy, ceil = Math.ceil;

var MeshOSG = MOD3.MeshOSG = MOD3.Class( MOD3.MeshProxy, {
    
    constructor: function( mesh ) { 
        var self = this;
        self.$super('constructor', mesh );
        self.name = "MeshOSG";
    },
    
    setMesh: function( mesh ) {
        var self = this;
        self.$super('setMesh', mesh );
        
        var mesh = self.mesh, vertexArray = mesh.getVertexAttributeList().Vertex, vertices,
            vs = vertexArray ? vertexArray.getElements()||[] : [], vc = vs.length,
            i, j, ii = vertexArray ? vertexArray.getItemSize() : 0, nv, nt;
        
        self.faces = null;
        if ( vc > 0 && ii > 2 )
        {
            self.vertices = vertices = new Array( ceil(vc/ii) );
            for (j=0,i=0; i<vc; i+=ii) vertices[j++] = new VertexOSG( vs, i );
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
        self.mesh.dirty();
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