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
    
    constructor: function Twist( angle, vector, center ) {
        var self = this;
        if ( !(self instanceof Twist) ) return new Twist( angle, vector, center );
        self.$super('constructor');
        self.name = 'Twist';
        self.angle = angle || 0;
        self.vector = vector || Vector3.Y( );
        self.center = center || Vector3.ZERO( );
    },
    
    angle: 0,
    vector: null,
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
            tvec = self.vector.normalizeSelf( ).xyz, angle = self.angle, center = self.center.xyz,
            modulo = mod([0.5*modifiable.maxX, 0.5*modifiable.maxY, 0.5*modifiable.maxZ]),
            d = -dotp( tvec, center ),
            m1 = new Matrix4( ), m2 = new Matrix4( )
        ;

        each(modifiable.vertices, function( v ){
            var xyz = v.getXYZ( ),
                a = (dotp( xyz, tvec ) + d) * angle / modulo,
                m = mult4(
                    m2.rotate( tvec[0], tvec[1], tvec[2], a, true ),
                    m1.translate( xyz[0], xyz[1], xyz[2], true )
                )
            ;   
            v.setXYZ([ m.m[3], m.m[7], m.m[11] ]);
        });
        return self;
    }
});

}(MOD3);