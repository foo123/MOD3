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

var Vector3 = MOD3.Vector3, Max = Math.max, Exp = Math.exp, each = MOD3.List.each;

var Bloat = MOD3.Bloat = MOD3.Class ( MOD3.Modifier, {
    
    constructor: function( ) {
        var self = this;
        self.$super('constructor');
        self.name = 'Bloat';
        self.radius = 0;
        self.a = 0.01;
        self.center = Vector3.ZERO( );
        //self.u = Vector3.ZERO();
    },
    
    center: null,
    radius: 0,
    a: 0.01,
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
    
    setRadius: function( v )  {
        this.radius = Max( 0, v ); 
        return this;
    },
    
    setA: function( v )  {
        this.a = Max( 0, v ); 
        return this;
    },
    
    apply: function( )  {
        var self = this,
            center = self.center, radius = self.radius, a = self.a;

        each(self.mod.vertices, function( v ){
            // get a vector towards vertex
            var uu = v.getVector( ).subtractSelf( center ),
            // change norm to norm + r * exp (-a * norm)
                magn = uu.getMagnitude( );
            uu.setMagnitude( magn + radius * Exp ( - magn * a ) );
            // move vertex accordingly
            v.setVector( uu.addSelf( center ) );
            // ?? needed??
            //self.u=uu;
        });
        
        return self;
    }
});

}(MOD3);