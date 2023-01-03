!function(MOD3) {
"use strict";
/**
* MOD3  Bend Modifier
**/

/**[DOC_MD]
 * ### Bend modifier 
 *
 * Bends an object along an axis. 
 *
 * @author Bartek Drozdz
 *  
[/DOC_MD]**/
var stdMath = Math, PI = stdMath.PI,
    TWO_PI = 2*PI, HALF_PI = PI/2;

MOD3.Bend = MOD3.Class(MOD3.Modifier, {
    constructor: function Bend(force, offset, angle) {
        var self = this;
        if (!(self instanceof Bend)) return new Bend(force, offset, angle);
        self.$super('constructor');
        self.name = 'Bend';
        self.constraint = MOD3.ModConstant.NONE;
        self.switchAxes = false;
        self.force = force || 0;
        self.offset = offset || 0;
        self.angle = angle || 0;
    },

    force: 0,
    offset: 0,
    angle: 0,
    switchAxes: false,
    
    dispose: function() {
        var self = this;
        self.force = null;
        self.offset = null;
        self.angle = null;
        self.switchAxes = null;
        self.$super('dispose');
        return self;
    },
    
    apply: function(modifiable) {   
        var self = this;
        
        if (0 === self.force) return self;
        
        var constraint = self.constraint, switchAxes = self.switchAxes,
            force = self.force, offset = stdMath.min(1, stdMath.max(0, self.offset)), a = self.angle,
            max = switchAxes ? modifiable.midAxis : modifiable.maxAxis,
            min = modifiable.minAxis,
            mid = switchAxes ? modifiable.maxAxis : modifiable.midAxis,
            width = modifiable.getSize(max),
            height = modifiable.getSize(mid),
            origin = modifiable.getMin(max),
            //diagAngle = stdMath.atan2(height, width),
            m1 = new MOD3.Matrix().rotate(a),
            m2 = new MOD3.Matrix().rotate(-a),
            distance = origin + width * offset,
            radius = width / PI / force,
            bendAngle = TWO_PI * (width / (radius * TWO_PI))
        ;
        
        MOD3.List.each(modifiable.vertices, function(v) {
            var xyz = v.getXYZ(),
                vmax = xyz[MOD3.XYZi[max]],
                vmid = xyz[MOD3.XYZi[mid]],
                vmin = xyz[MOD3.XYZi[min]],
                np = MOD3.Matrix.transform(m1, [vmax, vmid]),
                p, fa, op, ow, np2
            ;
            vmax = np[0]; vmid = np[1];

            p = (vmax - origin) / width;

            if (
                ((MOD3.ModConstant.LEFT === constraint) && (p <= offset)) || 
                ((MOD3.ModConstant.RIGHT === constraint) && (p >= offset))
            ) 
            {  
                /* do nothing */ 
            } 
            else 
            {
                fa = (HALF_PI - bendAngle * offset) + (bendAngle * p);
                op = stdMath.sin(fa) * (radius + vmin);
                ow = stdMath.cos(fa) * (radius + vmin);
                vmin = op - radius;
                vmax = distance - ow;
            }

            np2 = MOD3.Matrix.transform(m2, [vmax, vmid]);
            vmax = np2[0]; vmid = np2[1];
            xyz[MOD3.XYZi[max]] = vmax;
            xyz[MOD3.XYZi[mid]] = vmid;
            xyz[MOD3.XYZi[min]] = vmin;
            v.setXYZ(xyz);
        });
        return self;
    }
});
}(MOD3);