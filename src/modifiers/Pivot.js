/**
*
* MOD3  Pivot Modifier
*
*
**/

/**[DOC_MD]
 * ###Pivot modifier 
 *
 * Allows to move the pivot point of a 3D mesh.
 *
 * @author Bartek Drozdz
 *  
[/DOC_MD]**/

!function(MOD3, undef){
    
    @@USE_STRICT@@
    
    var Vector3 = MOD3.Vector3;
    
    var Pivot = MOD3.Pivot = MOD3.Class ( MOD3.Modifier, {
        
        constructor: function( x, y, z ) {
            this.$super('constructor');
            this.name = 'Pivot';
            this.pivot = new Vector3([x||0, y||0, z||0]);
        },
        
        pivot: null,
        
        dispose: function( ) {
            this.pivot.dispose( );
            this.pivot = null;
            this.$super('dispose');
            
            return this;
        },
        
        serialize: function( ) {
            return { 
                modifier: this.name, 
                params: {
                    pivot: this.pivot.serialize( ),
                    enabled: !!this.enabled
                }
            };
            
        },
        
        unserialize: function( json ) {
            if ( json && this.name === json.modifier )
            {
                var params = json.params;
                this.pivot.unserialize( params.pivot );
                this.enabled = !!params.enabled;
            }
            return this;
        },
        
        setMeshCenter: function( ) {
            // cache
            var mod = this.mod;
            
            this.pivot = new Vector3(
                -(mod.minX + 0.5*mod.width), 
                -(mod.minY + 0.5*mod.height), 
                -(mod.minZ + 0.5*mod.depth)
            );
            
            return this;
        },
        
        _apply: function( ) {
            var vs = this.mod.vertices, vc = vs.length, 
                pivot = this.pivot, v, vv;

            // optimize loop using while counting down instead of up
            while ( --vc >= 0 )
            {
                v = vs[ vc ];
                v.setVector( v.getVector( ).addSelf( pivot ) );
            }

            this.mod.updateMeshPosition( pivot.negate( ) );
            
            return this;
        }
    });
    
}(MOD3);