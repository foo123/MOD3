/**
*
* MOD3  Plugin for osg.js
*
*
**/
!function(MOD3, undef){
@@USE_STRICT@@

var LibraryOSG = MOD3.Class( MOD3.Library3d, {
    
    constructor: function( ) {
        var self = this;
        self.id = "OSG.js";
        self.meshClass = MOD3.MeshOSG;
        self.vertexClass = MOD3.VertexOSG;
    }
});

// export it, singleton
MOD3.LibraryOSG = new LibraryOSG( );

}(MOD3);