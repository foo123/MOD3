/**
*
* MOD3  Plugin for Copperlicht
*
*
**/
(function(MOD3, undef){
    
    var LibraryCopperlicht = Class( MOD3.Library3d,
    {
        constructor : function() {
            this.id = "Copperlicht";
            this.meshClass = MOD3.MeshCopperlicht;
            this.vertexClass = MOD3.VertexCopperlicht;
        }
    });
    // export it, singleton
    MOD3.LibraryCopperlicht = new LibraryCopperlicht();
    
})(MOD3);