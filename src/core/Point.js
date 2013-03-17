// 2D Point ------------------------------------------------------------------------------------------------
(function(MOD3){
    MOD3.Point=function(x,y)
    {
        this.x=0;
        this.y=0;
        if ((typeof (x))!='undefined') this.x=x;
        if ((typeof (y))!='undefined') this.y=y;
    }
    MOD3.Point.prototype.clone=function()
    {
        return (new MOD3.Point(this.x,this.y));
    };
})(MOD3);