/**
*
* MOD3  Taper Modifier
*
*
**/

/**[DOC_MD]
 * ###Taper modifier 
 *
 * The taper modifier displaces the vertices on two axes proportionally to their position on the third axis.
 *
 * @author Bartek Drozdz
 *  
[/DOC_MD]**/

!function(MOD3, undef){
    
    @@USE_STRICT@@
    
    var Vector3 = MOD3.Vector3, Matrix4 = MOD3.Matrix4, Pow = Math.pow;
    
    var Taper = MOD3.Taper = MOD3.Class ( MOD3.Modifier, {
        
        constructor: function( f, p )  {
            this.$super('constructor');
            this.name = 'Taper';
            /*this.start = 0;
            this.end = 1;*/

            this.vector = new Vector3([1, 0, 1]);
            this.vector2 = new Vector3([0, 1, 0]);
            
            this.force = (f !== undef) ? f : 0;
            this.power = (p !== undef) ? p : 1;
        },
        
        force: 0,
        power: 1,
        /*start: 0,
        end: 1,*/
        vector: null,
        vector2: null,
        
        /*setFalloff : function(start, end)  {
            this.start = (start!==undef) ? start : 0;
            this.end = (end!==undef) ? end : 1;
            
            return this;
        },*/
        
        dispose: function( ) {
            this.vector.dispose( );
            this.vector2.dispose( );
            this.vector = null;
            this.vector2 = null;
            this.force = null;
            this.power = null;
            this.$super('dispose');
            
            return this;
        },
        
        serialize: function( ) {
            return { 
                modifier: this.name, 
                params: {
                    force: this.force,
                    power: this.power,
                    vector: this.vector.serialize( ),
                    vector2: this.vector2.serialize( ),
                    enabled: !!this.enabled
                }
            };
            
        },
        
        unserialize: function( json ) {
            if ( json && this.name === json.modifier )
            {
                var params = json.params;
                this.force = params.force;
                this.power = params.power;
                this.vector.unserialize( params.vector );
                this.vector2.unserialize( params.vector2 );
                this.enabled = !!params.enabled;
            }
            return this;
        },
        
        _apply: function( ) {
            var vs = this.mod.vertices, vc = vs.length,
                vector = this.vector, 
                vector2 = this.vector2, 
                force = this.force, 
                power = this.power,
                v, ar, sc, m, n, vxyz
            ;
            
            m = new Matrix4( );
            
            // optimize loop using while counting down instead of up
            while ( --vc >= 0 )
            {
                v = vs[ vc ];
                
                ar = v.getRatioVector( ).multiply( vector2 );
                sc = (1 !== power) ? force * Pow(ar.getMagnitude( ), power) : force * ar.getMagnitude( );
                vxyz = vector.xyz;
                m.reset( ).scaleMatrix( 1 + sc * vxyz[ 0 ], 1 + sc * vxyz[ 1 ], 1 + sc * vxyz[ 2 ] );
                n = v.getVector( );
                v.setVector( m.multiplyVector( n ) );
            }
            
            return this;
        }
    });
    
}(MOD3);