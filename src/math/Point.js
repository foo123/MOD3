/**
*
* MOD3  2D Point Class
*
*
**/
!function(MOD3, undef){
    
    @@USE_STRICT@@
    
    var Point = MOD3.Point = MOD3.Class({
        
        constructor: function( x, y ) {
            this.x = (x===undef) ? 0 : x;
            this.y = (y===undef) ? 0 : y;
        },

        name: "Point",
        x: 0,
        y: 0,

        dispose: function( ) {
            this.x = null;
            this.y = null;
            
            return this;
        },
        
        serialize: function( ) {
            return { 
                name: this.name, 
                x: this.x,
                y: this.y
            };
            
        },
        
        unserialize: function( json ) {
            if ( json && this.name === json.name )
            {
                this.x = json.x;
                this.y = json.y;
            }
            return this;
        },
        
        clone: function( ) {
            return new Point(this.x, this.y);
        }
    });
    
}(MOD3);