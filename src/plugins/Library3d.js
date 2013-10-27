/**
*
* MOD3  Library3D Super Class
*
*
**/
(function(MOD3, undef){
    
    var Library3d = MOD3.Library3d = MOD3.Extends( Object,
    {
        constructor : function() {
            this.id = '';
            this.meshClass = null;
            this.vertexClass = null;
        },
        
        id : '',
        meshClass : null,
        vertexClass : null
    });
    
})(MOD3);