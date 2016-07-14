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

var Vector3 = MOD3.Vector3, each = MOD3.List.each;

var Pivot = MOD3.Pivot = MOD3.Class ( MOD3.Modifier, {
    
    constructor: function( x, y, z ) {
        var self = this;
        self.$super('constructor');
        self.name = 'Pivot';
        self.pivot = new Vector3([x||0, y||0, z||0]);
    },
    
    pivot: null,
    
    dispose: function( ) {
        var self = this;
        self.pivot.dispose( );
        self.pivot = null;
        self.$super('dispose');
        return self;
    },
    
    setMeshCenter: function( ) {
        var self = this,
        // cache
        mod = self.mod;
        
        self.pivot = new Vector3(
            -(mod.minX + 0.5*mod.width), 
            -(mod.minY + 0.5*mod.height), 
            -(mod.minZ + 0.5*mod.depth)
        );
        
        return self;
    },
    
    apply: function( ) {
        var self = this, pivot = self.pivot;

        each(self.mod.vertices, function( v ){
            v.setVector( v.getVector( ).addSelf( pivot ) );
        });
        self.mod.updateMeshPosition( pivot.negate( ) );
        
        return self;
    }
});

}(MOD3);