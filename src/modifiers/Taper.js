// Taper Modifier ---------------------------------------------------------------------------
(function(MOD3){
    MOD3.Taper=function(f)
    {
        this.force=null;
        this.power=null;

        this.start = 0;
        this.end = 1;

        this.vector = new MOD3.Vector3(1, 0, 1);
        this.vector2 = new MOD3.Vector3(0, 1, 0);
        
        if (typeof f != 'undefined')
            this.force=f;
        this.power=1;
    };
    MOD3.Taper.prototype=new MOD3.Modifier();
    MOD3.Taper.prototype.constructor=MOD3.Taper;
    MOD3.Taper.prototype.setFalloff=function(start, end)
    {
        this.start=0;
        this.end=1;
        if (typeof start != 'undefined')
            this.start = start;
        if (typeof end != 'undefined')
            this.end = end;
    }
    MOD3.Taper.prototype.apply=function()
    {
        var vs = this.mod.getVertices();
        var vc = vs.length;
        
        for (var i = 0;i < vc; i++) {
            var v = vs[i];
            
            var ar = v.getRatioVector().multiply(this.vector2);
            var sc = this.force * Math.pow(ar.getMagnitude(), this.power);
            
            var m = new MOD3.Matrix4().scaleMatrix(1 + sc * this.vector.x, 1 + sc * this.vector.y, 1 + sc * this.vector.z);
            var n = v.getVector();
            
            new MOD3.Matrix4().multiplyVector(m, n);
            v.setVector( n );
        }
    };
})(MOD3);