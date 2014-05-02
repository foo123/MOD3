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
            this.$super('constructor', mesh );
            this.name = "MeshCubicVR";
        },
        
        setMesh: function( sceneObject )  {
            this.$super('setMesh', sceneObject/*.obj*/ );
            
            var i = 0,
                vs = sceneObject.obj.points, vc = vs.length,
                ts = sceneObject.obj.faces, tc = ts.length,
                vertices = this.vertices, 
                nv, nt;
            
            // optimize loop using while
            i = 0;
            while ( i < vc )
            {
                nv = new VertexCubicVR( sceneObject, vs[i] );
                vertices.push( nv );
                i++;
            }
            
            this.faces = null;
            
            return this;
        },
        
        // use a batch update, instead of update vertex by vertex (faster??)
        update: function( )  {
            this.mesh.dirty = true;
            
            return this;
        },

        updateMeshPosition: function( p ) {
            var position = this.mesh.position, xyz = p.xyz;
            position[0] += xyz[0];
            position[1] += xyz[1];
            position[2] += xyz[2];
            
            return this;
        }
    });
    
}(MOD3);