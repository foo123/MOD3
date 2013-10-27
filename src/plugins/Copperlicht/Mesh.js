/**
*
* MOD3  Copperlicht Mesh Class
*
*
**/
(function(MOD3){
    
    var VertexCopperlicht=MOD3.VertexCopperlicht,
        FaceProxy=MOD3.FaceProxy
    ;
    
    var MeshCopperlicht = MOD3.MeshCopperlicht = MOD3.Extends( MOD3.MeshProxy,
    {
        constructor : function(mesh) { 
            this.superCall('constructor', mesh );
        },
        
        setMesh : function(mesh) {
            this.superCall('setMesh', mesh );
            
            var i, b, bl,
                buffers = this.mesh.getMesh().GetMeshBuffers(),
                vertices = this.vertices,
                vs=[], vc, nv;
                
            for (b = 0, bl = buffers.length; b<bl; b++)
            {
                vs = buffers[b].Vertices;
                for (i = 0, vc = vs.length; i < vc; i++) 
                {
                    nv = new VertexCopperlicht(this.mesh, buffers[b], vs[i]);
                    vertices.push(nv);
                }
            }
            this.faces = null;
            
            return this;
        },
        
        // use a batch update, instead of update vertex by vertex (faster??)
        update : function()  {
            var buffers=this.mesh.getMesh().GetMeshBuffers(), 
                l=buffers.length, i=0;
            
            while (i<l)
            {
                buffers[i].update(true);
                i++;
            }
            
            return this;
        },

        updateMeshPosition : function(p) {
            var Pos = this.mesh.Pos, xyz = p.xyz;
            Pos.X += xyz[0];
            Pos.Y += xyz[1];
            Pos.Z += xyz[2];
            
            return this;
        }
    });
    
})(MOD3);