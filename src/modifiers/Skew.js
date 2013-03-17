// Skew Modifier -------------------------------------------------------------------------------------------------------
(function(MOD3){
    MOD3.Skew=function(f)
    {
        this.force=0;
        this.skewAxis=null;
        if (typeof f != 'undefined')
            this.force=f;
        this.offset = .5;
        this.constraint = MOD3.ModConstant.NONE;
        this.power = 1;
        this.falloff = 1;
        this.inverseFalloff = false;
        this.oneSide = false;
        this.swapAxes = false;
    };
    MOD3.Skew.prototype=new MOD3.Modifier();
    MOD3.Skew.prototype.constructor=MOD3.Skew;      
    MOD3.Skew.prototype.setModifiable=function(mod)
    {
        MOD3.Modifier.prototype.setModifiable.call(this,mod);
        this.skewAxis = this.skewAxis || this.mod.maxAxis;
    };
    MOD3.Skew.prototype.apply=function()
    {
        var vs = this.mod.getVertices(), vc = vs.length,
            constraint = this.constraint, skewAxis = this.skewAxis, offset = this.offset,
            oneSide = this.oneSide, inverseFalloff = this.inverseFalloff, falloff = this.falloff, mirrorfalloff = 1-falloff,
            power = this.power, force = this.force, displaceAxis = this.getDisplaceAxis();
        var v, r, dr, f, p, vl;

        // optimize loop using while counting down instead of up
        while (--vc >= 0)
        //for (var i = 0; i < vc; i++) 
        {
            v = vs[vc];
            
            if (constraint == MOD3.ModConstant.LEFT && v.getRatio(skewAxis) <= offset) continue;
            if (constraint == MOD3.ModConstant.RIGHT && v.getRatio(skewAxis) > offset) continue;
            
            r = v.getRatio(skewAxis) - offset;
            if (oneSide) r = Math.abs(r);
            
            dr = v.getRatio(displaceAxis);
            if (inverseFalloff) dr = 1 - dr;
            
            f = falloff + dr * mirrorfalloff;

            p = Math.pow(Math.abs(r), power) * MOD3.XMath.sign(r, 1);
            vl = v.getValue(displaceAxis) + force * p * f;
            v.setValue(displaceAxis, vl);
        }
    };
    MOD3.Skew.prototype.getDisplaceAxis=function()
    {
        switch(this.skewAxis) {
            case MOD3.ModConstant.X:
                return (this.swapAxes) ? MOD3.ModConstant.Z : MOD3.ModConstant.Y;
            case MOD3.ModConstant.Y:
                return (this.swapAxes) ? MOD3.ModConstant.Z : MOD3.ModConstant.X;
            case MOD3.ModConstant.Z:
                return (this.swapAxes) ? MOD3.ModConstant.Y : MOD3.ModConstant.X;
            default:
                return 0;
        }
    };
})(MOD3);