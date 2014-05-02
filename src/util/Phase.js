/**
*
* MOD3  Phase Auxilliary Class
*
*
**/
(function(MOD3, undef){
    @@USE_STRICT@@
    
    var Sin = Math.sin, Abs = Math.abs;
    
    var Phase = MOD3.Phase = MOD3.Class( Object,{
        
        constructor: function( v ) {
            this.value = 0;
            if  (v !== undef) this.value = v;
        },
        
        value: 0,
        
        dispose: function( ) {
            this.value = null;
            
            return this;
        },
        
        getPhasedValue: function( )  {
            return Sin( this.value );
        },
        
        getAbsPhasedValue: function( )  {
            return Abs( Sin( this.value ) );
        },
        
        getNormValue: function( ) {
            return ( Sin( this.value ) + 1 ) * 0.5;
        }
    });
    
})(MOD3);