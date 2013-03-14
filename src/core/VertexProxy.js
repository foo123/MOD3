// Vertex Proxy class --------------------------------------------------------------------------------------------------
(function(MOD3){
    MOD3.VertexProxy=function(v)
    {
        //THREE.Vertex.call(this);
        this.ratioX=null;
        this.ratioY=null;
        this.ratioZ=null;
        
        this.originalX=null;
        this.originalY=null;
        this.originalZ=null;
        
        if (typeof v != 'undefined')
            this.vertex=v;
    };      
    MOD3.VertexProxy.prototype.setVertex=function(vertex)
    {
    };
    MOD3.VertexProxy.prototype.setRatios=function(rx, ry, rz)
    {
        this.ratioX = rx;
        this.ratioY = ry;
        this.ratioZ = rz;
    };
    MOD3.VertexProxy.prototype.setOriginalPosition=function(ox, oy, oz)
    {
        this.originalX = ox;
        this.originalY = oy;
        this.originalZ = oz;
    };
    MOD3.VertexProxy.prototype.getX=function(){};
    MOD3.VertexProxy.prototype.getY=function(){};
    MOD3.VertexProxy.prototype.getZ=function(){};
    MOD3.VertexProxy.prototype.setX=function(v){};
    MOD3.VertexProxy.prototype.setY=function(v){};
    MOD3.VertexProxy.prototype.setZ=function(v){};
    MOD3.VertexProxy.prototype.getValue=function(axis)
    {
        switch(axis) {
            case MOD3.ModConstant.X: return this.getX();
            case MOD3.ModConstant.Y: return this.getY();
            case MOD3.ModConstant.Z: return this.getZ();
        }
        return 0;
    };
    MOD3.VertexProxy.prototype.setValue=function(axis, v)
    {
        switch(axis) {
            case MOD3.ModConstant.X: this.setX( v ); break;
            case MOD3.ModConstant.Y: this.setY( v ); break;
            case MOD3.ModConstant.Z: this.setZ( v ); break;
        }
    };
    MOD3.VertexProxy.prototype.getRatio=function(axis)
    {
        switch(axis) {
            case MOD3.ModConstant.X: return this.ratioX;
            case MOD3.ModConstant.Y: return this.ratioY;
            case MOD3.ModConstant.Z: return this.ratioZ;
        }
        return -1;
    };
    MOD3.VertexProxy.prototype.getOriginalValue=function(axis)
    {
        switch(axis) {
            case MOD3.ModConstant.X: return this.originalX;
            case MOD3.ModConstant.Y: return this.originalY;
            case MOD3.ModConstant.Z: return this.originalZ;
        }
        return 0;
    };
    MOD3.VertexProxy.prototype.reset=function()
    {
        this.setX( this.originalX );
        this.setY( this.originalY );
        this.setZ( this.originalZ );
    };
    MOD3.VertexProxy.prototype.collapse=function()
    {
        this.originalX = this.getX();
        this.originalY = this.getY();
        this.originalZ = this.getZ();
    };
    MOD3.VertexProxy.prototype.getVector=function()
    {
        return new MOD3.Vector3(this.getX(),this.getY(),this.getZ());
    };
    MOD3.VertexProxy.prototype.setVector=function(v)
    {
        this.setX( v.x );
        this.setY( v.y );
        this.setZ( v.z );
    };
    MOD3.VertexProxy.prototype.getRatioVector=function()
    {
        return new MOD3.Vector3(this.ratioX, this.ratioY, this.ratioZ);
    };
})(MOD3);