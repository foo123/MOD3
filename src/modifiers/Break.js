/**
*
* MOD3  Break Modifier
*
*
**/

/**[DOC_MD]
 * ###Break modifier 
 *
 * Allow to break a mesh
 *
 * @author Bartek Drozdz
 *  
[/DOC_MD]**/

!function(MOD3, undef){
@@USE_STRICT@@

var Vector3 = MOD3.Vector3, Range = MOD3.Range, Matrix4 = MOD3.Matrix4, each = MOD3.List.each;

var Break = MOD3.Break = MOD3.Class ( MOD3.Modifier, {
    
    constructor: function( o, a ) {
        var self = this;
        self.$super('constructor');
        self.name = 'Break';
        self.bv = new Vector3([0, 1, 0]);
        self.range = new Range(0, 1);
        
        self.offset = o !== undef ? o : 0;
        self.angle = a !== undef ? a : 0;
    },
    
    bv: null,
    range: null,
    offset: 0,
    angle: 0,
    
    dispose: function( ) {
        var self = this;
        self.bv.dispose( );
        self.bv = null;
        self.range.dispose( );
        self.range = null;
        self.offset = null;
        self.angle = null;
        self.$super('dispose');
        
        return self;
    },
    
    apply: function( ) {
        var self = this,
            mod = self.mod,
            offset = self.offset, range = self.range, angle = self.angle, bv = self.bv, bvxyz = bv.xyz,
            pv, npv, v, rm;

        pv = new Vector3([0, 0, -(mod.minZ + mod.depth * offset)]);
        npv = pv.negate( );
        rm = new Matrix4( ).rotationMatrix( bvxyz[ 0 ], bvxyz[ 1 ], bvxyz[ 2 ], angle );

        each(mod.vertices, function( v ) {
            var c = v.getVector( ).addSelf( pv );
            if( c.xyz[ 2 ] >= 0 && range.isIn( v.ratio[ 1 ] ) ) rm.multiplyVector( c );
            v.setVector( c.addSelf( npv ) );
        });
         
        return self;
   }
});

}(MOD3);