// Vector 3
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
	var m = this.x * this.x + this.y * this.y + this.z * this.z;
	if(m > 0) {
		var n = 1 / Math.sqrt(m);
		this.x *= n;
		this.y *= n;
		this.z *= n;
	}
};
MOD3.Vector3.prototype.getMagnitude=function()
{
	return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
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
	return new MOD3.Vector3(a.y * b.z - a.z * b.y, a.z * b.x - a.x * b.z, a.x * b.y - a.y * b.x);
};
MOD3.Vector3.prototype.distance=function(a, b)
{
	var dx = a.x - b.x;
	var dy = a.y - b.y;
	var dz = a.z - b.z;
	return Math.sqrt(dx * dx + dy * dy + dz * dz);
};
