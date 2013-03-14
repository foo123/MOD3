// Vertex for Three.js class --------------------------------------------------------------------------------------------------
(function(MOD3){
    MOD3.VertexThree=function(mesh)
    {
        this.mesh=mesh;
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
    MOD3.VertexThree.prototype.setX=function(v)
    {
    this.vertex.position.x=v;
    this.mesh.geometry.__dirtyVertices = true;
    this.mesh.geometry.__dirtyNormals = true;
    this.mesh.geometry.dynamic = true;
    };
    MOD3.VertexThree.prototype.setY=function(v)
    {
    this.vertex.position.y=v;
    this.mesh.geometry.__dirtyVertices = true;
    this.mesh.geometry.__dirtyNormals = true;
    this.mesh.geometry.dynamic = true;
    };
    MOD3.VertexThree.prototype.setZ=function(v)
    {
    this.vertex.position.z=v;
    this.mesh.geometry.__dirtyVertices = true;
    this.mesh.geometry.__dirtyNormals = true;
    this.mesh.geometry.dynamic = true;
    };
})(MOD3);