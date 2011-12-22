// Three.js specific library interface for MOD3 ---------------------------------------------------------------------------------
MOD3.LibraryPre3D=function()
{
	this.id="pre3d.js";
	this.meshClass=MOD3.MeshPre3D;
	this.vertexClass=MOD3.VertexPre3D;
};
MOD3.LibraryThree.prototype=new MOD3.Library3d();
MOD3.LibraryThree.prototype.constructor=MOD3.LibraryPre3D;