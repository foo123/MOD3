// Modifier Stack -----------------------------------------------------------------------------------------
(function(MOD3){
    MOD3.ModifierStack=function(lib3d,mesh)
    {
        this.lib3d = lib3d;
        this.baseMesh=null;
        this.stack=null;
        
        this.baseMesh = MOD3.PluginFactory.getMeshProxy(lib3d);
        this.baseMesh.setMesh(mesh);
        this.baseMesh.analyzeGeometry();
        this.stack = [];
    };
    MOD3.ModifierStack.prototype.addModifier=function(mod)
    {
        mod.setModifiable(this.baseMesh);
        this.stack.push(mod);
    };
    MOD3.ModifierStack.prototype.apply=function()
    {
        this.baseMesh.resetGeometry();
        for (var i = 0; i < this.stack.length; i++) {
            this.stack[i].apply();
        }
        this.baseMesh.postApply();
    };
    MOD3.ModifierStack.prototype.collapse=function()
    {
        this.apply();
        this.baseMesh.collapseGeometry();
        this.stack = [];
    };
    MOD3.ModifierStack.prototype.clear=function()
    {
        this.stack = [];
    };
    MOD3.ModifierStack.prototype.getMeshInfo=function()
    {
        return this.baseMesh;
    };
})(MOD3);