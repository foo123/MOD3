// Vertex for Three.js class --------------------------------------------------------------------------------------------------
(function(MOD3){
    MOD3.VertexThree=function(mesh)
    {
        this.mesh=mesh;
    };      
    MOD3.VertexThree.prototype=new MOD3.VertexProxy();
    MOD3.VertexThree.prototype.setVertex=function(vertex)
    {
        /* Three js uses vector3 now instead of vertex */
        this.vertex=vertex;
        this.originalX=vertex.x;
        this.originalY=vertex.y;
        this.originalZ=vertex.z;
    };
    MOD3.VertexThree.prototype.getX=function(){return this.vertex.x;};
    MOD3.VertexThree.prototype.getY=function(){return this.vertex.y;};
    MOD3.VertexThree.prototype.getZ=function(){return this.vertex.z;};
    MOD3.VertexThree.prototype.setX=function(v)
    {
    this.vertex.x=v;
    this.mesh.geometry.verticesNeedUpdate = true;
    this.mesh.geometry.normalsNeedUpdate = true;
    this.mesh.geometry.buffersNeedUpdate = true;
    this.mesh.geometry.dynamic = true;
    };
    MOD3.VertexThree.prototype.setY=function(v)
    {
    this.vertex.y=v;
    this.mesh.geometry.verticesNeedUpdate = true;
    this.mesh.geometry.normalsNeedUpdate = true;
    this.mesh.geometry.buffersNeedUpdate = true;
    this.mesh.geometry.dynamic = true;
    };
    MOD3.VertexThree.prototype.setZ=function(v)
    {
    this.vertex.z=v;
    this.mesh.geometry.verticesNeedUpdate = true;
    this.mesh.geometry.normalsNeedUpdate = true;
    this.mesh.geometry.buffersNeedUpdate = true;
    this.mesh.geometry.dynamic = true;
    };
})(MOD3);