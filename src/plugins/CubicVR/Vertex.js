/**
*
* MOD3  CubicVR.js Vertex Class
*
*
**/
(function(MOD3, undef){
    
    var ModConstant=MOD3.ModConstant,
        X=ModConstant.X, Y=ModConstant.Y, Z=ModConstant.Z,
        Vector3=MOD3.Vector3, A=MOD3.VecArray
    ;
    
    var VertexCubicVR = MOD3.VertexCubicVR = Class( MOD3.VertexProxy,
    {
        constructor : function(sceneObject, vertex) {
            this.sceneObject = sceneObject;
            this.$super('constructor', vertex );
        },
        
        sceneObject : null,
        
        dispose : function() {
            this.sceneObject = null;
            this.$super('dispose');
            
            return this;
        },
        
        setVertex : function(vertex) {
            this.vertex = vertex;
            this.original = new A( vertex );
            this.xyz = new A( vertex );
            
            return this;
        },
        
        getXYZ : function(){
            return new A( this.vertex );
        },
        
        getX : function(){
            return this.vertex[0];
        },
        
        getY : function(){
            return this.vertex[1];
        },
        
        getZ : function(){  
            return this.vertex[2];
        },
        
        setXYZ : function(xyz) {
            var vt = this.vertex;
            
            vt[0] = xyz[0];
            vt[1] = xyz[1];
            vt[2] = xyz[2];
            //this.sceneObject.dirty=true;
            
            return this;
        },
        
        setX : function(v) {
            var vt = this.vertex, _update = false;
            
            //if ( v != vt[0] ) _update = true;
            
            vt[0] = v;
            
            /*if (_update)
            {
                this.sceneObject.dirty=true;
            }*/
            
            return this;
        },
        
        setY : function(v) {
            var vt = this.vertex, _update = false;
            
            //if ( v != vt[1] ) _update = true;
            
            vt[1] = v;
            
            /*if (_update)
            {
                this.sceneObject.dirty=true;
            }*/
            
            return this;
        },
        
        setZ : function(v) {
            var vt = this.vertex, _update = false;
            
            //if ( v != vt[2] ) _update = true;
            
            vt[2] = v;
            
            /*if (_update)
            {
                this.sceneObject.dirty=true;
            }*/
            
            return this;
        },
        
        reset : function() {
            var vt = this.vertex, xyz = this.original;
            
            vt[0] = xyz[0];
            vt[1] = xyz[1];
            vt[2] = xyz[2];
            //this.sceneObject.dirty=true;
                
            return this;
        },

        collapse : function() {
            this.original = new A( this.vertex );
            
            return this;
        },

        getValue : function(axis)  {
            var vt=this.vertex;
            switch(axis) 
            {
                case X: return vt[0];
                case Y: return vt[1];
                case Z: return vt[2];
            }
            return 0;
        },

        setValue : function(axis, v) {
            var vt = this.vertex, _update = false;
            switch(axis) 
            {
                case X: vt[0] = v; _update = true; break;
                case Y: vt[1] = v; _update = true; break;
                case Z: vt[2] = v; _update = true; break;
            }
            /*if ( _update )
            {
                this.sceneObject.dirty = true;
            }*/
            return this;
       },
       
        setVector : function(v) {
            var vt=this.vertex, xyz=v.xyz;
            
            vt[0] = xyz[0];
            vt[1] = xyz[1];
            vt[2] = xyz[2];
            //this.sceneObject.dirty=true;
            
            return this;
        },

        getVector : function() {
            return new Vector3( this.vertex );
        }
    });
    // aliases
    VertexCubicVR.prototype.getXYZRef = VertexCubicVR.prototype.getXYZ;
    VertexCubicVR.prototype.setXYZRef = VertexCubicVR.prototype.setXYZ;
    
})(MOD3);