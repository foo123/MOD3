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
        this.m1.rotate(this.angle);
        this.m2 = new MOD3.Matrix();
        this.m2.rotate(-this.angle);
    }
    MOD3.Bend.prototype.setModifiable=function(mod)
    {
        MOD3.Modifier.prototype.setModifiable.call(this,mod);
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

        var vs = this.mod.getVertices();
        var vc = vs.length;
        var distance = this.origin + this.width * this.offset;
        var radius = this.width / Math.PI / this.force;
        var bendAngle = Math.PI * 2 * (this.width / (radius * Math.PI * 2));

        for (var i = 0; i < vc; i++) {
            var v = vs[i];
            
            var vmax = v.getValue(this.max);
            var vmid = v.getValue(this.mid);
            var vmin = v.getValue(this.min);

            var np = this.m1.transformPoint(new MOD3.Point(vmax, vmid));
            vmax = np.x;
            vmid = np.y;

            var p = (vmax - this.origin) / this.width;

            if ((this.constraint == MOD3.ModConstant.LEFT && p <= this.offset) || (this.constraint == MOD3.ModConstant.RIGHT && p >= this.offset)) {    
            } else {
                var fa = ((Math.PI / 2) - bendAngle * this.offset) + (bendAngle * p);
                var op = Math.sin(fa) * (radius + vmin);
                var ow = Math.cos(fa) * (radius + vmin);
                vmin = op - radius;
                vmax = distance - ow;
            }

            var np2 = this.m2.transformPoint(new MOD3.Point(vmax, vmid));
            vmax = np2.x;
            vmid = np2.y;
            
            v.setValue(this.max, vmax);
            v.setValue(this.mid, vmid);
            v.setValue(this.min, vmin);
        }
    };
})(MOD3);