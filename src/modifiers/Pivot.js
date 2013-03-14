// Pivot Modifier -----------------------------------------------------------------------------------------------
(function(MOD3){
    MOD3.Pivot=function(x,y,z)
    {
        this.pivot=null;

        this.pivot = new MOD3.Vector3(x, y, z);
    };
    MOD3.Pivot.prototype=new MOD3.Modifier();
    MOD3.Pivot.prototype.constructor=MOD3.Pivot;
    MOD3.Pivot.prototype.setMeshCenter=function()
    {
        var vx = -(this.mod.minX + this.mod.width / 2);
        var vy = -(this.mod.minY + this.mod.height / 2);
        var vz = -(this.mod.minZ + this.mod.depth / 2);
        this.pivot = new MOD3.Vector3(vx, vy, vz);
    };
    MOD3.Pivot.prototype.apply=function()
    {
        var vs = this.mod.getVertices();
        var vc = vs.length;

        for (var i = 0; i < vc; i++) {
            var v = vs[i];
            var vv=v.getVector().clone();
            v.setVector(vv.add(this.pivot));
        }
        
        var npivot = this.pivot.clone();
        this.mod.updateMeshPosition(npivot.negate());
    };
})(MOD3);