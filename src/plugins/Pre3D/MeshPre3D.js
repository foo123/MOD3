// Mesh for Three.js Class -------------------------------------------------------------------------------------------------------------------
MOD3.MeshPre3D=function()
{
};
MOD3.MeshPre3D.prototype=new MOD3.MeshProxy();
MOD3.MeshPre3D.prototype.setMesh=function(mesh)
{
	//this.mesh = mesh;
	MOD3.MeshProxy.prototype.setMesh.call(this, mesh);
	var lookUp = [];
	var vs = this.mesh.vertices;
	var ts = this.mesh.quads;
	var vc = vs.length;
	var tc = ts.length;
	for (var i = 0; i < vc; i++) {
		var nv = new MOD3.VertexPre3D();
		nv.setVertex(vs[i]);
		this.vertices.push(nv);
		lookUp[vs[i]] = nv;
	}
	
	for (i = 0; i < tc; i++) {
		var nt = new MOD3.FaceProxy();
		if (ts[i] instanceof Pre3d.QuadFace)
		{
			nt.addVertex(lookUp[vs[ts[i].i0]]);
			nt.addVertex(lookUp[vs[ts[i].i1]]);
			nt.addVertex(lookUp[vs[ts[i].i2]]);
			if (ts[i].i3!=null)
			nt.addVertex(lookUp[vs[ts[i].i3]]);
		}
		this.faces.push(nt);
	}
	delete lookup;
};
MOD3.MeshPre3D.prototype.updateMeshPosition=function(p)
{
	/*this.mesh.position.x += p.x;
	this.mesh.position.y += p.y;
	this.mesh.position.z += p.z;*/
};
