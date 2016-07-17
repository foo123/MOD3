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
    
    constructor: function Phase( v ) {
        var self = this;
        if ( !(self instanceof Phase) ) return new Phase( v );
        self.value = v || 0;
    },
    
    name: "Phase",
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

}(MOD3);