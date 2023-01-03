/**
* MOD3  2D Transform Matrix Class
**/
MOD3.Matrix = MOD3.Class(null, {
    constructor: function Matrix(m11, m12,
                                 m21, m22)
   {
        var self = this;
        if (!(self instanceof Matrix)) return new Matrix(m11, m12,
                                                         m21, m22);
        self.m = new MOD3.VecArray([
            m11 == null ? 1 : m11,
            m12 == null ? 0 : m12,
            m21 == null ? 0 : m21,
            m22 == null ? 1 : m22
        ]);
    },

    name: "Matrix",
    m: null,

    dispose: function() {
        this.m = null;
        return this;
    },

    reset: function() {
        var m = this.m;
        m[0] = 1; m[1] = 0;
        m[2] = 0; m[3] = 1;
        return this;
    },

    rotate: function(angle)  {
        var m = this.m, c = stdMath.cos(angle), s = stdMath.sin(angle);
        m[0] = c; m[1] = -s;
        m[2] = s; m[3] = c;
        return this;
    },

    scale: function(sx, sy) {
        var m = this.m;
        m[0] = 1; m[1] = 0;
        m[2] = 0; m[3] = 1;
        if (sx != null)
        {
            m[0] = sx;
            m[3] = sx;
        }
        if (sy != null)
        {
            m[3] = sy;
        }
        return this;
    },

    multiply: function(b) {
        return MOD3.Matrix.mult(this, b);
    },

    transformPoint: function(p) {
        var xy = MOD3.Matrix.transform(this, [p.x, p.y]);
        return new MOD3.Point(xy[0], xy[1]);
    },

    transformPointSelf: function(p) {
        var xy = MOD3.Matrix.transform(this, [p.x, p.y]);
        p.x = xy[0]; p.y = xy[1];
        return p;
    },

    clone: function() {
        var m = this.m;
        return new MOD3.Matrix(m[0], m[1],
                          m[2], m[3]);
    }
}, {
    transform: function(m2, xy) {
        var m = m2.m, x = xy[0], y = xy[1];
        xy[0] = m[0]*x + m[1]*y;
        xy[1] = m[2]*x + m[3]*y;
        return xy;
    },

    mult: function(m1, m2) {
        var a = m1.m, b = m2.m, a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
        a[0] = a0*b[0] + a1*b[2];
        a[1] = a0*b[1] + a1*b[3];
        a[2] = a2*b[0] + a3*b[2];
        a[3] = a2*b[1] + a3*b[3];
        return m1;
    }
});
