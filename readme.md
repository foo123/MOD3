#MOD3 

<!-- ### Further development on this project has stopped!! -->


__3D Modifier Library for JavaScript__

This is a port of the [AS3dMod Modifier Library for ActionScript 3](http://code.google.com/p/as3dmod/) to JavaScript.  

__supports:__  *Three.js* , *Pre3d* , *J3D* , *Copperlicht* , *CubicVR.js*


[![MOD3.js](/flipbook2.png)](http://foo123.github.com/examples/flipbook3/)


It is named *MOD3* to signify that it has support for [Three.js](https://github.com/mrdoob/three.js/)


It is a (almost) complete port. All Modifiers found in AS3DMod are scheduled to be ported. 
Also the API architecture is setup for more modifiers to be added (even custom ones).



###Contents

* [Live Examples](#live-examples)
* [3D Engines Support](#support-for-3d-javascript-engines)
* [3D Modifiers Support](#modifiers-supported-up-to-present)
* [API Reference](/api-reference.md)
* [Todo](#todo)
* [How to debug](#how-to-debug)
* [ChangeLog](#changelog)


###Live Examples

* [3D flipbook](http://foo123.github.com/examples/flipbook3/) (Three.js, MOD3.js and Tween.js)
* [Dancing Box](http://foo123.github.com/examples/dancing-box/)  (a simple blend of 3D manipulation and sound visualization)


###Support for 3D JavaScript engines
* [Three.js](https://github.com/mrdoob/three.js/) with examples (r66)
* [J3D](https://github.com/drojdjou/J3D) with examples (Build 51)
* [Copperlicht](https://github.com/Sebmaster/copperlicht) with examples
* [CubicVR](https://github.com/cjcliffe/CubicVR.js/) with examples
* [Pre3d](https://github.com/deanm/pre3d) with examples (my pre3d examples are a liitle blurry but you'll get the picture)



###Modifiers supported (up to present)  
* Pivot (note: Pivot does not work with Pre3d)  
* Bend
* Twist
* Taper
* Skew
* Noise
* Wheel
* Bloat
* Break
* Perlin ( MOD3 v.0.3.4 )
* DisplaceMap ( MOD3 v.0.3.5 )


###TODO
* possible generic way to use (at least some) 3D modifiers directly in GLSL for all supported engines (??)
* add custom modifiers except the defaults found in AS3dMod library
* make easier to apply modifiers to complex meshes/objects (which consist of submeshes) (recursion??)
* optimize (math ops, caching, modifier chain calls etc..) [DONE partially]
* port the modifiers that use Perlin Noise (using instead the simpler and faster Simplex Noise routine for JavaScript, [noisejs](https://github.com/josephg/noisejs) , or [simplex-noise.js](https://github.com/jwagner/simplex-noise.js)) [DONE partially]
* keep up with JavaScript 3D Engines updates (will try)


###How to debug
1. If the problem is in one 3D engine, while the other engines work correctly for this example/modifier, then the problem is probably with that engine's proxy classes (plugins/3DENGINENAME/Vertex.js, plugins/3DENGINENAME/Mesh.js)
2. If the specific example/modifier does not work in any 3D engine, but other modifiers/examples do work, then the problem is probably with that modifier's code (modifiers/MODIFIERNAME.js)
3. If no example works for any engine, then the problem is probably in the core classes, or some class throws a js error which stops the whole execution


###Changelog
* 0.3.5  DisplaceMap modifier added, edits / optimizations
* 0.3.4  update classy.js, code refactor / optimizations, Perlin modifier added
* 0.3.2-0.3.3  update buildtools, api-reference, classy.js, Three.js revision (r66)
* ver 0.3.1  update buildtools, api-reference, use classy.js for OOP
* ver 0.3  code refactoring, extension framework, various optimizations, tidy up repo, new build scripts, project stopped
* added support for CubicVR.js 3D Engine, minor optimizations for all engines
* added support for Three.js revision (r58)
* added support for Three.js revision (r53)


*URL* [Nikos Web Development](http://nikos-web-development.netai.net/ "Nikos Web Development")  
*URL* [MOD3 blog post](http://nikos-web-development.netai.net/blog/mod3-a-javascript-port-of-as3mod-for-three-js/ "MOD3 blog post")  
*URL* [WorkingClassCode](http://workingclasscode.uphero.com/ "Working Class Code")  
