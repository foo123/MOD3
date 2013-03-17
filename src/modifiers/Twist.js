// Twist Modifier ------------------------------------------------------------------------------------------
(function(MOD3){
    MOD3.Twist=function(a)
    {
        this.vector = new MOD3.Vector3(0, 1, 0);
        this.angle = a;
        this.center = MOD3.Vector3.ZERO();
    };
    MOD3.Twist.prototype=new MOD3.Modifier();
    MOD3.Twist.prototype.constructor=MOD3.Twist;
    MOD3.Twist.prototype.apply=function()
    {
        this.vector.normalize();
        var mod = this.mod, vs = mod.getVertices(), vc = vs.length,
            vector = this.vector, angle = this.angle, center = this.center;
        var dv = new MOD3.Vector3(0.5*mod.maxX, 0.5*mod.maxY, 0.5*mod.maxZ), invdvm = 1.0/dv.getMagnitude(), factor = invdvm*angle;
        var d = -MOD3.Vector3.dot(vector, center);
        var vertex, dd;

        // optimize loop using while counting down instead of up
        while (--vc >= 0)
        //for(var i = 0;i < this.mod.getVertices().length; i++) 
        {
            vertex = vs[vc];
            // unroll dot product, breaks encapsulation and modularity, but is faster
            dd = vertex.getX()*vector.x + vertex.getY()*vector.y + vertex.getZ()*vector.z + d;
            this.twistPoint(vertex, dd * factor);
        }
    };
    MOD3.Twist.prototype.twistPoint=function(v, a)
    {
        var mat = new MOD3.Matrix4().translationMatrix(v.getX(), v.getY(), v.getZ());   
        mat = new MOD3.Matrix4().multiply(new MOD3.Matrix4().rotationMatrix(this.vector.x, this.vector.y, this.vector.z, a), mat);  
        v.setX(mat.n14);
        v.setY(mat.n24);
        v.setZ(mat.n34);
    };
})(MOD3);