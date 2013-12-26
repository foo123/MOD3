(function(root){

    /**
    **  FlipBook3D using Three.js, MOD3.js and Tween.js
    **  Author Nikos M.
    **  url http://nikos-web-development.netai.net/
    **/

    // 3D Flip Book -------------------------------------------------------------------------------------------
    var self={}, 
        Class = root.Classy.Class,
        THREE=root.THREE, 
        TWEEN=root.TWEEN, 
        MOD3=root.MOD3,
        Book, Page;
    
    var Abs=Math.abs, PI=Math.PI
    ;
    
    
    // Book  Class-------------------------------------------------------------------------------------------
    Book = self.Book = Class( THREE.Object3D,
    {
        constructor : function() {
            this.$super("constructor");
            
            this.pages = null;
            this.pageWidth = 0;
            this.pageHeight = 0;
            this.currentPage = 0;
            this.flippedleft = 0;
            this.flippedright = 0;
            this.duration = 1;
            this.centerContainer = new THREE.Object3D();
            this.add( this.centerContainer );
            this.pages = [];
        },
        
        pages : null,
        pageWidth : 0,
        pageHeight : 0,
        currentPage : 0,
        flippedleft : 0,
        flippedright : 0,
        duration : 1,
        centerContainer : null,
        
        getNumPages : function()  {
            return( this.pages.length );
        },
        
        addPage : function(pf, pb, hardness, pageColor) {
            var hardn=0.5, pagecol=0x555555;
            
            if (typeof hardness != 'undefined')   hardn=hardness;
            if (typeof pageColor != 'undefined')  pagecol=pageColor;
            
            var i=this.pages.length;
            var page = new Page(this, i, pf, pb, hardn, pagecol);
            page.duration = this.duration;
            
            this.pages.push( page );
            this.centerContainer.add( page );
            
            return this;
        }
    });
    
    // Page Class -------------------------------------------------------------------------------------------
    Page = self.Page = Class( THREE.Mesh,
    {
        constructor : function(book, i, matf, matb, hard, col)  {
            this.book = book;
            this.matFront = matf;
            this.matBack = matb;
            this.index = i;
            this.pW = this.book.pageWidth;
            this.pH = this.book.pageHeight;
            this.nfacesw = 10;//this.pW*0.1;
            this.nfacesh = 10;//this.pH*0.1;
            this.mats = [];
            this.pageHardness = hard;
            this.duration = 1;
            this.angle = .25*PI*this.pW/this.pH;
            this.force = 6;
            this.to = null;
            this.flipPt = 0.3;
            this.mod = null;
            this.bend = null;
            this.pivot = null;
            this.isFlippedLeft = false;
            this.isFlippedRight = true;
            this.flippingLeft = false
            this.flippingRight = false;
            this.zz = 2;
            this.pageColor = col;
            this.sides = {bottom:3, top:2,    right:0, left:1,    front:4, back:5};
            
            this.book.flippedright++;
            
            // align flipBook center container
            if (this.index==0)
                this.book.centerContainer.position.x = -this.book.pageWidth*0.5;
            
            // add page flip interaction TO DO..
            
            for (var mii=0;mii<6;mii++)
            {
                // add front - back page images
                if (mii==this.sides.front)
                {
                    this.mats[this.sides.front]=new THREE.MeshBasicMaterial( { map: this.matFront, overdraw: true } );
                    this.mats[this.sides.front].name="front";
                }
                else if (mii==this.sides.back)
                {
                    this.mats[this.sides.back]=new THREE.MeshBasicMaterial( { map: this.matBack, overdraw: true } );
                    this.mats[this.sides.back].name="back";
                }
                else
                {
                    this.mats[mii]=new THREE.MeshBasicMaterial( { color: this.pageColor } );
                    this.mats[mii].name='edge';
                }
            }
            // call super
            // Three.js has made materials added to FaceMaterial instead of CubeGeometry
            this.$super("constructor", new THREE.CubeGeometry( this.pW, this.pH, 1, this.nfacesw, this.nfacesh, 1 ), new THREE.MeshFaceMaterial(this.mats));
            //this.superCall("constructor", new THREE.CubeGeometry( this.pW, this.pH, 1, this.nfacesw, this.nfacesh, 1 ), new THREE.MeshFaceMaterial(this.mats));
            this.overdraw = true;
            this.position.x = this.pW*0.5;
            this.position.z = -this.zz*this.index;
            
            // flip modifiers
            this.mod = new MOD3.ModifierStack( MOD3.LibraryThree, this );
            this.pivot = new MOD3.Pivot(this.position.x, 0, 0);
            this.mod.addModifier(this.pivot);
            this.mod.collapse();
            this.bend = new MOD3.Bend(0,0,0);
            this.bend.constraint = MOD3.ModConstant.LEFT;
            if (this.pH>this.pW)
                this.bend.switchAxes=true;
            this.mod.addModifier( this.bend );
        },
        
        book : null,
        matFront : null,
        matBack : null,
        index : null,
        pW : null,
        pH : null,
        nfacesw : 10,
        nfacesh : 10,
        mats : null,
        pageHardness : null,
        duration : 1,
        angle : null,
        force : 6,
        to : null,
        flipPt : 0.3,
        mod : null,
        bend : null,
        pivot : null,
        isFlippedLeft : false,
        isFlippedRight : true,
        flippingLeft : false,
        flippingRight : false,
        zz : 2,
        pageColor : null,
        sides : null,
            
        flipLeft : function(pt)  {
            var ayto=this;
            
            if (
                !this.isFlippedLeft && 
                !this.flippingLeft && 
                !this.flippingRight && 
                (this.index==this.book.flippedleft)
            )
            {
                if (pt!=null)
                {
                    //this.flipPt=pt;//e.localY/this.book.pageHeight;
                }
                this.flippingLeft = true;
                this.bend.setAngle( (2*this.flipPt-1)*this.angle );
                this.to = { angle: this.rotation.y, t: -1, xx: 0, page: this };
                new TWEEN.Tween(this.to)
                    .to({angle:-Math.PI, xx:1, t:1}, this.duration*1000)
                    .onUpdate(
                        ayto.renderFlip
                    )
                    .onComplete(
                        ayto.flipFinished
                    )
                    .start();
                this.book.flippedleft++;
                this.book.flippedright--;
                this.position.z=1;
            }
            
            return this;
        },
        
        flipRight : function(pt)  {
            var ayto=this;
            
            if (
                !this.isFlippedRight && 
                !this.flippingRight && 
                !this.flippingLeft && 
                (this.index==this.book.getNumPages()-this.book.flippedright-1)
            )
            {
                if (pt!=null)
                {
                    //this.flipPt=pt;//e.localY/this.book.pageHeight;
                }
                this.flippingRight = true;
                this.bend.setAngle( (2*this.flipPt-1)*this.angle );
                this.to = { angle: this.rotation.y, t: -1, xx: 0, page: this };
                new TWEEN.Tween(this.to)
                    .to({angle:0, xx:1, t:1}, this.duration*1000)
                    .onUpdate(
                        ayto.renderFlip
                    )
                    .onComplete(
                        ayto.flipFinished
                    )
                    .start();
                this.book.flippedleft--;
                this.book.flippedright++;
                this.position.z=1;
            }
            
            return this;
        },
        
        renderFlip : function()  {
            var p2=Math.PI*0.5;
            // align flipBook to center
            if (this.page.flippingLeft && this.page.index==0 && this.page.book.getNumPages()>1)
                this.page.book.centerContainer.position.x=(1-this.xx)*this.page.book.centerContainer.position.x;
            else if (this.page.flippingLeft && this.page.index==this.page.book.getNumPages()-1)
                this.page.book.centerContainer.position.x=(1-this.xx)*this.page.book.centerContainer.position.x+this.xx*this.page.book.pageWidth*0.5;
            else if (this.page.flippingRight && this.page.index==0)
                this.page.book.centerContainer.position.x=(1-this.xx)*this.page.book.centerContainer.position.x-this.xx*this.page.book.pageWidth*0.5;
            else if (this.page.flippingRight && this.page.index==this.page.book.getNumPages()-1)
                this.page.book.centerContainer.position.x=(1-this.xx)*this.page.book.centerContainer.position.x;
                
            // flip page
            var tt=(1-Abs(this.t));
            this.page.rotation.y = this.angle;
            this.page.bend.force = ((Abs(this.angle)-p2)/p2)*tt*this.page.force*(1-this.page.pageHardness);
            this.page.bend.offset = (1-tt)*0.6+tt*0.5;
            this.page.mod.apply();
        },
        
        flipFinished : function() {
            if (this.page.flippingLeft)
            {
                this.page.flippingLeft=false;
                this.page.isFlippedLeft=true;
                this.page.flippingRight=false;
                this.page.isFlippedRight=false;
                this.page.position.z=-this.page.zz*(this.page.book.getNumPages()-this.page.index);
            }
            else if (this.page.flippingRight)
            {
                this.page.flippingLeft=false;
                this.page.isFlippedRight=true;
                this.page.flippingRight=false;
                this.page.isFlippedLeft=false;
                this.page.position.z=-this.page.zz*this.page.index;
            }
            this.page.bend.force=0.0;
            this.page.bend.setAngle(0.0);
            this.page.bend.offset=0.0;
            this.page.mod.apply();
        }
    });

    // export it
    root.FlipBook3D = self;

})(window);