// Vertex for Three.js class --------------------------------------------------------------------------------------------------
(function(MOD3){
    MOD3.VertexThree=function(mesh)
    {
        this.mesh=mesh;
    };      
    MOD3.VertexThree.prototype=new MOD3.VertexProxy();
    MOD3.VertexThree.prototype.constructor=MOD3.VertexThree;
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
        if (v!=this.vertex.x)
        {
            var mesh = this.mesh;
            mesh.geometry.verticesNeedUpdate = true;
            mesh.geometry.normalsNeedUpdate = true;
            mesh.geometry.buffersNeedUpdate = true;
            mesh.geometry.dynamic = true;
        }
        this.vertex.x=v;
    };
    MOD3.VertexThree.prototype.setY=function(v)
    {
        if (v!=this.vertex.y)
        {
            var mesh = this.mesh;
            mesh.geometry.verticesNeedUpdate = true;
            mesh.geometry.normalsNeedUpdate = true;
            mesh.geometry.buffersNeedUpdate = true;
            mesh.geometry.dynamic = true;
        }
        this.vertex.y=v;
    };
    MOD3.VertexThree.prototype.setZ=function(v)
    {
        if (v!=this.vertex.z)
        {
            var mesh = this.mesh;
            mesh.geometry.verticesNeedUpdate = true;
            mesh.geometry.normalsNeedUpdate = true;
            mesh.geometry.buffersNeedUpdate = true;
            mesh.geometry.dynamic = true;
        }
        this.vertex.z=v;
    };
})(MOD3);