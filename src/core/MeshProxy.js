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
    Min = Math.min, Max = Math.max,
    each = MOD3.List.each,
    dispose = function( o ) { o.dispose( ); },
    reset = function( o ) { o.reset( ); },
    collapse = function( o ) { o.collapse( ); }
;

var MeshProxy = MOD3.MeshProxy = MOD3.Class({
    
    constructor: function( mesh ) {
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
        
        self.vertices = [];
        self.faces = [];
        self.mesh = null;
        if ( null != mesh ) self.setMesh( mesh );
    },
    
    name : "MeshProxy",
    
    maxX : null,
    maxY : null,
    maxZ : null,
    minX : null,
    minY : null,
    minZ : null,
    
    maxAxis : null,
    midAxis : null,
    minAxis : null,
    
    width : null,
    height : null,
    depth : null,
    
    vertices : null,
    faces : null,
    mesh : null,

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
    
    setMesh: function( mesh ) {
        var self = this;
        self.mesh = mesh;
        self.vertices = [ ];
        // not used
        //self.faces = [];
        
        return self;
    },

    getVertices: function( ) {
        return this.vertices;
    },

    getFaces: function( ) {
        return this.faces;
    },

    analyzeGeometry: function( ) {
        var self = this,
            vertices = self.vertices, 
            minX = Infinity,
            minY = Infinity,
            minZ = Infinity,
            maxX = -Infinity,
            maxY = -Infinity,
            maxZ = -Infinity,
            width = 0, height = 0, depth = 0,
            maxe, mine
        ;

        each(vertices, function( v ){
            var xyz = v.getXYZ( ),
                x = xyz[ 0 ], y = xyz[ 1 ], z = xyz[ 2 ]
            ;
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
            v.setRatios((xyz[ 0 ] - minX) / width, (xyz[ 1 ] - minY) / height, (xyz[ 2 ] - minZ) / depth);
        });
        
        return self;
    },

    resetGeometry: function( ) {
        var self = this;
        
        each( self.vertices, reset );
        self.update( );
        
        return self;
    },

    collapseGeometry: function( ) {
        var self = this;
        
        each( self.vertices, collapse );
        self.update( ).analyzeGeometry( );
        
        return self;
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

    postApply: function( )  {
        // do nothing
        return this;
    },

    updateMeshPosition: function( p ) {
        // do nothing
        return this;
    }
});

}(MOD3);