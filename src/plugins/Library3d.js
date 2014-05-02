/**
*
* MOD3  Library3D Super Class
*
*
**/
!function(MOD3, undef){
    
    @@USE_STRICT@@
    
    var Library3d = MOD3.Library3d = MOD3.Class({
        
        constructor: function( ) {
            this.id = '';
            this.meshClass = null;
            this.vertexClass = null;
        },
        
        id: '',
        meshClass: null,
        vertexClass: null
    });
    
    var PluginFactory = MOD3.PluginFactory = MOD3.StaticClass({
        
        getMeshProxy: function( lib3d ) {
            var MeshProxyClass = lib3d.meshClass;
            return (MeshProxyClass) ? new MeshProxyClass( ) : null;
        }
    });
    
}(MOD3);