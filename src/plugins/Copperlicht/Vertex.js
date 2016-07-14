/**
*
* MOD3  Copperlicht Vertex Class
*
*
**/
!function(MOD3, undef){
@@USE_STRICT@@

var ModConstant = MOD3.ModConstant,
    X = ModConstant.X, Y = ModConstant.Y, Z = ModConstant.Z,
    Vector3 = MOD3.Vector3, A = MOD3.VecArray
;

var VertexCopperlicht = MOD3.VertexCopperlicht = MOD3.Class( MOD3.VertexProxy, {
    
    constructor: function( node, buffer, vertex ) {
        var self = this;
        self.node = node;
        self.buffer = buffer;
        self.$super('constructor', vertex );
        self.name = "VertexCopperlicht";
    },
    
    node: null,
    buffer: null,
    
    dispose: function( ) {
        var self = this;
        self.node = null;
        self.buffer = null;
        self.$super('dispose');
        
        return self;
    },
    
    setVertex: function( vertex ) {
        var self = this,
            vt = vertex.Pos;
        self.vertex = vertex;
        self.original = new A( [vt.X, vt.Y, vt.Z] );
        self.xyz = new A( self.original );
        
        return self;
    },
    
    getXYZ: function( ) {
        var vt = this.vertex.Pos;
        return new A( [vt.X, vt.Y, vt.Z] );
    },
    
    getX: function( ) {
        return this.vertex.Pos.X;
    },
    
    getY: function( ) {
        return this.vertex.Pos.Y;
    },
    
    getZ: function( ) {
        return this.vertex.Pos.Z;
    },
    
    setXYZ: function( xyz ) {
        var self = this,
            vt = self.vertex.Pos;
        
        vt.X = xyz[0];
        vt.Y = xyz[1];
        vt.Z = xyz[2];
        //self.buffer.update(true);
        
        return self;
    },
    
    setX: function( v ) {
        var self = this;
        self.vertex.Pos.X = v;
        return self;
    },
    
    setY: function( v ) {
        var self = this;
        self.vertex.Pos.Y = v;
        return self;
    },
    
    setZ: function( v ) {
        var self = this;
        self.vertex.Pos.Z = v;
        return self;
    },
    
    reset: function( ) {
        var self = this,
            vt = self.vertex.Pos, xyz = self.original;
        
        vt.X = xyz[0];
        vt.Y = xyz[1];
        vt.Z = xyz[2];
        //self.buffer.update(true);
        
        return self;
    },

    collapse: function( ) {
        var self = this,
            vt = self.vertex.Pos;
        self.original =  new A( [vt.X, vt.Y, vt.Z] );
        
        return self;
    },

    getValue: function( axis )  {
        var vt = this.vertex.Pos;
        return X === axis
            ? vt.X
            : (Y === axis
            ? vt.Y
            : (Z === axis
            ? vt.Z
            : 0))
        ;
    },

    setValue: function( axis, v ) {
        var vt = this.vertex.Pos;
        if ( X === axis ) vt.X = v;
        else if ( Y === axis ) vt.Y = v;
        else if ( Z === axis ) vt.Z = v;
        return this;
   },
   
   setVector: function( v ) {
        var vt = this.vertex.Pos, xyz = v.xyz;
        
        vt.X = xyz[0];
        vt.Y = xyz[1];
        vt.Z = xyz[2];
        //this.buffer.update(true);
        
        return this;
    },

    getVector: function( ) {
        var vt = this.vertex.Pos;
        return new Vector3( [vt.X, vt.Y, vt.Z] );
    }
});
// aliases
VertexCopperlicht.prototype.getXYZRef = VertexCopperlicht.prototype.getXYZ;
VertexCopperlicht.prototype.setXYZRef = VertexCopperlicht.prototype.setXYZ;

}(MOD3);