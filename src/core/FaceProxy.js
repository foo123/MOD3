/**
*
* MOD3  FaceProxy Super Class
*
*
**/
!function(MOD3, undef){
@@USE_STRICT@@

var FaceProxy = MOD3.FaceProxy = MOD3.Class({
    
    constructor: function( ) {
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

}(MOD3);