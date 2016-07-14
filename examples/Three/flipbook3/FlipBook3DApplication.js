!function(window){
/**
* Provides requestAnimationFrame in a cross browser way.
* http://paulirish.com/2011/requestanimationframe-for-smart-animating/
*/

if ( !window.requestAnimationFrame ) {

    window.requestAnimationFrame = ( function() {

    return window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element ) {

    window.setTimeout( callback, 1000 / 60 );

    };

    } )();

}

var multx = 0.5*Math.PI,
    multy = -Math.PI,
    Sin = Math.sin,
    Cos = Math.cos,
    
    container, camera, scene, renderer, projector,
    targetRotationY = 0, targetRotationOnMouseDownY = 0, targetRotationX = 0, targetRotationOnMouseDownX = 0,
    rad=700, mouse={x:0,y:0}, mouseX = 0, mouseXOnMouseDown = 0, mouseY = 0, mouseYOnMouseDown = 0,
    mstack, bend,
    windowHalfX = window.innerWidth / 2, windowHalfY = window.innerHeight / 2,
    w,h,w2,h2,
    book, pagew=300, pageh=pagew*10/7,
    fl,fr
;

function onDocumentMouseDown( event ) 
{
    event.preventDefault();
    mouseX = ( event.clientX / w ) * 2 - 1;
    targetRotationY = mouseX;
    mouseY = ( event.clientY / h ) * 2 - 1;
    targetRotationX=mouseY;

    container.addEventListener( 'mousemove', onDocumentMouseMove, false );
    container.addEventListener( 'mouseup', onDocumentMouseUp, false );
    container.addEventListener( 'mouseout', onDocumentMouseOut, false );
}

function onDocumentMouseMove( event ) 
{
    /*mouseX = event.clientX - w2;
    mouseY = event.clientY - h2;

    targetRotationY = targetRotationOnMouseDownY + ( mouseX - mouseXOnMouseDown ) * 0.02;
    targetRotationX = targetRotationOnMouseDownX + ( mouseY - mouseYOnMouseDown ) * 0.02;*/
    //var target=
    //mouse_path.push(e.seenas.ray);

    mouseX = ( event.clientX / w ) * 2 - 1;
    targetRotationY = mouseX;
    mouseY = ( event.clientY / h ) * 2 - 1;
    targetRotationX = mouseY;
}

function onDocumentMouseUp( event ) 
{
    container.removeEventListener( 'mousemove', onDocumentMouseMove, false );
    container.removeEventListener( 'mouseup', onDocumentMouseUp, false );
    container.removeEventListener( 'mouseout', onDocumentMouseOut, false );
}

function onDocumentMouseOut( event ) 
{
    container.removeEventListener( 'mousemove', onDocumentMouseMove, false );
    container.removeEventListener( 'mouseup', onDocumentMouseUp, false );
    container.removeEventListener( 'mouseout', onDocumentMouseOut, false );
}

function animate( ) 
{
    // use spherical coordinatess
    // for mouse control viewing
    camera.position.x = rad * Sin( targetRotationY * multy ) * Cos( targetRotationX * multx );
    camera.position.y = rad * Sin( targetRotationX * multx );
    camera.position.z = rad * Cos( targetRotationY * multy ) * Cos( targetRotationX * multx );
    camera.lookAt( scene.position );

    // render
    TWEEN.update( );
    renderer.render( scene, camera );
    
    // setup next animation
    requestAnimationFrame( animate );
}

var self = {
    init: function( images ) {
        // setup the scene
        container = document.getElementById('container');
        w = window.innerWidth;
        h = window.innerHeight;
        w2 = w/2; h2 = h/2;
        container.style.width = w+"px";
        container.style.height = h+"px";
        container.style.marginTop = 0.5*(window.innerHeight-h)+'px';

        scene = new THREE.Scene( );
        projector = new THREE.Projector();
        camera = new THREE.PerspectiveCamera( 50, w / h, 1, 1000 );
        camera.position.z = rad;
        scene.add( camera );

        // webgl renderer gives better rendering without problems
        renderer = new THREE.WebGLRenderer( );
        renderer.setSize( w, h );

        container.appendChild( renderer.domElement );
        container.addEventListener( 'mousedown', onDocumentMouseDown, false );

        // create book
        book = new FlipBook3D.Book( );
        book.pageWidth = pagew;
        book.pageHeight = pageh;
        scene.add( book );

        // create pages
        for (var i=0;i<images.length;i++)
            book.addPage(
                THREE.ImageUtils.loadTexture( images[i].f ),
                THREE.ImageUtils.loadTexture( images[i].b ),
                images[i].hard
            );

        // add flip controls
        fl = document.getElementById('flipleft');
        fl.addEventListener('click',function( ){
            var plen = book.pages.length,
                pindex = plen-book.flippedright
            ;
            if ( pindex >= 0 && pindex < plen )  book.pages[pindex].flipLeft( );
        });
        fr = document.getElementById('flipright');
        fr.addEventListener('click',function( ){
            var plen = book.pages.length,
                pindex = book.flippedleft-1
            ;
            if ( pindex >= 0 && pindex < plen ) book.pages[pindex].flipRight( );
        });

        // start rendering
        animate( );
    },

    animate : animate
};

// export it
window.FlipBook3DApplication = self;
}(window);