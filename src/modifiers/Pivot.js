// Pivot Modifier -----------------------------------------------------------------------------------------------
(function(MOD3){
    MOD3.Pivot=function(x,y,z)
    {
        this.pivot = new MOD3.Vector3(x, y, z);
    };
    MOD3.Pivot.prototype=new MOD3.Modifier();
    MOD3.Pivot.prototype.constructor=MOD3.Pivot;
    MOD3.Pivot.prototype.setMeshCenter=function()
    {
        // cache
        var mod = this.mod;
        this.pivot = new MOD3.Vector3(
            -(mod.minX + 0.5*mod.width), 
            -(mod.minY + 0.5*mod.height), 
            -(mod.minZ + 0.5*mod.depth)
        );
    };
    MOD3.Pivot.prototype.apply=function()
    {
        var vs = this.mod.getVertices(), vc=vs.length, pivot=this.pivot, npivot, v, vv;

        // optimize loop using while counting down instead of up
        while (--vc >= 0)
        //for (var i = 0; i < vc; i++) 
        {
            v = vs[vc];
            vv=v.getVector().clone();
            v.setVector(vv.add(pivot));
        }
        
        npivot = pivot.clone();
        this.mod.updateMeshPosition(npivot.negate());
    };
})(MOD3);