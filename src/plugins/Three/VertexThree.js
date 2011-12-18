// Vertex for Three.js class --------------------------------------------------------------------------------------------------
MOD3.VertexThree=function()
{
};		
MOD3.VertexThree.prototype=new MOD3.VertexProxy();
MOD3.VertexThree.prototype.setVertex=function(vertex)
{
	this.vertex=vertex;
	this.originalX=vertex.position.x;
	this.originalY=vertex.position.y;
	this.originalZ=vertex.position.z;
};
MOD3.VertexThree.prototype.getX=function(){return this.vertex.position.x;};
MOD3.VertexThree.prototype.getY=function(){return this.vertex.position.y;};
MOD3.VertexThree.prototype.getZ=function(){return this.vertex.position.z;};
MOD3.VertexThree.prototype.setX=function(v){this.vertex.position.x=v;};
MOD3.VertexThree.prototype.setY=function(v){this.vertex.position.y=v;};
MOD3.VertexThree.prototype.setZ=function(v){this.vertex.position.z=v;};
