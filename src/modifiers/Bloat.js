/**
*
* MOD3  Bloat Modifier
*
*
**/

/**[DOC_MD]
 * ###Bloat modifier 
 *
 * Bloats a mesh by forcing vertices out of specified sphere
 *
 * @author makc
 *  
[/DOC_MD]**/

(function(MOD3, undef){
    
    var Vector3=MOD3.Vector3, 
        Max=Math.max, Exp=Math.exp
    ;
    
    var Bloat = MOD3.Bloat = Class ( MOD3.Modifier,
    {
        constructor : function() {
            this.radius = 0;
            this.a = 0.01;
            this.center = Vector3.ZERO();
            //this.u = Vector3.ZERO();
        },
        
        center : null,
        radius : 0,
        a : 0.01,
        //u : null,
        
        setRadius : function(v)  {
            this.radius = Max (0, v); 
            
            return this;
        },
        
        setA : function(v)  {
            this.a = Max (0, v); 
            
            return this;
        },
        
        apply : function()  {
            var vs = this.mod.getVertices(), vc = vs.length, 
                center = this.center, radius = this.radius, a = this.a;
            var v, magn, uu; //=Vector3.ZERO();

            // optimize loop using while counting down instead of up
            while (--vc >= 0)
            //for (var i=0;i<vc;i++) 
            {
                v=vs[vc];
                
                // get a vector towards vertex
                uu = v.getVector().subtractSelf(center);
                
                // change norm to norm + r * exp (-a * norm)
                magn = uu.getMagnitude();
                uu.setMagnitude(magn + radius * Exp ( - magn * a));

                // move vertex accordingly
                v.setVector( uu.addSelf(center) );
                
                // ?? needed??
                //this.u=uu;
            }
            
            return this;
        }
    });
    
})(MOD3);
