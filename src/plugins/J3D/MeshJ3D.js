// Mesh for J3D Class -------------------------------------------------------------------------------------------------------------------
(function(MOD3){
    MOD3.MeshJ3D=function()
    {
    };
    MOD3.MeshJ3D.prototype=new MOD3.MeshProxy();
    MOD3.MeshJ3D.prototype.setMesh=function(mesh)
    {
        //this.mesh = mesh;
        MOD3.MeshProxy.prototype.setMesh.call(this, mesh);
        var lookUp = [];
        var vs = this.mesh.geometry.vertexPositionBuffer.data;
        var ii=this.mesh.geometry.vertexPositionBuffer.itemSize;
        //var ts = this.mesh.geometry.faces;
        var vc = vs.length;
        //var tc = ts.length;
        for (var i = 0; i < vc; i+=ii) {
            var nv = new MOD3.VertexJ3D(this.mesh.geometry);
            nv.setVertex(i);
            this.vertices.push(nv);
            //lookUp[vs[i]] = nv;
        }
        
        /*for (i = 0; i < tc; i++) {
            var nt = new MOD3.FaceProxy();
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
        }*/
        this.faces=null;
        delete lookup;
    };
    MOD3.MeshJ3D.prototype.updateMeshPosition=function(p)
    {
        this.mesh.position.x += p.x;
        this.mesh.position.y += p.y;
        this.mesh.position.z += p.z;
    };
})(MOD3);