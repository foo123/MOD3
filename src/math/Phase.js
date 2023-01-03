/**
* MOD3  Phase Auxilliary Class
**/
MOD3.Phase = MOD3.Class({
    constructor: function Phase(v) {
        var self = this;
        if (!(self instanceof Phase)) return new Phase(v);
        self.value = v || 0;
    },

    name: "Phase",
    value: 0,

    dispose: function() {
        this.value = null;
        return this;
    },

    getPhasedValue: function()  {
        return stdMath.sin(this.value);
    },

    getAbsPhasedValue: function()  {
        return stdMath.abs(stdMath.sin(this.value));
    },

    getNormValue: function() {
        return (stdMath.sin(this.value) + 1)*0.5;
    }
});
