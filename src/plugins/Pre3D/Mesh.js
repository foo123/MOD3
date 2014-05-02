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
            this.$super('constructor', mesh );
            this.name = "MeshPre3D";
        },
        
        setMesh: function( mesh ) {
            this.$super('setMesh', mesh );
            
            var i,
                vs = this.mesh.vertices,
                ts = this.mesh.quads,
                vc = vs.length,
                tc = ts.length,
                vertices = this.vertices,
                nv, nt
            ;
            
            for (i = 0; i < vc; i++) 
            {
                nv = new VertexPre3D( vs[i] );
                vertices.push( nv );
            }
            
            this.faces = null;
            
            return this;
        }//,
        
        // Pre3D does not support this operation
        /*updateMeshPosition : function(p) {
            /*this.mesh.position.x += p.x;
            this.mesh.position.y += p.y;
            this.mesh.position.z += p.z;* /
            
            return this;
        }*/
    });
    
}(MOD3);