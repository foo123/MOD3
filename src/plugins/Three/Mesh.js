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
            this.$super('constructor', mesh );
            this.name = "MeshThree";
        },
        
        setMesh: function( mesh ) {
            this.$super('setMesh', mesh );
            
            var i = 0,
                mesh = this.mesh, vertices = this.vertices,
                vs = mesh.geometry.vertices, vc = vs.length,
                ts = mesh.geometry.faces, tc = ts.length,
                nv, nt;
            
            // optimize loop using while
            i = 0;
            while ( i < vc )
            {
                nv = new VertexThree( mesh, vs[ i ] );
                vertices.push( nv );
                i++;
            }
            
            this.faces = null;
            
            return this;
        },
        
        // use a batch update, instead of update vertex by vertex (faster??)
        update: function( )  {
            var geometry = this.mesh.geometry;
            geometry.verticesNeedUpdate = true;
            geometry.normalsNeedUpdate = true;
            geometry.buffersNeedUpdate = true;
            geometry.dynamic = true;
            
            return this;
        },

        updateMeshPosition: function( p ) {
            var position = this.mesh.position, xyz = p.xyz;
            position.x += xyz[0];
            position.y += xyz[1];
            position.z += xyz[2];
            
            return this;
        }
    });
    
}(MOD3);