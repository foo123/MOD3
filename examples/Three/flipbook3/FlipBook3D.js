!function(root) {
/**
**  FlipBook3D using Three.js, MOD3.js and Tween.js
**  Author Nikos M.
**  url http://nikos-web-development.netai.net/
**/

// 3D Flip Book -------------------------------------------------------------------------------------------
var self = { }, 
    Class = root.Classy.Class,
    THREE = root.THREE, 
    TWEEN = root.TWEEN, 
    MOD3 = root.MOD3,
    Book, Page,
    Abs = Math.abs, PI = Math.PI
;

var Abs = Math.abs, PI = Math.PI;


// Book  Class-------------------------------------------------------------------------------------------
Book = self.Book = Class(THREE.Object3D, {
    constructor: function( ){
        var self = this;
        self.$super("constructor");
        self.pages = null;
        self.pageWidth = 0;
        self.pageHeight = 0;
        self.currentPage = 0;
        self.flippedleft = 0;
        self.flippedright = 0;
        self.duration = 1;
        self.centerContainer = new THREE.Object3D( );
        self.add( self.centerContainer );
        self.pages = [];
    },

    pages: null,
    pageWidth: 0,
    pageHeight: 0,
    currentPage: 0,
    flippedleft: 0,
    flippedright: 0,
    duration: 1,
    centerContainer: null,

    getNumPages: function( ){
        return this.pages.length;
    },

    addPage: function( pf, pb, hardness, pageColor ){
        var self = this, hardn = 0.5, pagecol = 0x555555;

        if ( "undefined" !== typeof hardness ) hardn = hardness;
        if ( "undefined" !== typeof pageColor )  pagecol = pageColor;

        var i = self.pages.length, page = new Page(self, i, pf, pb, hardn, pagecol);

        self.pages.push( page );
        self.centerContainer.add( page );
        return self;
    }
});

// Page Class -------------------------------------------------------------------------------------------
Page = self.Page = Class(THREE.Mesh, {
    constructor: function( book, i, matf, matb, hard, col ) {
        var self = this;
        self.book = book;
        self.matFront = matf;
        self.matBack = matb;
        self.index = i;
        self.nfacesw = 10;//this.pW*0.1;
        self.nfacesh = 10;//this.pH*0.1;
        self.mats = [];
        self.pageHardness = hard;
        self.duration = 1;
        self.angle = .25 * PI * book.pageWidth / book.pageHeight;
        self.force = 6;
        self.to = null;
        self.flipPt = 0.3;
        self.mod = null;
        self.bend = null;
        self.isFlippedLeft = false;
        self.isFlippedRight = true;
        self.flippingLeft = false
        self.flippingRight = false;
        self.zz = 2;
        self.pageColor = col;
        self.sides = {bottom:3, top:2,    right:0, left:1,    front:4, back:5};

        self.book.flippedright++;

        // align flipBook center container
        if ( 0 === self.index )
            self.book.centerContainer.position.x = -self.book.pageWidth*0.5;

        // add page flip interaction TO DO..

        for (var mii=0;mii<6;mii++)
        {
            // add front - back page images
            if ( mii === self.sides.front )
            {
                self.mats[self.sides.front] = new THREE.MeshBasicMaterial( { map: self.matFront, overdraw: true } );
                self.mats[self.sides.front].name = "front";
            }
            else if ( mii === self.sides.back )
            {
                self.mats[self.sides.back] = new THREE.MeshBasicMaterial( { map: self.matBack, overdraw: true } );
                self.mats[self.sides.back].name = "back";
            }
            else
            {
                self.mats[mii] = new THREE.MeshBasicMaterial( { color: self.pageColor } );
                self.mats[mii].name = 'edge';
            }
        }
        // call super
        // Three.js has made materials added to FaceMaterial instead of CubeGeometry
        self.$super("constructor", new THREE.CubeGeometry( book.pageWidth, book.pageHeight, 1, self.nfacesw, self.nfacesh, 1 ), new THREE.MeshFaceMaterial(self.mats));
        self.overdraw = true;
        self.position.x = book.pageWidth * 0.5;
        self.position.z = -self.zz * self.index;

        // flip modifiers
        self.mod = new MOD3.ModifierStack( MOD3.LibraryThree, self );
        self.mod.addModifier( new MOD3.Pivot( self.position.x, 0, 0 ) ).collapse( );
        self.bend = new MOD3.Bend( 0, 0, 0 );
        self.bend.constraint = MOD3.ModConstant.LEFT;
        self.bend.switchAxes = book.pageHeight > book.pageWidth ? true : false;
        self.mod.addModifier( self.bend );
    },

    book : null,
    matFront : null,
    matBack : null,
    index : null,
    nfacesw : 10,
    nfacesh : 10,
    mats : null,
    pageHardness : null,
    angle : null,
    force : 6,
    to : null,
    flipPt : 0.3,
    mod : null,
    bend : null,
    isFlippedLeft : false,
    isFlippedRight : true,
    flippingLeft : false,
    flippingRight : false,
    zz : 2,
    pageColor : null,
    sides : null,

    flipLeft: function( pt ) {
        var self = this;

        if (
            !self.isFlippedLeft && 
            !self.flippingLeft && 
            !self.flippingRight && 
            (self.index === self.book.flippedleft)
        )
        {
            if ( null != pt )
            {
                //this.flipPt=pt;//e.localY/this.book.pageHeight;
            }
            self.flippingLeft = true;
            self.bend.angle = (2*self.flipPt-1)*self.angle;
            new TWEEN.Tween( self.to={ angle: self.rotation.y, t: -1, xx: 0, page: self } )
                .to({angle:-Math.PI, xx:1, t:1}, self.book.duration*1000)
                .onUpdate( self.renderFlip )
                .onComplete( self.flipFinished )
                .start( )
            ;
            self.book.flippedleft++;
            self.book.flippedright--;
            self.position.z = 1;
        }

        return self;
    },

    flipRight: function( pt ) {
        var self = this;

        if (
            !self.isFlippedRight && 
            !self.flippingRight && 
            !self.flippingLeft && 
            (self.index === self.book.getNumPages()-self.book.flippedright-1)
        )
        {
            if ( null != pt )
            {
                //this.flipPt=pt;//e.localY/this.book.pageHeight;
            }
            self.flippingRight = true;
            self.bend.angle = (2*self.flipPt-1)*self.angle;
            new TWEEN.Tween( self.to = { angle: self.rotation.y, t: -1, xx: 0, page: self } )
                .to({angle:0, xx:1, t:1}, self.book.duration*1000)
                .onUpdate( self.renderFlip )
                .onComplete( self.flipFinished )
                .start( )
            ;
            self.book.flippedleft--;
            self.book.flippedright++;
            self.position.z = 1;
        }

        return self;
    },

    renderFlip: function( ) {
        var t = this, self = t.page, book = self.book, p2 = Math.PI*0.5, tt;
        // align flipBook to center
        if ( self.flippingLeft && 0 === self.index && book.getNumPages() > 1 )
            book.centerContainer.position.x = (1-t.xx) * book.centerContainer.position.x;
        else if ( self.flippingLeft && self.index+1 === book.getNumPages() )
            book.centerContainer.position.x = (1-t.xx)*book.centerContainer.position.x+t.xx*book.pageWidth*0.5;
        else if ( self.flippingRight && 0 === self.index )
            book.centerContainer.position.x = (1-t.xx)*book.centerContainer.position.x-t.xx*book.pageWidth*0.5;
        else if ( self.flippingRight && self.index+1 === book.getNumPages() )
            book.centerContainer.position.x = (1-t.xx)*book.centerContainer.position.x;

        // flip page
        tt=(1-Abs(t.t));
        self.rotation.y = t.angle;
        self.bend.force = ((Abs(t.angle)-p2)/p2)*tt*self.force*(1-self.pageHardness);
        self.bend.offset = (1-tt)*0.6+tt*0.5;
        self.mod.apply( );
    },

    flipFinished: function( ) {
        var t = this, self = t.page;
        if ( self.flippingLeft )
        {
            self.flippingLeft = false;
            self.isFlippedLeft = true;
            self.flippingRight = false;
            self.isFlippedRight = false;
            self.position.z = -self.zz*(self.book.getNumPages()-self.index);
        }
        else if ( self.flippingRight )
        {
            self.flippingLeft = false;
            self.isFlippedRight = true;
            self.flippingRight = false;
            self.isFlippedLeft = false;
            self.position.z = -self.zz*self.index;
        }
        self.bend.force = 0.0;
        self.bend.angle = 0.0;
        self.bend.offset = 0.0;
        self.mod.apply();
    }
});

// export it
root.FlipBook3D = self;

}(window);