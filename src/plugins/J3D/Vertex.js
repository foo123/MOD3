/**
*
* MOD3  J3D Vertex Class
*
*
**/
!function(MOD3, undef){
    
    @@USE_STRICT@@
    
    var ModConstant = MOD3.ModConstant,
        X = ModConstant.X, Y = ModConstant.Y, Z = ModConstant.Z,
        Vector3 = MOD3.Vector3, A = MOD3.VecArray
    ;
    
    var VertexJ3D = MOD3.VertexJ3D = MOD3.Class( MOD3.VertexProxy, {
        
        constructor: function( geometry, vertex ) {
            this.geometry = geometry;
            this.VERTEX_POSITION = J3D.Mesh.VERTEX_POSITION;
            this.$super('constructor', vertex );
            this.name = "VertexJ3D";
        },
        
        geometry: null,
        VERTEX_POSITION: null,
        
        dispose: function( ) {
            this.VERTEX_POSITION = null;
            this.geometry = null;
            this.$super('dispose');
            
            return this;
        },
        
        setVertex: function( vertex )  {
            var geometry = this.geometry,
                vbo = geometry.arraysByName[this.VERTEX_POSITION],
                data = vbo.data
            ;
            this.vertex = vertex;
            this.original = new A( [data[vertex], data[vertex+1], data[vertex+2]] );
            this.xyz = new A( this.original );
            
            return this;
        },
        
        getXYZ: function( ) {
            var vt = this.vertex, 
                geometry = this.geometry,
                vbo = geometry.arraysByName[this.VERTEX_POSITION],
                data = vbo.data
            ;
            return new A( [data[vt], data[vt+1], data[vt+2]] );
        },
        
        getX: function( ) {
            var vt = this.vertex, 
                geometry = this.geometry,
                vbo = geometry.arraysByName[this.VERTEX_POSITION],
                data = vbo.data
            ;
            return data[vt];
        },
        
        getY: function( ) {
            var vt = this.vertex, 
                geometry = this.geometry,
                vbo = geometry.arraysByName[this.VERTEX_POSITION],
                data = vbo.data
            ;
            return data[vt+1];
        },
        
        getZ: function( ) {
            var vt = this.vertex, 
                geometry = this.geometry,
                vbo = geometry.arraysByName[this.VERTEX_POSITION],
                data = vbo.data
            ;
            return data[vt+2];
        },
        
        setXYZ: function( xyz ) {
            var vt = this.vertex, 
                geometry = this.geometry,
                vbo = geometry.arraysByName[this.VERTEX_POSITION],
                data = vbo.data
            ;
            
            data[vt] = xyz[0];
            data[vt+1] = xyz[1];
            data[vt+2] = xyz[2];
            //geometry.replaceArray(vbo, data);            
            
            return this;
        },
        
        setX: function( v ) {
            var vt = this.vertex, 
                geometry = this.geometry,
                vbo = geometry.arraysByName[this.VERTEX_POSITION],
                data = vbo.data,
                _update = false
            ;
            
            //if ( data[vt] != v ) _update = true;
            
            data[vt] = v;
            
            /*if (_update)
            {
                geometry.replaceArray(vbo, data);
            }*/
            
            return this;
        },
        
        setY: function( v ) {
            var vt = this.vertex, 
                geometry = this.geometry,
                vbo = geometry.arraysByName[this.VERTEX_POSITION],
                data = vbo.data,
                _update = false
            ;
            
            //if ( data[vt+1] != v ) _update = true;
            
            data[vt+1] = v;
            
            /*if (_update)
            {
                geometry.replaceArray(vbo, data);
            }*/
            
            return this;
        },
        
        setZ: function( v ) {
            var vt = this.vertex, 
                geometry = this.geometry,
                vbo = geometry.arraysByName[this.VERTEX_POSITION],
                data = vbo.data,
                _update = false
            ;
            
            //if ( data[vt+2] != v ) _update = true;
            
            data[vt+2] = v;
            
            /*if (_update)
            {
                geometry.replaceArray(vbo, data);
            }*/
            
            return this;
        },
        
        reset: function( ) {
            var vt = this.vertex, 
                geometry = this.geometry, 
                vbo = geometry.arraysByName[this.VERTEX_POSITION],
                data = vbo.data,
                xyz = this.original
            ;
            
            data[vt] = xyz[0];
            data[vt+1] = xyz[1];
            data[vt+2] = xyz[2];
            //geometry.replaceArray(vbo, data);
            
            return this;
        },

        collapse: function( ) {
            var vt = this.vertex, 
                geometry = this.geometry, 
                vbo = geometry.arraysByName[this.VERTEX_POSITION],
                data = vbo.data
            ;
            this.original =  new A( [data[vt], data[vt+1], data[vt+2]] );
            return this;
        },

        getValue: function( axis )  {
            var vt = this.vertex, 
                geometry = this.geometry, 
                vbo = geometry.arraysByName[this.VERTEX_POSITION],
                data = vbo.data
            ;
            switch( axis ) 
            {
                case X: return data[vt];
                case Y: return data[vt+1];
                case Z: return data[vt+2];
            }
            return 0;
        },

        setValue: function( axis, v ) {
            var vt = this.vertex, 
                geometry = this.geometry, 
                vbo = geometry.arraysByName[this.VERTEX_POSITION],
                data = vbo.data,
                _update = false
            ;
            switch(axis) 
            {
                case X: data[vt] = v; _update = true; break;
                case Y: data[vt+1] = v; _update = true; break;
                case Z: data[vt+2] = v; _update = true; break;
            }
            /*if ( _update )
            {
                geometry.replaceArray(vbo, data);
            }*/
            return this;
       },
       
       setVector: function( v ) {
            var vt = this.vertex, 
                geometry = this.geometry, 
                vbo = geometry.arraysByName[this.VERTEX_POSITION],
                data = vbo.data,
                xyz = v.xyz
            ;
            data[vt] = xyz[0];
            data[vt+1] = xyz[1];
            data[vt+2] = xyz[2];
            //geometry.replaceArray(vbo, data);
            
            return this;
        },

        getVector: function( ) {
            var vt = this.vertex, 
                geometry = this.geometry, 
                vbo = geometry.arraysByName[this.VERTEX_POSITION],
                data = vbo.data
            ;
            return new Vector3( [data[vt], data[vt+1], data[vt+2]] );
        }
    });
    // aliases
    VertexJ3D.prototype.getXYZRef = VertexJ3D.prototype.getXYZ;
    VertexJ3D.prototype.setXYZRef = VertexJ3D.prototype.setXYZ;
    
}(MOD3);