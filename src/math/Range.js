/**
*
* MOD3  Range Auxilliary Class
*
*
**/
!function(MOD3, undef){
    @@USE_STRICT@@
    
    var 
        normalize = MOD3.XMath.normalize,
        toRange = MOD3.XMath.toRange,
        trim = MOD3.XMath.trim
    ;

    var Range = MOD3.Range = MOD3.Class({
        
        constructor: function( s, e )  {
            this.start = 0;
            this.end = 1;
            if (s !== undef)  this.start=s;
            if (e !== undef)  this.end=e;
        },
        
        name: "Range",
        start: 0,
        end: 1,

        dispose: function( ) {
            this.start = null;
            this.end = null;
            
            return this;
        },
        
        serialize: function( ) {
            return { 
                name: this.name, 
                start: this.start,
                end: this.end
            };
            
        },
        
        unserialize: function( json ) {
            if ( json && this.name === json.name )
            {
                this.start = json.start;
                this.end = json.end;
            }
            return this;
        },
        
        getSize: function( )  {
            return this.end - this.start;
        },

        move: function( amount )  {
            this.start += amount;
            this.end += amount;
        },

        isIn: function( n ) {
            return (n >= this.start && n <= this.end);
        },

        normalize: function( n ) {
            return normalize( this.start, this.end, n );
        },

        toRange: function( n ) {
            return toRange( this.start, this.end, n );
        },

        trim: function( n ) {
            return trim( this.start, this.end, n );
        },

        interpolate: function( n, r ) {
            return toRange( this.start, this.end, r.normalize( n ) );
        },

        toString: function( ) {
            return "[" + this.start + " - " + this.end + "]";
        }
    });
    
}(MOD3);