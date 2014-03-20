/**
*
* MOD3  DisplaceMap (BitmapDisplacement) Modifier
*
*
**/

/**[DOC_MD]
 *  ###DisplaceMap (BitmapDisplacement) Modifier 
 *
 *  Displaces vertices based on RGB values of bitmapData pixels. 
 *  
 *  BitmapDisplacement is inspired by both the AS3 built-in DisplacementMapFilter. It allows
 *  to use color values for each channels of a bitmap to modify the position of vertices in a mesh.
 *  
 *  The displacement takes place along the cardinal axes, and each axis is mapped to a 
 *  channel in the bitmap: X for Red, Y for Green and Z for Blue.
 *  
 *  @author Bartek Drozdz
 *  
[/DOC_MD]**/

(function(MOD3, undef){
    
    var round = Math.round, ModConstant = MOD3.ModConstant, NONE = ModConstant.NONE,
        X = ModConstant.X, Y = ModConstant.Y, Z = ModConstant.Z
    ;

    // IN PROGRESS
    var DisplaceMap = MOD3.DisplaceMap = MOD3.Class ( MOD3.Modifier, {
        
        constructor: function( b, w, h, f ) {
            this.$super('constructor');
            this.name = 'DisplaceMap';
            this.setBitmap( b, w, h );
            this.force = f || 1;
            this.offset = 0x80;
            this.axes = X | Y | Z;
        },
        
        width: null,
        height: null,
        bitmap: null,
        force: 1,
        offset: 0x80,
        
        dispose: function( ) {
            this.bitmap = null;
            this.width = null;
            this.height = null;
            this.force = null;
            this.offset = null;
            this.$super('dispose');
            
            return this;
        },
        
        setBitmap: function( b, w, h ) {
            this.bitmap = b || null;
            this.width = w || 0;
            this.height = h || 0;
            return this;
        },
        
        getUVPixel: function( u, v ) {
            var w = this.width, h = this.height,
                x = round( (w - 1) * u ),
                y = round( (h - 1) * v )
            ;
            return this.bitmap[ (y % h)*w + x % w ];
        },

        apply: function( ) {
            var vs = this.mod.vertices, vc = vs.length, axes = this.axes,
                force = this.force, offset = this.offset, v, uv, xyz;

            // optimize loop using while counting down instead of up
            while ( --vc >= 0 )
            {
                v = vs[ vc ];
                xyz = v.getXYZ( );
                uv = this.getUVPixel( v.ratio[ 0 ]/* X */, v.ratio[ 2 ]/* Z */ );
                
                if ( axes & X ) xyz[ 0 ] += ((uv >> 16 & 0xff) - offset) * force;
                if ( axes & Y ) xyz[ 1 ] += ((uv >> 8 & 0xff) - offset) * force;
                if ( axes & Z ) xyz[ 2 ] += ((uv & 0xff) - offset) * force;
                
                v.setXYZ( xyz );
            }

            return this;
        }
    });
    
})(MOD3);