
###Pivot modifier 

Allows to move the pivot point of a 3D mesh.

@author Bartek Drozdz
 



###Bend modifier 

Bends an object along an axis. 

@author Bartek Drozdz
 



###Bloat modifier 

Bloats a mesh by forcing vertices out of specified sphere

@author makc
 



###Twist modifier 

Twist mesh along an axis
Adapted from the Twist modifier for PV3D




###Skew modifier 

Skew mesh along an axis

@author Bartek Drozdz
 



###Taper modifier 

The taper modifier displaces the vertices on two axes proportionally to their position on the third axis.

@author Bartek Drozdz
 



###Wheel modifier 

Use it with vehicle models for wheels.

The usual problem with a 3d wheel in a vahicle is that it is 
supposed to turn (steer) and roll in the same time. 
So, this code:

```javascript
wheel.rotationY = 10; // Steer 10deg to the left
wheel.rotationZ +- 5; // Roll with a speed of 5
```
This will make the wheel roll incorectly.

A usual way to solve this problem is to put the wheel in another DisplayObject3D/Mesh, 
turn the parent and roll the child, like that:
```javascript
steer.rotationY = 10; // Steer 10deg to the left
steer.wheel.rotationZ +- 5; // Roll with a speed of 5
```
That will make the wheel behave correctly. But it can be uncomfortanble to apply, especially
to imported complex Collada models.

The Wheel modifier elegantly solves this problem by doind the proper math in order to steer and roll 
a single mesh at the same time. The only thing you need to do is to specify a steer vector and 
roll vector - usually it will be 2 of the cardinal axes. The default value is:

* steer - along the Y axis / new Vector3(0, 1, 0)</li>
* roll - along the Z axis / new Vector3(0, 0, 1)</li>


It should work with most car models imported from 3D editors as this is the natural position of a wheel.

<i>Please note, that Papervision primitive cylinder, which may also be used as wheel, will require different axes
(Y for roll and Z or X for steer).</i>

@author Bartek Drozdz

 


###Break modifier 

Allow to break a mesh

@author Bartek Drozdz
 



###Noise modifier 

Randomly displaces each vertex in all 3 axes

 



###DisplaceMap (BitmapDisplacement) Modifier 

Displaces vertices based on RGB values of bitmapData pixels. 

BitmapDisplacement is inspired by both the AS3 built-in DisplacementMapFilter. It allows
to use color values for each channels of a bitmap to modify the position of vertices in a mesh.

The displacement takes place along the cardinal axes, and each axis is mapped to a 
channel in the bitmap: X for Red, Y for Green and Z for Blue.

@author Bartek Drozdz




###Perlin modifier 

 Displaces vertices based on a perlin/simplex noise source.

 Accepts a perlin/simplex noise data (with width and height information) and displaces vertices
 based on the value of each point of the noise map.
 
 @author Bartek Drozdz

 @uses: https://github.com/josephg/noisejs for JavaScript
 
