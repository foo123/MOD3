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

var Vector3 = MOD3.Vector3, Range = MOD3.Range, Matrix4 = MOD3.Matrix4,
    Max = Math.max, Min = Math.min, each = MOD3.List.each, mult4XYZ = Matrix4.multXYZ;

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
        self.range.dispose( );
        self.bv = null;
        self.range = null;
        self.offset = null;
        self.angle = null;
        self.$super('dispose');
        return self;
    },
    
    apply: function( modifiable ) {
        var self = this,
            offset = Min(1, Max(0, self.offset)), range = self.range, angle = self.angle,
            bv = self.bv/*.normalizeSelf( )*/.xyz, pv, rm;

        pv = modifiable.minZ + modifiable.depth*offset;
        rm = new Matrix4( ).rotate( bv[ 0 ], bv[ 1 ], bv[ 2 ], angle );

        each(modifiable.vertices, function( v ) {
            var c = v.getXYZ( );
            c[ 2 ] -= pv;
            if ( (0 <= c[ 2 ]) && range.isIn( v.ratio[ 1 ] ) ) mult4XYZ( rm, c );
            c[ 2 ] += pv;
            v.setXYZ( c );
        });
        return self;
   }
});

}(MOD3);