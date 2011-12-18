// Plugin Factory for connecting to respective 3D JS LIB ----------------------------------------------------------------
MOD3.PluginFactory={};
MOD3.PluginFactory.getMeshProxy=function(lib3d)
{
	var MeshProxyClass = lib3d.meshClass;
	return new MeshProxyClass();
	//return lib3d.meshClass.call(scope);
};
