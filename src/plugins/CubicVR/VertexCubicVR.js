// Vertex for CubicVR Lib --------------------------------------------------------------------------------------------------
(function(MOD3){
    MOD3.VertexCubicVR=function(sceneObject)
    {
        this.sceneObject=sceneObject;
    };      
    MOD3.VertexCubicVR.prototype=new MOD3.VertexProxy();
    MOD3.VertexCubicVR.prototype.constructor=MOD3.VertexCubicVR;
    MOD3.VertexCubicVR.prototype.setVertex=function(vertex)
    {
        /* Three js uses vector3 now instead of vertex */
        this.vertex=vertex;
        this.originalX=vertex[0]
        this.originalY=vertex[1];
        this.originalZ=vertex[2];
    };
    MOD3.VertexCubicVR.prototype.getX=function(){return this.vertex[0];};
    MOD3.VertexCubicVR.prototype.getY=function(){return this.vertex[1];};
    MOD3.VertexCubicVR.prototype.getZ=function(){return this.vertex[2];};
    MOD3.VertexCubicVR.prototype.setX=function(v)
    {
        if (v!=this.vertex[0]) this.sceneObject.dirty=true;
        this.vertex[0]=v;
    };
    MOD3.VertexCubicVR.prototype.setY=function(v)
    {
        if (v!=this.vertex[1]) this.sceneObject.dirty=true;
        this.vertex[1]=v;
    };
    MOD3.VertexCubicVR.prototype.setZ=function(v)
    {
        if (v!=this.vertex[2]) this.sceneObject.dirty=true;
        this.vertex[2]=v;
    };
})(MOD3);