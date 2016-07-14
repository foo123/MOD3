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

var Vector3 = MOD3.Vector3, Matrix4 = MOD3.Matrix4, each = MOD3.List.each;

var Twist = MOD3.Twist = MOD3.Class ( MOD3.Modifier, {
    
    constructor: function( a ) {
        var self = this;
        self.$super('constructor');
        self.name = 'Twist';
        self.vector = new Vector3([0, 1, 0]).normalizeSelf( );
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
    
    apply: function( ) {
        var self = this,
            mod = self.mod,
            vector = self.vector, angle = self.angle, center = self.center,
            dv = new Vector3([0.5*mod.maxX, 0.5*mod.maxY, 0.5*mod.maxZ]), 
            factor = angle / dv.getMagnitude( ),
            mat1 = new Matrix4( ), mat2 = new Matrix4( ),
            d = -Vector3.dot( vector, center )
        ;

        each(mod.vertices, function( v ){
            var vec = v.getVector( ),
                a = factor * (Vector3.dot( vec, vector ) + d),
                m1 = mat1.reset( ).translationMatrixFromVector( vec ),
                m2 = mat2.reset( ).rotationMatrixFromVector( vector, a )
            ;   
            m2.multiply( m1 );
            v.setXYZ([ m2.n14, m2.n24, m2.n34 ]);
        });
        
        return self;
    }
});

}(MOD3);