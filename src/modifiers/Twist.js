!function(MOD3) {
"use strict";
/**
* MOD3  Twist Modifier
**/

/**[DOC_MD]
 * ### Twist modifier
 *
 * Twist mesh along an axis
 * Adapted from the Twist modifier for PV3D
 *
[/DOC_MD]**/
MOD3.Twist = MOD3.Class(MOD3.Modifier, {
    constructor: function Twist(angle, vector, center) {
        var self = this;
        if (!(self instanceof Twist)) return new Twist(angle, vector, center);
        self.$super('constructor');
        self.name = 'Twist';
        self.angle = angle || 0;
        self.vector = vector || MOD3.Vector3.Y();
        self.center = center || MOD3.Vector3.ZERO();
    },

    angle: 0,
    vector: null,
    center: null,

    dispose: function() {
        var self = this;
        self.vector.dispose();
        self.vector = null;
        self.angle = null;
        self.center.dispose();
        self.center = null;
        self.$super('dispose');
        return self;
    },

    apply: function(modifiable) {
        var self = this,
            tvec = self.vector.normalizeSelf().xyz, angle = self.angle, center = self.center.xyz,
            modulo = MOD3.Vector3.mod([0.5*modifiable.maxX, 0.5*modifiable.maxY, 0.5*modifiable.maxZ]),
            d = -MOD3.Vector3.dot(tvec, center),
            m1 = new MOD3.Matrix4(), m2 = new MOD3.Matrix4()
        ;

        MOD3.List.each(modifiable.vertices, function(v) {
            var xyz = v.getXYZ(),
                a = (MOD3.Vector3.dot(xyz, tvec) + d) * angle / modulo,
                m = MOD3.Matrix4.mult(
                    m2.rotate(tvec[0], tvec[1], tvec[2], a, true),
                    m1.translate(xyz[0], xyz[1], xyz[2], true)
                )
            ;
            v.setXYZ([m.m[3], m.m[7], m.m[11]]);
        });
        return self;
    }
});
}(MOD3);