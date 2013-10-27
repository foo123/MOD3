/**
*
* MOD3  Pivot Modifier
*
*
**/
(function(MOD3, undef){
    
    var Vector3=MOD3.Vector3
    ;
    
    var Pivot = MOD3.Pivot = MOD3.Extends ( MOD3.Modifier,
    {
        constructor : function(x, y, z) {
            this.pivot = new Vector3([x, y, z]);
        },
        
        pivot : null,
        
        setMeshCenter : function() {
            // cache
            var mod = this.mod;
            
            this.pivot = new Vector3(
                -(mod.minX + 0.5*mod.width), 
                -(mod.minY + 0.5*mod.height), 
                -(mod.minZ + 0.5*mod.depth)
            );
            
            return this;
        },
        
        apply : function() {
            var vs = this.mod.getVertices(), vc=vs.length, 
                pivot = this.pivot, 
                v, vv;

            // optimize loop using while counting down instead of up
            while (--vc >= 0)
            //for (var i = 0; i < vc; i++) 
            {
                v = vs[vc];
                v.setVector( v.getVector().addSelf( pivot ) );
            }

            this.mod.updateMeshPosition( pivot.negate() );
            
            return this;
        }
    });
    
})(MOD3);