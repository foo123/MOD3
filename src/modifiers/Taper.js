!function(MOD3) {
"use strict";
/**
* MOD3  Taper Modifier
**/

/**[DOC_MD]
 * ### Taper modifier
 *
 * The taper modifier displaces the vertices on two axes proportionally to their position on the third axis.
 *
 * @author Bartek Drozdz
 *
[/DOC_MD]**/
var stdMath = Math;

MOD3.Taper = MOD3.Class(MOD3.Modifier, {
    constructor: function Taper(force, power, v1, v2)  {
        var self = this;
        if (!(self instanceof Taper)) return new Taper(force, power, v1, v2);
        self.$super('constructor');
        self.name = 'Taper';
        /*self.start = 0;
        self.end = 1;*/
        self.force = force != null ? force : 0;
        self.power = power != null ? power : 1;
        self.vector = v1 || MOD3.Vector3.Y(false);
        self.vector2 = v2 || MOD3.Vector3.Y();
    },

    force: 0,
    power: 1,
    /*start: 0,
    end: 1,*/
    vector: null,
    vector2: null,

    /*setFalloff : function(start, end)  {
        this.start = (start!==undef) ? start : 0;
        this.end = (end!==undef) ? end : 1;

        return this;
    },*/

    dispose: function() {
        var self = this;
        self.vector.dispose();
        self.vector2.dispose();
        self.vector = null;
        self.vector2 = null;
        self.force = null;
        self.power = null;
        self.$super('dispose');
        return self;
    },

    apply: function(modifiable) {
        var self = this,
            vec = self.vector.xyz, vec2 = self.vector2.xyz,
            force = self.force, power = self.power, m = new MOD3.Matrix4();

        MOD3.List.each(modifiable.vertices, 1 !== power
            ? function(v) {
                var ar = MOD3.Vector3.mod(MOD3.Vector3.mul(v.getRatioVector(), vec2)), sc = force * stdMath.pow(ar, power);
                v.setXYZ(MOD3.Matrix4.multXYZ(m.scale(1 + sc * vec[0], 1 + sc * vec[1], 1 + sc * vec[2]), v.getXYZ()));
            }
            : function(v) {
                var ar = MOD3.Vector3.mod(MOD3.Vector3.mul(v.getRatioVector(), vec2)), sc = force * ar;
                v.setXYZ(MOD3.Matrix4.multXYZ(m.scale(1 + sc * vec[0], 1 + sc * vec[1], 1 + sc * vec[2]), v.getXYZ()));
            }
        );
        return self;
    }
});
}(MOD3);