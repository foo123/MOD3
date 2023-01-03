/**
* MOD3  Range Auxilliary Class
**/
MOD3.Range = MOD3.Class({
    constructor: function Range(s, e)  {
        var self = this;
        if (!(self instanceof Range)) return new Range(s, e);
        self.start = null != s ? s : 0;
        self.end = null != e ? e : 1;
    },

    name: "Range",
    start: 0,
    end: 1,

    dispose: function() {
        var self = this;
        self.start = null;
        self.end = null;
        return self;
    },

    getSize: function()  {
        return this.end - this.start;
    },

    move: function(amount)  {
        this.start += amount;
        this.end += amount;
    },

    isIn: function(n) {
        return (n >= this.start && n <= this.end);
    },

    normalize: function(n) {
        return MOD3.XMath.normalize(this.start, this.end, n);
    },

    toRange: function(n) {
        return MOD3.XMath.toRange(this.start, this.end, n);
    },

    trim: function(n) {
        return MOD3.XMath.trim(this.start, this.end, n);
    },

    interpolate: function(n, r) {
        return MOD3.XMath.toRange(this.start, this.end, r.normalize(n));
    },

    toString: function() {
        return "[" + this.start + " - " + this.end + "]";
    }
});
