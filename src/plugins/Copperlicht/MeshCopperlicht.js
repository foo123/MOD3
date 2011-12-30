// Mesh for Copperlicht Class -------------------------------------------------------------------------------------------------------------------
MOD3.MeshCopperlicht=function()
{
};
MOD3.MeshCopperlicht.prototype=new MOD3.MeshProxy();
MOD3.MeshCopperlicht.prototype.setMesh=function(mesh)
{
	//this.mesh = mesh;
	MOD3.MeshProxy.prototype.setMesh.call(this, mesh);
	var lookUp = [];
	var buffers=this.mesh.getMesh().GetMeshBuffers();
	var vs=[];
	for (var b=0; b<buffers.length; b++)
	{
	vs=buffers[b].Vertices;
	//var ts = this.mesh.geometry.faces;
	var vc = vs.length;
	//var tc = ts.length;
	for (var i = 0; i < vc; i++) {
		var nv = new MOD3.VertexCopperlicht(this.mesh,buffers[b]);
		nv.setVertex(vs[i]);
		this.vertices.push(nv);
		//lookUp[vs[i]] = nv;
	}
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
MOD3.MeshCopperlicht.prototype.updateMeshPosition=function(p)
{
	this.mesh.Pos.X += p.x;
	this.mesh.Pos.Y += p.y;
	this.mesh.Pos.Z += p.z;
};
