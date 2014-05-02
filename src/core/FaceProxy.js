/**
*
* MOD3  FaceProxy Super Class
*
*
**/
!function(MOD3, undef){
    
    @@USE_STRICT@@
    
    var FaceProxy = MOD3.FaceProxy = MOD3.Class( Object, {
        
        constructor: function( ) {
            this.vertices = [ ];
        },
        
        name: "FaceProxy",
        
        vertices: null,

        dispose: function( ) {
            this.vertices = null;
            
            return this;
        },
        
        serialize: function( ) {
            return { 
                face: this.name, 
                vertices: null
            };
            
        },
        
        unserialize: function( json ) {
            if ( json && this.name === json.face )
            {
                this.vertices = json.vertices || null;
            }
            return this;
        },
        
        addVertex: function( v )  {
            this.vertices.push( v );
        },

        getVertices: function( ) {
            return this.vertices;
        }
    });
    FaceProxy.unserialize - function( json ) {
        if ( json && json.face && MOD3[ json.face ] )
        {
            return new MOD3[ json.face ]( ).unserialize( json );
        }
        // dummy, default
        return new FaceProxy( );
    };
    
}(MOD3);