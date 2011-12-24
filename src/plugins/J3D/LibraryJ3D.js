// J3D specific library interface for MOD3 ---------------------------------------------------------------------------------
MOD3.LibraryJ3D=function()
{
	this.id="J3D";
	this.meshClass=MOD3.MeshJ3D;
	this.vertexClass=MOD3.VertexJ3D;
};
MOD3.LibraryJ3D.prototype=new MOD3.Library3d();
MOD3.LibraryJ3D.prototype.constructor=MOD3.LibraryJ3D;