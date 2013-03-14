// Vertex for J3D class --------------------------------------------------------------------------------------------------
(function(MOD3){
    MOD3.VertexJ3D=function(geometry)
    {
        this.geometry=geometry;
        //this.array_index=index;
    };      
    MOD3.VertexJ3D.prototype=new MOD3.VertexProxy();
    MOD3.VertexJ3D.prototype.setVertex=function(vertex)
    {
        this.vertex=vertex;
        this.originalX=this.geometry.vertexPositionBuffer.data[this.vertex];
        this.originalY=this.geometry.vertexPositionBuffer.data[this.vertex+1];
        this.originalZ=this.geometry.vertexPositionBuffer.data[this.vertex+2];
    };
    MOD3.VertexJ3D.prototype.getX=function(){return this.geometry.vertexPositionBuffer.data[this.vertex];};
    MOD3.VertexJ3D.prototype.getY=function(){return this.geometry.vertexPositionBuffer.data[this.vertex+1];};
    MOD3.VertexJ3D.prototype.getZ=function(){return this.geometry.vertexPositionBuffer.data[this.vertex+2];};
    MOD3.VertexJ3D.prototype.setX=function(v)
    {
        this.geometry.vertexPositionBuffer.data[this.vertex]=v;
        this.geometry.replaceArray(this.geometry.vertexPositionBuffer, this.geometry.vertexPositionBuffer.data);
    };
    MOD3.VertexJ3D.prototype.setY=function(v)
    {
        this.geometry.vertexPositionBuffer.data[this.vertex+1]=v;
        this.geometry.replaceArray(this.geometry.vertexPositionBuffer, this.geometry.vertexPositionBuffer.data);
    };
    MOD3.VertexJ3D.prototype.setZ=function(v)
    {
        this.geometry.vertexPositionBuffer.data[this.vertex+2]=v;
        this.geometry.replaceArray(this.geometry.vertexPositionBuffer, this.geometry.vertexPositionBuffer.data);
    };
})(MOD3);