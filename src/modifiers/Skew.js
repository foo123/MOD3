!function(MOD3) {
"use strict";
/**
* MOD3  Skew Modifier
**/

/**[DOC_MD]
 * ### Skew modifier
 *
 * Skew mesh along an axis
 *
 * @author Bartek Drozdz
 *
[/DOC_MD]**/
var stdMath = Math;

MOD3.Skew = MOD3.Class(MOD3.Modifier, {
    constructor: function Skew(force, offset, power, falloff) {
        var self = this;
        if (!(self instanceof Skew)) return new Skew(force, offset, power, falloff);
        self.$super('constructor');
        self.name = 'Skew';
        self.constraint = MOD3.ModConstant.NONE;
        self.force = force != null ? force : 0;
        self.offset = offset != null ? offset : 0.5;
        self.power = power != null ? power : 1;
        self.falloff = falloff != null ? falloff : 1;
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

    dispose: function() {
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

    apply: function(modifiable) {
        var self = this,
            constraint = self.constraint,
            skewAxis = self.skewAxis || modifiable.maxAxis,
            swapAxes = self.swapAxes,
            offset = stdMath.min(1, stdMath.max(0, self.offset)),
            oneSide = self.oneSide,
            inverseFalloff = !!self.inverseFalloff,
            falloff = stdMath.min(1, stdMath.max(0, self.falloff)),
            mirrorfalloff = 1-falloff,
            power = self.power,
            force = self.force,
            displaceAxis = MOD3.ModConstant.X === skewAxis
                ? (swapAxes ? MOD3.ModConstant.Z : MOD3.ModConstant.Y)
                : (MOD3.ModConstant.Y === skewAxis
                ? (swapAxes ? MOD3.ModConstant.Z : MOD3.ModConstant.X)
                : (MOD3.ModConstant.Z === skewAxis
                ? (swapAxes ? MOD3.ModConstant.Y : MOD3.ModConstant.X)
                : 0))
        ;

        MOD3.List.each(modifiable.vertices, function(v) {
            var r, dr, f, p, vRatio;
            vRatio = v.getRatio(skewAxis);
            if ((MOD3.ModConstant.LEFT === constraint) && (vRatio <= offset)) return;
            if ((MOD3.ModConstant.RIGHT === constraint) && (vRatio > offset)) return;

            r = vRatio - offset;
            if (oneSide && (0 > r)) r = -r;

            dr = v.getRatio(displaceAxis);
            if (inverseFalloff) dr = 1 - dr;

            f = falloff + dr * mirrorfalloff;
            p = (0 > r ? -1 : 1) * stdMath.pow(stdMath.abs(r), power);
            v.setValue(displaceAxis, v.getValue(displaceAxis) + force * p * f);
        });
        return self;
    },
});
}(MOD3);