registerDemo(function(engine) {

    var cube;
    var mstack, mod;

    console.log("MOD3 Perlin/Simplex Noise Demo| J3D | v0.16");

    function generate_noise2d( w, h, perlinNoise2d )
    {
        perlinNoise2d = perlinNoise2d || noise.simplex2;
        var size = w*h, a = new Float32Array( size ), i, j, index;
        for (i=0,j=0,index=0; index<size; index++,i++)
        {
            if ( i >= w ) { i = 0; j++; }
            a[ index ] = perlinNoise2d( i/w, j/h );
        }
        a.width = w; a.height = h;
        return a;
    }
    
    this.setup = function(callback) {
        engine.setClearColor(J3D.Color.black);

        var ambient = new J3D.Transform();
        ambient.light = new J3D.Light(J3D.AMBIENT);
        ambient.light.color = new J3D.Color(0.5, 0.5, 0.5, 1);

        var light = new J3D.Transform();
        light.light = new J3D.Light(J3D.DIRECT);
        light.light.color = new J3D.Color(0.5, 0.5, 0.5, 1);
        light.rotation = new v3(-Math.PI, 0, Math.PI);

        cube = new J3D.Transform();
        cube.geometry = J3D.Primitive.Plane(1, 1, 10, 10);
        cube.renderer = J3D.BuiltinShaders.fetch("Normal2Color");
        // cube.renderer.color = new J3D.Color(1, 0, 0, 1);

        var camera = new J3D.Transform();
        camera.camera = new J3D.Camera();
        camera.position.z = 4;

        engine.scene.setCamera(camera);
        engine.scene.add(camera, cube, light, ambient);

        
        mstack = new MOD3.ModifierStack(MOD3.LibraryJ3D, cube);
        mod = new MOD3.Perlin(0.1, generate_noise2d( 60, 60 ));
        mstack.addModifier(mod);
        var tobj = { force: 0 };
        new TWEEN.Tween(tobj)
                    .to( { force: 0.5 }, 5000)
                    .onUpdate(function(){
                        //mod.force=this.force;
                        mstack.apply();
                    })
                    .start();
        
        callback();
    }
    
    this.render = function(interactor) {
        cube.rotation.x += Math.PI * J3D.Time.deltaTime / 6000;
        cube.rotation.y += Math.PI / 2 * J3D.Time.deltaTime / 3000;
        TWEEN.update();
        engine.render();
    }
});