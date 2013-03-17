// Vector 3
(function(MOD3){
    MOD3.Vector3=function(x, y, z)
    {
        this.x=null;
        this.y=null;
        this.z=null;

        this.x = x;
        this.y = y;
        this.z = z;
    };
    // static
    MOD3.Vector3.ZERO=function(){return new MOD3.Vector3(0,0,0);};
    MOD3.Vector3.dot=function(a, b) { return (a.x*b.x + a.y*b.y + a.z*b.z);}
    
    MOD3.Vector3.prototype.clone=function()
    {
        return new MOD3.Vector3(this.x, this.y, this.z);
    };
    MOD3.Vector3.prototype.equals=function(v)
    {
        return (this.x == v.x && this.y == v.y && this.z == v.z);
    };
    MOD3.Vector3.prototype.zero=function()
    {
        this.x = this.y = this.z = 0;
    };
    MOD3.Vector3.prototype.negate=function()
    {
        return new MOD3.Vector3(-this.x, -this.y, -this.z);
    };
    MOD3.Vector3.prototype.add=function(v)
    {
        return new MOD3.Vector3(this.x + v.x, this.y + v.y, this.z + v.z);
    };
    MOD3.Vector3.prototype.subtract=function(v)
    {
        return new MOD3.Vector3(this.x - v.x, this.y - v.y, this.z - v.z);
    };
    MOD3.Vector3.prototype.multiplyScalar=function(s)
    {
        return new MOD3.Vector3(this.x * s, this.y * s, this.z * s);
    };
    MOD3.Vector3.prototype.multiply=function(v)
    {
        return new MOD3.Vector3(this.x * v.x, this.y * v.y, this.z * v.z);
    };
    MOD3.Vector3.prototype.divide=function(s)
    {
        var os = 1 / s;
        return new MOD3.Vector3(this.x * os, this.y * os, this.z * os);
    };
    MOD3.Vector3.prototype.normalize=function()
    {
        var x=this.x, y=this.y, z=this.z;
        var m = x * x + y * y + z * z;
        if(m > 0) {
            var n = 1 / Math.sqrt(m);
            this.x *= n;
            this.y *= n;
            this.z *= n;
        }
    };
    MOD3.Vector3.prototype.getMagnitude=function()
    {
        var x=this.x, y=this.y, z=this.z;
        return Math.sqrt(x * x + y * y + z * z);
    };
    MOD3.Vector3.prototype.setMagnitude=function(m)
    {
        this.normalize(); 
        this.x *= m; 
        this.y *= m; 
        this.z *= m;
    };
    MOD3.Vector3.prototype.toString=function()
    {
        return "[" + this.x + " , " + this.y + " , " + this.z + "]";
    };
    MOD3.Vector3.prototype.sum=function(a, b)
    {
        return a.add(b);
    };
    MOD3.Vector3.prototype.dot=function(a, b)
    {
        return a.x * b.x + a.y * b.y + a.z * b.z;
    };
    MOD3.Vector3.prototype.cross=function(a, b)
    {
        var ax=a.x, ay=a.y, az=a.z, bx=b.x, by=b.y, bz=b.z;
        return new MOD3.Vector3(ay * bz - az * by, az * bx - ax * bz, ax * by - ay * bx);
    };
    MOD3.Vector3.prototype.distance=function(a, b)
    {
        var dx = a.x - b.x;
        var dy = a.y - b.y;
        var dz = a.z - b.z;
        return Math.sqrt(dx * dx + dy * dy + dz * dz);
    };
})(MOD3);