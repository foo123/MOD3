!function(MOD3) {
"use strict";
/**
* MOD3  Pivot Modifier
**/

/**[DOC_MD]
 * ### Pivot modifier
 *
 * Allows to move the pivot point of a 3D mesh.
 *
 * @author Bartek Drozdz
 *
[/DOC_MD]**/
MOD3.Pivot = MOD3.Class(MOD3.Modifier, {
    constructor: function Pivot(x, y, z) {
        var self = this;
        if (!(self instanceof Pivot)) return new Pivot(x, y, z);
        self.$super('constructor');
        self.name = 'Pivot';
        self.vector = new MOD3.Vector3(x||0, y||0, z||0);
    },

    vector: null,

    dispose: function() {
        var self = this;
        self.vector.dispose();
        self.vector = null;
        self.$super('dispose');
        return self;
    },

    setMeshCenter: function(modifiable) {
        var self = this;
        self.vector = new MOD3.Vector3(
        -(modifiable.minX + 0.5*modifiable.width),
        -(modifiable.minY + 0.5*modifiable.height),
        -(modifiable.minZ + 0.5*modifiable.depth)
        );
        return self;
    },

    apply: function(modifiable) {
        var self = this, pivot = self.vector, pv = pivot.xyz;

        MOD3.List.each(modifiable.vertices, function(v) {
            v.setXYZ(MOD3.Vector3.add(v.getXYZ(), pv));
        });
        modifiable.updateMeshPosition(pivot.negate());
        return self;
    }
});
}(MOD3);