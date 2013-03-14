// 2D Matrix ----------------------------------------------------------------------------------------------
(function(MOD3){
    MOD3.Matrix=function(m11,m12,m21,m22)
    {
        this.m11=1;
        this.m12=0;
        this.m21=0;
        this.m22=1;
        if ((typeof m11)!='undefined') this.m11=m11;
        if ((typeof m12)!='undefined') this.m12=m12;
        if ((typeof m21)!='undefined') this.m21=m21;
        if ((typeof m22)!='undefined') this.m22=m22;
    };
    MOD3.Matrix.prototype.rotate=function(angle)
    {
        var c=Math.cos(angle);
        var s=Math.sin(angle);
        this.m11=c;
        this.m12=-s;
        this.m21=s;
        this.m22=c;
        return this;
    };
    MOD3.Matrix.prototype.scale=function(sx,sy)
    {
        this.m12=0;
        this.m21=0;
        if ((typeof sx)!='undefined')
        {
            this.m11=sx;
            this.m22=sx;
        }
        if ((typeof sy)!='undefined')
            this.m22=sy;
        return this;
    };
    MOD3.Matrix.prototype.multiply=function(m)
    {
        var mm11=this.m11*m.m11+this.m12*m.m21;
        var mm12=this.m11*m.m12+this.m12*m.m22;
        var mm21=this.m21*m.m11+this.m22*m.m21;
        var mm22=this.m21*m.m12+this.m22*m.m22;
        this.m11=mm11;
        this.m12=mm12;
        this.m21=mm21;
        this.m22=mm22;
        return this;
    };
    MOD3.Matrix.prototype.transformPoint=function(p)
    {
        var px=this.m11*p.x+this.m12*p.y;
        var py=this.m21*p.x+this.m22*p.y;
        return (new MOD3.Point(px,py));
    }
})(MOD3);