/**
*
* MOD3  MeshProxy Super Class
*
*
**/
!function(MOD3, undef){
@@USE_STRICT@@

var ModConstant = MOD3.ModConstant,
    X = ModConstant.X, Y = ModConstant.Y, Z = ModConstant.Z,
    XYZ = MOD3.XYZi, Vector3 = MOD3.Vector3, V = MOD3.VecArray,
    Min = Math.min, Max = Math.max, each = MOD3.List.each,
    dispose = function( o ) { o.dispose( ); },
    reset = function( o ) { o.reset( ); },
    collapse = function( o ) { o.collapse( ); },
    FaceProxy, VertexProxy, MeshProxy, Factory
;

FaceProxy = MOD3.FaceProxy = MOD3.Class({
    
    constructor: function FaceProxy( ) {
        this.vertices = [ ];
    },
    
    name: "FaceProxy",
    
    vertices: null,

    dispose: function( ) {
        var self = this;
        self.vertices = null;
        return self;
    },
    
    addVertex: function( v )  {
        this.vertices.push( v );
    },

    getVertices: function( ) {
        return this.vertices;
    }
});

VertexProxy = MOD3.VertexProxy = MOD3.Class({
    
    constructor: function VertexProxy( vertex, mesh ) {
        var self = this;
        self.mesh = mesh || null;
        // use internal typed-arrays for speed
        self.original = new V( [0,0,0] );
        self.ratio = new V( [0,0,0] );
        // vertex can be zero
        if ( null != vertex ) self.setVertex( vertex );
    },
    
    name: "VertexProxy",
    
    mesh: null,
    vertex: null,
    original: null,
    ratio: null,
    
    dispose: function( ) {
        var self = this;
        self.mesh = null;
        self.vertex = null;
        self.original = null;
        self.ratio = null;
        return self;
    },
    
    setVertex: function( vt )  { 
        // override
        var self = this;
        self.vertex = vt;
        return self;
    },
    
    getRatioVector: function( ) {
        var r = this.ratio, rv = new V(3);
        rv[0] = r[0]; rv[1] = r[1]; rv[2] = r[2];
        return rv;
    },

    getRatio: function( axis ) {
        return this.ratio[ XYZ[axis] ] || 0;
    },

    setRatios: function( rx, ry, rz ) {
        var r = this.ratio;
        r[0] = rx===undef ? 0 : rx;
        r[1] = ry===undef ? 0 : ry;
        r[2] = rz===undef ? 0 : rz;
        return this;
    },

    getOriginalValue: function( axis ) {
        return this.original[ XYZ[axis] ] || 0;
    },

    setOriginalPosition: function( ox, oy, oz ) {
        var o = this.original;
        o[0] = ox===undef ? 0 : ox;
        o[1] = oy===undef ? 0 : oy;
        o[2] = oz===undef ? 0 : oz;
        return this;
    },

    getXYZ: function( ) {
        // override
        return new V( [0,0,0] );
    },
    
    getX: function( ) {
        // override
        return 0;
    },

    getY: function( ) {
        // override
        return 0;
    },

    getZ: function( ) {
        // override
        return 0;
    },

    getValue: function( axis )  {
        var self = this;
        // override
        return X === axis
            ? self.getX( )
            : (Y === axis
            ? self.getY( )
            : (Z === axis
            ? self.getZ( )
            : 0))
        ;
    },

    setXYZ: function( xyz ) {
        // override
        return this;
    },
    
    setX: function( vo ) {
        // override
        return this;
    },

    setY: function( vo ) {
        // override
        return this;
    },

    setZ: function( vo ) {
        // override
        return this;
    },

    setValue: function( axis, vo ) {
        var self = this;
        // override
        if ( X === axis )       self.setX( vo );
        else if ( Y === axis )  self.setY( vo );
        else if ( Z === axis )  self.setZ( vo );
        return self;
    },

    reset: function( ) {
        // override
        var self = this;
        self.setXYZ( self.original );
        return self;
    },

    collapse: function( ) {
        // override
        var self = this, xyz = self.getXYZ( ), o = self.original;
        o[0] = xyz[0]; o[1] = xyz[1]; o[2] = xyz[2];
        return self;
    }
});

MeshProxy = MOD3.MeshProxy = MOD3.Class({
    
    constructor: function MeshProxy( mesh ) {
        var self = this;
        self.maxX = 0;
        self.maxY = 0;
        self.maxZ = 0;
        
        self.minX = 0;
        self.minY = 0;
        self.minZ = 0;
        
        self.maxAxis = 0;
        self.midAxis = 0;
        self.minAxis = 0;
        
        self.width = 0;
        self.height = 0;
        self.depth = 0;
        
        self.vertices = null;
        self.faces = null;
        self.mesh = null;
        
        if ( null != mesh ) self.setMesh( mesh );
    },
    
    name: "MeshProxy",
    
    maxX: 0,
    maxY: 0,
    maxZ: 0,
    minX: 0,
    minY: 0,
    minZ: 0,
    
    maxAxis: 0,
    midAxis: 0,
    minAxis: 0,
    
    width: 0,
    height: 0,
    depth: 0,
    
    vertices : null,
    faces : null,
    mesh : null,
    v: null,
    
    dispose: function( ) {
        var self = this;
        self.maxX = null;
        self.maxY = null;
        self.maxZ = null;
        self.minX = null;
        self.minY = null;
        self.minZ = null;
        
        self.maxAxis = null;
        self.midAxis = null;
        self.minAxis = null;
        
        self.width = null;
        self.height = null;
        self.depth = null;
        
        self.disposeFaces( );
        self.disposeVertices( );
        self.mesh = null;
        self.v = null;
        return self;
    },
    
    disposeVertices: function( ) {
        var self = this;
        each( self.vertices, dispose );
        self.vertices = null;
        return self;
    },
    
    disposeFaces: function( ) {
        var self = this;
        each( self.faces, dispose );
        self.faces = null;
        return self;
    },
    
    init: function( mesh ) {
        var self = this;
        self.mesh = mesh;
        //self.vertices = [ ];
        // not used
        //self.faces = [];
        return self;
    },

    setMesh: function( mesh ) {
        return this.init( mesh ).preApply( ).analyzeGeometry( ).postApply( );
    },

    getVertices: function( ) {
        return this.vertices;
    },

    getFaces: function( ) {
        return this.faces;
    },

    applyModifiers: function( modStack ) {
        var self = this, sl, i;
        for (i=0,sl=modStack.length; i<sl; i++) modStack[ i ].enabled && modStack[ i ].apply( self );
        return self;
    },
    
    analyzeGeometry: function( ) {
        var self = this,
            vertices = self.vertices, 
            minX = 0, minY = 0,  minZ = 0,
            maxX = 0, maxY = 0, maxZ = 0,
            width = 0, height = 0, depth = 0,
            maxe, mine, w
        ;
        if ( !vertices || !vertices.length ) return self;
        
        w = vertices[0].getXYZ( );
        minX = w[0];
        minY = w[1];
        minZ = w[2];

        maxX = w[0]; 
        maxY = w[1]; 
        maxZ = w[2]; 
        
        each(vertices, function( v ){
            var xyz = v.getXYZ( ), x = xyz[ 0 ], y = xyz[ 1 ], z = xyz[ 2 ];
            minX = Min( minX, x );
            minY = Min( minY, y );
            minZ = Min( minZ, z );

            maxX = Max( maxX, x ); 
            maxY = Max( maxY, y ); 
            maxZ = Max( maxZ, z ); 
            v.setOriginalPosition( x, y, z );
        });

        width = maxX - minX;
        height = maxY - minY;
        depth = maxZ - minZ;
        
        self.width = width;
        self.height = height;
        self.depth = depth;
        self.minX = minX;
        self.maxX = maxX;
        self.minY = minY;
        self.maxY = maxY;
        self.minZ = minZ;
        self.maxZ = maxZ;

        maxe = Max( width, height, depth );
        mine = Min( width, height, depth );

        if ( (maxe === width) && (mine === height) ) 
        {
            self.minAxis = Y;
            self.midAxis = Z;
            self.maxAxis = X;
        } 
        else if ( (maxe === width) && (mine === depth) ) 
        {
            self.minAxis = Z;
            self.midAxis = Y;
            self.maxAxis = X;
        } 
        else if ( (maxe === height) && (mine === width) ) 
        {
            self.minAxis = X;
            self.midAxis = Z;
            self.maxAxis = Y;
        } 
        else if ( (maxe === height) && (mine === depth) ) 
        {
            self.minAxis = Z;
            self.midAxis = X;
            self.maxAxis = Y;
        } 
        else if ( (maxe === depth) && (mine === width) ) 
        {
            self.minAxis = X;
            self.midAxis = Y;
            self.maxAxis = Z;
        } 
        else if ( (maxe === depth) && (mine === height) ) 
        {
            self.minAxis = Y;
            self.midAxis = X;
            self.maxAxis = Z;
        }

        each(vertices, function( v ){
            var xyz = v.getXYZ( );
            v.setRatios(width > 0 ? (xyz[ 0 ] - minX) / width : 0, height > 0 ? (xyz[ 1 ] - minY) / height : 0, depth > 0 ? (xyz[ 2 ] - minZ) / depth : 0);
        });
        return self;
    },

    resetGeometry: function( ) {
        var self = this;
        each( self.vertices, reset );
        return self;
    },

    collapseGeometry: function( ) {
        var self = this;
        each( self.vertices, collapse );
        return self.analyzeGeometry( );
    },

    getMin: function( axis ) {
        var self = this;
        return X === axis
            ? self.minX
            : (Y === axis
            ? self.minY
            : (Z === axis
            ? self.minZ
            : -1))
        ;
    },

    getMax: function( axis ) {
        var self = this;
        return X === axis
            ? self.maxX
            : (Y === axis
            ? self.maxY
            : (Z === axis
            ? self.maxZ
            : -1))
        ;
    },

    getSize: function( axis ) {
        var self = this;
        return X === axis
            ? self.width
            : (Y === axis
            ? self.height
            : (Z === axis
            ? self.depth
            : -1))
        ;
    },

    update: function( )  {
        // do nothing
        return this;
    },

    preApply: function( )  {
        // do nothing
        return this;
    },

    postApply: function( )  {
        // do nothing
        return this;
    },

    updateMeshPosition: function( p ) {
        // do nothing
        return this;
    }
});

MOD3.Library3d = {
    id      : "Library3d",
    Mesh    : MeshProxy,
    Vertex  : VertexProxy
};

Factory = MOD3.Factory = MOD3.StaticClass({
    
    getLibrary: function( json ) {
        if ( json && json.library && MOD3[ json.library ] ) return MOD3[ json.library ];
        // dummy, default
        return MOD3.Library3d;
    }
    
    ,getMeshProxy: function( lib3D ) {
        if ( arguments.length ) return lib3D.Mesh ? new lib3D.Mesh( ) : null;
        return null;
    }
    
    ,getModifier: function( json ) {
        if ( json && json.modifier && MOD3[ json.modifier ] ) return new MOD3[ json.modifier ]( );
        return null;
    }
    
    /*
    ,getMesh: function( json ) {
        if ( json && json.mesh && MOD3[ json.mesh ] ) return new MOD3.MeshProxy( ).unserialize( json );
        // dummy, default
        return new MOD3.MeshProxy( );
    }
    
    ,getVertex: function( json ) {
        if ( json && json.vertex && MOD3[ json.vertex ] ) return new MOD3.VertexProxy( ).unserialize( json );
        // dummy, default
        return new MOD3.VertexProxy( );
    }*/
});

}(MOD3);