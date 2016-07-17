/**
*
* MOD3  Bloat Modifier
*
*
**/

/**[DOC_MD]
 * ###Bloat modifier 
 *
 * Bloats a mesh by forcing vertices out of specified sphere
 *
 * @author makc
 *  
[/DOC_MD]**/

!function(MOD3, undef){
@@USE_STRICT@@

var Vector3 = MOD3.Vector3, Max = Math.max, Exp = Math.exp, each = MOD3.List.each,
    add = Vector3.add, sub = Vector3.sub, mul = Vector3.muls, mod = Vector3.mod, norm = Vector3.norm;

var Bloat = MOD3.Bloat = MOD3.Class ( MOD3.Modifier, {
    
    constructor: function Bloat( radius, a, center ) {
        var self = this;
        if ( !(self instanceof Bloat) ) return new Bloat( radius, a, center );
        self.$super('constructor');
        self.name = 'Bloat';
        self.radius = radius || 0;
        self.a = null == a ? 0.01 : a;
        self.center = center || Vector3.ZERO( );
        //self.u = Vector3.ZERO();
    },
    
    radius: 0,
    a: 0.01,
    center: null,
    //u: null,
    
    dispose: function( ) {
        var self = this;
        self.center.dispose( );
        self.center = null;
        self.radius = null;
        self.a = null;
        self.$super('dispose');
        return self;
    },
    
    apply: function( modifiable )  {
        var self = this, center = self.center.xyz, radius = Max( 0, self.radius ), a = Max( 0, self.a );

        each(modifiable.vertices, function( v ){
            // get a vector towards vertex
            // change norm to norm + r * exp (-a * norm)
            var uu = sub( v.getXYZ( ), center ), magn = mod( uu );
            mul( norm( uu ), magn + radius * Exp ( - magn * a ) );
            // move vertex accordingly
            v.setXYZ( add( uu, center ) );
            // ?? needed??
            //self.u=uu;
        });
        return self;
    }
});

}(MOD3);