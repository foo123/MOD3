/**
*
* MOD3  Modifier Super Class
*
*
**/
(function(MOD3, undef){
    
    var Modifier = MOD3.Modifier = Class( Object,
    {
        constructor : function(mod) {
            this.mod = mod || null;
        },
        
        mod : null,

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