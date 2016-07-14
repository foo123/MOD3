/**
*
* MOD3  Plugin for CubicVR.js
*
*
**/
!function(MOD3, undef){
@@USE_STRICT@@

var LibraryCubicVR = MOD3.Class( MOD3.Library3d, {
    
    constructor: function( ) {
        var self = this;
        self.id = "CubicVR.js";
        self.meshClass = MOD3.MeshCubicVR;
        self.vertexClass = MOD3.VertexCubicVR;
    }
});
// export it, singleton
MOD3.LibraryCubicVR = new LibraryCubicVR( );

}(MOD3);