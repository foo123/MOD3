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

var Vector3 = MOD3.Vector3, each = MOD3.List.each, add = Vector3.add;

var Pivot = MOD3.Pivot = MOD3.Class ( MOD3.Modifier, {
    
    constructor: function Pivot( x, y, z ) {
        var self = this;
        if ( !(self instanceof Pivot) ) return new Pivot( x, y, z );
        self.$super('constructor');
        self.name = 'Pivot';
        self.vector = new Vector3( x||0, y||0, z||0 );
    },
    
    vector: null,
    
    dispose: function( ) {
        var self = this;
        self.vector.dispose( );
        self.vector = null;
        self.$super('dispose');
        return self;
    },
    
    setMeshCenter: function( modifiable ) {
        var self = this;
        self.vector = new Vector3(
        -(modifiable.minX + 0.5*modifiable.width), 
        -(modifiable.minY + 0.5*modifiable.height), 
        -(modifiable.minZ + 0.5*modifiable.depth)
        );
        return self;
    },
    
    apply: function( modifiable ) {
        var self = this, pivot = self.vector, pv = pivot.xyz;

        each(modifiable.vertices, function( v ){
            v.setXYZ( add( v.getXYZ( ), pv ) );
        });
        modifiable.updateMeshPosition( pivot.negate( ) );
        return self;
    }
});

}(MOD3);