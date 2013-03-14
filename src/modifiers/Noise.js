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
        var vs = this.mod.getVertices();
        var vc = vs.length;

        for (var i = 0; i < vc; i++) {
            var v = vs[i];
            var r = (Math.random() * this.force) - (this.force / 2);
            
            var p = v.getRatio(this.mod.maxAxis);
            if(this.start < this.end) {
                if (p < this.start) p = 0;
                if (p > this.end) p = 1;
            } else if(this.start > this.end) {
                p = 1 - p;
                if (p > this.start) p = 0;
                if (p < this.end) p = 1;
            } else {
                p = 1;
            }

            if (!(this.axc & 1)) v.setX(v.getX() + r * p);
            if (!(this.axc >> 1 & 1)) v.setY(v.getY() + r * p);
            if (!(this.axc >> 2 & 1)) v.setZ(v.getZ() + r * p);
        }
    };
})(MOD3);