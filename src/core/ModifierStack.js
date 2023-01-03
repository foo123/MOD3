/**
* MOD3  Modifier & ModifierStack Classes
**/
var _modCount = 0;

MOD3.Modifier = MOD3.Class({
    constructor: function Modifier() {
        var self = this;
        self.id = ++_modCount;
        self.name = 'Modifier';
        self.axes = MOD3.ModConstant.NONE;
        self.constraint = MOD3.ModConstant.NONE;
        self.enabled = true;
    },

    id: null,
    name: 'Modifier',
    axes: null,
    constraint: null,
    enabled: true,

    dispose: function() {
        var self = this;
        self.name = null;
        self.axes = null;
        self.constraint = null;
        return self;
    },

    enable: function(enabled) {
        if (arguments.length)
        {
            this.enabled = !!enabled;
            return this;
        }
        return this.enabled;
    },

    constraintAxes: function(axes) {
        this.axes = axes || MOD3.ModConstant.NONE;
        return this;
    },

    setConstraint: function(c) {
        this.constraint = c || MOD3.ModConstant.NONE;
        return this;
    },

    // override
    apply: function(modifiable) {
        return this;
    },

    toString: function() {
        return '[Modifier '+this.name+']';
    }
});

MOD3.ModifierStack = MOD3.Class({
    constructor: function ModifierStack(lib3d, mesh) {
        var self = this;
        if (!(self instanceof ModifierStack)) return new ModifierStack(lib3d, mesh);
        self.stack = [];
        self.setModifiable(MOD3.Factory.getMeshProxy(lib3d), mesh);
    },

    name: "ModifierStack",
    modifiable: null,
    stack: null,

    dispose: function(withModifiers) {
        var self = this;
        if (withModifiers && self.stack) while (self.stack.length) self.stack.pop().dispose();
        if (self.modifiable) self.modifiable.dispose();
        self.stack = null;
        self.modifiable = null;
        return self;
    },

    getModifiable: function() {
        return this.modifiable;
    },

    setModifiable: function(modifiable, mesh) {
        var self = this;
        self.modifiable = modifiable;
        if (mesh) self.modifiable.setMesh(mesh);
        return self;
    },

    add: function(modifier) {
        var self = this;
        if (modifier) self.stack.push(modifier);
        return self;
    },

    apply: function() {
        var self = this, modifiable = self.modifiable, stack = self.stack;
        if (modifiable && stack && stack.length)
            modifiable
                .preApply()
                .resetGeometry()
                .applyModifiers(stack)
                .postApply()
                .update()
            ;
        return self;
    },

    collapse: function() {
        var self = this, modifiable = self.modifiable, stack = self.stack;
        if (modifiable && stack && stack.length)
        {
            modifiable
                .preApply()
                .resetGeometry()
                .applyModifiers(stack)
                .collapseGeometry()
                .postApply()
                .update()
            ;
            stack.length = 0;
        }
        return self;
    },

    clear: function() {
        var self = this;
        if (self.stack) self.stack.length = 0;
        return self;
    }
});
// aliases
MOD3.ModifierStack.prototype.getMeshInfo = MOD3.ModifierStack.prototype.getModifiable;
MOD3.ModifierStack.prototype.addModifier = MOD3.ModifierStack.prototype.add;
