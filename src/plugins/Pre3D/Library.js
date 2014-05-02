/**
*
* MOD3  Plugin for Pre3D
*
*
**/
!function(MOD3, undef){
    
    @@USE_STRICT@@
    
    var LibraryPre3D = MOD3.Class( MOD3.Library3d, {
        
        constructor: function( ) {
            this.id = "pre3d.js";
            this.meshClass = MOD3.MeshPre3D;
            this.vertexClass = MOD3.VertexPre3D;
        }
    });
    // export it, singleton
    MOD3.LibraryPre3D = new LibraryPre3D( );
    
}(MOD3);