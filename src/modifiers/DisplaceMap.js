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
        X = ModConstant.X, Y = ModConstant.Y, Z = ModConstant.Z
    ;

    var DisplaceMap = MOD3.DisplaceMap = MOD3.Class ( MOD3.Modifier, {
        
        constructor: function( bmp, w, h, f ) {
            this.$super('constructor');
            this.name = 'DisplaceMap';
            if ( arguments.length >= 3 )
            {
                this.setBitmap( bmp, w, h );
                this.force = f || 1;
            }
            else
            {
                this.force = bmp || 1;
            }
            this.offset = 0x7F;
            this.axes = X | Y | Z;
        },
        
        width: null,
        height: null,
        bitmapData: null,
        force: 1,
        offset: 0x7F,
        
        dispose: function( ) {
            this.bitmapData = null;
            this.width = null;
            this.height = null;
            this.force = null;
            this.offset = null;
            this.$super('dispose');
            
            return this;
        },
        
        serialize: function( ) {
            return { 
                modifier: this.name, 
                params: {
                    width: this.width,
                    height: this.height,
                    bitmapData: this.bitmapData,
                    force: this.force,
                    offset: this.offset,
                    axes: this.axes,
                    enabled: !!this.enabled
                }
            };
            
        },
        
        unserialize: function( json ) {
            if ( json && this.name === json.modifier )
            {
                var params = json.params;
                this.width = params.width;
                this.height = params.height;
                this.bitmapData = params.bitmapData;
                this.force = params.force;
                this.offset = params.offset;
                this.axes = params.axes;
                this.enabled = !!params.enabled;
            }
            return this;
        },
        
        setBitmap: function( bmpData, w, h ) {
            this.bitmapData = bmpData || null;
            this.width = w || 0;
            this.height = h || 0;
            return this;
        },
        
        _apply: function( ) {
            var vs = this.mod.vertices, vc = vs.length, axes = this.axes,
                w = this.width, h = this.height, bmp = this.bitmapData,
                force = this.force, offset = this.offset, v, uv, x, y, xyz;

            if ( !axes || !bmp ) return this;
            
            // optimize loop using while counting down instead of up
            while ( --vc >= 0 )
            {
                v = vs[ vc ];
                xyz = v.getXYZ( );
                
                x = ~~( (w - 1) * v.ratio[ 0 ]/* X */ );
                y = ~~( (h - 1) * v.ratio[ 2 ]/* Z */ );
                uv = ( y * w + x ) << 2;
                
                if ( axes & X ) xyz[ 0 ] += ((bmp[ uv ] >> 16 & 0xff) - offset) * force;
                if ( axes & Y ) xyz[ 1 ] += ((bmp[ uv+1 ] >> 8 & 0xff) - offset) * force;
                if ( axes & Z ) xyz[ 2 ] += ((bmp[ uv+2 ] & 0xff) - offset) * force;
                
                v.setXYZ( xyz );
            }

            return this;
        }
    });
    
}(MOD3);