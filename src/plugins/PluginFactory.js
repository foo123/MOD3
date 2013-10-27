/**
*
* MOD3  3D Plugin Factory Pattern Class
*
*
**/
(function(MOD3, undef){
    
    var PluginFactory = MOD3.PluginFactory = {
        
        getMeshProxy : function(lib3d) {
            var MeshProxyClass = lib3d.meshClass;
            return (MeshProxyClass) ? new MeshProxyClass() : null;
        }
    };
    
})(MOD3);