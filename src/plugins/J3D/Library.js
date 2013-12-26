/**
*
* MOD3  Plugin for J3D
*
*
**/
(function(MOD3, undef){
    
    var LibraryJ3D = Class( MOD3.Library3d,
    {
        constructor : function() {
            this.id = "J3D";
            this.meshClass = MOD3.MeshJ3D;
            this.vertexClass = MOD3.VertexJ3D;
        }
    });
    
    // export it, singleton
    MOD3.LibraryJ3D = new LibraryJ3D();
    
})(MOD3);