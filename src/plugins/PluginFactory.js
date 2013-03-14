// Plugin Factory for connecting to respective 3D JS LIB ----------------------------------------------------------------
(function(MOD3){
    MOD3.PluginFactory={};
    MOD3.PluginFactory.getMeshProxy=function(lib3d)
    {
        var MeshProxyClass = lib3d.meshClass;
        return new MeshProxyClass();
    };
})(MOD3);