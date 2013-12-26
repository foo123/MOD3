/**
*
* MOD3  Plugin for CubicVR.js
*
*
**/
(function(MOD3, undef){
    
    var LibraryCubicVR = Class( MOD3.Library3d,
    {
        constructor : function() {
            this.id = "CubicVR.js";
            this.meshClass = MOD3.MeshCubicVR;
            this.vertexClass = MOD3.VertexCubicVR;
        }
    });
    // export it, singleton
    MOD3.LibraryCubicVR = new LibraryCubicVR();
    
})(MOD3);