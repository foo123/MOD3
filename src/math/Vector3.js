/**
*
* MOD3  Vector3 Class
*
*
**/
!function(MOD3, undef){
@@USE_STRICT@@

var Sqrt = Math.sqrt, A = MOD3.VecArray;

var Vector3 = MOD3.Vector3 = MOD3.Class({
    
    // static
    __static__: {
        
        ZERO: function( ) {
            return new Vector3( [0, 0, 0] );
        },
        
        dot: function( a, b ) { 
            var aa = a.xyz, bb = b.xyz;
            return aa[0]*bb[0] + aa[1]*bb[1] + aa[2]*bb[2]; 
        },
        
        equals: function( a, b ) {
            var aa = a.xyz, bb = b.xyz;
            return (aa[0] === bb[0]) && (aa[1] === bb[1]) && (aa[2] === bb[2]);
        },
        
        cross: function( a, b ) {
            var aa = a.xyz, bb = b.xyz,
                ax = aa[0], ay = aa[1], az = aa[2], 
                bx = bb[0], by = bb[1], bz = bb[2];
            return new Vector3( [ay * bz - az * by, az * bx - ax * bz, ax * by - ay * bx] );
        },
        
        distance: function( a, b ) {
            var aa = a.xyz, bb = b.xyz,
                dx = aa[0] - bb[0],
                dy = aa[1] - bb[1],
                dz = aa[2] - bb[2];
            return Sqrt(dx * dx + dy * dy + dz * dz);
        },
        
        sum: function( a, b ) {
            var aa = a.xyz, bb = b.xyz;
            return new Vector3( [aa[0] + bb[0], aa[1] + bb[1], aa[2] + bb[2]] );
        }
    },
    
    constructor: function( x, y, z ) {
        // use an internal typed-array for speed
        if ( x && x.length )
        {
            // array passed
            this.xyz = new A( [x[0], x[1], x[2]] );
        }
        else
        {
            // numbers passed
            x = (x===undef) ? 0 : x;
            y = (y===undef) ? 0 : y;
            z = (z===undef) ? 0 : z;
            this.xyz = new A( [ x, y, z ] );
        }
    },
    
    name: "Vector3",
    xyz: null,
    
    dispose: function( ) {
        this.xyz = null;
        
        return this;
    },
    
    getXYZ: function( ) {
       // copy it
       return new A( this.xyz );
    },
    
    getXYZRef: function( ) {
       return this.xyz;
    },
    
    setXYZ: function( xyz ) {
       // copy it
       this.xyz = new A( xyz );
       return this;
    },
    
    setXYZRef: function( xyz ) {
       this.xyz = xyz;
       return this;
    },
    
    clone: function( ) {
        return new Vector3( this.xyz );
    },

    equalsSelf: function( v ) {
        var aa = this.xyz, bb = v.xyz;
        return (aa[0] === bb[0]) && (aa[1] === bb[1]) && (aa[2] === bb[2]);
    },

    zeroSelf: function( ) {
        var aa = this.xyz;
        a[0] = 0; a[1] = 0; a[2] = 0;
        return this;
    },

    negate: function( ) {
        var aa = this.xyz;
        return new Vector3( [-aa[0], -aa[1], -aa[2]] );
    },

    negateSelf: function( ) {
        var aa = this.xyz;
        aa[0] = -aa[0]; aa[1] = -aa[1]; aa[2] = -aa[2];
        return this;
    },

    add: function( v ) {
        var aa = this.xyz, bb = v.xyz;
        return new Vector3( [aa[0] + bb[0], aa[1] + bb[1], aa[2] + bb[2]] );
    },

    addSelf: function( v ) {
        var aa = this.xyz, bb = v.xyz;
        aa[0] += bb[0]; aa[1] += bb[1]; aa[2] += bb[2];
        return this;
    },

    subtract: function( v ) {
        var aa = this.xyz, bb = v.xyz;
        return new Vector3( [aa[0] - bb[0], aa[1] - bb[1], aa[2] - bb[2]] );
    },

    subtractSelf: function( v ) {
        var aa = this.xyz, bb = v.xyz;
        aa[0] -= bb[0]; aa[1] -= bb[1]; aa[2] -= bb[2];
        return this;
    },

    multiplyScalar: function( s ) {
        var aa = this.xyz;
        return new Vector3( [aa[0] * s, aa[1] * s, aa[2] * s] );
    },

    multiplyScalarSelf: function( s ) {
        var aa = this.xyz;
        aa[0] *= s; aa[1] *= s; aa[2] *= s;
        return this;
    },

    multiply: function( v ) {
        var aa = this.xyz, bb = v.xyz;
        return new Vector3( [aa[0] * bb[0], aa[1] * bb[1], aa[2] * bb[2]] );
    },

    multiplySelf: function( v ) {
        var aa = this.xyz, bb = v.xyz;
        aa[0] *= bb[0]; aa[1] *= bb[1]; aa[2] *= bb[2];
        return this;
    },

    divide: function( s ) {
        var aa = this.xyz;
        return new Vector3( [aa[0] / s, aa[1] / s, aa[2] / s] );
    },

    divideSelf: function( s ) {
        var aa = this.xyz;
        aa[0] /= s; aa[1] /= s; aa[2] /= s;
        return this;
    },

    normalize: function( ) {
        var aa = this.xyz,
            x = aa[0], y = aa[1], z = aa[2],
            m = x * x + y * y + z * z, n;
        if ( 0 < m ) 
        {
            n = 1 / Sqrt(m);
            x *= n;
            y *= n;
            z *= n;
        }
        return new Vector3( [x, y, z] );
    },

    normalizeSelf: function( ) {
        var aa = this.xyz,
            x = aa[0], y = aa[1], z = aa[2],
            m = x * x + y * y + z * z, n;
        if ( 0 < m ) 
        {
            n = 1 / Sqrt(m);
            x *= n;
            y *= n;
            z *= n;
        }
        aa[0] = x; aa[1] = y; aa[2] = z;
        return this;
    },

    getMagnitude: function( ) {
        var aa = this.xyz,
            x = aa[0], y = aa[1], z = aa[2];
        return Sqrt(x * x + y * y + z * z);
    },

    setMagnitude: function( m ) {
        this.normalizeSelf( ); 
        var aa = this.xyz;
        aa[0] *= m;  aa[1] *= m;  aa[2] *= m;
        return this;
    },

    dotSelf: function( v ) {
        var aa = this.xyz, bb = v.xyz;
        return aa[0] * bb[0] + aa[1] * bb[1] + aa[2] * bb[2];
    },

    crossSelf: function( v ) {
        var aa = this.xyz, bb = v.xyz,
            ax = aa[0], ay = aa[1], az = aa[2], 
            bx = bb[0], by = bb[1], bz = bb[2];
        aa[0] = ay * bz - az * by; 
        aa[1] = az * bx - ax * bz; 
        aa[2] = ax * by - ay * bx;
        return this;
    },

    distanceSelf: function( v ) {
        var aa = this.xyz, bb = v.xyz,
            dx = aa[0] - bb[0],
            dy = aa[1] - bb[1],
            dz = aa[2] - bb[2];
        return Sqrt(dx * dx + dy * dy + dz * dz);
    },

    toString: function( ) {
        return "[" + this.xyz[0] + " , " + this.xyz[1] + " , " + this.xyz[2] + "]";
    }
});

}(MOD3);