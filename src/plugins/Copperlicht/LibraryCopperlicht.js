// Copperlicht specific library interface for MOD3 ---------------------------------------------------------------------------------
MOD3.LibraryCopperlicht=function()
{
	this.id="Copperlicht";
	this.meshClass=MOD3.MeshCopperlicht;
	this.vertexClass=MOD3.VertexCopperlicht;
};
MOD3.LibraryCopperlicht.prototype=new MOD3.Library3d();
MOD3.LibraryCopperlicht.prototype.constructor=MOD3.LibraryCopperlicht;