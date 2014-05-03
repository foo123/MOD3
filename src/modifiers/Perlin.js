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

!function(MOD3, undef){
    
    @@USE_STRICT@@
    
    var Vector3 = MOD3.Vector3, round = Math.round,
        A = MOD3.VecArray,
        ModConstant = MOD3.ModConstant, NONE = ModConstant.NONE,
        X = ModConstant.X, Y = ModConstant.Y, Z = ModConstant.Z
    ;

    var PerlinNoise = MOD3.PerlinNoise = MOD3.Class({
        
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
        
        uvIndex: function( u, v ) {
            var w = this.width, h = this.height,
                x = ~~( (w - 1) * u ), y = ~~( (h - 1) * v )
            ;
            return ( x + y * w );
        },

        generate: function( ) {
            var w = this.width, h = this.height, size = w*h, a = new A( size ), i, j, index, v;
            i = 0; j = 0;
            for (index=0; index<size; index++,i++)
            {
                if ( i >= w )
                {
                    i = 0;
                    j++;
                }
                //v = noise.simplex2( i/w, j/h );
                a[ index ] = noise.simplex2( i/w, j/h );
                //a[ index+1 ] = noise.simplex2( i/w, j/h );
                //a[ index+2 ] = noise.simplex2( i/w, j/h );
            }
            this.data = a;
            return this;
        },
        
        move: function( dX, dY ) {
            var w = this.width, h = this.height, size = w*h, 
                a = this.data, b = new A( size ), 
                i, j, i2, j2, index, index2
            ;
            if ( dX < 0 ) dX += w;
            if ( dY < 0 ) dY += h;
            dX = ~~dX;
            dY = ~~dY;
            i = 0; j = 0;
            for (index=0; index<size; index++,i++)
            {
                if ( i >= w )
                {
                    i = 0;
                    j++;
                }
                i2 = (i + dX) % w;
                j2 = (j + dY) % h;
                index2 = ( i2 + j2 * w );
                b[ index ] = a[ index2 ];
                //b[ index+1 ] = a[ index2+1 ];
                //b[ index+2 ] = a[ index2+2 ];
            }
            this.data = b;
            return this;
        }
    });
    
    var Perlin = MOD3.Perlin = MOD3.Class ( MOD3.Modifier, {
        
        constructor: function( f, n, a ) {
            this.$super('constructor');
            this.name = 'Perlin';
            this.source = undef === n && !MOD3.isWorker ? new PerlinNoise( 25, 25 ).generate( ) : n;
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
            this.speedX = null;
            this.speedY = null;
            this.force = null;
            this.offset = null;
            this.autoRun = null;
            this.$super('dispose');
            
            return this;
        },
        
        serialize: function( ) {
            return { 
                modifier: this.name, 
                params: {
                    speedX: this.speedX,
                    speedY: this.speedY,
                    axes: this.axes,
                    source: this.source ? {data: this.source.data, width: this.source.width, height: this.source.height} : null,
                    force: this.force,
                    offset: this.offset,
                    autoRun: !!this.autoRun,
                    enabled: !!this.enabled
                }
            };
            
        },
        
        unserialize: function( json ) {
            if ( json && this.name === json.modifier )
            {
                var params = json.params;
                this.speedX = params.speedX;
                this.speedY = params.speedY;
                this.axes = params.axes;
                this.force = params.force;
                this.offset = params.offset;
                this.autoRun = !!params.autoRun;
                this.enabled = !!params.enabled;
                if ( !this.source && this.autoRun && params.source )
                {
                    this.source = new PerlinNoise( params.source.width, params.source.height );
                    this.source.data = params.source.data;
                }
            }
            return this;
        },
        
        setSpeed: function( dX, dY ) {
            this.speedX = dX;
            this.speedY = dY;
            return this;
        },
        
        _apply: function( ) {
            var vs = this.mod.vertices, vc = vs.length, axes = this.axes,
                force = this.force, offset = this.offset, 
                src = this.source, nsv, v, uv, xyz;

            if ( !axes || !src ) return this;
            if ( this.autoRun ) src.move( this.speedX, this.speedY );
            
            nsv = src.data;
            // optimize loop using while counting down instead of up
            while ( --vc >= 0 )
            {
                v = vs[ vc ];
                xyz = v.getXYZ( );
                uv = src.uvIndex( v.ratio[ 0 ]/* X */, v.ratio[ 2 ]/* Z */ );
                
                if ( axes & X ) xyz[ 0 ] += (nsv[ uv ] - offset) * force;
                if ( axes & Y ) xyz[ 1 ] += (nsv[ uv/*+1*/ ] - offset) * force;
                if ( axes & Z ) xyz[ 2 ] += (nsv[ uv/*+2*/ ] - offset) * force;
                
                v.setXYZ( xyz );
            }

            return this;
        }
    });
    
}(MOD3);