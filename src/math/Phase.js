/**
*
* MOD3  Phase Auxilliary Class
*
*
**/
!function(MOD3, undef){
    @@USE_STRICT@@
    
    var Sin = Math.sin, Abs = Math.abs;
    
    var Phase = MOD3.Phase = MOD3.Class({
        
        constructor: function( v ) {
            this.value = 0;
            if  (v !== undef) this.value = v;
        },
        
        name: "Phase",
        value: 0,
        
        dispose: function( ) {
            this.value = null;
            
            return this;
        },
        
        serialize: function( ) {
            return { 
                name: this.name, 
                value: this.value
            };
            
        },
        
        unserialize: function( json ) {
            if ( json && this.name === json.name )
            {
                this.value = json.value;
            }
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
    
}(MOD3);