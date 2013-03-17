// Bend Modifier --------------------------------------------------------------------------------------------------
(function(MOD3){
    MOD3.Bend=function(f, o, a)
    {
        this.force=null;
        this.offset=null;
        this.angle=null;
        
        this.diagAngle=null;
        
        this.constraint = MOD3.ModConstant.NONE;
        
        this.max=null;
        this.min=null;
        this.mid=null;
        this.width=null;
        this.height=null;
        this.origin=null;
        this.m1=null;
        this.m2=null;
        
        this.switchAxes = false;

        this.force = f;
        this.offset = o;
        this.setAngle(a);
    };
    MOD3.Bend.prototype=new MOD3.Modifier();
    MOD3.Bend.prototype.constructor=MOD3.Bend;
    MOD3.Bend.prototype.setAngle=function(a)
    { 
        this.angle = a; 
        this.m1 = new MOD3.Matrix();
        this.m1.rotate(a);
        this.m2 = new MOD3.Matrix();
        this.m2.rotate(-a);
    }
    MOD3.Bend.prototype.setModifiable=function(mod)
    {
        MOD3.Modifier.prototype.setModifiable.call(this, mod);
        //this.mod=mod;
        this.max = (this.switchAxes) ? this.mod.midAxis : this.mod.maxAxis;
        this.min = this.mod.minAxis;
        this.mid = (this.switchAxes) ? this.mod.maxAxis : this.mod.midAxis;
            
        this.width = this.mod.getSize(this.max);    
        this.height = this.mod.getSize(this.mid);
        this.origin = this.mod.getMin(this.max);
        
        this.diagAngle = Math.atan(this.width / this.height);
    };
    MOD3.Bend.prototype.apply=function()
    {   
        if (this.force == 0) return;

        var vs = this.mod.getVertices(), vc = vs.length;
        var width = this.width, offset = this.offset, 
            origin = this.origin, force = this.force, 
            max = this.max, min = this.min, mid = this.mid, m1 = this.m1, m2 = this.m2;
        var distance = origin + width * offset;
        var radius = width / Math.PI / force;
        var bendAngle = MOD3.Constants.doublePI * (width / (radius * MOD3.Constants.doublePI));
        var v, vmax, vmid, vmin, np, p, fa, op, ow, np2;
        var invwidth = 1.0/width, PI2 = MOD3.Constants.halfPI, Mathsin=Math.sin, Mathcos=Math.cos;
        
        // optimize loop using while counting down instead of up
        while (--vc >= 0)
        //for (var i = 0; i < vc; i++) 
        {
            v = vs[vc];
            
            vmax = v.getValue(max);
            vmid = v.getValue(mid);
            vmin = v.getValue(min);

            np = m1.transformPoint(new MOD3.Point(vmax, vmid));
            vmax = np.x;
            vmid = np.y;

            p = (vmax - origin) * invwidth;

            if (
                (this.constraint == MOD3.ModConstant.LEFT && p <= offset) || 
                (this.constraint == MOD3.ModConstant.RIGHT && p >= offset)
            ) 
            {  /* do nothing */ } 
            else 
            {
                fa = (PI2 - bendAngle * offset) + (bendAngle * p);
                op = Mathsin(fa) * (radius + vmin);
                ow = Mathcos(fa) * (radius + vmin);
                vmin = op - radius;
                vmax = distance - ow;
            }

            np2 = m2.transformPoint(new MOD3.Point(vmax, vmid));
            vmax = np2.x;
            vmid = np2.y;
            
            v.setValue(max, vmax);
            v.setValue(mid, vmid);
            v.setValue(min, vmin);
        }
    };
})(MOD3);