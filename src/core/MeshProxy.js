/**
*
* MOD3  MeshProxy Super Class
*
*
**/
(function(MOD3, undef){
    
    var ModConstant=MOD3.ModConstant,
        X=ModConstant.X, Y=ModConstant.Y, Z=ModConstant.Z,
        Min=Math.min, Max=Math.max
    ;

    var MeshProxy = MOD3.MeshProxy = Class( Object, 
    {
        constructor : function(mesh) {
            this.maxX = null;
            this.maxY = null;
            this.maxZ = null;

            this.minX = null;
            this.minY = null;
            this.minZ = null;

            this.maxAxis = null;
            this.midAxis = null;
            this.minAxis = null;

            this.width = null;
            this.height = null;
            this.depth = null;

            this.vertices = [];
            this.faces = [];
            this.mesh = null;
            if ( mesh ) this.setMesh(mesh);
        },
        
        maxX : null,
        maxY : null,
        maxZ : null,
        minX : null,
        minY : null,
        minZ : null,
        
        maxAxis : null,
        midAxis : null,
        minAxis : null,
        
        widht : null,
        height : null,
        depth : null,
        
        vertices : null,
        faces : null,
        mesh : null,

        setMesh : function(mesh) {
            this.mesh = mesh;
            this.vertices = [];
            // not used
            //this.faces = [];
            
            return this;
        },

        getVertices : function() {
            return this.vertices;
        },

        getFaces : function() {
            return this.faces;
        },

        analyzeGeometry : function() {
            // cache
            var vertices=this.vertices, vc = vertices.length, i=vc,
            v, xyz, x, y, z, minX, maxX, minY, maxY, minZ, maxZ, width, height
            ;

            // get initial values
            if (vc)
            {
                v = vertices[0];
                xyz = v.getXYZ();
                x = xyz[0]; y = xyz[1]; z = xyz[2];
                minX = maxX = x;
                minY = maxY = y;
                minZ = maxZ = z;
            }
            // optimize loop using while counting down instead of up
            while (--i >= 0)
            //for (i = 0; i < vc; i++) 
            {
                // cache
                v = vertices[i];
                xyz = v.getXYZ();
                x = xyz[0]; y = xyz[1]; z = xyz[2];
                v.setOriginalPosition(x, y, z);
                
                minX = Min(minX, x);
                minY = Min(minY, y);
                minZ = Min(minZ, z);

                maxX = Max(maxX, x); 
                maxY = Max(maxY, y); 
                maxZ = Max(maxZ, z); 
            }

            width = maxX - minX;
            height = maxY - minY;
            depth = maxZ - minZ;
            
            this.width = width;
            this.height = height;
            this.depth = depth;
            this.minX = minX;
            this.maxX = maxX;
            this.minY = minY;
            this.maxY = maxY;
            this.minZ = minZ;
            this.maxZ = maxZ;

            var maxe = Max(width, height, depth);
            var mine = Min(width, height, depth);

            if (maxe == width && mine == height) 
            {
                this.minAxis = Y;
                this.midAxis = Z;
                this.maxAxis = X;
            } 
            else if (maxe == width && mine == depth) 
            {
                this.minAxis = Z;
                this.midAxis = Y;
                this.maxAxis = X;
            } 
            else if (maxe == height && mine == width) 
            {
                this.minAxis = X;
                this.midAxis = Z;
                this.maxAxis = Y;
            } 
            else if (maxe == height && mine == depth) 
            {
                this.minAxis = Z;
                this.midAxis = X;
                this.maxAxis = Y;
            } 
            else if (maxe == depth && mine == width) 
            {
                this.minAxis = X;
                this.midAxis = Y;
                this.maxAxis = Z;
            } 
            else if (maxe == depth && mine == height) 
            {
                this.minAxis = Y;
                this.midAxis = X;
                this.maxAxis = Z;
            }

            i = vc;
            // optimize loop using while counting down instead of up
            while (--i >= 0)
            //for (i = 0; i < vc; i++) 
            {
                v = vertices[i];
                xyz = v.getXYZ();
                v.setRatios((xyz[0] - minX) / width, (xyz[1] - minY) / height, (xyz[2] - minZ) / depth);
            }
            
            return this;
        },

        resetGeometry : function() {
            var vertices=this.vertices, vc = vertices.length;
            
            // optimize loop using while counting down instead of up
            while (--vc >= 0)
            //for (var i = 0; i < vc; i++) 
            {
                vertices[vc].reset();
            }
            this.update();
            
            return this;
        },

        collapseGeometry : function() {
            var vertices=this.vertices, vc = vertices.length;
            
            // optimize loop using while counting down instead of up
            while (--vc >= 0)
            //for (var i = 0; i < vc; i++) 
            {
                vertices[vc].collapse();
            }
            this.update();
            
            this.analyzeGeometry();
            
            return this;
        },

        getMin : function(axis) {
            switch(axis) 
            {
                case X: return this.minX;
                case Y: return this.minY;
                case Z: return this.minZ;
            }
            return -1;
        },

        getMax : function(axis) {
            switch(axis) 
            {
                case X: return this.maxX;
                case Y: return this.maxY;
                case Z: return this.maxZ;
            }
            return -1;
        },

        getSize : function(axis) {
            switch(axis) 
            {
                case X: return this.width;
                case Y: return this.height;
                case Z: return this.depth;
            }
            return -1;
        },

        update : function()  {
            // do nothing
            return this;
        },

        postApply : function()  {
            // do nothing
            return this;
        },

        updateMeshPosition : function(p) {
            // do nothing
            return this;
        }
    });
    
})(MOD3);