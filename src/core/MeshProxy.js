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
        Min = Math.min, Max = Math.max
    ;

    var MeshProxy = MOD3.MeshProxy = MOD3.Class({
        
        constructor: function( mesh ) {
            this.maxX = null;
            this.maxY = null;
            this.maxZ = null;

            this.minX = null;
            this.minY = null;
            this.minZ = null;

            this.maxAxis = null;
            this.midAxis = null;
            this.minAxis = null;

            this.width = null;
            this.height = null;
            this.depth = null;

            this.vertices = [];
            this.faces = [];
            this.mesh = null;
            if ( undef !== mesh ) this.setMesh( mesh );
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
        
        widht : null,
        height : null,
        depth : null,
        
        vertices : null,
        faces : null,
        mesh : null,

        dispose: function( ) {
            this.maxX = null;
            this.maxY = null;
            this.maxZ = null;
            this.minX = null;
            this.minY = null;
            this.minZ = null;
            
            this.maxAxis = null;
            this.midAxis = null;
            this.minAxis = null;
            
            this.widht = null;
            this.height = null;
            this.depth = null;
            
            this.disposeFaces( );
            this.disposeVertices( );
            this.mesh = null;
            
            return this;
        },
        
        disposeVertices: function( ) {
            var i, l;
            if ( this.vertices )
            {
                l = this.vertices.length;
                for (i=0; i<l; i++) this.vertices[ i ].dispose( );
            }
            this.vertices = null;
            return this;
        },
        
        disposeFaces: function( ) {
            var i, l;
            if ( this.faces )
            {
                l = this.faces.length;
                for (i=0; i<l; i++) this.faces[ i ].dispose( );
            }
            this.faces = null;
            return this;
        },
        
        serialize: function( ) {
            var serialize = function( vertex ) {
                return vertex ? vertex.serialize( ) : vertex;
            };
            return { 
                mesh: this.name, 
                vertices: this.vertices ? this.vertices.map( serialize ) : null,
                faces: null //this.faces ? this.faces.map( serialize ) : null
            };
            
        },
        
        unserialize: function( json ) {
            if ( json && this.name === json.mesh )
            {
                var unserialize = function( vertex ) {
                    if ( vertex )
                    {
                        if ( vertex.vertex ) return MOD3.VertexProxy.unserialize( vertex );
                        /*else if ( vertex.face ) return MOD3.FaceProxy.unserialize( vertex );*/
                    }
                    return vertex;
                };
                this.disposeFaces( );
                this.disposeVertices( );
                this.vertices = (json.vertices || [ ]).map( unserialize );
                this.faces = null; // (json.faces || [ ]).map( unserialize );
            }
            return this;
        },
        
        setMesh: function( mesh ) {
            this.mesh = mesh;
            this.vertices = [ ];
            // not used
            //this.faces = [];
            
            return this;
        },

        getVertices: function( ) {
            return this.vertices;
        },

        getFaces: function( ) {
            return this.faces;
        },

        analyzeGeometry: function( ) {
            // cache
            var vertices = this.vertices, vc = vertices.length, i = vc,
                v, xyz, x, y, z, 
                minX, maxX, 
                minY, maxY, 
                minZ, maxZ, 
                width, height, depth
            ;

            // get initial values
            if ( vc )
            {
                v = vertices[ 0 ];
                xyz = v.getXYZ( );
                x = xyz[ 0 ]; y = xyz[ 1 ]; z = xyz[ 2 ];
                minX = maxX = x;
                minY = maxY = y;
                minZ = maxZ = z;
            }
            // optimize loop using while counting down instead of up
            while ( --i >= 0 )
            {
                // cache
                v = vertices[ i ];
                xyz = v.getXYZ( );
                x = xyz[ 0 ]; y = xyz[ 1 ]; z = xyz[ 2 ];
                v.setOriginalPosition( x, y, z );
                
                minX = Min( minX, x );
                minY = Min( minY, y );
                minZ = Min( minZ, z );

                maxX = Max( maxX, x ); 
                maxY = Max( maxY, y ); 
                maxZ = Max( maxZ, z ); 
            }

            width = maxX - minX;
            height = maxY - minY;
            depth = maxZ - minZ;
            
            this.width = width;
            this.height = height;
            this.depth = depth;
            this.minX = minX;
            this.maxX = maxX;
            this.minY = minY;
            this.maxY = maxY;
            this.minZ = minZ;
            this.maxZ = maxZ;

            var maxe = Max( width, height, depth );
            var mine = Min( width, height, depth );

            if ( maxe == width && mine == height ) 
            {
                this.minAxis = Y;
                this.midAxis = Z;
                this.maxAxis = X;
            } 
            else if ( maxe == width && mine == depth ) 
            {
                this.minAxis = Z;
                this.midAxis = Y;
                this.maxAxis = X;
            } 
            else if ( maxe == height && mine == width ) 
            {
                this.minAxis = X;
                this.midAxis = Z;
                this.maxAxis = Y;
            } 
            else if ( maxe == height && mine == depth ) 
            {
                this.minAxis = Z;
                this.midAxis = X;
                this.maxAxis = Y;
            } 
            else if ( maxe == depth && mine == width ) 
            {
                this.minAxis = X;
                this.midAxis = Y;
                this.maxAxis = Z;
            } 
            else if ( maxe == depth && mine == height ) 
            {
                this.minAxis = Y;
                this.midAxis = X;
                this.maxAxis = Z;
            }

            i = vc;
            // optimize loop using while counting down instead of up
            while ( --i >= 0 )
            {
                v = vertices[ i ];
                xyz = v.getXYZ( );
                v.setRatios((xyz[ 0 ] - minX) / width, (xyz[ 1 ] - minY) / height, (xyz[ 2 ] - minZ) / depth);
            }
            
            return this;
        },

        resetGeometry: function( ) {
            var vertices = this.vertices, vc = vertices.length;
            
            // optimize loop using while counting down instead of up
            while ( --vc >= 0 ) vertices[ vc ].reset( );
            this.update( );
            
            return this;
        },

        collapseGeometry: function( ) {
            var vertices = this.vertices, vc = vertices.length;
            
            // optimize loop using while counting down instead of up
            while ( --vc >= 0 ) vertices[ vc ].collapse( );
            this.update( );
            
            this.analyzeGeometry( );
            
            return this;
        },

        getMin: function( axis ) {
            switch( axis ) 
            {
                case X: return this.minX;
                case Y: return this.minY;
                case Z: return this.minZ;
            }
            return -1;
        },

        getMax: function( axis ) {
            switch( axis ) 
            {
                case X: return this.maxX;
                case Y: return this.maxY;
                case Z: return this.maxZ;
            }
            return -1;
        },

        getSize: function( axis ) {
            switch( axis ) 
            {
                case X: return this.width;
                case Y: return this.height;
                case Z: return this.depth;
            }
            return -1;
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
    MeshProxy.unserialize - function( json ) {
        if ( json && json.mesh && MOD3[ json.mesh ] )
        {
            return new MOD3[ json.mesh ]( ).unserialize( json );
        }
        // dummy, default
        return new MeshProxy( );
    };

    
}(MOD3);