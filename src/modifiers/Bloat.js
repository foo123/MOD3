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
        var vs = this.mod.getVertices();
        var vc=vs.length;
        var v;
        for (var i=0;i<vc;i++) {
            v=vs[i];
            // get a vector towards vertex
            this.u.x = v.getX() - this.center.x;
            this.u.y = v.getY() - this.center.y;
            this.u.z = v.getZ() - this.center.z;

            // change norm to norm + r * exp (-a * norm)
            this.u.setMagnitude(this.u.getMagnitude() + this.radius * Math.exp ( - this.u.getMagnitude() * this.a));

            // move vertex accordingly
            v.setX(this.u.x + this.center.x);
            v.setY(this.u.y + this.center.y);
            v.setZ(this.u.z + this.center.z);
        }
    };
})(MOD3);