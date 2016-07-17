/**
*
* MOD3  3D Transform Matrix Class
*
*
**/
!function(MOD3, undef){
@@USE_STRICT@@

var Sin = Math.sin, Cos = Math.cos, V = MOD3.VecArray;

var Matrix4 = MOD3.Matrix4 = MOD3.Class({
    
    // static
    __static__: {
        
        multXYZ: function( m4, v ) {
            var m = m4.m, x = v[0], y = v[1], z = v[2];
            v[0] = x * m[0 ] + y * m[1 ] + z * m[2 ] + m[3 ];
            v[1] = x * m[4 ] + y * m[5 ] + z * m[6 ] + m[7 ];
            v[2] = x * m[8 ] + y * m[9 ] + z * m[10] + m[11];
            return v;
        },
        
        mult: function( m1, m2 ) {
            var a = m1.m, b = m2.m,
                a11 = a[0 ], b11 = b[0 ],
                a21 = a[4 ], b21 = b[4 ],
                a31 = a[8 ], b31 = b[8 ],
                a12 = a[1 ], b12 = b[1 ],
                a22 = a[5 ], b22 = b[5 ],
                a32 = a[9 ], b32 = b[9 ],
                a13 = a[2 ], b13 = b[2 ],
                a23 = a[6 ], b23 = b[6 ],
                a33 = a[10], b33 = b[10],
                a14 = a[3 ], b14 = b[3 ],
                a24 = a[7 ], b24 = b[7 ],
                a34 = a[11], b34 = b[11];

            a[0 ] = a11 * b11 + a12 * b21 + a13 * b31;
            a[1 ] = a11 * b12 + a12 * b22 + a13 * b32;
            a[2 ] = a11 * b13 + a12 * b23 + a13 * b33;
            a[3 ] = a11 * b14 + a12 * b24 + a13 * b34 + a14;

            a[4 ] = a21 * b11 + a22 * b21 + a23 * b31;
            a[5 ] = a21 * b12 + a22 * b22 + a23 * b32;
            a[6 ] = a21 * b13 + a22 * b23 + a23 * b33;
            a[7 ] = a21 * b14 + a22 * b24 + a23 * b34 + a24;

            a[8 ] = a31 * b11 + a32 * b21 + a33 * b31;
            a[9 ] = a31 * b12 + a32 * b22 + a33 * b32;
            a[10] = a31 * b13 + a32 * b23 + a33 * b33;
            a[11] = a31 * b14 + a32 * b24 + a33 * b34 + a34;
            return m1;
        }
    },
    
    constructor: function Matrix4( n11, n12, n13, n14,
                                   n21, n22, n23, n24,
                                   n31, n32, n33, n34,
                                   n41, n42, n43, n44 )
    {
        var self = this;
        if ( !(self instanceof Matrix4) ) return new Matrix4( n11, n12, n13, n14,
                                                              n21, n22, n23, n24,
                                                              n31, n32, n33, n34,
                                                              n41, n42, n43, n44 );
        self.m = new V([
            n11===undef ? 1 : n11,
            n12===undef ? 0 : n12,
            n13===undef ? 0 : n13,
            n14===undef ? 0 : n14,
            
            n21===undef ? 0 : n21,
            n22===undef ? 1 : n22,
            n23===undef ? 0 : n23,
            n24===undef ? 0 : n24,
            
            n31===undef ? 0 : n31,
            n32===undef ? 0 : n32,
            n33===undef ? 1 : n33,
            n34===undef ? 0 : n34,
            
            n41===undef ? 0 : n41,
            n42===undef ? 0 : n42,
            n43===undef ? 0 : n43,
            n44===undef ? 1 : n44
        ]);
    },

    name: "Matrix4",
    m: null,

    dispose: function( ) {
        this.m = null;
        return this;
    },
    
    reset: function( ) {
        var m = this.m;
        m[0 ] = 1; m[1 ] = 0; m[2 ] = 0; m[3 ] = 0;
        m[4 ] = 0; m[5 ] = 1; m[6 ] = 0; m[7 ] = 0;
        m[8 ] = 0; m[9 ] = 0; m[10] = 1; m[11] = 0;
        m[12] = 0; m[13] = 0; m[14] = 0; m[15] = 1;
        return this;
    },
    
    translate: function( tx, ty, tz, reset ) {
        var m = this.m;
        if ( true === reset )
        {
            m[0 ] = 1; m[1 ] = 0; m[2 ] = 0; m[3 ] = 0;
            m[4 ] = 0; m[5 ] = 1; m[6 ] = 0; m[7 ] = 0;
            m[8 ] = 0; m[9 ] = 0; m[10] = 1; m[11] = 0;
            m[12] = 0; m[13] = 0; m[14] = 0; m[15] = 1;
        }
        m[3 ] = tx;
        m[7 ] = ty;
        m[11] = tz;
        return this;
    },

    scale: function( sx, sy, sz, reset ) {
        var m = this.m;
        if ( true === reset )
        {
            m[0 ] = 1; m[1 ] = 0; m[2 ] = 0; m[3 ] = 0;
            m[4 ] = 0; m[5 ] = 1; m[6 ] = 0; m[7 ] = 0;
            m[8 ] = 0; m[9 ] = 0; m[10] = 1; m[11] = 0;
            m[12] = 0; m[13] = 0; m[14] = 0; m[15] = 1;
        }
        m[0 ] = sx;
        m[5 ] = sy;
        m[10] = sz;
        return this;
    },

    rotate: function( rx, ry, rz, rad, reset )  {
        var m = this.m,
            nCos = Cos(rad), nSin = Sin(rad), scos = 1 - nCos,
            sxy = rx * ry * scos, syz = ry * rz * scos, sxz = rx * rz * scos,
            sz = nSin * rz, sy = nSin * ry, sx = nSin * rx
        ;
        if ( true === reset )
        {
            m[0 ] = 1; m[1 ] = 0; m[2 ] = 0; m[3 ] = 0;
            m[4 ] = 0; m[5 ] = 1; m[6 ] = 0; m[7 ] = 0;
            m[8 ] = 0; m[9 ] = 0; m[10] = 1; m[11] = 0;
            m[12] = 0; m[13] = 0; m[14] = 0; m[15] = 1;
        }
        m[0 ] = nCos + rx * rx * scos;
        m[1 ] = -sz + sxy;
        m[2 ] = sy + sxz;
        m[3 ] = 0;

        m[4 ] = sz + sxy;
        m[5 ] = nCos + ry * ry * scos;
        m[6 ] = -sx + syz;
        m[7 ] = 0;

        m[8 ] = -sy + sxz;
        m[9 ] = sx + syz;
        m[10] = nCos + rz * rz * scos;
        m[11] = 0;
        return this;
    },

    translateFromVector: function( v, reset ) {
        return this.translate( v.xyz[0], v.xyz[1], v.xyz[2], reset );
    },

    scaleFromVector: function( v, reset ) {
        return this.scale( v.xyz[0], v.xyz[1], v.xyz[2], reset );
    },

    rotateFromVector: function( v, rad, reset )  {
        return this.rotate( v.xyz[0], v.xyz[1], v.xyz[2], rad, reset );
    },

    multiply: function( b ) {
        return Matrix4.mult( this, b );
    },

    multiplyVector: function( v ) {
        Matrix4.multXYZ( this, v.xyz );
        return v;
    }
});
// aliases
Matrix4.prototype.translationMatrix = Matrix4.prototype.translate;
Matrix4.prototype.scaleMatrix = Matrix4.prototype.scale;
Matrix4.prototype.rotationMatrix = Matrix4.prototype.rotate;
Matrix4.prototype.translationMatrixFromVector = Matrix4.prototype.translateFromVector;
Matrix4.prototype.scaleMatrixFromVector = Matrix4.prototype.scaleFromVector;
Matrix4.prototype.rotationMatrixFromVector = Matrix4.prototype.rotateFromVector;

}(MOD3);