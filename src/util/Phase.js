// Phase Util Class -------------------------------------------------------------------------
MOD3.Phase=function(v)
{
	this.value=0;
	if  (typeof v != 'undefined')
	this.value=v;
}	
MOD3.Phase.prototype.getPhasedValue=function()
{
	return Math.sin(this.value);
};
MOD3.Phase.prototype.getAbsPhasedValue=function()
{
	return Math.abs(this.getPhasedValue());
};
MOD3.Phase.prototype.getNormValue=function()
{
	return (this.getPhasedValue()+1)*0.5;
};
