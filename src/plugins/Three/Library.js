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
        var self = this;
        self.id = "Three.js";
        self.meshClass = MOD3.MeshThree;
        self.vertexClass = MOD3.VertexThree;
    }
});

// export it, singleton
MOD3.LibraryThree = new LibraryThree( );

}(MOD3);