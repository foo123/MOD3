/*******************************************************************
**	FlipBook3D using Three.js, MOD3.js and Tween.js
**	Author Nikos M.
** 	url http://nikos-web-development.netai.net/
*********************************************************************/

// 3D Flip Book -------------------------------------------------------------------------------------------
var FlipBook3D=FlipBook3D || {};

// Book  Class-------------------------------------------------------------------------------------------
FlipBook3D.Book=function()
{
	this.pages=null;
	this.pageWidth=0;
	this.pageHeight=0;
	this.currentPage=0;
	this.flippedleft=0;
	this.flippedright=0;
	this.duration=1;
	this.centerContainer=new THREE.Object3D();
	this.add(this.centerContainer);
	this.pages=[];
};
FlipBook3D.Book.prototype=new THREE.Object3D();
FlipBook3D.Book.prototype.constructor=FlipBook3D.Book;
FlipBook3D.Book.prototype.getNumPages=function()
{
	return(this.pages.length);
};
FlipBook3D.Book.prototype.addPage=function(pf,pb,hardness,pageColor)
{
	var hardn=0.5, pagecol=0x555555;
	if (typeof hardness != 'undefined')
	 hardn=hardness;
	if (typeof pageColor != 'undefined')
	 pagecol=pageColor;
	var i=this.pages.length;
	this.pages.push(new FlipBook3D.Page(this,i,pf,pb,hardn,pagecol));
	this.centerContainer.add(this.pages[this.pages.length-1]);
	this.pages[this.pages.length-1].duration=this.duration;
};

// Page Class -------------------------------------------------------------------------------------------
FlipBook3D.Page=function(book,i,matf,matb,hard,col)
{
	this.book=book;
	this.matFront=matf;
	this.matBack=matb;
	this.index=i;
	this.pW=this.book.pageWidth;
	this.pH=this.book.pageHeight;
	this.nfacesw=10;//this.pW*0.1;
	this.nfacesh=10;//this.pH*0.1;
	this.mats=[];
	this.pageHardness=hard;
	this.duration=1;
	this.angle=.25*Math.PI*this.pW/this.pH;
	this.force=6;
	this.to=null;
	this.flipPt=0.3;
	this.mod=null;
	this.bend=null;
	this.pivot=null;
	this.isFlippedLeft=false;
	this.isFlippedRight=true;
	this.flippingLeft=false
	this.flippingRight=false;
	this.zz=2;
	this.pageColor=col;
	this.sides={bottom:3,top:2,	right:0,left:1,	front:4,back:5};
	
	this.book.flippedright++;
	// align flipBook center container
	if (this.index==0)
		this.book.centerContainer.position.x=-this.book.pageWidth*0.5;
	
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
    THREE.Mesh.call(this, new THREE.CubeGeometry( this.pW, this.pH, 1, this.nfacesw, this.nfacesh, 1 ), new THREE.MeshFaceMaterial(this.mats));
	this.overdraw=true;
	this.position.x=this.pW*0.5;
	this.position.z=-this.zz*this.index;
	
	// flip modifiers
	this.mod = new MOD3.ModifierStack( new MOD3.LibraryThree(), this );
	this.pivot = new MOD3.Pivot(this.position.x, 0, 0);
	this.mod.addModifier(this.pivot);
	this.mod.collapse();
	this.bend = new MOD3.Bend(0,0,0);
	this.bend.constraint = MOD3.ModConstant.LEFT;
	if (this.pH>this.pW)
		this.bend.switchAxes=true;
	this.mod.addModifier( this.bend );
};
FlipBook3D.Page.prototype=new THREE.Mesh();
FlipBook3D.Page.prototype.constructor=FlipBook3D.Page;
FlipBook3D.Page.prototype.flipLeft=function(pt)
{
	if (!this.isFlippedLeft && !this.flippingLeft && !this.flippingRight && this.index==this.book.flippedleft)
	{
		if (pt!=null)
		{
			//this.flipPt=pt;//e.localY/this.book.pageHeight;
		}
		this.flippingLeft=true;
		this.bend.setAngle((2*this.flipPt-1)*this.angle);
		this.to={angle:this.rotation.y, t:-1, xx:0, thiss:this};
		new TWEEN.Tween(this.to).to({angle:-Math.PI, xx:1, t:1}, this.duration*1000).onUpdate(this.renderFlip).onComplete(this.flipFinished).start();
		this.book.flippedleft++;
		this.book.flippedright--;
		this.position.z=1;
	}
};
FlipBook3D.Page.prototype.flipRight=function(pt)
{
	if (!this.isFlippedRight && !this.flippingRight && !this.flippingLeft && this.index==this.book.getNumPages()-this.book.flippedright-1)
	{
		if (pt!=null)
		{
			//this.flipPt=pt;//e.localY/this.book.pageHeight;
		}
		this.flippingRight=true;
		this.bend.setAngle((2*this.flipPt-1)*this.angle);
		this.to={angle:this.rotation.y, t:-1,xx:0, thiss:this};
		new TWEEN.Tween(this.to).to({angle:0, xx:1, t:1}, this.duration*1000).onUpdate(this.renderFlip).onComplete(this.flipFinished).start();
		this.book.flippedleft--;
		this.book.flippedright++;
		this.position.z=1;
	}
};
FlipBook3D.Page.prototype.renderFlip=function()
{
	var p2=Math.PI*0.5;
	// align flipBook to center
	if (this.thiss.flippingLeft && this.thiss.index==0 && this.thiss.book.getNumPages()>1)
		this.thiss.book.centerContainer.position.x=(1-this.xx)*this.thiss.book.centerContainer.position.x;
	else if (this.thiss.flippingLeft && this.thiss.index==this.thiss.book.getNumPages()-1)
		this.thiss.book.centerContainer.position.x=(1-this.xx)*this.thiss.book.centerContainer.position.x+this.xx*this.thiss.book.pageWidth*0.5;
	else if (this.thiss.flippingRight && this.thiss.index==0)
		this.thiss.book.centerContainer.position.x=(1-this.xx)*this.thiss.book.centerContainer.position.x-this.xx*this.thiss.book.pageWidth*0.5;
	else if (this.thiss.flippingRight && this.thiss.index==this.thiss.book.getNumPages()-1)
		this.thiss.book.centerContainer.position.x=(1-this.xx)*this.thiss.book.centerContainer.position.x;
		
	// flip page
	var tt=(1-Math.abs(this.t));
	this.thiss.rotation.y = this.angle;
	this.thiss.bend.force = ((Math.abs(this.angle)-p2)/p2)*tt*this.thiss.force*(1-this.thiss.pageHardness);
	this.thiss.bend.offset = (1-tt)*0.6+tt*0.5;
	this.thiss.mod.apply();
};
FlipBook3D.Page.prototype.flipFinished=function()
{
	if (this.thiss.flippingLeft)
	{
		this.thiss.flippingLeft=false;
		this.thiss.isFlippedLeft=true;
		this.thiss.flippingRight=false;
		this.thiss.isFlippedRight=false;
		this.thiss.position.z=-this.thiss.zz*(this.thiss.book.getNumPages()-this.thiss.index);
	}
	else if (this.thiss.flippingRight)
	{
		this.thiss.flippingLeft=false;
		this.thiss.isFlippedRight=true;
		this.thiss.flippingRight=false;
		this.thiss.isFlippedLeft=false;
		this.thiss.position.z=-this.thiss.zz*this.thiss.index;
	}
	this.thiss.bend.force=0.0;
	this.thiss.bend.setAngle(0.0);
	this.thiss.bend.offset=0.0;
	this.thiss.mod.apply();
};
