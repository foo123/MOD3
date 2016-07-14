/**
*
* MOD3  2D Transform Matrix Class
*
*
**/
!function(MOD3, undef){
@@USE_STRICT@@

var Sin = Math.sin, Cos = Math.cos, Point = MOD3.Point;

var Matrix = MOD3.Matrix = MOD3.Class({
    
    constructor: function( m11, m12, m21, m22 ) {
        var self = this;
        self.m11 = (m11===undef) ? 1 : m11;
        self.m12 = (m12===undef) ? 0 : m12;
        self.m21 = (m21===undef) ? 0 : m21;
        self.m22 = (m22===undef) ? 1 : m22;
    },
    
    name: "Matrix",
    m11: 1,
    m12: 0,
    m21: 0,
    m22: 1,

    dispose: function( ) {
        var self = this;
        self.m11 = null;
        self.m12 = null;
        self.m21 = null;
        self.m22 = null;
        return self;
    },
    
    reset: function( ) {
        var self = this;
        self.m11 = 1;
        self.m12 = 0;
        self.m21 = 0;
        self.m22 = 1;
        return self;
    },
    
    rotate: function( angle )  {
        var self = this,
            c = Cos( angle ),
            s = Sin( angle );
        
        self.m11 = c;
        self.m12 = -s;
        self.m21 = s;
        self.m22 = c;
        return self;
    },

    scale: function( sx, sy ) {
        var self = this;
        self.m12 = 0;
        self.m21 = 0;
        self.m11 = 1;
        self.m22 = 1;
        
        if ( sx!==undef )
        {
            self.m11 = sx;
            self.m22 = sx;
        }
        
        if ( sy!==undef )
        {
            self.m22 = sy;
        }
        
        return self;
    },

    multiply: function( a ) {
        // optimize by caching
        var self = this, m11 = self.m11, m12 = self.m12, m21 = self.m21, m22 = self.m22,
            am11 = a.m11, am12 = a.m12, am21 = a.m21, am22 = a.m22
        ;
        
        self.m11 = m11*am11 + m12*am21;
        self.m12 = m11*am12 + m12*am22;
        self.m21 = m21*am11 + m22*am21;
        self.m22 = m21*am12 + m22*am22;
        
        return self;
    },

    transformPoint: function( p ) {
        var self = this, ipx = p.x, ipy = p.y,
            px = self.m11*ipx + self.m12*ipy,
            py = self.m21*ipx + self.m22*ipy;
        
        return new Point( px, py );
    },
    
    transformPointSelf: function( p ) {
        var self = this, ipx = p.x, ipy = p.y;
        p.x = self.m11*ipx + self.m12*ipy;
        p.y = self.m21*ipx + self.m22*ipy;
        
        return p;
    },
    
    clone: function( ) {
        return new Matrix( this.m11, this.m12, this.m21, this.m22 );
    }
});

}(MOD3);