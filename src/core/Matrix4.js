// Matrix4 Class ---------------------------------------------------------------------------------------------
(function(MOD3){
    MOD3.Matrix4=function(pn11,pn12,pn13,pn14,
                            pn21,pn22,pn23,pn24,
                            pn31,pn32,pn33,pn34,
                            pn41,pn42,pn43,pn44)
    {
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
        
        if (typeof pn11 != 'undefined')
        this.n11=pn11;
        if (typeof pn12 != 'undefined')
        this.n12=pn12;
        if (typeof pn13 != 'undefined')
        this.n13=pn13;
        if (typeof pn14 != 'undefined')
        this.n14=pn14;
        if (typeof pn21 != 'undefined')
        this.n21=pn21;
        if (typeof pn22 != 'undefined')
        this.n22=pn22;
        if (typeof pn23 != 'undefined')
        this.n23=pn23;
        if (typeof pn24 != 'undefined')
        this.n24=pn24;
        if (typeof pn31 != 'undefined')
        this.n31=pn31;
        if (typeof pn32 != 'undefined')
        this.n32=pn32;
        if (typeof pn33 != 'undefined')
        this.n33=pn33;
        if (typeof pn34 != 'undefined')
        this.n34=pn34;
        if (typeof pn41 != 'undefined')
        this.n41=pn41;
        if (typeof pn42 != 'undefined')
        this.n42=pn42;
        if (typeof pn43 != 'undefined')
        this.n43=pn43;
        if (typeof pn44 != 'undefined')
        this.n44=pn44;
    };
    MOD3.Matrix4.prototype.translationMatrix=function( x, y, z )
    {
        //var m = new MOD3.Matrix4();
        this.n14 = x;
        this.n24 = y;
        this.n34 = z;
        return this;
    };
    MOD3.Matrix4.prototype.scaleMatrix=function( x, y, z )
    {
        //var m = new MOD3.Matrix4();
        this.n11 = x;
        this.n22 = y;
        this.n33 = z;
        return this;
    };
    MOD3.Matrix4.prototype.rotationMatrix=function( x, y, z, rad/*, targetmatrix*/ )
    {
        //var m:Matrix4;
        //if(!targetmatrix) m = new Matrix4();
        //else m = targetmatrix; 
        
        var nCos = Math.cos(rad);
        var nSin = Math.sin(rad);
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
    };
    MOD3.Matrix4.prototype.calculateMultiply=function( a, b )
    {
        var a11 = a.n11; 
        var b11 = b.n11;
        var a21 = a.n21; 
        var b21 = b.n21;
        var a31 = a.n31; 
        var b31 = b.n31;
        var a12 = a.n12; 
        var b12 = b.n12;
        var a22 = a.n22; 
        var b22 = b.n22;
        var a32 = a.n32; 
        var b32 = b.n32;
        var a13 = a.n13; 
        var b13 = b.n13;
        var a23 = a.n23; 
        var b23 = b.n23;
        var a33 = a.n33; 
        var b33 = b.n33;
        var a14 = a.n14; 
        var b14 = b.n14;
        var a24 = a.n24; 
        var b24 = b.n24;
        var a34 = a.n34; 
        var b34 = b.n34;

        this.n11 = a11 * b11 + a12 * b21 + a13 * b31;
        this.n12 = a11 * b12 + a12 * b22 + a13 * b32;
        this.n13 = a11 * b13 + a12 * b23 + a13 * b33;
        this.n14 = a11 * b14 + a12 * b24 + a13 * b34 + a14;

        this.n21 = a21 * b11 + a22 * b21 + a23 * b31;
        this.n22 = a21 * b12 + a22 * b22 + a23 * b32;
        this.n23 = a21 * b13 + a22 * b23 + a23 * b33;
        this.n24 = a21 * b14 + a22 * b24 + a23 * b34 + a24;

        this.n31 = a31 * b11 + a32 * b21 + a33 * b31;
        this.n32 = a31 * b12 + a32 * b22 + a33 * b32;
        this.n33 = a31 * b13 + a32 * b23 + a33 * b33;
        this.n34 = a31 * b14 + a32 * b24 + a33 * b34 + a34;
    };
    MOD3.Matrix4.prototype.multiply=function( a, b )
    {
        //var m:Matrix4 = new Matrix4();
        this.calculateMultiply(a, b);
        return this;
    };
    MOD3.Matrix4.prototype.multiplyVector=function( m, v )
    {
        var vx = v.x;
        var vy = v.y;
        var vz = v.z;

        v.x = vx * m.n11 + vy * m.n12 + vz * m.n13 + m.n14;
        v.y = vx * m.n21 + vy * m.n22 + vz * m.n23 + m.n24;
        v.z = vx * m.n31 + vy * m.n32 + vz * m.n33 + m.n34;
    };
})(MOD3);