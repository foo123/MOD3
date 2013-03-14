// Three.js specific library interface for MOD3 ---------------------------------------------------------------------------------
(function(MOD3){
    MOD3.LibraryThree=function()
    {
        this.id="Three.js";
        this.meshClass=MOD3.MeshThree;
        this.vertexClass=MOD3.VertexThree;
    };
    MOD3.LibraryThree.prototype=new MOD3.Library3d();
    MOD3.LibraryThree.prototype.constructor=MOD3.LibraryThree;
})(MOD3);