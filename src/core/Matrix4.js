/**
*
* MOD3  3D Transform Matrix Class
*
*
**/
(function(MOD3, undef){
    var Sin=Math.sin, Cos=Math.cos,
        calculateMultiply, multiplyVector
    ;

    var Matrix4 = MOD3.Matrix4 = Class( Object, 
    {
        constructor :function(n11, n12, n13, n14,
                                n21, n22, n23, n24,
                                n31, n32, n33, n34,
                                n41, n42, n43, n44)
        {
            this.n11 = (n11===undef) ? 1 : n11;
            this.n12 = (n12===undef) ? 0 : n12;
            this.n13 = (n13===undef) ? 0 : n13;
            this.n14 = (n14===undef) ? 0 : n14;
            
            this.n21 = (n21===undef) ? 0 : n21;
            this.n22 = (n22===undef) ? 1 : n22;
            this.n23 = (n23===undef) ? 0 : n23;
            this.n24 = (n24===undef) ? 0 : n24;
            
            this.n31 = (n31===undef) ? 0 : n31;
            this.n32 = (n32===undef) ? 0 : n32;
            this.n33 = (n33===undef) ? 1 : n33;
            this.n34 = (n34===undef) ? 0 : n34;
            
            this.n41 = (n41===undef) ? 0 : n41;
            this.n42 = (n42===undef) ? 0 : n42;
            this.n43 = (n43===undef) ? 0 : n43;
            this.n44 = (n44===undef) ? 1 : n44;
        },
    
        n11 : 1,
        n12 : 0,
        n13 : 0,
        n14 : 0,
        n21 : 0,
        n22 : 1,
        n23 : 0,
        n24 : 0,
        n31 : 0,
        n32 : 0,
        n33 : 1,
        n34 : 0,
        n41 : 0,
        n42 : 0,
        n43 : 0,
        n44 : 1,

        dispose : function() {
            this.n11=null;
            this.n12=null;
            this.n13=null;
            this.n14=null;
            this.n21=null;
            this.n22=null;
            this.n23=null;
            this.n24=null;
            this.n31=null;
            this.n32=null;
            this.n33=null;
            this.n34=null;
            this.n41=null;
            this.n42=null;
            this.n43=null;
            this.n44=null;
            
            return this;
        },
        
        reset : function() {
            this.n11=1;
            this.n12=0;
            this.n13=0;
            this.n14=0;
            this.n21=0;
            this.n22=1;
            this.n23=0;
            this.n24=0;
            this.n31=0;
            this.n32=0;
            this.n33=1;
            this.n34=0;
            this.n41=0;
            this.n42=0;
            this.n43=0;
            this.n44=1;
            
            return this;
        },
        
        translationMatrix : function( x, y, z ) {
            this.n14 = x;
            this.n24 = y;
            this.n34 = z;
            
            return this;
        },

        translationMatrixFromVector : function( v ) {
            var xyz=v.xyz;
            
            this.n14 = xyz[0];
            this.n24 = xyz[1];
            this.n34 = xyz[2];
            
            return this;
        },

        scaleMatrix : function( x, y, z ) {
            this.n11 = x;
            this.n22 = y;
            this.n33 = z;
            
            return this;
        },

        scaleMatrixFromVector : function( v ) {
            var xyz=v.xyz;
            
            this.n11 = xyz[0];
            this.n22 = xyz[0];
            this.n33 = xyz[0];
            
            return this;
        },

        rotationMatrix : function( x, y, z, rad )  {
            var nCos = Cos(rad);
            var nSin = Sin(rad);
            var scos = 1 - nCos;

            var sxy = x * y * scos;
            var syz = y * z * scos;
            var sxz = x * z * scos;
            var sz = nSin * z;
            var sy = nSin * y;
            var sx = nSin * x;

            this.n11 = nCos + x * x * scos;
            this.n12 = -sz + sxy;
            this.n13 = sy + sxz;
            this.n14 = 0;

            this.n21 = sz + sxy;
            this.n22 = nCos + y * y * scos;
            this.n23 = -sx + syz;
            this.n24 = 0;

            this.n31 = -sy + sxz;
            this.n32 = sx + syz;
            this.n33 = nCos + z * z * scos;
            this.n34 = 0;

            return this;
        },

        rotationMatrixFromVector : function( v, rad )  {
            var xyz=v.xyz, 
                x=xyz[0],
                y=xyz[1],
                z=xyz[2]
            ;
            var nCos = Cos(rad);
            var nSin = Sin(rad);
            var scos = 1 - nCos;

            var sxy = x * y * scos;
            var syz = y * z * scos;
            var sxz = x * z * scos;
            var sz = nSin * z;
            var sy = nSin * y;
            var sx = nSin * x;

            this.n11 = nCos + x * x * scos;
            this.n12 = -sz + sxy;
            this.n13 = sy + sxz;
            this.n14 = 0;

            this.n21 = sz + sxy;
            this.n22 = nCos + y * y * scos;
            this.n23 = -sx + syz;
            this.n24 = 0;

            this.n31 = -sy + sxz;
            this.n32 = sx + syz;
            this.n33 = nCos + z * z * scos;
            this.n34 = 0;

            return this;
        },

        multiply : function( b ) {
            calculateMultiply(this, b);
            return this;
        },

        multiplyVector : function( v ) {
            var vxyz = v.xyz,
                vx = vxyz[0],
                vy = vxyz[1],
                vz = vxyz[2];
            
            vxyz[0] = vx * this.n11 + vy * this.n12 + vz * this.n13 + this.n14;
            vxyz[1] = vx * this.n21 + vy * this.n22 + vz * this.n23 + this.n24;
            vxyz[2] = vx * this.n31 + vy * this.n32 + vz * this.n33 + this.n34;
            
            return v;
        }
    });
    
    // static
    multiplyVector = Matrix4.multiplyVector = function( m, v ) 
    {
        var vxyz = v.xyz,
            vx = vxyz[0],
            vy = vxyz[1],
            vz = vxyz[2];

        vxyz[0] = vx * m.n11 + vy * m.n12 + vz * m.n13 + m.n14;
        vxyz[1] = vx * m.n21 + vy * m.n22 + vz * m.n23 + m.n24;
        vxyz[2] = vx * m.n31 + vy * m.n32 + vz * m.n33 + m.n34;
        
        return v;
    };
    
    calculateMultiply = Matrix4.calculateMultiply = function( a, b )  {
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
    };

    
})(MOD3);