// Vertex for Three.js class --------------------------------------------------------------------------------------------------
(function(MOD3){
    MOD3.VertexPre3D=function()
    {
    };      
    MOD3.VertexPre3D.prototype=new MOD3.VertexProxy();
    MOD3.VertexPre3D.prototype.setVertex=function(vertex)
    {
        this.vertex=vertex;
        this.originalX=vertex.x;
        this.originalY=vertex.y;
        this.originalZ=vertex.z;
    };
    MOD3.VertexPre3D.prototype.getX=function(){return this.vertex.x;};
    MOD3.VertexPre3D.prototype.getY=function(){return this.vertex.y;};
    MOD3.VertexPre3D.prototype.getZ=function(){return this.vertex.z;};
    MOD3.VertexPre3D.prototype.setX=function(v){this.vertex.x=v;};
    MOD3.VertexPre3D.prototype.setY=function(v){this.vertex.y=v;};
    MOD3.VertexPre3D.prototype.setZ=function(v){this.vertex.z=v;};
})(MOD3);