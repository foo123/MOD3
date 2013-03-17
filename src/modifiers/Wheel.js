/**
 *  <b>Wheel modifier.</b> Use it with vehicle models for wheels.
 *  <br>
 *  <p>The usual problem with a 3d wheel in a vahicle is that if it is 
 *  supposed to turn (steer) and roll in the same time. So, this code:
 *  <br>
 *  <br><code><pre>
 *  wheel.rotationY = 10; // Steer 10deg to the left
 *  wheel.rotationZ +- 5; // Roll with a speed of 5
 *  </pre></code><br>
 *  This will make the wheel roll incorectly.</p>
 *  
 *  <p>A usual way to solve this problem is to put the wheel in another DisplayObject3D/Mesh, 
 *  turn the parent and roll the child, like that:
 *  <br><code><pre>
 *  steer.rotationY = 10; // Steer 10deg to the left
 *  steer.wheel.rotationZ +- 5; // Roll with a speed of 5
 *  </pre></code><br>
 *  That will make the wheel behave correctly. But it can be uncomfortanble to apply, especially
 *  to imported complex Collada models.</p>
 *  
 *  <p>The Wheel modifier elegantly solves this problem by doind the proper math in order to steer and roll 
 *  a single mesh at the same time. The only thing you need to do is to specify a steer vector and 
 *  roll vector - usually it will be 2 of the cardinal axes. The default value is:
 *  <ul>
 *  <li>steer - along the Y axis / new Vector3(0, 1, 0)</li>
 *  <li>roll - along the Z axis / new Vector3(0, 0, 1)</li>
 *  </ul></p>
 *  
 *  <p>It should work with most car models imported from 3D editors as this is the natural position of a wheel.<br>
 *  <i>Please note, that Papervision primitive cylinder, which may also be used as wheel, will require different axes
 *  (Y for roll and Z or X for steer).</i></p>
 *  
 *  @version 1.0
 *  @author Bartek Drozdz
 *  AS3Mod doc on Wheel.as Modifier
 */
 // Wheel Modifier for MOD3 ---------------------------------------------------------------------------------------------
(function(MOD3){
    var invPI = 1.0 / Math.PI, PI2 = 2 * Math.PI;
    
    MOD3.Wheel=function()
    {
        this.speed=null;
        this.turn=null;

        this.roll=null;
        this.radius=null;
        
        this.steerVector = new MOD3.Vector3(0, 1, 0);
        this.rollVector = new MOD3.Vector3(0, 0, 1);
        
        this.speed = 0;
        this.turn = 0;
        this.roll = 0;
    };
    MOD3.Wheel.prototype=new MOD3.Modifier();
    MOD3.Wheel.prototype.constructor=MOD3.Wheel;
    MOD3.Wheel.prototype.setModifiable=function(mod)
    {
        MOD3.Modifier.prototype.setModifiable.call(this,mod);
        this.radius = 0.5*this.mod.width;
    };
    MOD3.Wheel.prototype.apply=function()
    {
        this.roll += this.speed;
        
        var vs = this.mod.getVertices(), vc = vs.length;
        var steerVector = this.steerVector, turn = this.turn, rollVector = this.rollVector, roll = this.roll;
        var ms, mt, rv, v, c;
        
        if(0 != turn) 
        {
            mt = new MOD3.Matrix4().rotationMatrix(steerVector.x, steerVector.y, steerVector.z, turn);
            rv = rollVector.clone();
            new MOD3.Matrix4().multiplyVector(mt, rv);
            ms = new MOD3.Matrix4().rotationMatrix(rv.x, rv.y, rv.z, roll);
        } 
        else 
        {
            ms = new MOD3.Matrix4().rotationMatrix(rollVector.x, rollVector.y, rollVector.z, roll);
        }

        // optimize loop using while counting down instead of up
        while (--vc >= 0)
        //for (var i = 0;i < vc; i++) 
        {
            v = vs[vc];
            c = v.getVector().clone();
            if (0 != turn) new MOD3.Matrix4().multiplyVector(mt, c);
            new MOD3.Matrix4().multiplyVector(ms, c);
            v.setX(c.x);
            v.setY(c.y);
            v.setZ(c.z);
        }
    };
    MOD3.Wheel.prototype.getStep=function()
    {
        return this.radius * this.speed * MOD3.Constants.invPI;
    };
    MOD3.Wheel.prototype.getPerimeter=function()
    {
        return this.radius * MOD3.Constants.doublePI;
    };
})(MOD3);