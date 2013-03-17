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
        var vs = this.mod.getVertices(), vc = vs.length,
            vector = this.vector, vector2 = this.vector2, force = this.force, power = this.power;
        var v, ar, sc, m, n;
        
        // optimize loop using while counting down instead of up
        while (--vc >= 0)
        //for (var i = 0;i < vc; i++) 
        {
            v = vs[vc];
            
            ar = v.getRatioVector().multiply(vector2);
            sc = force * Math.pow(ar.getMagnitude(), power);
            
            m = new MOD3.Matrix4().scaleMatrix(1 + sc * vector.x, 1 + sc * vector.y, 1 + sc * vector.z);
            n = v.getVector();
            
            new MOD3.Matrix4().multiplyVector(m, n);
            v.setVector( n );
        }
    };
})(MOD3);