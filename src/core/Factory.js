/**
*
* MOD3  Factory Class
*
*
**/
!function(MOD3, undef){
    
    @@USE_STRICT@@
    
    var Library3d = MOD3.Library3d = MOD3.Class({
        
        constructor: function( ) {
            this.id = 'Library3d';
            this.meshClass = MOD3.MeshProxy;
            this.vertexClass = MOD3.VertexProxy;
        },
        
        id: 'Library3d',
        meshClass: null,
        vertexClass: null
    });
    
    var Factory = MOD3.Factory = MOD3.StaticClass({
        
        getMeshProxy: function( lib3d ) {
            if ( arguments.length )
            {
                var MeshProxyClass = lib3d.meshClass;
                return MeshProxyClass ? new MeshProxyClass( ) : null;
            }
            return null;
        }
        
        ,getModifier: function( json ) {
            if ( json && json.modifier && MOD3[ json.modifier ] )
            {
                return new MOD3[ json.modifier ]( );
            }
            return null;
        }
        
        ,getLibrary: function( json ) {
            if ( json && json.library && MOD3[ json.library ] )
            {
                return new MOD3[ json.library ]( );
            }
            // dummy, default
            return new MOD3.Library3d( );
        }
        
        ,getMesh: function( json ) {
            if ( json && json.mesh && MOD3[ json.mesh ] )
            {
                return new MOD3.MeshProxy( ).unserialize( json );
            }
            // dummy, default
            return new MOD3.MeshProxy( );
        }
        
        ,getVertex: function( json ) {
            if ( json && json.vertex && MOD3[ json.vertex ] )
            {
                return new MOD3.VertexProxy( ).unserialize( json );
            }
            // dummy, default
            return new MOD3.VertexProxy( );
        }
    });
    
}(MOD3);