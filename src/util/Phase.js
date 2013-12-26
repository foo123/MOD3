/**
*
* MOD3  Phase Auxilliary Class
*
*
**/
(function(MOD3, undef){
    var Sin=Math.sin, Abs=Math.abs
    ;
    
    var Phase = MOD3.Phase = Class( Object,
    {
        constructor : function(v) {
            this.value=0;
            if  (v !== undef) this.value=v;
        },
        
        value : 0,
        
        getPhasedValue : function()  {
            return Sin(this.value);
        },
        
        getAbsPhasedValue : function()  {
            return Abs(Sin(this.value));
        },
        
        getNormValue : function() {
            return (Sin(this.value)+1)*0.5;
        }
    });
    
})(MOD3);