/**
* MOD3  2D Point Class
**/
MOD3.Point = MOD3.Class({
    constructor: function Point(x, y) {
        var self = this;
        if (!(self instanceof Point)) return new Point(x, y);
        self.x = x || 0;
        self.y = y || 0;
    },

    name: "Point",
    x: 0,
    y: 0,

    dispose: function() {
        var self = this;
        self.x = null;
        self.y = null;
        return self;
    },

    clone: function() {
        return new MOD3.Point(this.x, this.y);
    }
});
