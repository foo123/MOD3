/**
*
* MOD3  Pre3D Mesh Class
*
*
**/
(function(MOD3, undef){
    
    var VertexPre3D=MOD3.VertexPre3D,
        FaceProxy=MOD3.FaceProxy
    ;
    
    var MeshPre3D = MOD3.MeshPre3D = MOD3.Extends( MOD3.MeshProxy,
    {
        constructor : function(mesh) { 
            this.superCall('constructor', mesh );
        },
        
        setMesh : function(mesh) {
            this.superCall('setMesh', mesh );
            
            var /*lookUp = [],*/ i,
                vs = this.mesh.vertices,
                ts = this.mesh.quads,
                vc = vs.length,
                tc = ts.length,
                vertices = this.vertices, //faces = this.faces,
                nv, nt
            ;
            
            for (i = 0; i < vc; i++) 
            {
                nv = new VertexPre3D(vs[i]);
                vertices.push(nv);
                //lookUp[vs[i]] = nv;
            }
            
            /*for (i = 0; i < tc; i++) 
            {
                nt = new MOD3.FaceProxy();
                if (ts[i] instanceof Pre3d.QuadFace)
                {
                    nt.addVertex(lookUp[vs[ts[i].i0]]);
                    nt.addVertex(lookUp[vs[ts[i].i1]]);
                    nt.addVertex(lookUp[vs[ts[i].i2]]);
                    if (null != ts[i].i3)
                        nt.addVertex(lookUp[vs[ts[i].i3]]);
                }
                faces.push(nt);
            }
            delete lookup;*/
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
    
})(MOD3);