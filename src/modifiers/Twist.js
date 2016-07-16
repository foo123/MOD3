/**
*
* MOD3  Twist Modifier
*
*
**/

/**[DOC_MD]
 * ###Twist modifier 
 *
 * Twist mesh along an axis
 * Adapted from the Twist modifier for PV3D
 * 
[/DOC_MD]**/

!function(MOD3, undef){
@@USE_STRICT@@

var Vector3 = MOD3.Vector3, Sqrt = Math.sqrt, Matrix4 = MOD3.Matrix4,
    each = MOD3.List.each, mult4 = Matrix4.mult, dotp = Vector3.dot, mod = Vector3.mod;

var Twist = MOD3.Twist = MOD3.Class ( MOD3.Modifier, {
    
    constructor: function( a ) {
        var self = this;
        self.$super('constructor');
        self.name = 'Twist';
        self.vector = new Vector3(0, 1, 0);
        self.angle = a !== undef ? a : 0;
        self.center = Vector3.ZERO( );
    },
    
    vector: null,
    angle: 0,
    center: null,
    
    dispose: function( ) {
        var self = this;
        self.vector.dispose( );
        self.vector = null;
        self.angle = null;
        self.center.dispose( );
        self.center = null;
        self.$super('dispose');
        return self;
    },
    
    apply: function( modifiable ) {
        var self = this,
            vector = self.vector.normalizeSelf( ), angle = self.angle, center = self.center, vxyz = vector.xyz,
            modulo = mod([0.5*modifiable.maxX, 0.5*modifiable.maxY, 0.5*modifiable.maxZ]),
            d = -dotp( vxyz, center.xyz ),
            m1 = new Matrix4( ), m2 = new Matrix4( )
        ;

        each(modifiable.vertices, function( v ){
            var xyz = v.getXYZ( ),
                a = (dotp( xyz, vxyz ) + d) * angle / modulo,
                m = mult4(
                    m2.rotate( vxyz[0], vxyz[1], vxyz[2], a, true ),
                    m1.translate( xyz[0], xyz[1], xyz[2], true )
                )
            ;   
            v.setXYZ([ m.m[3], m.m[7], m.m[11] ]);
        });
        return self;
    }
});

}(MOD3);