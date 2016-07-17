/**
*
* MOD3  Vector3 Class
*
*
**/
!function(MOD3, undef){
@@USE_STRICT@@

var Sqrt = Math.sqrt, V = MOD3.VecArray;

var Vector3 = MOD3.Vector3 = MOD3.Class({
    
    // static
    __static__: {
        
        ZERO: function( ) {
            return new Vector3( 0, 0, 0 );
        },
        
        X: function( direct_or_complement ) {
            return false === direct_or_complement ? new Vector3( 0, 1, 1 ) : new Vector3( 1, 0, 0 );
        },
        
        Y: function( direct_or_complement ) {
            return false === direct_or_complement ? new Vector3( 1, 0, 1 ) : new Vector3( 0, 1, 0 );
        },
        
        Z: function( direct_or_complement ) {
            return false === direct_or_complement ? new Vector3( 1, 1, 0 ) : new Vector3( 0, 0, 1 );
        },
        
        dot: function( v, w ) { 
            return v[0]*w[0] + v[1]*w[1] + v[2]*w[2]; 
        },
        
        equals: function( v, w ) {
            return (v[0] === w[0]) && (v[1] === w[1]) && (v[2] === w[2]);
        },
        
        cross: function( v, w ) {
            var vw = new V(3);
            vw[0] = v[1] * w[2] - v[2] * w[1];
            vw[1] = v[2] * w[0] - v[0] * w[2];
            vw[2] = v[0] * w[1] - v[1] * w[0];
            return vw;
        },
        
        mod: function( v ) {
            var x = v[0], y = v[1], z = v[2];
            return Sqrt(x*x + y*y + z*z);
        },
        
        dist: function( v, w ) {
            var dx = v[0] - w[0],
                dy = v[1] - w[1],
                dz = v[2] - w[2];
            return Sqrt(dx*dx + dy*dy + dz*dz);
        },
        
        add: function( v, w ) {
            v[0] += w[0];
            v[1] += w[1];
            v[2] += w[2];
            return v;
        },
        
        sub: function( v, w ) {
            v[0] -= w[0];
            v[1] -= w[1];
            v[2] -= w[2];
            return v;
        },
        
        mul: function( v, w ) {
            v[0] *= w[0];
            v[1] *= w[1];
            v[2] *= w[2];
            return v;
        },
        
        muls: function( v, m ) {
            v[0] *= m;
            v[1] *= m;
            v[2] *= m;
            return v;
        },
        
        norm: function( v ) {
            var x = v[0], y = v[1], z = v[2],
                m = x*x + y*y + z*z, n;
            if ( 0 < m ) 
            {
                n = Sqrt(m);
                x /= n;
                y /= n;
                z /= n;
            }
            v[0] = x; v[1] = y; v[2] = z;
            return v;
        }
    },
    
    constructor: function Vector3( x, y, z ) {
        var self = this;
        if ( !(self instanceof Vector3) ) return new Vector3( x, y, z );
        
        // use an internal typed-array for speed
        var v = new V(3);
        if ( x && (3 === x.length) )
        {
            // array passed
            v[0] = x[0] || 0;
            v[1] = x[1] || 0;
            v[2] = x[2] || 0;
        }
        else
        {
            // numbers passed
            v[0] = x || 0;
            v[1] = y || 0;
            v[2] = z || 0;
        }
        self.xyz = v;
    },
    
    name: "Vector3",
    xyz: null,
    
    dispose: function( ) {
        this.xyz = null;
        return this;
    },
    
    getXYZ: function( ) {
       // copy it
       return new V( this.xyz );
    },
    
    getXYZRef: function( ) {
       return this.xyz;
    },
    
    setXYZ: function( w ) {
       var v = this.xyz;
       v[0] = w[0];
       v[1] = w[1];
       v[2] = w[2];
       return this;
    },
    
    setXYZRef: function( xyz ) {
       this.xyz = xyz;
       return this;
    },
    
    clone: function( ) {
        return new Vector3( this.xyz );
    },

    equalsSelf: function( b ) {
        var v = this.xyz, w = b.xyz;
        return (v[0] === w[0]) && (v[1] === w[1]) && (v[2] === w[2]);
    },

    zeroSelf: function( ) {
        var v = this.xyz;
        v[0] = 0; v[1] = 0; v[2] = 0;
        return this;
    },

    negate: function( ) {
        var v = this.xyz;
        return new Vector3( -v[0], -v[1], -v[2] );
    },

    negateSelf: function( ) {
        var v = this.xyz;
        v[0] = -v[0]; v[1] = -v[1]; v[2] = -v[2];
        return this;
    },

    add: function( b ) {
        var v = this.xyz, w = b.xyz;
        return new Vector3( v[0] + w[0], v[1] + w[1], v[2] + w[2] );
    },

    addSelf: function( b ) {
        var v = this.xyz, w = b.xyz;
        v[0] += w[0]; v[1] += w[1]; v[2] += w[2];
        return this;
    },

    subtract: function( b ) {
        var v = this.xyz, w = b.xyz;
        return new Vector3( v[0] - w[0], v[1] - w[1], v[2] - w[2] );
    },

    subtractSelf: function( b ) {
        var v = this.xyz, w = b.xyz;
        v[0] -= w[0]; v[1] -= w[1]; v[2] -= w[2];
        return this;
    },

    multiplyScalar: function( s ) {
        var v = this.xyz;
        return new Vector3( v[0] * s, v[1] * s, v[2] * s );
    },

    multiplyScalarSelf: function( s ) {
        var v = this.xyz;
        v[0] *= s; v[1] *= s; v[2] *= s;
        return this;
    },

    multiply: function( b ) {
        var v = this.xyz, w = b.xyz;
        return new Vector3( v[0] * w[0], v[1] * w[1], v[2] * w[2] );
    },

    multiplySelf: function( b ) {
        var v = this.xyz, w = b.xyz;
        v[0] *= w[0]; v[1] *= w[1]; v[2] *= w[2];
        return this;
    },

    divide: function( s ) {
        var v = this.xyz;
        return new Vector3( v[0] / s, v[1] / s, v[2] / s );
    },

    divideSelf: function( s ) {
        var v = this.xyz;
        v[0] /= s; v[1] /= s; v[2] /= s;
        return this;
    },

    normalize: function( ) {
        var v = this.xyz,
            x = v[0], y = v[1], z = v[2],
            m = x * x + y * y + z * z, n;
        if ( 0 < m ) 
        {
            n = Sqrt(m);
            x /= n;
            y /= n;
            z /= n;
        }
        return new Vector3( x, y, z );
    },

    normalizeSelf: function( ) {
        var v = this.xyz,
            x = v[0], y = v[1], z = v[2],
            m = x * x + y * y + z * z, n;
        if ( 0 < m ) 
        {
            n = Sqrt(m);
            x /= n;
            y /= n;
            z /= n;
        }
        v[0] = x; v[1] = y; v[2] = z;
        return this;
    },

    getMagnitude: function( ) {
        var v = this.xyz, x = v[0], y = v[1], z = v[2];
        return Sqrt(x*x + y*y + z*z);
    },

    setMagnitude: function( m ) {
        this.normalizeSelf( ); 
        var v = this.xyz;
        v[0] *= m; v[1] *= m; v[2] *= m;
        return this;
    },

    dot: function( b ) {
        var v = this.xyz, w = b.xyz;
        return v[0]*w[0] + v[1]*w[1] + v[2]*w[2];
    },

    cross: function( b ) {
        var v = this.xyz, w = b.xyz,
            x1 = v[0], y1 = v[1], z1 = v[2], 
            x2 = w[0], y2 = w[1], z2 = w[2];
        return new Vector3( y1 * z2 - z1 * y2, z1 * x2 - x1 * z2, x1 * y2 - y1 * x2 );
    },

    crossSelf: function( v ) {
        var v = this.xyz, w = b.xyz,
            x1 = v[0], y1 = v[1], z1 = v[2], 
            x2 = w[0], y2 = w[1], z2 = w[2];
        v[0] = y1 * z2 - z1 * y2; 
        v[1] = z1 * x2 - x1 * z2; 
        v[2] = x1 * y2 - y1 * x2;
        return this;
    },

    distance: function( b ) {
        var v = this.xyz, w = b.xyz,
            dx = v[0] - w[0],
            dy = v[1] - w[1],
            dz = v[2] - w[2];
        return Sqrt(dx*dx + dy*dy + dz*dz);
    },

    toString: function( ) {
        var v = this.xyz;
        return "[" + v[0] + " , " + v[1] + " , " + v[2] + "]";
    }
});
// alaises
Vector3.modulo = Vector3.mod;
Vector3.distance = Vector3.dist;
Vector3.prototype.dotSelf = Vector3.prototype.dot;
Vector3.prototype.distanceSelf = Vector3.prototype.distance;

}(MOD3);