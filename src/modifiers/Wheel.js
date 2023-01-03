!function(MOD3) {
"use strict";
/**
* MOD3  Wheel Modifier
**/

/**[DOC_MD]
 * ### Wheel modifier
 *
 * Use it with vehicle models for wheels.
 *
 * The usual problem with a 3d wheel in a vahicle is that it is
 * supposed to turn (steer) and roll in the same time.
 * So, this code:
 *
 * ```javascript
 * wheel.rotationY = 10; // Steer 10deg to the left
 * wheel.rotationZ += 5; // Roll with a speed of 5
 * ```
 * This will make the wheel roll incorectly.
 *
 * A usual way to solve this problem is to put the wheel in another DisplayObject3D/Mesh,
 * turn the parent and roll the child, like that:
 * ```javascript
 * steer.rotationY = 10; // Steer 10deg to the left
 * steer.wheel.rotationZ += 5; // Roll with a speed of 5
 * ```
 * That will make the wheel behave correctly. But it can be uncomfortanble to apply, especially
 * to imported complex Collada models.
 *
 * The Wheel modifier elegantly solves this problem by doind the proper math in order to steer and roll
 * a single mesh at the same time. The only thing you need to do is to specify a steer vector and
 * roll vector - usually it will be 2 of the cardinal axes. The default value is:
 *
 * * steer - along the Y axis / new Vector3(0, 1, 0)
 * * roll - along the Z axis / new Vector3(0, 0, 1)
 *
 *
 * It should work with most car models imported from 3D editors as this is the natural position of a wheel.
 *
 * *Please note, that Papervision primitive cylinder, which may also be used as wheel, will require different axes
 * (Y for roll and Z or X for steer).*
 *
 * @author Bartek Drozdz
 *
 [/DOC_MD]**/
MOD3.Wheel = MOD3.Class(MOD3.Modifier, {
   constructor: function Wheel(speed, turn, roll, steerVector, rollVector) {
        var self = this;
        if (!(self instanceof Wheel)) return new Wheel(speed, turn, roll, steerVector, rollVector);
        self.$super('constructor');
        self.name = 'Wheel';
        self.speed = speed || 0;
        self.turn = turn || 0;
        self.roll = roll || 0;
        self.steerVector = steerVector || MOD3.Vector3.Y();
        self.rollVector = rollVector || MOD3.Vector3.Z();
    },

    speed:  0,
    turn: 0,
    roll: 0,
    steerVector: null,
    rollVector: null,

    dispose: function() {
        var self = this;
        self.speed = null;
        self.turn = null;
        self.roll = null;
        self.steerVector.dispose();
        self.rollVector.dispose();
        self.steerVector = null;
        self.rollVector = null;
        self.$super('dispose');

        return self;
    },

    apply: function(modifiable) {
        var self = this,
            steerVector = self.steerVector.normalizeSelf(),
            rollVector = self.rollVector.normalizeSelf(),
            turn = self.turn, roll = self.roll,
            //radius = 0.5*modifiable.width,
            //step = radius * self.speed / PI,
            //perimeter = radius * TWO_PI,
            ms = null, mt = null
        ;

        self.roll += self.speed;

        if (turn)
        {
            mt = new MOD3.Matrix4().rotateFromVector(steerVector, turn);
            ms = new MOD3.Matrix4().rotateFromVector(mt.multiplyVector(rollVector.clone()), roll);
        }
        else
        {
            ms = new MOD3.Matrix4().rotateFromVector(rollVector, roll);
        }

        MOD3.List.each(modifiable.vertices, mt
            ? function(v) {
                v.setXYZ(MOD3.Matrix4.multXYZ(ms, MOD3.Matrix4.multXYZ(mt, v.getXYZ())));
            }
            : function(v) {
                v.setXYZ(MOD3.Matrix4.multXYZ(ms, v.getXYZ()));
            }
        );
        return self;
    }
});
}(MOD3);