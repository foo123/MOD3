/**
*
* MOD3  Skew Modifier
*
*
**/

/**[DOC_MD]
 * ###Skew modifier 
 *
 * Skew mesh along an axis
 *
 * @author Bartek Drozdz
 *  
[/DOC_MD]**/

!function(MOD3, undef){
    
    @@USE_STRICT@@
    
    var Abs = Math.abs, Pow = Math.pow,
        Sign = MOD3.XMath.sign,
        ModConstant = MOD3.ModConstant,
        NONE = ModConstant.NONE, LEFT = ModConstant.LEFT, RIGHT = ModConstant.RIGHT,
        X = ModConstant.X, Y = ModConstant.Y, Z = ModConstant.Z
    ;
    
    var Skew = MOD3.Skew = MOD3.Class ( MOD3.Modifier, {
        
        constructor: function( f ) {
            this.$super('constructor');
            this.name = 'Skew';
            this.force = (f!==undef) ? f : 0;
            this.offset = 0.5;
            this.constraint = NONE;
            this.power = 1;
            this.falloff = 1;
            this.inverseFalloff = false;
            this.oneSide = false;
            this.swapAxes = false;
            this.skewAxis = 0;
        },
        
        force: 0,
        skewAxis: 0,
        offset: 0.5,
        power: 1,
        falloff:  1,
        inverseFalloff: false,
        oneSide: false,
        swapAxes: false,
        
        dispose: function( ) {
            this.force = null;
            this.skewAxis = null;
            this.offset = null;
            this.power = null;
            this.falloff = null;
            this.inverseFalloff = null;
            this.oneSide = null;
            this.swapAxes = null;
            this.$super('dispose');
            
            return this;
        },
        
        serialize: function( ) {
            return { 
                modifier: this.name, 
                params: {
                    force: this.force,
                    skewAxis: this.skewAxis,
                    offset: this.offset,
                    power: this.power,
                    falloff:  this.falloff,
                    inverseFalloff: this.inverseFalloff,
                    oneSide: this.oneSide,
                    swapAxes: this.swapAxes,
                    constraint: this.constraint, 
                    enabled: !!this.enabled
                }
            };
            
        },
        
        unserialize: function( json ) {
            if ( json && this.name === json.modifier )
            {
                var params = json.params;
                this.force = params.force;
                this.skewAxis = params.skewAxis;
                this.offset = params.offset;
                this.power = params.power;
                this.falloff = params.falloff;
                this.inverseFalloff = params.inverseFalloff;
                this.oneSide = params.oneSide;
                this.swapAxes = params.swapAxes;
                this.constraint = params.constraint;
                this.enabled = !!params.enabled;
            }
            return this;
        },
        
        setModifiable: function( mod ) {
            this.$super("setModifiable", mod)
            this.skewAxis = this.skewAxis || this.mod.maxAxis;
            
            return this;
        },
        
        _apply: function( ) {
            var vs = this.mod.vertices, vc = vs.length,
                constraint = this.constraint, 
                skewAxis = this.skewAxis, 
                offset = this.offset,
                oneSide = this.oneSide, 
                inverseFalloff = this.inverseFalloff, 
                falloff = this.falloff, 
                mirrorfalloff = 1-falloff,
                power = this.power, 
                force = this.force, 
                displaceAxis = this.getDisplaceAxis( ),
                v, r, dr, f, p, vl, vRatio, sign
            ;

            // optimize loop using while counting down instead of up
            while ( --vc >= 0 )
            {
                v = vs[ vc ];
                vRatio = v.getRatio( skewAxis );
                if ( LEFT === constraint && vRatio <= offset ) continue;
                if ( RIGHT === constraint && vRatio > offset ) continue;

                r = vRatio - offset;
                if ( oneSide ) r = Abs( r );

                dr = v.getRatio( displaceAxis );
                if ( inverseFalloff ) dr = 1 - dr;

                f = falloff + dr * mirrorfalloff;

                sign = (0 > r) ? -1 : 1;
                p = Pow( Abs( r ), power ) * sign /*Sign(r, 1)*/;
                vl = v.getValue( displaceAxis ) + force * p * f;
                v.setValue( displaceAxis, vl );
            }
            
            return this;
        },
        
        getDisplaceAxis: function( ) {
            var ska = this.skewAxis, swa = this.swapAxes;
            
            switch( ska ) 
            {
                case X:
                    return ( swa ) ? Z : Y;
                case Y:
                    return ( swa ) ? Z : X;
                case Z:
                    return ( swa ) ? Y : X;
                return 0;
            }
        }
    });
    
}(MOD3);