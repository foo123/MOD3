!function(MOD3) {
"use strict";
/**
* MOD3  Perlin/Simplex Noise Modifier
**/

/**[DOC_MD]
 * ### Perlin modifier
 *
 *  Displaces vertices based on a perlin/simplex noise source.
 *
 *  Accepts a perlin/simplex noise data (with width and height information) and displaces vertices
 *  based on the value of each point of the noise map.
 *
 *  @author Bartek Drozdz
 *
 *  @uses: https://github.com/josephg/noisejs for JavaScript
 *
[/DOC_MD]**/
function cyclic_shift(a, w, h, dX, dY)
{
    var size = w*h, b = new MOD3.VecArray(size), i, j, i2, j2, index;
    if (dX < 0) dX += w;
    if (dY < 0) dY += h;
    dX = ~~dX; dY = ~~dY;
    for (i=0,j=0,index=0; index<size; ++index,++i)
    {
        if (i >= w) {i = 0; ++j;}
        i2 = (i + dX) % w; j2 = (j + dY) % h;
        b[index] = a[i2 + j2 * w];
    }
    return b;
}
/*function generate2d(perlinNoise2d, w, h)
{
    var size = w*h, a = new MOD3.VecArray(size), i, j, index;
    for (i=0,j=0,index=0; index<size; ++index,++i)
    {
        if (i >= w) {i = 0; ++j;}
        a[index] = perlinNoise2d(i/w, j/h);
    }
    return a;
}*/
MOD3.Perlin = MOD3.Class(MOD3.Modifier, {
    constructor: function Perlin(force, noise, autoRun) {
        var self = this;
        if (!(self instanceof Perlin)) return new Perlin(force, noise, autoRun);
        self.$super('constructor');
        self.name = 'Perlin';
        self.force = null != force ? force : 1;
        self.perlin = noise;
        self.autoRun = null != autoRun ? !!autoRun : true;
        self.axes = MOD3.ModConstant.X | MOD3.ModConstant.Y | MOD3.ModConstant.Z;
    },

    speedX: 1,
    speedY: 1,
    perlin: null,
    force: 1,
    offset: 0,
    autoRun: true,

    dispose: function() {
        var self = this;
        self.perlin = null;
        self.speedX = null;
        self.speedY = null;
        self.force = null;
        self.offset = null;
        self.autoRun = null;
        self.$super('dispose');

        return self;
    },

    setSpeed: function(dX, dY) {
        var self = this;
        self.speedX = dX;
        self.speedY = dY;
        return self;
    },

    apply: function(modifiable) {
        var self = this,
            axes = self.axes, force = self.force,
            offset = self.offset, pn = self.perlin,
            w, h;

        if (!axes || !pn) return self;
        w = pn.width; h = pn.height;
        if (self.autoRun)
        {
            pn = self.perlin = cyclic_shift(pn, w, h, self.speedX, self.speedY);
            pn.width = w; pn.height = h;
        }

        MOD3.List.each(modifiable.vertices, function(v) {
            var xyz = v.getXYZ(),
                uu = ~~((w - 1) * v.ratio[0]/* u */),
                vv = ~~((h - 1) * v.ratio[2]/* v */),
                uv = uu + vv * w;

            v.setXYZ([
                xyz[0] + (axes & MOD3.ModConstant.X ? (pn[uv] - offset) * force : 0),
                xyz[1] + (axes & MOD3.ModConstant.Y ? (pn[uv/*+1*/] - offset) * force : 0),
                xyz[2] + (axes & MOD3.ModConstant.Z ? (pn[uv/*+2*/] - offset) * force : 0)
            ]);
        });
        return self;
    }
});
}(MOD3);