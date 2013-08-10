// Mesh for CubicVR Lib -------------------------------------------------------------------------------------------------------------------
(function(MOD3){
    MOD3.MeshCubicVR=function() { };
    MOD3.MeshCubicVR.prototype=new MOD3.MeshProxy();
    MOD3.MeshCubicVR.prototype.setMesh=function(sceneobj)
    {
        this.sceneObject=sceneobj;
        MOD3.MeshProxy.prototype.setMesh.call(this, sceneobj.obj);
        var lookUp = [], i =0;
        var vs = sceneobj.obj.points, vc = vs.length;
        var ts = sceneobj.obj.faces, tc = ts.length;
        var nv, nt;
        
        // optimize loop using while
        i=0;
        while (i < vc)
        {
            nv = new MOD3.VertexCubicVR(sceneobj);
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
            for (var pt=0, ptl=ts[i].points.length; pt<ptl; pt++)
            {
                nt.addVertex(lookUp[vs[ts[i].points[pt]]]);
            }
            this.faces.push(nt);
            i++;
        }
        delete lookup;
    };
    MOD3.MeshCubicVR.prototype.updateMeshPosition=function(p)
    {
        this.sceneObject.position[0] += p[0];
        this.sceneObject.position[1] += p[1];
        this.sceneObject.position[2] += p[2];
    };
})(MOD3);