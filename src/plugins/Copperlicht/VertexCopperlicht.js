// Vertex for Copperlicht class --------------------------------------------------------------------------------------------------
(function(MOD3){
    MOD3.VertexCopperlicht=function(node, buffer)
    {
        this.node=node;
        this.buffer=buffer;
    };      
    MOD3.VertexCopperlicht.prototype=new MOD3.VertexProxy();
    MOD3.VertexCopperlicht.prototype.constructor=MOD3.VertexCopperlicht;
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
        var prev=this.vertex.Pos.X;
        this.vertex.Pos.X=v;
        if (prev!=v) this.buffer.update(true);
    };
    MOD3.VertexCopperlicht.prototype.setY=function(v)
    {
        var prev=this.vertex.Pos.Y;
        this.vertex.Pos.Y=v;
        if (prev!=v) this.buffer.update(true);
    };
    MOD3.VertexCopperlicht.prototype.setZ=function(v)
    {
        var prev=this.vertex.Pos.Z;
        this.vertex.Pos.Z=v;
        if (prev!=v) this.buffer.update(true);
    };
})(MOD3);