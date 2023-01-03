!function(MOD3) {
"use strict";
/**
* MOD3  Break Modifier
**/

/**[DOC_MD]
 * ### Break modifier
 *
 * Allow to break a mesh
 *
 * @author Bartek Drozdz
 *
[/DOC_MD]**/
var stdMath = Math;

MOD3.Break = MOD3.Class(MOD3.Modifier, {
    constructor: function Break(offset, angle, vector) {
        var self = this;
        if (!(self instanceof Break)) return new Break(offset, angle, vector);
        self.$super('constructor');
        self.name = 'Break';
        self.offset = offset || 0;
        self.angle = angle || 0;
        self.vector = vector || MOD3.Vector3.Y();
        self.range = new MOD3.Range(0, 1);
    },

    offset: 0,
    angle: 0,
    vector: null,
    range: null,

    dispose: function() {
        var self = this;
        self.vector.dispose();
        self.range.dispose();
        self.vector = null;
        self.range = null;
        self.offset = null;
        self.angle = null;
        self.$super('dispose');
        return self;
    },

    apply: function(modifiable) {
        var self = this,
            offset = stdMath.min(1, stdMath.max(0, self.offset)), range = self.range, angle = self.angle,
            bv = self.vector.normalizeSelf().xyz, pv, rm;

        pv = modifiable.minZ + modifiable.depth*offset;
        rm = new MOD3.Matrix4().rotate(bv[0], bv[1], bv[2], angle);

        MOD3.List.each(modifiable.vertices, function(v) {
            var c = v.getXYZ();
            c[2] -= pv;
            if ((0 <= c[2]) && range.isIn(v.ratio[1])) MOD3.Matrix4.multXYZ(rm, c);
            c[2] += pv;
            v.setXYZ(c);
        });
        return self;
   }
});
}(MOD3);