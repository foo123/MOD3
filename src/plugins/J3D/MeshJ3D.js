// Mesh for J3D Class -------------------------------------------------------------------------------------------------------------------
(function(MOD3){
    MOD3.MeshJ3D=function() { };
    MOD3.MeshJ3D.prototype=new MOD3.MeshProxy();
    MOD3.MeshJ3D.prototype.setMesh=function(mesh)
    {
        //this.mesh = mesh;
        MOD3.MeshProxy.prototype.setMesh.call(this, mesh);
        var i =0;
        var vs = mesh.geometry.vertexPositionBuffer.data, vc = vs.length;
        var ii = mesh.geometry.vertexPositionBuffer.itemSize;
        var nv;
        
        // optimize loop using while
        i=0;
        while (i < vc)
        {
            nv = new MOD3.VertexJ3D(mesh.geometry);
            nv.setVertex(i);
            this.vertices.push(nv);
            i+=ii;
        }
        
        this.faces=null;
    };
    MOD3.MeshJ3D.prototype.updateMeshPosition=function(p)
    {
        var mesh = this.mesh;
        mesh.position.x += p.x;
        mesh.position.y += p.y;
        mesh.position.z += p.z;
    };
})(MOD3);