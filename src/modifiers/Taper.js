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

var Vector3 = MOD3.Vector3, Matrix4 = MOD3.Matrix4, Pow = Math.pow, each = MOD3.List.each;

var Taper = MOD3.Taper = MOD3.Class ( MOD3.Modifier, {
    
    constructor: function( f, p )  {
        var self = this;
        self.$super('constructor');
        self.name = 'Taper';
        /*self.start = 0;
        self.end = 1;*/

        self.vector = new Vector3([1, 0, 1]);
        self.vector2 = new Vector3([0, 1, 0]);
        
        self.force = f !== undef ? f : 0;
        self.power = p !== undef ? p : 1;
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
        var self = this;
        self.vector.dispose( );
        self.vector2.dispose( );
        self.vector = null;
        self.vector2 = null;
        self.force = null;
        self.power = null;
        self.$super('dispose');
        
        return self;
    },
    
    apply: function( ) {
        var self = this,
            vector = self.vector, 
            vector2 = self.vector2, 
            force = self.force, 
            power = self.power,
            vx = vector.xyz[0],
            vy = vector.xyz[1],
            vz = vector.xyz[2],
            m = new Matrix4( );
        ;
        
        each(self.mod.vertices, (1 < power) || (1 > power)
            ? function( v ){
                var ar = v.getRatioVector( ).multiply( vector2 ),
                    sc = force * Pow(ar.getMagnitude( ), power)
                ;
                m.reset( ).scaleMatrix( 1 + sc * vx, 1 + sc * vy, 1 + sc * vz );
                v.setVector( m.multiplyVector( v.getVector( ) ) );
            }
            : function( v ){
                var ar = v.getRatioVector( ).multiply( vector2 ),
                    sc = force * ar.getMagnitude( )
                ;
                m.reset( ).scaleMatrix( 1 + sc * vx, 1 + sc * vy, 1 + sc * vz );
                v.setVector( m.multiplyVector( v.getVector( ) ) );
            }
        );
        
        return self;
    }
});

}(MOD3);