// Base Modifier class -------------------------------------------------------------------------------------------------
(function(MOD3){
    MOD3.Modifier=function()
    {
        this.mod=null;
    };
    MOD3.Modifier.prototype.setModifiable=function(mod)
    {
        this.mod = mod;
    };
    MOD3.Modifier.prototype.getVertices=function()
    {
        return this.mod.getVertices();
    };
    MOD3.Modifier.prototype.apply=function(){};
})(MOD3);