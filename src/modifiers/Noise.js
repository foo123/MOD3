!function(MOD3) {
"use strict";
/**
* MOD3  Noise Modifier
**/

/**[DOC_MD]
 * ### Noise modifier
 *
 * Randomly displaces each vertex in all 3 axes
 *
 *
[/DOC_MD]**/
var stdMath = Math;

MOD3.Noise = MOD3.Class(MOD3.Modifier, {
    constructor: function Noise(force) {
        var self = this;
        if (!(self instanceof Noise)) return new Noise(force);
        self.$super('constructor');
        self.name = 'Noise';
        self.force = force || 0;
        self.start = 0;
        self.end = 1;
        self.axes = MOD3.ModConstant.X | MOD3.ModConstant.Y | MOD3.ModConstant.Z;
    },

    force: 0,
    start: 0,
    end: 1,

    dispose: function() {
        var self = this;
        self.force = null;
        self.start = null;
        self.end = null;
        self.$super('dispose');
        return self;
    },

    setFalloff: function(start, end) {
        var self = this;
        self.start = start != null ? start : 0;
        self.end = end != null ? end : 1;
        return self;
    },

    apply: function(modifiable) {
        var self = this,
            axes = self.axes, start = self.start, end = self.end,
            force = self.force, halfforce = 0.5*force,
            maxAxis = modifiable.maxAxis;

        if ((0 == axes) || (0 == force)) return self;

        MOD3.List.each(modifiable.vertices, function(v) {
            var r = stdMath.random() * force - halfforce,
                p = v.getRatio(maxAxis), rp, xyz;
            if (start < end)
            {
                if (p < start) p = 0;
                else if (p > end) p = 1;
            }
            else if (start > end)
            {
                p = 1 - p;
                if (p > start) p = 0;
                else if (p < end) p = 1;
            }
            else
            {
                p = 1;
            }

            rp = r * p;
            xyz = v.getXYZ();
            v.setXYZ([
                xyz[0] + (axes & MOD3.ModConstant.X ? rp : 0),
                xyz[1] + (axes & MOD3.ModConstant.Y ? rp : 0),
                xyz[2] + (axes & MOD3.ModConstant.Z ? rp : 0)
            ]);
        });
        return self;
    }
});
}(MOD3);