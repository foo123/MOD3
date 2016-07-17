/**
*
* MOD3  DisplaceMap (BitmapDisplacement) Modifier
*
*
**/

/**[DOC_MD]
 * ###DisplaceMap (BitmapDisplacement) Modifier 
 *
 * Displaces vertices based on RGB values of bitmapData pixels. 
 * 
 * BitmapDisplacement is inspired by both the AS3 built-in DisplacementMapFilter. It allows
 * to use color values for each channels of a bitmap to modify the position of vertices in a mesh.
 * 
 * The displacement takes place along the cardinal axes, and each axis is mapped to a 
 * channel in the bitmap: X for Red, Y for Green and Z for Blue.
 * 
 * @author Bartek Drozdz
 * 
[/DOC_MD]**/

!function(MOD3, undef){
@@USE_STRICT@@

var ModConstant = MOD3.ModConstant, NONE = ModConstant.NONE,
    X = ModConstant.X, Y = ModConstant.Y, Z = ModConstant.Z,
    each = MOD3.List.each
;

var DisplaceMap = MOD3.DisplaceMap = MOD3.Class ( MOD3.Modifier, {
    
    constructor: function DisplaceMap( bmp, force, offset ) {
        var self = this;
        if ( !(self instanceof DisplaceMap) ) return new DisplaceMap( bmp, force, offset );
        self.$super('constructor');
        self.name = 'DisplaceMap';
        if ( +bmp == bmp ) // number
        {
            self.force = bmp || 1;
            self.offset = null == force ? 127 : force;// 0x7F;
        }
        else
        {
            self.setBitmap( bmp );
            self.force = force || 1;
            self.offset = null == offset ? 127 : offset;// 0x7F;
        }
        self.axes = X | Y | Z;
    },
    
    width: null,
    height: null,
    bmpData: null,
    force: 1,
    offset: 127,
    
    dispose: function( ) {
        var self = this;
        self.bmpData = null;
        self.width = null;
        self.height = null;
        self.force = null;
        self.offset = null;
        self.$super('dispose');
        return self;
    },
    
    setBitmap: function( bmpData ) {
        var self = this;
        self.bmpData = bmpData ? bmpData.data : null;
        self.width = bmpData ? bmpData.width : 0;
        self.height = bmpData ? bmpData.height : 0;
        return self;
    },
    
    apply: function( modifiable ) {
        var self = this,
            axes = self.axes,
            w = self.width, h = self.height, bmp = self.bmpData,
            force = self.force, offset = self.offset;

        if ( !axes || !bmp ) return self;
        
        each(modifiable.vertices, function( v ){
            var uv, uu, vv, xyz = v.getXYZ( );
            
            uu = ~~( (w - 1) * v.ratio[ 0 ]/* X */ );
            vv = ~~( (h - 1) * v.ratio[ 2 ]/* Z */ );
            uv = ( vv * w + uu ) << 2;
            
            v.setXYZ([
                xyz[ 0 ] + (axes & X ? ((bmp[ uv ] & 0xff) - offset) * force : 0),
                xyz[ 1 ] + (axes & Y ? ((bmp[ uv+1 ] & 0xff) - offset) * force : 0),
                xyz[ 2 ] + (axes & Z ? ((bmp[ uv+2 ] & 0xff) - offset) * force : 0)
            ]);
        });
        return self;
    }
});

}(MOD3);