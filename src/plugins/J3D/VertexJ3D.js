// Vertex for J3D class --------------------------------------------------------------------------------------------------
(function(MOD3){
    MOD3.VertexJ3D=function(geometry)
    {
        this.geometry=geometry;
    };      
    MOD3.VertexJ3D.prototype=new MOD3.VertexProxy();
    MOD3.VertexJ3D.prototype.setVertex=function(vertex)
    {
        this.vertex=vertex;
        var geometry = this.geometry;
        this.originalX=geometry.vertexPositionBuffer.data[vertex];
        this.originalY=geometry.vertexPositionBuffer.data[vertex+1];
        this.originalZ=geometry.vertexPositionBuffer.data[vertex+2];
    };
    MOD3.VertexJ3D.prototype.getX=function(){return this.geometry.vertexPositionBuffer.data[this.vertex];};
    MOD3.VertexJ3D.prototype.getY=function(){return this.geometry.vertexPositionBuffer.data[this.vertex+1];};
    MOD3.VertexJ3D.prototype.getZ=function(){return this.geometry.vertexPositionBuffer.data[this.vertex+2];};
    MOD3.VertexJ3D.prototype.setX=function(v)
    {
        var vertex = this.vertex, geometry = this.geometry;
        geometry.vertexPositionBuffer.data[vertex]=v;
        geometry.replaceArray(geometry.vertexPositionBuffer, geometry.vertexPositionBuffer.data);
    };
    MOD3.VertexJ3D.prototype.setY=function(v)
    {
        var vertex = this.vertex, geometry = this.geometry;
        geometry.vertexPositionBuffer.data[vertex+1]=v;
        geometry.replaceArray(geometry.vertexPositionBuffer, geometry.vertexPositionBuffer.data);
    };
    MOD3.VertexJ3D.prototype.setZ=function(v)
    {
        var vertex = this.vertex, geometry = this.geometry;
        geometry.vertexPositionBuffer.data[vertex+2]=v;
        geometry.replaceArray(geometry.vertexPositionBuffer, geometry.vertexPositionBuffer.data);
    };
})(MOD3);