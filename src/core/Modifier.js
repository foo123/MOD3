/**
*
* MOD3  Modifier Super Class
*
*
**/
(function(MOD3, undef){
    
    var modCount = 0;
    var Modifier = MOD3.Modifier = Class( Object,
    {
        constructor : function(mod) {
            this.id = ++modCount;
            this.name = 'Generic Modifier';
            this.mod = mod || null;
            this.enabled = true;
        },
        
        id: null,
        name: null,
        mod : null,
        enabled: true,

        dispose : function() {
            this.mod = null;
            this.name = null;
            return this;
        },
        
        enable : function(enabled) {
            if ( undef !== enabled )
            {
                this.enabled = !!enabled;
                return this;
            }
            return this.enabled;
        },
        
        setModifiable : function(mod) {
            this.mod = mod;
            
            return this;
        },

        getVertices : function() {
            return this.mod.getVertices();
        },

        apply : function(){
            // override
            return this;
        }
    });
    
})(MOD3);