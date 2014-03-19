/**
*
* MOD3  2D Transform Matrix Class
*
*
**/
(function(MOD3, undef){
    
    var Sin = Math.sin, Cos = Math.cos, Point = MOD3.Point;

    var Matrix = MOD3.Matrix = MOD3.Class( Object, {
        
        constructor: function( m11, m12, m21, m22 ) {
            this.m11 = (m11===undef) ? 1 : m11;
            this.m12 = (m12===undef) ? 0 : m12;
            this.m21 = (m21===undef) ? 0 : m21;
            this.m22 = (m22===undef) ? 1 : m22;
        },
        
        m11: 1,
        m12: 0,
        m21: 0,
        m22: 1,

        dispose: function( ) {
            this.m11 = null;
            this.m12 = null;
            this.m21 = null;
            this.m22 = null;
            
            return this;
        },
        
        reset: function( ) {
            this.m11 = 1;
            this.m12 = 0;
            this.m21 = 0;
            this.m22 = 1;
            
            return this;
        },
        
        rotate: function( angle )  {
            var c = Cos( angle ),
                s = Sin( angle );
            
            this.m11 = c;
            this.m12 = -s;
            this.m21 = s;
            this.m22 = c;
            
            return this;
        },

        scale: function( sx, sy ) {
            this.m12 = 0;
            this.m21 = 0;
            this.m11 = 1;
            this.m22 = 1;
            
            if ( sx!==undef )
            {
                this.m11 = sx;
                this.m22 = sx;
            }
            
            if ( sy!==undef )
            {
                this.m22 = sy;
            }
            
            return this;
        },

        multiply: function( a ) {
            // optimize by caching
            var m11 = this.m11, m12 = this.m12, m21 = this.m21, m22 = this.m22,
                am11 = a.m11, am12 = a.m12, am21 = a.m21, am22 = a.m22
            ;
            
            this.m11 = m11*am11 + m12*am21;
            this.m12 = m11*am12 + m12*am22;
            this.m21 = m21*am11 + m22*am21;
            this.m22 = m21*am12 + m22*am22;
            
            return this;
        },

        transformPoint: function( p ) {
            var ipx = p.x, ipy = p.y;
            var px = this.m11*ipx + this.m12*ipy;
            var py = this.m21*ipx + this.m22*ipy;
            
            return new Point( px, py );
        },
        
        transformPointSelf: function( p ) {
            var ipx = p.x, ipy = p.y;
            p.x = this.m11*ipx + this.m12*ipy;
            p.y = this.m21*ipx + this.m22*ipy;
            
            return p;
        },
        
        clone: function( ) {
            return new Matrix( this.m11, this.m12, this.m21, this.m22 );
        }
    });
    
})(MOD3);