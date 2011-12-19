// Range utility class for MOD3 -----------------------------------------------------
MOD3.Range=function(s,e)
{
	this.start=0;
	this.end=1;
	if (typeof s != 'undefined')
		this.start=s;
	if (typeof e != 'undefined')
		this.end=e;
};
MOD3.Range.prototype.getSize=function()
{
	return this.end - this.start;
};
MOD3.Range.prototype.move=function(amount)
{
	this.start += amount;
	this.end += amount;
};
MOD3.Range.prototype.isIn=function(n)
{
	return n >= this.start && n <= this.end;
};
MOD3.Range.prototype.normalize=function(n)
{
	return MOD3.XMath.normalize(this.start, this.end, n);
};
MOD3.Range.prototype.toRange=function(n)
{
	return MOD3.XMath.toRange(this.start, this.end, n);
};
MOD3.Range.prototype.trim=function(n)
{
	return MOD3.XMath.trim(this.start, this.end, n);
};
MOD3.Range.prototype.interpolate=function(n, r)
{
	return this.toRange(r.normalize(n));
};
MOD3.Range.prototype.toString=function()
{
	return "[" + this.start + " - " + this.end + "]";
};
