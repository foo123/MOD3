/**
*
* MOD3  Noise Modifier
*
*
**/

/**[DOC_MD]
 * ###Noise modifier 
 *
 * Randomly displaces each vertex in all 3 axes
 *
 *  
[/DOC_MD]**/

!function(MOD3, undef){
@@USE_STRICT@@

var NONE = MOD3.ModConstant.NONE,
    X = MOD3.ModConstant.X, Y = MOD3.ModConstant.Y, Z = MOD3.ModConstant.Z,
    Rand = Math.random, each = MOD3.List.each
;

var Noise = MOD3.Noise = MOD3.Class ( MOD3.Modifier, {
    
    constructor: function Noise( force ) {
        var self = this;
        if ( !(self instanceof Noise) ) return new Noise( force );
        self.$super('constructor');
        self.name = 'Noise';
        self.force = force || 0;
        self.start = 0;
        self.end = 1;
        self.axes = X | Y | Z;
    },
    
    force: 0,
    start: 0,
    end: 1,
    
    dispose: function( ) {
        var self = this;
        self.force = null;
        self.start = null;
        self.end = null;
        self.$super('dispose');
        return self;
    },
    
    setFalloff: function( start, end ) {
        var self = this;
        self.start = start !== undef ? start : 0;
        self.end = end !== undef ? end : 1;
        return self;
    },
    
    apply: function( modifiable ) {
        var self = this,
            axes = self.axes, start = self.start, end = self.end, 
            force = self.force, halfforce = 0.5*force,
            maxAxis = modifiable.maxAxis;

        if ( (0 == axes) || (0 == force) ) return self;
        
        each( modifiable.vertices, function( v ){
            var r = Rand( ) * force - halfforce,
                p = v.getRatio( maxAxis ), rp, xyz;
            if ( start < end ) 
            {
                if ( p < start ) p = 0;
                else if ( p > end ) p = 1;
            } 
            else if ( start > end ) 
            {
                p = 1 - p;
                if ( p > start ) p = 0;
                else if ( p < end ) p = 1;
            } 
            else 
            {
                p = 1;
            }

            rp = r * p;
            xyz = v.getXYZ( );
            v.setXYZ([ 
                xyz[ 0 ] + (axes & X ? rp : 0), 
                xyz[ 1 ] + (axes & Y ? rp : 0), 
                xyz[ 2 ] + (axes & Z ? rp : 0) 
            ]);
        });
        return self;
    }
});

}(MOD3);