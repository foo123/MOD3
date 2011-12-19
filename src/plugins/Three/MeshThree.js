// Mesh for Three.js Class -------------------------------------------------------------------------------------------------------------------
MOD3.MeshThree=function()
{
};
MOD3.MeshThree.prototype=new MOD3.MeshProxy();
MOD3.MeshThree.prototype.setMesh=function(mesh)
{
	//this.mesh = mesh;
	MOD3.MeshProxy.prototype.setMesh.call(this, mesh);
	var lookUp = [];
	var vs = this.mesh.geometry.vertices;
	var ts = this.mesh.geometry.faces;
	var vc = vs.length;
	var tc = ts.length;
	for (var i = 0; i < vc; i++) {
		var nv = new MOD3.VertexThree();
		nv.setVertex(vs[i]);
		this.vertices.push(nv);
		lookUp[vs[i]] = nv;
	}
	
	for (i = 0; i < tc; i++) {
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
	}
	delete lookup;
};
MOD3.MeshThree.prototype.updateMeshPosition=function(p)
{
	this.mesh.position.x += p.x;
	this.mesh.position.y += p.y;
	this.mesh.position.z += p.z;
};
