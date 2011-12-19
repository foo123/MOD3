// Mesh Proxy Class -------------------------------------------------------------------------------------------------------------------
MOD3.MeshProxy=function()
{
	this.vertices=null;
	this.faces=null;
	
	this.maxX=null;
	this.maxY=null;
	this.maxZ=null;
	
	this.minX=null;
	this.minY=null;
	this.minZ=null;
	
	this.maxAxis=null;
	this.midAxis=null;
	this.minAxis=null;
	
	this.width=null;
	this.height=null;
	this.depth=null;
	
	this.vertices = [];
	this.faces = [];
	
	this.mesh=null;
};
MOD3.MeshProxy.prototype.getVertices=function()
{
	return this.vertices;
};
MOD3.MeshProxy.prototype.getFaces=function()
{
	return this.faces;
};
MOD3.MeshProxy.prototype.analyzeGeometry=function()
{
	var vc = this.getVertices().length;
	var i;
	var v;
	
	for (i = 0; i < vc; i++) {
		v = this.getVertices()[i];
		
		if (i == 0) {
			this.minX = this.maxX = v.getX();
			this.minY = this.maxY = v.getY();
			this.minZ = this.maxZ = v.getZ();
		} else  {
			this.minX = Math.min(this.minX, v.getX());
			this.minY = Math.min(this.minY, v.getY());
			this.minZ = Math.min(this.minZ, v.getZ());
			
			this.maxX = Math.max(this.maxX, v.getX()); 
			this.maxY = Math.max(this.maxY, v.getY()); 
			this.maxZ = Math.max(this.maxZ, v.getZ()); 
		}
		
		v.setOriginalPosition(v.getX(), v.getY(), v.getZ());
	}
	
	this.width = this.maxX - this.minX;
	this.height = this.maxY - this.minY;
	this.depth = this.maxZ - this.minZ;
	
	var maxe = Math.max(this.width, Math.max(this.height, this.depth));
	var mine = Math.min(this.width, Math.min(this.height, this.depth));
	
	if (maxe == this.width && mine == this.height) {
		this.minAxis = MOD3.ModConstant.Y;
		this.midAxis = MOD3.ModConstant.Z;
		this.maxAxis = MOD3.ModConstant.X;
	} else if (maxe == this.width && mine == this.depth) {
		this.minAxis = MOD3.ModConstant.Z;
		this.midAxis = MOD3.ModConstant.Y;
		this.maxAxis = MOD3.ModConstant.X;
	} else if (maxe == this.height && mine == this.width) {
		this.minAxis = MOD3.ModConstant.X;
		this.midAxis = MOD3.ModConstant.Z;
		this.maxAxis = MOD3.ModConstant.Y;
	} else if (maxe == this.height && mine == this.depth) {
		this.minAxis = MOD3.ModConstant.Z;
		this.midAxis = MOD3.ModConstant.X;
		this.maxAxis = MOD3.ModConstant.Y;
	} else if (maxe == this.depth && mine == this.width) {
		this.minAxis = MOD3.ModConstant.X;
		this.midAxis = MOD3.ModConstant.Y;
		this.maxAxis = MOD3.ModConstant.Z;
	} else if (maxe == this.depth && mine == this.height) {
		this.minAxis = MOD3.ModConstant.Y;
		this.midAxis = MOD3.ModConstant.X;
		this.maxAxis = MOD3.ModConstant.Z;
	}
	
	for (i = 0; i < vc; i++) {
		v = this.getVertices()[i];
		v.setRatios((v.getX() - this.minX) / this.width, (v.getY() - this.minY) / this.height, (v.getZ() - this.minZ) / this.depth);
	}
};
MOD3.MeshProxy.prototype.resetGeometry=function()
{
	var vc = this.getVertices().length;
	for (var i = 0; i < vc; i++) {
		var v = this.getVertices()[i];
		v.reset();
	}
};
MOD3.MeshProxy.prototype.collapseGeometry=function()
{
	var vc = this.getVertices().length;
	for (var i = 0; i < vc; i++) {
		var v = this.getVertices()[i];
		v.collapse();
	}
	this.analyzeGeometry();
};
MOD3.MeshProxy.prototype.getMin=function(axis)
{
	switch(axis) {
		case MOD3.ModConstant.X: return this.minX;
		case MOD3.ModConstant.Y: return this.minY;
		case MOD3.ModConstant.Z: return this.minZ;
	}
	return -1;
};
MOD3.MeshProxy.prototype.getMax=function(axis)
{
	switch(axis) {
		case MOD3.ModConstant.X: return this.maxX;
		case MOD3.ModConstant.Y: return this.maxY;
		case MOD3.ModConstant.Z: return this.maxZ;
	}
	return -1;
};
MOD3.MeshProxy.prototype.getSize=function(axis)
{
	switch(axis) {
		case MOD3.ModConstant.X: return this.width;
		case MOD3.ModConstant.Y: return this.height;
		case MOD3.ModConstant.Z: return this.depth;
	}
	return -1;
};
MOD3.MeshProxy.prototype.setMesh=function(mesh)
{
	this.mesh = mesh;
	// it seems to work correctly only by resetting the values, else previous values are kept
	this.vertices=[];
	this.faces=[];
};
MOD3.MeshProxy.prototype.postApply=function()
{
// do nothing
};
MOD3.MeshProxy.prototype.updateMeshPosition=function(p)
{
// do nothing
};
