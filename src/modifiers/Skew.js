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

var Abs = Math.abs, Pow = Math.pow, Max = Math.max, Min = Math.min,
    ModConstant = MOD3.ModConstant,
    NONE = ModConstant.NONE, LEFT = ModConstant.LEFT, RIGHT = ModConstant.RIGHT,
    X = ModConstant.X, Y = ModConstant.Y, Z = ModConstant.Z,
    each = MOD3.List.each
;

var Skew = MOD3.Skew = MOD3.Class ( MOD3.Modifier, {
    
    constructor: function Skew( force, offset, power, falloff ) {
        var self = this;
        if ( !(self instanceof Skew) ) return new Skew( force, offset, power, falloff );
        self.$super('constructor');
        self.name = 'Skew';
        self.constraint = NONE;
        self.force = force!==undef ? force : 0;
        self.offset = offset!==undef ? offset : 0.5;
        self.power = power!==undef ? power : 1;
        self.falloff = falloff!==undef ? falloff : 1;
        self.inverseFalloff = false;
        self.oneSide = false;
        self.swapAxes = false;
        self.skewAxis = 0;
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
        var self = this;
        self.force = null;
        self.skewAxis = null;
        self.offset = null;
        self.power = null;
        self.falloff = null;
        self.inverseFalloff = null;
        self.oneSide = null;
        self.swapAxes = null;
        self.$super('dispose');
        return self;
    },
    
    apply: function( modifiable ) {
        var self = this,
            constraint = self.constraint, 
            skewAxis = self.skewAxis || modifiable.maxAxis, 
            swapAxes = self.swapAxes, 
            offset = Min(1, Max(0, self.offset)),
            oneSide = self.oneSide, 
            inverseFalloff = !!self.inverseFalloff, 
            falloff = Min(1, Max(0, self.falloff)), 
            mirrorfalloff = 1-falloff,
            power = self.power, 
            force = self.force, 
            displaceAxis = X === skewAxis
                ? (swapAxes ? Z : Y)
                : (Y === skewAxis
                ? (swapAxes ? Z : X)
                : (Z === skewAxis
                ? (swapAxes ? Y : X)
                : 0))
        ;

        each(modifiable.vertices, function( v ){
            var r, dr, f, p, vRatio;
            vRatio = v.getRatio( skewAxis );
            if ( (LEFT === constraint) && (vRatio <= offset) ) return;
            if ( (RIGHT === constraint) && (vRatio > offset) ) return;

            r = vRatio - offset;
            if ( oneSide && (0 > r) ) r = -r;

            dr = v.getRatio( displaceAxis );
            if ( inverseFalloff ) dr = 1 - dr;

            f = falloff + dr * mirrorfalloff;
            p = (0 > r ? -1 : 1) * Pow( Abs( r ), power );
            v.setValue( displaceAxis, v.getValue( displaceAxis ) + force * p * f );
        });
        return self;
    },
});

}(MOD3);