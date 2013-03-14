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
        var vs = this.mod.getVertices();
        var vc = vs.length;
        
        var pv = new MOD3.Vector3(0, 0, -(this.mod.minZ + this.mod.depth * this.offset));
        

        for (var i = 0;i < vc; i++) {
            var v = vs[i];
            var c = v.getVector();
            c = c.add(pv);

            if(c.z >= 0 && this.range.isIn(v.ratioY)) {
                var ta = this.angle;

                var rm = new MOD3.Matrix4().rotationMatrix(this.bv.x, this.bv.y, this.bv.z, ta);
                new MOD3.Matrix4().multiplyVector(rm, c);
            }

            
            var npv = pv.negate();
            c = c.add(npv);
        
            v.setX(c.x);
            v.setY(c.y);
            v.setZ(c.z);
        }
    };
})(MOD3);