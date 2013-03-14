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
        
        var dv = new MOD3.Vector3(this.mod.maxX / 2, this.mod.maxY / 2, this.mod.maxZ / 2);
        var d = -MOD3.Vector3.prototype.dot.call(this,this.vector, this.center);

        for(var i = 0;i < this.mod.getVertices().length; i++) {
            var vertex = this.mod.getVertices()[i];
            var dd = MOD3.Vector3.prototype.dot.call(this,new MOD3.Vector3(vertex.getX(), vertex.getY(), vertex.getZ()), this.vector) + d;
            this.twistPoint(vertex, (dd / dv.getMagnitude()) * this.angle);
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