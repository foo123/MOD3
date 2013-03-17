// Bloat Modifier --------------------------------------------------------------------------------------------
(function(MOD3){
    MOD3.Bloat=function()
    {
        this.center = MOD3.Vector3.ZERO();
        this.radius = 0;
        this.a = 0.01;
        this.u=MOD3.Vector3.ZERO();
    };
    MOD3.Bloat.prototype=new MOD3.Modifier();
    MOD3.Bloat.prototype.constructor=MOD3.Bloat;
    MOD3.Bloat.prototype.setRadius=function(v)
    {
        this.radius = Math.max (0, v); 
    };
    MOD3.Bloat.prototype.setA=function(v)
    {
        this.a = Math.max (0, v); 
    };
    MOD3.Bloat.prototype.apply=function()
    {
        var vs = this.mod.getVertices(), vc = vs.length, 
            center = this.center, radius = this.radius, a = this.a;
        var v, magn;
        
        // optimize loop using while counting down instead of up
        while (--vc >= 0)
        //for (var i=0;i<vc;i++) 
        {
            v=vs[vc];
            // get a vector towards vertex
            this.u.x = v.getX() - center.x;
            this.u.y = v.getY() - center.y;
            this.u.z = v.getZ() - center.z;

            // change norm to norm + r * exp (-a * norm)
            magn = this.u.getMagnitude();
            this.u.setMagnitude(magn + radius * Math.exp ( - magn * a));

            // move vertex accordingly
            v.setX(this.u.x + center.x);
            v.setY(this.u.y + center.y);
            v.setZ(this.u.z + center.z);
        }
    };
})(MOD3);