!function(MOD3) {
"use strict";
/**
* MOD3  Bloat Modifier
**/

/**[DOC_MD]
 * ### Bloat modifier
 *
 * Bloats a mesh by forcing vertices out of specified sphere
 *
 * @author makc
 *
[/DOC_MD]**/
var stdMath = Math;

MOD3.Bloat = MOD3.Class(MOD3.Modifier, {
    constructor: function Bloat(radius, a, center) {
        var self = this;
        if (!(self instanceof Bloat)) return new Bloat(radius, a, center);
        self.$super('constructor');
        self.name = 'Bloat';
        self.radius = radius || 0;
        self.a = null == a ? 0.01 : a;
        self.center = center || MOD3.Vector3.ZERO();
        //self.u = MOD3.Vector3.ZERO();
    },

    radius: 0,
    a: 0.01,
    center: null,
    //u: null,

    dispose: function() {
        var self = this;
        self.center.dispose();
        self.center = null;
        self.radius = null;
        self.a = null;
        self.$super('dispose');
        return self;
    },

    apply: function(modifiable)  {
        var self = this, center = self.center.xyz,
            radius = stdMath.max(0, self.radius), a = stdMath.max(0, self.a);

        MOD3.List.each(modifiable.vertices, function(v) {
            // get a vector towards vertex
            // change norm to norm + r * exp (-a * norm)
            var uu = MOD3.Vector3.sub(v.getXYZ(), center), magn = MOD3.Vector3.mod(uu);
            MOD3.Vector3.muls(MOD3.Vector3.norm(uu), magn + radius * stdMath.exp(- magn * a));
            // move vertex accordingly
            v.setXYZ(MOD3.Vector3.add(uu, center));
            // ?? needed??
            //self.u=uu;
        });
        return self;
    }
});
}(MOD3);