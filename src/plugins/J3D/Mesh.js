/**
*
* MOD3  Three.js Mesh Class
*
*
**/
(function(MOD3, undef){
    
    var VertexJ3D=MOD3.VertexJ3D,
        FaceProxy=MOD3.FaceProxy, A=MOD3.VecArray
    ;
    
    var MeshJ3D = MOD3.MeshJ3D = Class( MOD3.MeshProxy,
    {
        constructor : function(mesh) { 
            this.VERTEX_POSITION = J3D.Mesh.VERTEX_POSITION;
            this.$super('constructor', mesh );
        },
        
        VERTEX_POSITION : null,
        
        setMesh : function(transformObject) {
            this.$super('setMesh', transformObject );
            
            var i =0, 
                geometry = transformObject.geometry,
                vbo = geometry.arraysByName[this.VERTEX_POSITION],
                vs = vbo.data, vc = vs.length,
                ii = vbo.itemSize,
                vertices = this.vertices,
                nv;
            
            // optimize loop using while
            i=0;
            while (i < vc)
            {
                nv = new VertexJ3D(geometry, i);
                vertices.push(nv);
                i+=ii;
            }
            
            this.faces = null;
            
            return this;
        },
        
        // use a batch update, instead of update vertex by vertex (faster??)
        update : function()  {
            var geometry = this.mesh.geometry,
                vbo = geometry.arraysByName[this.VERTEX_POSITION],
                data = vbo.data;
            
            geometry.replaceArray(vbo, data);
            
            return this;
        },

        updateMeshPosition : function(p) {
            var position = this.mesh.position, xyz = p.xyz;
            position.x += xyz[0];
            position.y += xyz[1];
            position.z += xyz[2];
            
            return this;
        }
    });
    
})(MOD3);