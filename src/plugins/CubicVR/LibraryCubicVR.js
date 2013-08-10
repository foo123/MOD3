// CubicVR.js specific library interface for MOD3 ---------------------------------------------------------------------------------
(function(MOD3){
    MOD3.LibraryCubicVR=function()
    {
        this.id="CubicVR.js";
        this.meshClass=MOD3.MeshCubicVR;
        this.vertexClass=MOD3.VertexCubicVR;
    };
    MOD3.LibraryCubicVR.prototype=new MOD3.Library3d();
    MOD3.LibraryCubicVR.prototype.constructor=MOD3.LibraryCubicVR;
})(MOD3);