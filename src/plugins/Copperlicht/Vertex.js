/**
*
* MOD3  Copperlicht Vertex Class
*
*
**/
(function(MOD3, undef){
    
    var ModConstant = MOD3.ModConstant,
        X = ModConstant.X, Y = ModConstant.Y, Z = ModConstant.Z,
        Vector3 = MOD3.Vector3, A = MOD3.VecArray
    ;
    
    var VertexCopperlicht = MOD3.VertexCopperlicht = MOD3.Class( MOD3.VertexProxy, {
        
        constructor: function( node, buffer, vertex ) {
            this.node = node;
            this.buffer = buffer;
            this.$super('constructor', vertex );
        },
        
        node: null,
        buffer: null,
        
        dispose: function( ) {
            this.node = null;
            this.buffer = null;
            this.$super('dispose');
            
            return this;
        },
        
        setVertex: function( vertex ) {
            var vt = vertex.Pos;
            this.vertex = vertex;
            this.original = new A( [vt.X, vt.Y, vt.Z] );
            this.xyz = new A( this.original );
            
            return this;
        },
        
        getXYZ: function( ) {
            var vt = this.vertex.Pos;
            return new A( [vt.X, vt.Y, vt.Z] );
        },
        
        getX: function( ) {
            return this.vertex.Pos.X;
        },
        
        getY: function( ) {
            return this.vertex.Pos.Y;
        },
        
        getZ: function( ) {
            return this.vertex.Pos.Z;
        },
        
        setXYZ: function( xyz ) {
            var vt = this.vertex.Pos;
            
            vt.X = xyz[0];
            vt.Y = xyz[1];
            vt.Z = xyz[2];
            //this.buffer.update(true);
            
            return this;
        },
        
        setX: function( v ) {
            var vt = this.vertex.Pos, _update = false;
            
            //if ( vt.X != v ) _update = true;
            
            vt.X = v;
            
            /*if (_update)
            {
                this.buffer.update(true);
            }*/
            
            return this;
        },
        
        setY: function( v ) {
            var vt = this.vertex.Pos, _update = false;
            
            //if ( vt.Y != v ) _update = true;
            
            vt.Y = v;
            
            /*if (_update)
            {
                this.buffer.update(true);
            }*/
            
            return this;
        },
        
        setZ: function( v ) {
            var vt = this.vertex.Pos, _update = false;
            
            //if ( vt.Z != v ) _update = true;
            
            vt.Z = v;
            
            /*if (_update)
            {
                this.buffer.update(true);
            }*/
            
            return this;
        },
        
        reset: function( ) {
            var vt = this.vertex.Pos, xyz = this.original;
            
            vt.X = xyz[0];
            vt.Y = xyz[1];
            vt.Z = xyz[2];
            //this.buffer.update(true);
            
            return this;
        },

        collapse: function( ) {
            var vt = this.vertex.Pos;
            this.original =  new A( [vt.X, vt.Y, vt.Z] );
            
            return this;
        },

        getValue: function( axis )  {
            var vt = this.vertex.Pos;
            switch( axis ) 
            {
                case X: return vt.X;
                case Y: return vt.Y;
                case Z: return vt.Z;
            }
            return 0;
        },

        setValue: function( axis, v ) {
            var vt = this.vertex.Pos, _update = false;
            switch( axis ) 
            {
                case X: vt.X = v; _update = true; break;
                case Y: vt.Y = v; _update = true; break;
                case Z: vt.Z = v; _update = true; break;
            }
            /*if ( _update )
            {
                this.buffer.update(true);
            }*/
            return this;
       },
       
       setVector: function( v ) {
            var vt = this.vertex.Pos, xyz = v.xyz;
            
            vt.X = xyz[0];
            vt.Y = xyz[1];
            vt.Z = xyz[2];
            //this.buffer.update(true);
            
            return this;
        },

        getVector: function( ) {
            var vt = this.vertex.Pos;
            return new Vector3( [vt.X, vt.Y, vt.Z] );
        }
    });
    // aliases
    VertexCopperlicht.prototype.getXYZRef = VertexCopperlicht.prototype.getXYZ;
    VertexCopperlicht.prototype.setXYZRef = VertexCopperlicht.prototype.setXYZ;
    
})(MOD3);