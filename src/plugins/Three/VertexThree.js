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
        var mesh = this.mesh;
        mesh.geometry.verticesNeedUpdate = true;
        mesh.geometry.normalsNeedUpdate = true;
        mesh.geometry.buffersNeedUpdate = true;
        mesh.geometry.dynamic = true;
    };
    MOD3.VertexThree.prototype.setY=function(v)
    {
        this.vertex.y=v;
        var mesh = this.mesh;
        mesh.geometry.verticesNeedUpdate = true;
        mesh.geometry.normalsNeedUpdate = true;
        mesh.geometry.buffersNeedUpdate = true;
        mesh.geometry.dynamic = true;
    };
    MOD3.VertexThree.prototype.setZ=function(v)
    {
        this.vertex.z=v;
        var mesh = this.mesh;
        mesh.geometry.verticesNeedUpdate = true;
        mesh.geometry.normalsNeedUpdate = true;
        mesh.geometry.buffersNeedUpdate = true;
        mesh.geometry.dynamic = true;
    };
})(MOD3);