/**
*
* MOD3  Wheel Modifier
*
*
**/

/**[DOC_MD]
 * ###Wheel modifier 
 *
 * Use it with vehicle models for wheels.
 *
 *      The usual problem with a 3d wheel in a vahicle is that it is 
 *      supposed to turn (steer) and roll in the same time. 
 *      So, this code:
 *      
 *      ```javascript
 *      wheel.rotationY = 10; // Steer 10deg to the left
 *      wheel.rotationZ +- 5; // Roll with a speed of 5
 *      ```
 *      This will make the wheel roll incorectly.
 *      
 *      A usual way to solve this problem is to put the wheel in another DisplayObject3D/Mesh, 
 *      turn the parent and roll the child, like that:
 *      ```javascript
 *      steer.rotationY = 10; // Steer 10deg to the left
 *      steer.wheel.rotationZ +- 5; // Roll with a speed of 5
 *      ```
 *      That will make the wheel behave correctly. But it can be uncomfortanble to apply, especially
 *      to imported complex Collada models.
 *      
 *      The Wheel modifier elegantly solves this problem by doind the proper math in order to steer and roll 
 *      a single mesh at the same time. The only thing you need to do is to specify a steer vector and 
 *      roll vector - usually it will be 2 of the cardinal axes. The default value is:
 *      
 *      * steer - along the Y axis / new Vector3(0, 1, 0)</li>
 *      * roll - along the Z axis / new Vector3(0, 0, 1)</li>
 *      
 *      
 *      It should work with most car models imported from 3D editors as this is the natural position of a wheel.
 *      
 *      <i>Please note, that Papervision primitive cylinder, which may also be used as wheel, will require different axes
 *      (Y for roll and Z or X for steer).</i>
 *  
 * @author Bartek Drozdz
 * 
 [/DOC_MD]**/
 
!function(MOD3, undef){
@@USE_STRICT@@

var invPI = MOD3.Constants.invPI, 
    doublePI = MOD3.Constants.doublePI,
    Vector3 = MOD3.Vector3, Matrix4 = MOD3.Matrix4, each = MOD3.List.each
;

var Wheel = MOD3.Wheel = MOD3.Class( MOD3.Modifier, {
   
   constructor: function( ) {
        var self = this;
        self.$super('constructor');
        self.name = 'Wheel';
        self.speed = 0;
        self.turn = 0;
        self.roll = 0;
        self.radius = 0;
        self.steerVector = new Vector3([0, 1, 0]);
        self.rollVector = new Vector3([0, 0, 1]);
    },
    
    speed:  0,
    turn: 0,
    roll: 0,
    radius: 0,
    steerVector: null,
    rollVector: null,
    
    dispose: function( ) {
        var self = this;
        self.speed = null;
        self.turn = null;
        self.roll = null;
        self.radius = null;
        self.steerVector.dispose( );
        self.rollVector.dispose( );
        self.steerVector = null;
        self.rollVector = null;
        self.$super('dispose');
        
        return self;
    },
    
    setModifiable: function( mod ) {
        var self = this;
        self.$super("setModifiable", mod);
        self.radius = 0.5*self.mod.width;
        return self;
    },
    
    apply: function( ) {
        var self = this,
            steerVector = self.steerVector, 
            turn = self.turn, 
            rollVector = self.rollVector, 
            roll = self.roll,
            ms = null, mt = null, rv = null
        ;
        
        self.roll += self.speed;
        
        if ( turn ) 
        {
            mt = new Matrix4( ).rotationMatrixFromVector( steerVector, turn );
            rv = mt.multiplyVector( rollVector.clone( ) );
            ms = new Matrix4( ).rotationMatrixFromVector( rv, roll );
        } 
        else 
        {
            ms = new Matrix4( ).rotationMatrixFrom( rollVector, roll );
        }

        each(self.mod.vertices, mt
            ? function( v ){
                var c = v.getVector( );
                mt.multiplyVector( c );
                v.setVector( ms.multiplyVector( c ) );
            }
            : function( v ){
                v.setVector( ms.multiplyVector( v.getVector( ) ) );
            }
        );
         
        return self;
   },
    
    getStep: function( )  {
        return this.radius * this.speed * invPI;
    },
    
    getPerimeter: function( )  {
        return this.radius * doublePI;
    }
});

}(MOD3);