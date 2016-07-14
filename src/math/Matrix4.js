/**
*
* MOD3  3D Transform Matrix Class
*
*
**/
!function(MOD3, undef){
@@USE_STRICT@@

var Sin = Math.sin, Cos = Math.cos;

var Matrix4 = MOD3.Matrix4 = MOD3.Class({
    
    // static
    __static__: {
        
        multiplyVector: function( m, v ) {
            var vxyz = v.xyz,
                vx = vxyz[0],
                vy = vxyz[1],
                vz = vxyz[2];

            vxyz[0] = vx * m.n11 + vy * m.n12 + vz * m.n13 + m.n14;
            vxyz[1] = vx * m.n21 + vy * m.n22 + vz * m.n23 + m.n24;
            vxyz[2] = vx * m.n31 + vy * m.n32 + vz * m.n33 + m.n34;
            
            return v;
        },
        
        calculateMultiply: function( a, b ) {
            var 
                a11 = a.n11,
                b11 = b.n11,
                a21 = a.n21, 
                b21 = b.n21,
                a31 = a.n31, 
                b31 = b.n31,
                a12 = a.n12, 
                b12 = b.n12,
                a22 = a.n22, 
                b22 = b.n22,
                a32 = a.n32, 
                b32 = b.n32,
                a13 = a.n13, 
                b13 = b.n13,
                a23 = a.n23, 
                b23 = b.n23,
                a33 = a.n33, 
                b33 = b.n33,
                a14 = a.n14, 
                b14 = b.n14,
                a24 = a.n24, 
                b24 = b.n24,
                a34 = a.n34, 
                b34 = b.n34;

            a.n11 = a11 * b11 + a12 * b21 + a13 * b31;
            a.n12 = a11 * b12 + a12 * b22 + a13 * b32;
            a.n13 = a11 * b13 + a12 * b23 + a13 * b33;
            a.n14 = a11 * b14 + a12 * b24 + a13 * b34 + a14;

            a.n21 = a21 * b11 + a22 * b21 + a23 * b31;
            a.n22 = a21 * b12 + a22 * b22 + a23 * b32;
            a.n23 = a21 * b13 + a22 * b23 + a23 * b33;
            a.n24 = a21 * b14 + a22 * b24 + a23 * b34 + a24;

            a.n31 = a31 * b11 + a32 * b21 + a33 * b31;
            a.n32 = a31 * b12 + a32 * b22 + a33 * b32;
            a.n33 = a31 * b13 + a32 * b23 + a33 * b33;
            a.n34 = a31 * b14 + a32 * b24 + a33 * b34 + a34;
            
            return a;
        }
    },
    
    constructor: function( n11, n12, n13, n14,
                            n21, n22, n23, n24,
                            n31, n32, n33, n34,
                            n41, n42, n43, n44 )
    {
        var self = this;
        self.n11 = (n11===undef) ? 1 : n11;
        self.n12 = (n12===undef) ? 0 : n12;
        self.n13 = (n13===undef) ? 0 : n13;
        self.n14 = (n14===undef) ? 0 : n14;
        
        self.n21 = (n21===undef) ? 0 : n21;
        self.n22 = (n22===undef) ? 1 : n22;
        self.n23 = (n23===undef) ? 0 : n23;
        self.n24 = (n24===undef) ? 0 : n24;
        
        self.n31 = (n31===undef) ? 0 : n31;
        self.n32 = (n32===undef) ? 0 : n32;
        self.n33 = (n33===undef) ? 1 : n33;
        self.n34 = (n34===undef) ? 0 : n34;
        
        self.n41 = (n41===undef) ? 0 : n41;
        self.n42 = (n42===undef) ? 0 : n42;
        self.n43 = (n43===undef) ? 0 : n43;
        self.n44 = (n44===undef) ? 1 : n44;
    },

    name: "Matrix4",
    n11: 1,
    n12: 0,
    n13: 0,
    n14: 0,
    n21: 0,
    n22: 1,
    n23: 0,
    n24: 0,
    n31: 0,
    n32: 0,
    n33: 1,
    n34: 0,
    n41: 0,
    n42: 0,
    n43: 0,
    n44: 1,

    dispose: function( ) {
        var self = this;
        self.n11 = null;
        self.n12 = null;
        self.n13 = null;
        self.n14 = null;
        self.n21 = null;
        self.n22 = null;
        self.n23 = null;
        self.n24 = null;
        self.n31 = null;
        self.n32 = null;
        self.n33 = null;
        self.n34 = null;
        self.n41 = null;
        self.n42 = null;
        self.n43 = null;
        self.n44 = null;
        return self;
    },
    
    reset: function( ) {
        var self = this;
        self.n11 = 1;
        self.n12 = 0;
        self.n13 = 0;
        self.n14 = 0;
        self.n21 = 0;
        self.n22 = 1;
        self.n23 = 0;
        self.n24 = 0;
        self.n31 = 0;
        self.n32 = 0;
        self.n33 = 1;
        self.n34 = 0;
        self.n41 = 0;
        self.n42 = 0;
        self.n43 = 0;
        self.n44 = 1;
        return self;
    },
    
    translationMatrix: function( x, y, z ) {
        var self = this;
        self.n14 = x;
        self.n24 = y;
        self.n34 = z;
        return self;
    },

    translationMatrixFromVector: function( v ) {
        return this.translationMatrix( v.xyz[0], v.xyz[1], v.xyz[2] );
    },

    scaleMatrix: function( x, y, z ) {
        var self = this;
        self.n11 = x;
        self.n22 = y;
        self.n33 = z;
        return self;
    },

    scaleMatrixFromVector: function( v ) {
        return this.scaleMatrix( v.xyz[0], v.xyz[1], v.xyz[2] );
    },

    rotationMatrix: function( x, y, z, rad )  {
        var self = this,
            nCos = Cos(rad), nSin = Sin(rad), scos = 1 - nCos,
            sxy = x * y * scos, syz = y * z * scos, sxz = x * z * scos,
            sz = nSin * z, sy = nSin * y, sx = nSin * x
        ;

        self.n11 = nCos + x * x * scos;
        self.n12 = -sz + sxy;
        self.n13 = sy + sxz;
        self.n14 = 0;

        self.n21 = sz + sxy;
        self.n22 = nCos + y * y * scos;
        self.n23 = -sx + syz;
        self.n24 = 0;

        self.n31 = -sy + sxz;
        self.n32 = sx + syz;
        self.n33 = nCos + z * z * scos;
        self.n34 = 0;

        return self;
    },

    rotationMatrixFromVector: function( v, rad )  {
        return this.rotationMatrix( v.xyz[0], v.xyz[1], v.xyz[2], rad );
    },

    multiply: function( b ) {
        return Matrix4.calculateMultiply( this, b );
    },

    multiplyVector: function( v ) {
        return Matrix4.multiplyVector( this, v );
    }
});

}(MOD3);