/**
*
* MOD3  Three.js Mesh Class
*
*
**/
(function(MOD3, undef){
    
    var VertexThree=MOD3.VertexThree,
        FaceProxy=MOD3.FaceProxy
    ;
    
    var MeshThree = MOD3.MeshThree = MOD3.Extends( MOD3.MeshProxy,
    {
        constructor : function(mesh) { 
            this.superCall('constructor', mesh );
        },
        
        setMesh : function(mesh) {
            this.superCall('setMesh', mesh );
            
            var /*lookUp = [],*/ i =0,
                mesh = this.mesh, vertices = this.vertices, //faces = this.faces,
                vs = mesh.geometry.vertices, vc = vs.length,
                ts = mesh.geometry.faces, tc = ts.length,
                nv, nt;
            
            // optimize loop using while
            i=0;
            while (i < vc)
            {
                nv = new VertexThree(mesh, vs[i]);
                vertices.push(nv);
                //lookUp[ vs[i] ] = nv;
                i++;
            }
            
            // optimize loop using while
            /*i=0;
            while (i < tc)
            {
                nt = new FaceProxy();
                if (ts[i] instanceof THREE.Face3)
                {
                    nt.addVertex(lookUp[vs[ts[i].a]]);
                    nt.addVertex(lookUp[vs[ts[i].b]]);
                    nt.addVertex(lookUp[vs[ts[i].c]]);
                }
                else if (ts[i] instanceof THREE.Face4)
                {
                    nt.addVertex(lookUp[vs[ts[i].a]]);
                    nt.addVertex(lookUp[vs[ts[i].b]]);
                    nt.addVertex(lookUp[vs[ts[i].c]]);
                    nt.addVertex(lookUp[vs[ts[i].d]]);
                }
                faces.push(nt);
                i++;
            }
            delete lookup;*/
            this.faces = null;
            
            return this;
        },
        
        // use a batch update, instead of update vertex by vertex (faster??)
        update : function()  {
            var geometry = this.mesh.geometry;
            geometry.verticesNeedUpdate = true;
            geometry.normalsNeedUpdate = true;
            geometry.buffersNeedUpdate = true;
            geometry.dynamic = true;
            
            return this;
        },

        updateMeshPosition : function(p) {
            var position = this.mesh.position, xyz = p.xyz;
            position.x += xyz[0];
            position.y += xyz[1];
            position.z += xyz[2];
            
            return this;
        }
    });
    
})(MOD3);