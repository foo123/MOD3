// Noise Modifier -----------------------------------------------------------------------
(function(MOD3){
    MOD3.Noise=function(f)
    {
        this.force=0;
        this.axc = MOD3.ModConstant.NONE;
        
        this.start = 0;
        this.end = 0;

        if (typeof f != 'undefined')
                this.force = f;
    };
    MOD3.Noise.prototype=new MOD3.Modifier();
    MOD3.Noise.prototype.constructor=MOD3.Noise;
    MOD3.Noise.prototype.constraintAxes=function(c)
    {
        this.axc = c;
    };
    MOD3.Noise.prototype.setFalloff=function(start, end)
    {
        this.start=0;
        this.end=1;
        if (typeof start != 'undefined')
            this.start = start;
        if (typeof end != 'undefined')
            this.end = end;
    };
    MOD3.Noise.prototype.apply=function()
    {
        var mod = this.mod, axc = this.axc, start = this.start, end = this.end, 
            vs = mod.getVertices(), vc = vs.length, force = this.force, halfforce = 0.5*force;
        var Mathrandom=Math.random, v, r, p;
        
        // optimize loop using while counting down instead of up
        while (--vc >= 0)
        //for (var i = 0; i < vc; i++) 
        {
            v = vs[vc];
            r = (Mathrandom() * force) - (halfforce);
            
            p = v.getRatio(mod.maxAxis);
            if(start < end) 
            {
                if (p < start) p = 0;
                if (p > end) p = 1;
            } 
            else if(start > end) 
            {
                p = 1 - p;
                if (p > start) p = 0;
                if (p < end) p = 1;
            } 
            else 
            {
                p = 1;
            }

            if (!(axc & 1)) v.setX(v.getX() + r * p);
            if (!(axc >> 1 & 1)) v.setY(v.getY() + r * p);
            if (!(axc >> 2 & 1)) v.setZ(v.getZ() + r * p);
        }
    };
})(MOD3);