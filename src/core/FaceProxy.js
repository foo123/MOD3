// Face Proxy class ----------------------------------------------------------------------------------------------------------------------
(function(MOD3){
    MOD3.FaceProxy=function()
    {
        this.vertices=[];
    };
    MOD3.FaceProxy.prototype.addVertex=function(v)
    {
        this.vertices.push(v);
    };
    MOD3.FaceProxy.prototype.getVertices=function()
    {
        return this.vertices;
    };
})(MOD3);