// Skew Modifier -------------------------------------------------------------------------------------------------------
MOD3.Skew=function(f)
{
	this.force=0;
	this.skewAxis=null;
	if (typeof f != 'undefined')
		this.force=f;
	this.offset = .5;
	this.constraint = MOD3.ModConstant.NONE;
	this.power = 1;
	this.falloff = 1;
	this.inverseFalloff = false;
	this.oneSide = false;
	this.swapAxes = false;
};
MOD3.Skew.prototype=new MOD3.Modifier();
MOD3.Skew.prototype.constructor=MOD3.Skew;		
MOD3.Skew.prototype.setModifiable=function(mod)
{
	MOD3.Modifier.prototype.setModifiable.call(this,mod);
	this.skewAxis = this.skewAxis || this.mod.maxAxis;
};
MOD3.Skew.prototype.apply=function()
{
	var vs = this.mod.getVertices();
	var vc = vs.length;

	for (var i = 0; i < vc; i++) {
		var v = vs[i];
		
		if(this.constraint == MOD3.ModConstant.LEFT && v.getRatio(this.skewAxis) <= this.offset) continue;
		if(this.constraint == MOD3.ModConstant.RIGHT && v.getRatio(this.skewAxis) > this.offset) continue;
		
		var r = v.getRatio(this.skewAxis) - this.offset;
		if(this.oneSide) r = Math.abs(r);
		
		var dr = v.getRatio(this.getDisplaceAxis());
		if(this.inverseFalloff) dr = 1 - dr;
		
		var f = this.falloff + dr * (1-this.falloff);

		var p = Math.pow(Math.abs(r), this.power) * MOD3.XMath.sign(r, 1);
		var vl = v.getValue(this.getDisplaceAxis()) + this.force * p * f;
		v.setValue(this.getDisplaceAxis(), vl);
	}
};
MOD3.Skew.prototype.getDisplaceAxis=function()
{
	switch(this.skewAxis) {
		case MOD3.ModConstant.X:
			return (this.swapAxes) ? MOD3.ModConstant.Z : MOD3.ModConstant.Y;
		case MOD3.ModConstant.Y:
			return (this.swapAxes) ? MOD3.ModConstant.Z : MOD3.ModConstant.X;
		case MOD3.ModConstant.Z:
			return (this.swapAxes) ? MOD3.ModConstant.Y : MOD3.ModConstant.X;
		default:
			return 0;
	}
};
