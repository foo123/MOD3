// Break Modifier ----------------------------------------------------------------
(function(MOD3){
    MOD3.Break=function(o,a)
    {
        this.bv = new MOD3.Vector3(0, 1, 0);
        this.offset=0;
        this.angle=0;
        if (typeof o != 'undefined')
            this.offset=o;
        if (typeof a != 'undefined')
            this.angle=a;
        this.range = new MOD3.Range(0,1);
    };
    MOD3.Break.prototype=new MOD3.Modifier();
    MOD3.Break.prototype.constructor=MOD3.Break;
    MOD3.Break.prototype.apply=function()
    {
        var mod = this.mod, vs = mod.getVertices(), vc = vs.length,
            offset = this.offset, range = this.range, angle = this.angle, bv = this.bv;
        var pv, npv, v, c, rm;
        
        pv = new MOD3.Vector3(0, 0, -(mod.minZ + mod.depth * offset));
        npv = pv.negate();
        rm = new MOD3.Matrix4().rotationMatrix(bv.x, bv.y, bv.z, angle);
        

        // optimize loop using while counting down instead of up
        while (--vc >= 0)
        //for (var i = 0;i < vc; i++) 
        {
            v = vs[vc];
            c = v.getVector();
            c = c.add(pv);

            if(c.z >= 0 && range.isIn(v.ratioY)) 
            {
                new MOD3.Matrix4().multiplyVector(rm, c);
            }
            
            c = c.add(npv);
        
            v.setX(c.x);
            v.setY(c.y);
            v.setZ(c.z);
        }
    };
})(MOD3);