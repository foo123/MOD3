/**
*
* MOD3  Perlin/Simplex Noise Modifier
*
*
**/

/**[DOC_MD]
 * ###Perlin modifier 
 *
 *  Displaces vertices based on a perlin/simplex noise source.
 * 
 *  Accepts a perlin/simplex noise data (with width and height information) and displaces vertices
 *  based on the value of each point of the noise map.
 *  
 *  @author Bartek Drozdz
 *
 *  @uses: https://github.com/josephg/noisejs for JavaScript
 *  
[/DOC_MD]**/

!function(MOD3, undef){
@@USE_STRICT@@

var Vector3 = MOD3.Vector3, round = Math.round,
    A = MOD3.VecArray,
    ModConstant = MOD3.ModConstant, NONE = ModConstant.NONE,
    X = ModConstant.X, Y = ModConstant.Y, Z = ModConstant.Z,
    each = MOD3.List.each
;

function cyclic_shift( a, w, h, dX, dY )
{
    var size = w*h, b = new A( size ), 
        i, j, i2, j2, index;
    if ( dX < 0 ) dX += w;
    if ( dY < 0 ) dY += h;
    dX = ~~dX; dY = ~~dY;
    for (i=0,j=0,index=0; index<size; index++,i++)
    {
        if ( i >= w ) { i = 0; j++; }
        i2 = (i + dX) % w; j2 = (j + dY) % h;
        b[ index ] = a[ i2 + j2 * w ];
    }
    return b;
}
/*function generate2d( perlinNoise2d, w, h )
{
    var size = w*h, a = new A( size ), i, j, index;
    for (i=0,j=0,index=0; index<size; index++,i++)
    {
        if ( i >= w ) { i = 0; j++; }
        a[ index ] = perlinNoise2d( i/w, j/h );
    }
    return a;
}*/

var Perlin = MOD3.Perlin = MOD3.Class ( MOD3.Modifier, {
    
    constructor: function( f, n, a ) {
        var self = this;
        self.$super('constructor');
        self.name = 'Perlin';
        self.perlin = n;
        self.force = f || 1;
        self.autoRun = undef !== a ? !!a : true;
        self.axes = X | Y | Z;
    },
    
    speedX: 1,
    speedY: 1,
    perlin: null,
    force: 1,
    offset: 0,
    autoRun: true,
    
    dispose: function( ) {
        var self = this;
        self.perlin = null;
        self.speedX = null;
        self.speedY = null;
        self.force = null;
        self.offset = null;
        self.autoRun = null;
        self.$super('dispose');
        
        return self;
    },
    
    setSpeed: function( dX, dY ) {
        var self = this;
        self.speedX = dX;
        self.speedY = dY;
        return self;
    },
    
    apply: function( ) {
        var self = this,
            axes = self.axes, force = self.force,
            offset = self.offset, n = self.perlin,
            w = n.width, h = n.height;

        if ( !axes || !n ) return self;
        if ( self.autoRun )
        {
            n = self.perlin = cyclic_shift( n, w, h, self.speedX, self.speedY );
            n.width = w; n.height = h;
        }
        
        each(self.mod.vertices, function( v ){
            var xyz = v.getXYZ( ),
                x = ~~( (w - 1) * v.ratio[ 0 ]/* u */ ),
                y = ~~( (h - 1) * v.ratio[ 2 ]/* v */ ),
                uv = x + y * w;
            
            v.setXYZ([
                xyz[ 0 ] + (axes & X ? (n[ uv ] - offset) * force : 0),
                xyz[ 1 ] + (axes & Y ? (n[ uv/*+1*/ ] - offset) * force : 0),
                xyz[ 2 ] + (axes & Z ? (n[ uv/*+2*/ ] - offset) * force : 0)
            ]);
        });

        return self;
    }
});

}(MOD3);