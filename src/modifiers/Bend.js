/**
*
* MOD3  Bend Modifier
*
*
**/

/**[DOC_MD]
 * ###Bend modifier 
 *
 * Bends an object along an axis. 
 *
 * @author Bartek Drozdz
 *  
[/DOC_MD]**/

!function(MOD3, undef){
@@USE_STRICT@@

var NONE = MOD3.ModConstant.NONE, LEFT = MOD3.ModConstant.LEFT,  RIGHT = MOD3.ModConstant.RIGHT,
    Matrix = MOD3.Matrix,  Atan = Math.atan, Atan2 = Math.atan2, Sin = Math.sin, Cos = Math.cos,
    PI = MOD3.Constants.PI, halfPI = MOD3.Constants.halfPI, doublePI = MOD3.Constants.doublePI,
    Point = MOD3.Point, each = MOD3.List.each
;

var Bend = MOD3.Bend = MOD3.Class ( MOD3.Modifier, {
    
    constructor: function( f, o, a ) {
        var self = this;
        self.$super('constructor');
        self.name = 'Bend';
        self.constraint = NONE;
        self.max = 0;
        self.min = 0;
        self.mid = 0;
        self.width = 0;
        self.height = 0;
        self.origin = 0;
        self.m1 = null;
        self.m2 = null;
        self.diagAngle = 0;
        self.switchAxes = false;

        self.force = f!==undef ? f : 0;
        self.offset = o!==undef ? o : 0;
        self.setAngle( a!==undef ? a : 0 );
    },

    force: 0,
    offset: 0,
    angle: 0,
    diagAngle: 0,
    max: 0,
    min: 0,
    mid: 0,
    width: 0,
    height: 0,
    origin: 0,
    m1: null,
    m2: null,
    switchAxes: false,
    
    dispose: function( ) {
        var self = this;
        self.force = null;
        self.offset = null;
        self.angle = null;
        self.diagAngle = null;
        self.max = null;
        self.min = null;
        self.mid = null;
        self.width = null;
        self.height = null;
        self.origin = null;
        self.m1 && self.m1.dispose( );
        self.m2 && self.m2.dispose( );
        self.m1 = null;
        self.m2 = null;
        self.switchAxes = null;
        self.$super('dispose');
        
        return self;
    },
    
    setAngle: function( a ) { 
        var self = this;
        self.angle = a; 
        self.m1 = new Matrix( ).rotate( a );
        self.m2 = new Matrix( ).rotate( -a );
        
        return self;
    },
    
    setModifiable: function( mod ) {
        var self = this;
        self.$super("setModifiable", mod);
        
        self.max = (self.switchAxes) ? self.mod.midAxis : self.mod.maxAxis;
        self.min = self.mod.minAxis;
        self.mid = (self.switchAxes) ? self.mod.maxAxis : self.mod.midAxis;
        
        self.width = self.mod.getSize( self.max );    
        self.height = self.mod.getSize( self.mid );
        self.origin = self.mod.getMin( self.max );
        
        self.diagAngle = Atan( self.width / self.height );
        
        return self;
    },
    
    apply: function( ) {   
        var self = this;
        if ( !self.force ) return self;

        var constraint = self.constraint,
            width = self.width, 
            offset = self.offset, 
            origin = self.origin, 
            force = self.force, 
            max = self.max, 
            min = self.min, 
            mid = self.mid, 
            m1 = self.m1, 
            m2 = self.m2,
        
            distance = origin + width * offset,
            radius = width / PI / force,
            bendAngle = doublePI * (width / (radius * doublePI)),
            invwidth = 1.0/width
        ;
        
        each(self.mod.vertices, function( v ){
            var vmax = v.getValue( max ),
                vmid = v.getValue( mid ),
                vmin = v.getValue( min ),
                np = m1.transformPointSelf( new Point( vmax, vmid ) ),
                p, fa, op, ow, np2
            ;
            vmax = np.x;
            vmid = np.y;

            p = (vmax - origin) * invwidth;

            if (
                ( (LEFT === constraint) && (p <= offset) ) || 
                ( (RIGHT === constraint) && (p >= offset) )
            ) 
            {  
                /* do nothing */ 
            } 
            else 
            {
                fa = (halfPI - bendAngle * offset) + (bendAngle * p);
                op = Sin(fa) * (radius + vmin);
                ow = Cos(fa) * (radius + vmin);
                vmin = op - radius;
                vmax = distance - ow;
            }

            np2 = m2.transformPointSelf( new Point( vmax, vmid ) );
            vmax = np2.x;
            vmid = np2.y;
            
            v.setValue( max, vmax );
            v.setValue( mid, vmid );
            v.setValue( min, vmin );
        });
        
        return self;
    }
});

}(MOD3);