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
 *  Generates perlin/simplex noise source and displaces vertices 
 *  based on the value of each point of the noise map.
 *  
 *  @author Bartek Drozdz
 *
 *  @uses: https://github.com/josephg/noisejs for JavaScript
 *  
[/DOC_MD]**/

(function(MOD3, undef){
    
    var Vector3 = MOD3.Vector3, round = Math.round, //clamp = MOD3.XMath.clamp,
        A = MOD3.VecArray,
        ModConstant = MOD3.ModConstant, NONE = ModConstant.NONE,
        X = ModConstant.X, Y = ModConstant.Y, Z = ModConstant.Z
    ;

    var PerlinNoise = MOD3.PerlinNoise = MOD3.Class(Object, {
        
        constructor: function( w, h ) {
            this.width = (undef !== w) ? round( w ) : 10;
            this.height = (undef !== h) ? round( h ) : 10;
        },
        
        width: 10,
        height: 10,
        data: null,
        
        dispose: function( ) {
            this.data = null;
            this.width = this.height = null;
            return this;
        },
        
        generate: function( ) {
            var w = this.width, h = this.height, size = w*h, a = new A( size ), i, j, index;
            i = 0; j = 0;
            for (index=0; index<size; index++,j++)
            {
                if ( j >= h )
                {
                    j = 0;
                    i++;
                }
                a[ index ] = noise.simplex2( i/w, j/h );
            }
            this.data = a;
            return this;
        },
        
        move: function( dX, dY ) {
            var w = this.width, h = this.height, size = w*h, a = this.data, b = new A( size ), i, j, index;
            dX = round( dX );
            dY = round( dY );
            if ( dX < 0 ) dX += w;
            if ( dY < 0 ) dY += h;
            i = 0; j = 0;
            for (index=0; i<size; index++,j++)
            {
                if ( j >= h )
                {
                    j = 0;
                    i++;
                }
                b[ index ] = a[ ((i + dX)%w)*h + (j + dY)%h ];
            }
            this.data = b;
            return this;
        }
    });
    
    var Perlin = MOD3.Perlin = MOD3.Class ( MOD3.Modifier, {
        
        constructor: function( f, n, a ) {
            this.$super('constructor');
            this.name = 'Perlin';
            this.source = undef === n ? new PerlinNoise( 25, 25 ).generate( ) : n;
            this.force = f || 1;
            this.autoRun = (undef !== a) ? (!!a) : true;
            this.axes = X | Y | Z;
        },
        
        speedX: 1,
        speedY: 1,
        source: null,
        force: 1,
        offset: 0,
        autoRun: true,
        
        dispose: function( ) {
            this.source = null;
            this.force = null;
            this.offset = null;
            this.autoRun = null;
            this.$super('dispose');
            
            return this;
        },
        
        getUVValue: function( u, v ) {
            var w = this.source.width, h = this.source.height,
                x = round( (w - 1) * u ),
                y = round( (h - 1) * v )
            ;
            //if ( x < 0 ) x += w;
            //if ( y < 0 ) y += h;
            return this.source.data[ (x % w)*h + y % h ];
        },

        apply: function( ) {
            var vs = this.mod.vertices, vc = vs.length, axes = this.axes,
                force = this.force, offset = this.offset, v, uv, xyz;

            if ( this.autoRun ) this.source.move( this.speedX, this.speedY );
            
            // optimize loop using while counting down instead of up
            while ( --vc >= 0 )
            {
                v = vs[ vc ];
                xyz = v.getXYZ( );
                uv = this.getUVValue( v.ratio[ 0 ]/* X */, v.ratio[ 2 ]/* Z */ );
                uv = (uv - offset) * force;
                if ( axes & X ) xyz[ 0 ] += uv;
                if ( axes & Y ) xyz[ 1 ] += uv;
                if ( axes & Z ) xyz[ 2 ] += uv;
                
                v.setXYZ( xyz );
            }

            return this;
        }
    });
    
})(MOD3);