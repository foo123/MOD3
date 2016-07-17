/**
*
* MOD3  Bend Modifier
*
*
**/

/**[DOC_MD]
 * ###Bend modifier 
 *
 * Bends an object along an axis. 
 *
 * @author Bartek Drozdz
 *  
[/DOC_MD]**/

!function(MOD3, undef){
@@USE_STRICT@@

var NONE = MOD3.ModConstant.NONE, LEFT = MOD3.ModConstant.LEFT,  RIGHT = MOD3.ModConstant.RIGHT, XYZ = MOD3.XYZi,
    Matrix = MOD3.Matrix,  Atan = Math.atan, Atan2 = Math.atan2, Sin = Math.sin, Cos = Math.cos,
    PI = MOD3.Constants.PI, halfPI = MOD3.Constants.halfPI, doublePI = MOD3.Constants.doublePI,
    Max = Math.max, Min = Math.min, each = MOD3.List.each, trans2 = Matrix.transform
;

var Bend = MOD3.Bend = MOD3.Class ( MOD3.Modifier, {
    
    constructor: function Bend( force, offset, angle ) {
        var self = this;
        if ( !(self instanceof Bend) ) return new Bend( force, offset, angle );
        self.$super('constructor');
        self.name = 'Bend';
        self.constraint = NONE;
        self.switchAxes = false;
        self.force = force || 0;
        self.offset = offset || 0;
        self.angle = angle || 0;
    },

    force: 0,
    offset: 0,
    angle: 0,
    switchAxes: false,
    
    dispose: function( ) {
        var self = this;
        self.force = null;
        self.offset = null;
        self.angle = null;
        self.switchAxes = null;
        self.$super('dispose');
        return self;
    },
    
    apply: function( modifiable ) {   
        var self = this;
        
        if ( 0 == self.force ) return self;
        
        var  constraint = self.constraint, switchAxes = self.switchAxes,
            force = self.force, offset = Min(1, Max(0, self.offset)), a = self.angle,
            max = switchAxes ? modifiable.midAxis : modifiable.maxAxis,
            min = modifiable.minAxis,
            mid = switchAxes ? modifiable.maxAxis : modifiable.midAxis,
            width = modifiable.getSize( max ),
            height = modifiable.getSize( mid ),
            origin = modifiable.getMin( max ),
            //diagAngle = Atan( width / height ),
            m1 = new Matrix( ).rotate( a ),
            m2 = new Matrix( ).rotate( -a ),
            distance = origin + width * offset,
            radius = width / PI / force,
            bendAngle = doublePI * (width / (radius * doublePI))
        ;
        
        each(modifiable.vertices, function( v ){
            var xyz = v.getXYZ( ),
                vmax = xyz[ XYZ[max] ],
                vmid = xyz[ XYZ[mid] ],
                vmin = xyz[ XYZ[min] ],
                np = trans2( m1, [vmax, vmid] ),
                p, fa, op, ow, np2
            ;
            vmax = np[0]; vmid = np[1];

            p = (vmax - origin) / width;

            if (
                ( (LEFT === constraint) && (p <= offset) ) || 
                ( (RIGHT === constraint) && (p >= offset) )
            ) 
            {  
                /* do nothing */ 
            } 
            else 
            {
                fa = (halfPI - bendAngle * offset) + (bendAngle * p);
                op = Sin(fa) * (radius + vmin);
                ow = Cos(fa) * (radius + vmin);
                vmin = op - radius;
                vmax = distance - ow;
            }

            np2 = trans2( m2, [vmax, vmid] );
            vmax = np2[0]; vmid = np2[1];
            xyz[ XYZ[max] ] = vmax;
            xyz[ XYZ[mid] ] = vmid;
            xyz[ XYZ[min] ] = vmin;
            v.setXYZ( xyz );
        });
        return self;
    }
});

}(MOD3);