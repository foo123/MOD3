/**
*
* MOD3  Copperlicht Mesh Class
*
*
**/
!function(MOD3){
@@USE_STRICT@@

var VertexCopperlicht = MOD3.VertexCopperlicht,
    FaceProxy = MOD3.FaceProxy,
    each = MOD3.List.each
;

var MeshCopperlicht = MOD3.MeshCopperlicht = MOD3.Class( MOD3.MeshProxy, {
    
    constructor: function( mesh ) { 
        var self = this;
        self.$super('constructor', mesh );
        self.name = "MeshCopperlicht";
    },
    
    setMesh: function( mesh ) {
        var self = this;
        self.$super('setMesh', mesh );
        
        var i, b, bl,
            buffers = self.mesh.getMesh().GetMeshBuffers(),
            vertices = self.vertices,
            vs=[], vc, nv;
            
        self.faces = null;
        for (b=0,bl=buffers.length; b<bl; b++)
        {
            vs = buffers[b].Vertices;
            for (i=0, vc=vs.length; i<vc; i++) 
            {
                nv = new VertexCopperlicht( self.mesh, buffers[b], vs[i] );
                vertices.push( nv );
            }
        }
        
        return self;
    },
    
    // use a batch update, instead of update vertex by vertex (faster??)
    update: function( )  {
        var self = this;
        each(self.mesh.getMesh().GetMeshBuffers(), function( b ){ b.update( true ); });
        return self;
    },

    updateMeshPosition: function( p ) {
        var self = this,
            Pos = self.mesh.Pos, xyz = p.xyz;
        Pos.X += xyz[0];
        Pos.Y += xyz[1];
        Pos.Z += xyz[2];
        
        return self;
    }
});

}(MOD3);