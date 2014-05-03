/**
*
* MOD3  VertexProxy Super Class
*
*
**/
!function(MOD3, undef){
    
    @@USE_STRICT@@
    
    var ModConstant = MOD3.ModConstant,
        X = ModConstant.X, Y = ModConstant.Y, Z = ModConstant.Z,
        Vector3 = MOD3.Vector3, A = MOD3.VecArray
    ;
    
    var VertexProxy = MOD3.VertexProxy = MOD3.Class({
        
        constructor: function( vertex ) {
            // use internal typed-arrays for speed
            this.xyz = new A( [0,0,0] );
            this.original = new A( [0,0,0] );
            this.ratio = new A( [0,0,0] );
            
            // vertex can be zero
            if ( 
                (undef !== vertex) && 
                (null !== vertex) && 
                (false !== vertex) 
            )  this.setVertex( vertex );
        },
        
        name: "VertexProxy",
        
        vertex: null,
        xyz: null,
        original: null,
        ratio: null,
        
        dispose: function( ) {
            this.vertex = null;
            this.xyz = null;
            this.original = null;
            this.ratio = null;
            
            return this;
        },
        
        serialize: function( ) {
            return { 
                vertex: this.name, 
                xyz: this.getXYZ( ),
                original: this.original,
                ratio: this.ratio
            };
            
        },
        
        unserialize: function( json ) {
            if ( json /*&& this.name === json.vertex*/ )
            {
                this.setXYZ( json.xyz );
                this.original = json.original;
                this.ratio = json.ratio;
            }
            return this;
        },
        
        setVertex: function( vertex )  { 
            // override
            this.vertex = vertex;
            
            return this;
        },

        getRatioVector: function( ) {
            return new Vector3( this.ratio );
        },

        getRatio: function( axis ) {
            switch( axis ) 
            {
                case X: return this.ratio[0];
                case Y: return this.ratio[1];
                case Z: return this.ratio[2];
            }
            return -1;
        },

        getOriginalValue: function( axis ) {
            switch( axis ) 
            {
                case X: return this.original[0];
                case Y: return this.original[1];
                case Z: return this.original[2];
            }
            return 0;
        },

        setRatios: function( rx, ry, rz ) {
            rx = (rx===undef) ? 0 : rx;
            ry = (ry===undef) ? 0 : ry;
            rz = (rz===undef) ? 0 : rz;
            this.ratio = new A( [rx, ry, rz] );
            
            return this;
        },

        setOriginalPosition: function( ox, oy, oz ) {
            ox = (ox===undef) ? 0 : ox;
            oy = (oy===undef) ? 0 : oy;
            oz = (oz===undef) ? 0 : oz;
            this.original = new A( [ox, oy, oz] );
            
            return this;
        },

        getXYZ: function( ) {
            // override
            return new A( this.xyz );
        },
        
        getXYZRef: function( ) {
            // override
            return this.xyz;
        },
        
        getX: function( ) {
            // override
            return this.xyz[0];
        },

        getY: function( ) {
            // override
            return this.xyz[1];
        },

        getZ: function( ) {
            // override
            return this.xyz[2];
        },

        setXYZ: function( xyz ) {
            // override
            this.xyz = new A( xyz );
            return this;
        },
        
        setXYZRef: function( xyz ) {
            // override
            this.xyz = xyz;
            return this;
        },
        
        setX: function( v ) {
            // override
            this.xyz[0] = v;
            return this;
        },

        setY: function( v ) {
            // override
            this.xyz[1] = v;
            return this;
        },

        setZ: function( v ) {
            // override
            this.xyz[2] = v;
            return this;
        },

        getValue: function( axis )  {
            // override
            switch( axis ) 
            {
                case X: return this.getX( );
                case Y: return this.getY( );
                case Z: return this.getZ( );
            }
            return 0;
        },

        setValue: function( axis, v ) {
            // override
            switch( axis ) 
            {
                case X: this.setX( v ); break;
                case Y: this.setY( v ); break;
                case Z: this.setZ( v ); break;
            }
            return this;
        },

        reset: function( ) {
            // override ??
            this.setXYZ( this.original );
            return this;
        },

        collapse: function( ) {
            // override ??
            this.original = this.getXYZ( );
            return this;
        },

        getVector: function( ) {
            // override
            return new Vector3( this.getXYZ( ) );
        },

        setVector: function( v ) {
            // override
            this.setXYZ( v.xyz );
        }
    });
    
}(MOD3);