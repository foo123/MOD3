/**
*
* MOD3  FaceProxy Super Class
*
*
**/
(function(MOD3, undef){
    
    var FaceProxy = MOD3.FaceProxy = Class( Object,
    {
        constructor : function() {
            this.vertices=[];
        },
        
        vertices : null,

        addVertex : function(v)  {
            this.vertices.push(v);
        },

        getVertices : function() {
            return this.vertices;
        }
    });
    
})(MOD3);