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
        A = MOD3.VecArray, Rand = Math.random
    ;
    
    var Noise = MOD3.Noise = MOD3.Class ( MOD3.Modifier, {
        
        constructor: function( f ) {
            this.$super('constructor');
            this.name = 'Noise';
            this.axes = NONE;
            this.start = 0;
            this.end = 0; //1;
            this.force = (f !== undef) ? f : 0;
        },
        
        force: 0,
        start: 0,
        end: 1,
        
        dispose: function( ) {
            this.force = null;
            this.start = null;
            this.end = null;
            this.$super('dispose');
            
            return this;
        },
        
        serialize: function( ) {
            return { 
                modifier: this.name, 
                params: {
                    force: this.force,
                    start: this.start,
                    end: this.end,
                    axes: this.axes,
                    enabled: !!this.enabled
                }
            };
            
        },
        
        unserialize: function( json ) {
            if ( json && this.name === json.modifier )
            {
                var params = json.params;
                this.force = params.force;
                this.start = params.start;
                this.end = params.end;
                this.axes = params.axes;
                this.enabled = !!params.enabled;
            }
            return this;
        },
        
        setFalloff: function( start, end ) {
            this.start = (start !== undef) ? start : 0;
            this.end = (end !== undef) ? end : 1;
            
            return this;
        },
        
        _apply: function( ) {
            var mod = this.mod, axes = this.axes, start = this.start, end = this.end, 
                vs = mod.vertices, vc = vs.length, force = this.force, halfforce = 0.5*force,
                maxAxis = mod.maxAxis, v, r, p, rp, xyz;

            if ( !axes || !force ) return this;
            // optimize loop using while counting down instead of up
            while ( --vc >= 0 )
            {
                v = vs[ vc ];
                r = (Rand( ) * force) - (halfforce);

                p = v.getRatio( maxAxis );
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
                v.setXYZ( [ 
                    xyz[ 0 ] + (( !(axes & X) ) ? rp : 0), 
                    xyz[ 1 ] + (( !(axes & Y) ) ? rp : 0), 
                    xyz[ 2 ] + (( !(axes & Z) ) ? rp : 0) 
                ] );
            }
            
            return this;
        }
    });
    
}(MOD3);