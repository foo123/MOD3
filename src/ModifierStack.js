/**
*
* MOD3  ModifierStack Class
*
*
**/
!function(MOD3, undef){
    
    @@USE_STRICT@@
    
    var getMeshProxy = MOD3.PluginFactory.getMeshProxy;
    
    var ModifierStack = MOD3.ModifierStack = MOD3.Class( MOD3.WorkerInterface, {
        
        constructor: function( lib3d, mesh ) {
            this.baseMesh = null;
            this.stack = [ ];
            
            this.lib3d = lib3d;
            this.baseMesh = getMeshProxy( lib3d );
            this.baseMesh.setMesh( mesh );
            this.baseMesh.analyzeGeometry( );
        },

        name: "ModifierStack",
        
        lib3d: null,
        baseMesh: null,
        stack: null,

        dispose: function( withModifiers ) {
            this.lib3d = null;
            if ( withModifiers && this.stack )
            {
                while ( this.stack.length ) 
                    this.stack.pop( ).dispose( );
            }
            this.stack = null;
            if ( this.baseMesh ) this.baseMesh.dispose( );
            this.baseMesh = null;
            
            return this;
        },
        
        add: function( modifier ) {
            if ( modifier )
            {
                modifier.setModifiable( this.baseMesh );
                this.stack.push( modifier );
            }
            return this;
        },

        apply: function( ) {
            if ( this.baseMesh && this.stack && this.stack.length )
            {
                var stack = this.stack, sl = stack.length, 
                    baseMesh = this.baseMesh, i = 0;

                baseMesh.resetGeometry( );
                
                // optimize loop using while
                while ( i < sl )
                {
                    stack[ i ].enabled && stack[ i ].apply( );
                    i++;
                    // update the mesh after each modifier apply
                    // avoid to update with each vertex change, 
                    // if possible update the mesh all at once
                    //baseMesh.update();
                }
                baseMesh.update( );
                
                // do any post-process if needed
                //baseMesh.postApply();
            }
            return this;
        },

        collapse: function( ) {
            if ( this.baseMesh && this.stack && this.stack.length )
            {
                this.apply( );
                this.baseMesh.collapseGeometry( );
                this.stack.length = 0;
            }
            
            return this;
        },

        clear: function( ) {
            if ( this.stack ) this.stack.length = 0;
            
            return this;
        },

        getMeshInfo: function( ) {
            return this.baseMesh;
        }
    });
    // aliases
    ModifierStack.prototype.addModifier = ModifierStack.prototype.add;
    
}(MOD3);