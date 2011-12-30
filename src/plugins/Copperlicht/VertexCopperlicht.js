// Vertex for Copperlicht class --------------------------------------------------------------------------------------------------
MOD3.VertexCopperlicht=function(node,buffer)
{
	this.node=node;
	this.buffer=buffer;
	//this.array_index=index;
};		
MOD3.VertexCopperlicht.prototype=new MOD3.VertexProxy();
MOD3.VertexCopperlicht.prototype.setVertex=function(vertex)
{
	this.vertex=vertex;
	this.originalX=this.vertex.Pos.X;
	this.originalY=this.vertex.Pos.Y;
	this.originalZ=this.vertex.Pos.Z;
};
MOD3.VertexCopperlicht.prototype.getX=function(){return this.vertex.Pos.X;};
MOD3.VertexCopperlicht.prototype.getY=function(){return this.vertex.Pos.Y;};
MOD3.VertexCopperlicht.prototype.getZ=function(){return this.vertex.Pos.Z;};
MOD3.VertexCopperlicht.prototype.setX=function(v)
{
	this.vertex.Pos.X=v;
	this.buffer.update(true);
};
MOD3.VertexCopperlicht.prototype.setY=function(v)
{
	this.vertex.Pos.Y=v;
	this.buffer.update(true);
};
MOD3.VertexCopperlicht.prototype.setZ=function(v)
{
	this.vertex.Pos.Z=v;
	this.buffer.update(true);
};
