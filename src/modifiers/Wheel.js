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
        this.radius = this.mod.width / 2;
    };
    MOD3.Wheel.prototype.apply=function()
    {
        this.roll += this.speed;
        
        var vs = this.mod.getVertices();
        var vc = vs.length;
        
        var ms;
        if(this.turn != 0) {
            var mt = new MOD3.Matrix4().rotationMatrix(this.steerVector.x, this.steerVector.y, this.steerVector.z, this.turn);
            var rv = this.rollVector.clone();
            new MOD3.Matrix4().multiplyVector(mt, rv);
            ms = new MOD3.Matrix4().rotationMatrix(rv.x, rv.y, rv.z, this.roll);
        } else {
            ms = new MOD3.Matrix4().rotationMatrix(this.rollVector.x, this.rollVector.y, this.rollVector.z, this.roll);
        }

        for (var i = 0;i < vc; i++) {
            var v = vs[i];
            var c = v.getVector().clone();
            if(this.turn != 0) new MOD3.Matrix4().multiplyVector(mt, c);
            new MOD3.Matrix4().multiplyVector(ms, c);
            v.setX(c.x);
            v.setY(c.y);
            v.setZ(c.z);
        }
    };
    MOD3.Wheel.prototype.getStep=function()
    {
        return this.radius * this.speed / Math.PI;
    };
    MOD3.Wheel.prototype.getPerimeter=function()
    {
        return this.radius * 2 * Math.PI;
    };
})(MOD3);