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

(function(MOD3, undef){
    
    var Vector3 = MOD3.Vector3, Matrix4 = MOD3.Matrix4;
    
    var Twist = MOD3.Twist = MOD3.Class ( MOD3.Modifier, {
        
        constructor: function( a ) {
            this.$super('constructor');
            this.name = 'Twist';
            this.vector = new Vector3([0, 1, 0]).normalizeSelf( );
            this.angle = (a !== undef) ? a : 0;
            this.center = Vector3.ZERO( );
            this.mat1 = new Matrix4( );
            this.mat2 = new Matrix4( );
        },
        
        vector: null,
        angle: 0,
        center: null,
        mat1: null,
        mat2: null,
        
        dispose: function( ) {
            this.vector.dispose( );
            this.vector = null;
            this.angle = null;
            this.center.dispose( );
            this.center = null;
            this.mat1.dispose( );
            this.mat2.dispose( );
            this.mat1 = null;
            this.mat2 = null;
            this.$super('dispose');
            
            return this;
        },
        
        apply: function( ) {
            var mod = this.mod, vs = mod.vertices, vc = vs.length,
                vector = this.vector, angle = this.angle, center = this.center,
                dv = new Vector3([0.5*mod.maxX, 0.5*mod.maxY, 0.5*mod.maxZ]), 
                invdvm = 1.0 / dv.getMagnitude( ), 
                factor = invdvm * angle,
                d = -Vector3.dot( vector, center ),
                v, dd, vec
            ;

            // optimize loop using while counting down instead of up
            while ( --vc >= 0 )
            {
                v = vs[ vc ];
                vec = v.getVector( );
                dd = Vector3.dot( vec, vector ) + d;
                v.setVector( this.twistPoint( vec, vector, dd * factor ) );
            }
            
            return this;
        },
        
        twistPoint: function( vertexvector, vector, a ) {
            var mat1 = this.mat1.reset( ).translationMatrixFromVector( vertexvector ),
                mat2 = this.mat2.reset( ).rotationMatrixFromVector( vector, a )
            ;   
            mat2.multiply( mat1 );
            
            return new Vector3([mat2.n14, mat2.n24, mat2.n34]);
        }
    });
    
})(MOD3);