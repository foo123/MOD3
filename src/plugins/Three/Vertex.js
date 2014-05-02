/**
*
* MOD3  Three.js Vertex Class
*
*
**/
!function(MOD3, undef){
    
    @@USE_STRICT@@
    
    var ModConstant = MOD3.ModConstant,
        X = ModConstant.X, Y = ModConstant.Y, Z = ModConstant.Z,
        Vector3 = MOD3.Vector3, A = MOD3.VecArray
    ;
    
    var VertexThree = MOD3.VertexThree = MOD3.Class( MOD3.VertexProxy, {
        
        constructor: function( mesh, vertex ) {
            this.mesh = mesh;
            this.$super('constructor', vertex );
            this.name = "VertexThree";
        },
        
        mesh: null,
        
        dispose: function( ) {
            this.mesh = null;
            this.$super('dispose');
            
            return this;
        },
        
        setVertex: function( vt ) {
            /* Three js uses vector3 now instead of vertex */
            this.vertex = vt;
            this.original = new A( [vt.x, vt.y, vt.z] );
            this.xyz = new A( this.original );
            
            return this;
        },
        
        getXYZ: function( ) {
            var vt = this.vertex;
            return new A( [vt.x, vt.y, vt.z] );
        },
        
        getX: function( ) {
            return this.vertex.x;
        },
        
        getY: function( ) { 
            return this.vertex.y;
        },
        
        getZ: function( ) {
            return this.vertex.z;
        },
        
        setXYZ: function( xyz ) {
            var vt = this.vertex,
                geometry = this.mesh.geometry;
            
            vt.x = xyz[0];
            vt.y = xyz[1];
            vt.z = xyz[2];
            
            // update here one-by-one
            // seems better ??
            /*geometry.verticesNeedUpdate = true;
            geometry.normalsNeedUpdate = true;
            geometry.buffersNeedUpdate = true;
            geometry.dynamic = true;*/
            
            return this;
        },
        
        setX: function( v ) {
            var vt = this.vertex, _update = false;
            
            //if ( v != vt.x ) _update = true;
            
            vt.x = v;
            
            /*if (_update)
            {
                var geometry = this.mesh.geometry;
                geometry.verticesNeedUpdate = true;
                geometry.normalsNeedUpdate = true;
                geometry.buffersNeedUpdate = true;
                geometry.dynamic = true;
            }*/
            
            return this;
        },
        
        setY: function( v ) {
            var vt = this.vertex, _update = false;
            
            //if ( v != vt.y ) _update = true;
            
            vt.y = v;
            
            /*if (_update)
            {
                var geometry = this.mesh.geometry;
                geometry.verticesNeedUpdate = true;
                geometry.normalsNeedUpdate = true;
                geometry.buffersNeedUpdate = true;
                geometry.dynamic = true;
            }*/
            
            return this;
        },
        
        setZ: function( v ) {
            var vt = this.vertex, _update = false;
            
            //if ( v != vt.z ) _update = true;
            
            vt.z = v;
            
            /*if (_update)
            {
                var geometry = this.mesh.geometry;
                geometry.verticesNeedUpdate = true;
                geometry.normalsNeedUpdate = true;
                geometry.buffersNeedUpdate = true;
                geometry.dynamic = true;
            }*/
            
            return this;
        },
        
        reset: function( ) {
            var vt = this.vertex,
                geometry = this.mesh.geometry,
                xyz = this.original;
            
            vt.x = xyz[0];
            vt.y = xyz[1];
            vt.z = xyz[2];
            
            /*geometry.verticesNeedUpdate = true;
            geometry.normalsNeedUpdate = true;
            geometry.buffersNeedUpdate = true;
            geometry.dynamic = true;*/
            
            return this;
        },

        collapse: function( ) {
            var vt = this.vertex;
            this.original = new A( [vt.x, vt.y, vt.z] );
            
            return this;
        },

        getValue: function( axis )  {
            var vt = this.vertex;
            switch( axis ) 
            {
                case X: return vt.x;
                case Y: return vt.y;
                case Z: return vt.z;
            }
            return 0;
        },

        setValue: function( axis, v ) {
            var vt = this.vertex, _update = false;
            
            switch( axis ) 
            {
                case X: vt.x = v; _update = true; break;
                case Y: vt.y = v; _update = true; break;
                case Z: vt.z = v; _update = true; break;
            }
            /*if ( _update )
            {
                var geometry = this.mesh.geometry;
                geometry.verticesNeedUpdate = true;
                geometry.normalsNeedUpdate = true;
                geometry.buffersNeedUpdate = true;
                geometry.dynamic = true;
            }*/
            
            return this;
       },
       
        setVector: function( v ) {
            var vt = this.vertex, xyz = v.xyz,
                geometry = this.mesh.geometry;
            
            vt.x = xyz[0];
            vt.y = xyz[1];
            vt.z = xyz[2];
            
            /*geometry.verticesNeedUpdate = true;
            geometry.normalsNeedUpdate = true;
            geometry.buffersNeedUpdate = true;
            geometry.dynamic = true;*/
            
            return this;
        },

        getVector: function( ) {
            var vt = this.vertex;
            return new Vector3( [vt.x, vt.y, vt.z] );
        }
    });
    // aliases
    VertexThree.prototype.getXYZRef = VertexThree.prototype.getXYZ;
    VertexThree.prototype.setXYZRef = VertexThree.prototype.setXYZ;
    
}(MOD3);