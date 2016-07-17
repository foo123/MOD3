/**
*
* MOD3  2D Point Class
*
*
**/
!function(MOD3, undef){
@@USE_STRICT@@

var Point = MOD3.Point = MOD3.Class({
    
    constructor: function Point( x, y ) {
        var self = this;
        if ( !(self instanceof Point) ) return new Point( x, y );
        self.x = null == x ? 0 : x;
        self.y = null == y ? 0 : y;
    },

    name: "Point",
    x: 0,
    y: 0,

    dispose: function( ) {
        var self = this;
        self.x = null;
        self.y = null;
        return self;
    },
    
    clone: function( ) {
        return new Point(this.x, this.y);
    }
});

}(MOD3);