/**
*
* MOD3  Plugin for Three.js
*
*
**/
!function(MOD3, undef){
    
    @@USE_STRICT@@
    
    var LibraryThree = MOD3.Class( MOD3.Library3d, {
        
        constructor: function( ) {
            this.id = "Three.js";
            this.meshClass = MOD3.MeshThree;
            this.vertexClass = MOD3.VertexThree;
        }
    });
    
    // export it, singleton
    MOD3.LibraryThree = new LibraryThree( );
    
}(MOD3);