/**
*
* MOD3  Plugin for J3D
*
*
**/
!function(MOD3, undef){
@@USE_STRICT@@

var LibraryJ3D = MOD3.Class( MOD3.Library3d, {
    
    constructor: function( ) {
        var self = this;
        self.id = "J3D";
        self.meshClass = MOD3.MeshJ3D;
        self.vertexClass = MOD3.VertexJ3D;
    }
});

// export it, singleton
MOD3.LibraryJ3D = new LibraryJ3D( );

}(MOD3);