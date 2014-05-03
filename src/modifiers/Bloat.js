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
    
    var Vector3 = MOD3.Vector3, Max = Math.max, Exp = Math.exp;
    
    var Bloat = MOD3.Bloat = MOD3.Class ( MOD3.Modifier, {
        
        constructor: function( ) {
            this.$super('constructor');
            this.name = 'Bloat';
            this.radius = 0;
            this.a = 0.01;
            this.center = Vector3.ZERO( );
            //this.u = Vector3.ZERO();
        },
        
        center: null,
        radius: 0,
        a: 0.01,
        //u: null,
        
        dispose: function( ) {
            this.center.dispose( );
            this.center = null;
            this.radius = null;
            this.a = null;
            this.$super('dispose');
            
            return this;
        },
        
        serialize: function( ) {
            return { 
                modifier: this.name, 
                params: {
                    center: this.center.serialize( ),
                    radius: this.radius,
                    a: this.a,
                    enabled: !!this.enabled
                }
            };
            
        },
        
        unserialize: function( json ) {
            if ( json && this.name === json.modifier )
            {
                var params = json.params;
                this.center.unserialize( params.center );
                this.radius = params.radius;
                this.a = params.a;
                this.enabled = !!params.enabled;
            }
            return this;
        },
        
        setRadius: function( v )  {
            this.radius = Max( 0, v ); 
            
            return this;
        },
        
        setA: function( v )  {
            this.a = Max( 0, v ); 
            
            return this;
        },
        
        _apply: function( )  {
            var vs = this.mod.vertices, vc = vs.length, 
                center = this.center, radius = this.radius, a = this.a;
            var v, magn, uu; //=Vector3.ZERO();

            // optimize loop using while counting down instead of up
            while ( --vc >= 0 )
            {
                v = vs[ vc ];
                
                // get a vector towards vertex
                uu = v.getVector( ).subtractSelf( center );
                
                // change norm to norm + r * exp (-a * norm)
                magn = uu.getMagnitude( );
                uu.setMagnitude( magn + radius * Exp ( - magn * a ) );

                // move vertex accordingly
                v.setVector( uu.addSelf( center ) );
                
                // ?? needed??
                //this.u=uu;
            }
            
            return this;
        }
    });
    
}(MOD3);