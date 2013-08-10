// Mesh for Three.js Class -------------------------------------------------------------------------------------------------------------------
(function(MOD3){
    MOD3.MeshThree=function() { };
    MOD3.MeshThree.prototype=new MOD3.MeshProxy();
    MOD3.MeshThree.prototype.setMesh=function(mesh)
    {
        //this.mesh = mesh;
        MOD3.MeshProxy.prototype.setMesh.call(this, mesh);
        var lookUp = [], i =0;
        var vs = this.mesh.geometry.vertices, vc = vs.length;
        var ts = this.mesh.geometry.faces, tc = ts.length;
        var nv, nt;
        
        // optimize loop using while
        i=0;
        while (i < vc)
        {
            nv = new MOD3.VertexThree(this.mesh);
            nv.setVertex(vs[i]);
            this.vertices.push(nv);
            lookUp[vs[i]] = nv;
            i++;
        }
        
        // optimize loop using while
        i=0;
        while (i < tc)
        {
            nt = new MOD3.FaceProxy();
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
            this.faces.push(nt);
            i++;
        }
        delete lookup;
    };
    MOD3.MeshThree.prototype.updateMeshPosition=function(p)
    {
        var mesh = this.mesh;
        mesh.position.x += p.x;
        mesh.position.y += p.y;
        mesh.position.z += p.z;
    };
})(MOD3);