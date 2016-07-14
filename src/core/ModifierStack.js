/**
*
* MOD3  ModifierStack Class
*
*
**/
!function(MOD3, undef){
@@USE_STRICT@@

var getMeshProxy = MOD3.Factory.getMeshProxy;

var ModifierStack = MOD3.ModifierStack = MOD3.Class({
    
    constructor: function( lib3d, mesh ) {
        var self = this;
        self.mod = null;
        self.stack = [ ];
        
        self.lib3d = lib3d;
        self.mod = getMeshProxy( self.lib3d );
        if ( mesh )
        {
            self.mod.setMesh( mesh );
            self.mod.analyzeGeometry( );
        }
    },

    name: "ModifierStack",
    
    lib3d: null,
    mod: null,
    stack: null,

    dispose: function( withModifiers ) {
        var self = this;
        self.lib3d = null;
        if ( withModifiers && self.stack )
        {
            while ( self.stack.length ) 
                self.stack.pop( ).dispose( );
        }
        self.stack = null;
        if ( self.mod ) self.mod.dispose( );
        self.mod = null;
        
        return self;
    },
    
    setModifiable: function( mod ) {
        var self = this;
        self.mod = mod;
        return self;
    },

    add: function( modifier ) {
        var self = this;
        if ( modifier )
        {
            modifier.setModifiable( self.mod );
            self.stack.push( modifier );
        }
        return self;
    },

    apply: function( ) {
        var self = this;
        if ( self.mod && self.stack && self.stack.length )
        {
            var stack = self.stack, sl = stack.length, 
               mod = self.mod, i;

            mod.resetGeometry( );
            
            for (i=0; i<sl; i++) stack[ i ].enabled && stack[ i ].apply( );
            
            mod.update( );
            
            // do any post-process if needed
            //mod.postApply( );
        }
        return self;
    },

    collapse: function( ) {
        var self = this;
        if ( self.mod && self.stack && self.stack.length )
        {
            self.apply( );
            self.mod.collapseGeometry( );
            self.stack.length = 0;
        }
        
        return self;
    },

    clear: function( ) {
        var self = this;
        if ( self.stack ) self.stack.length = 0;
        return self;
    },

    getMeshInfo: function( ) {
        return this.mod;
    }
});
// aliases
ModifierStack.prototype.addModifier = ModifierStack.prototype.add;

}(MOD3);