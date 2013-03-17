// Mesh Proxy Class -------------------------------------------------------------------------------------------------------------------
(function(MOD3){
    MOD3.MeshProxy=function()
    {
        this.maxX=null;
        this.maxY=null;
        this.maxZ=null;
        
        this.minX=null;
        this.minY=null;
        this.minZ=null;
        
        this.maxAxis=null;
        this.midAxis=null;
        this.minAxis=null;
        
        this.width=null;
        this.height=null;
        this.depth=null;
        
        this.vertices = [];
        this.faces = [];
        
        this.mesh=null;
    };
    MOD3.MeshProxy.prototype.getVertices=function()
    {
        return this.vertices;
    };
    MOD3.MeshProxy.prototype.getFaces=function()
    {
        return this.faces;
    };
    MOD3.MeshProxy.prototype.analyzeGeometry=function()
    {
        // cache
        var vertices=this.getVertices(), vc = vertices.length, i=vc;
        var v, x, y, z, minX, maxX, minY, maxY, minZ, maxZ, width, height, firstPass=true;
        var Mathmin=Math.min, Mathmax=Math.max;
        
        // optimize loop using while counting down instead of up
        while (--i >= 0)
        //for (i = 0; i < vc; i++) 
        {
            // cache
            v = vertices[i];
            x = v.getX();
            y = v.getY();
            z = v.getZ();
            if (firstPass) 
            {
                minX = maxX = x;
                minY = maxY = y;
                minZ = maxZ = z;
                firstPass=false;
            } 
            else  
            {
                minX = Mathmin(minX, x);
                minY = Mathmin(minY, y);
                minZ = Mathmin(minZ, z);
                
                maxX = Mathmax(maxX, x); 
                maxY = Mathmax(maxY, y); 
                maxZ = Mathmax(maxZ, z); 
            }
            
            v.setOriginalPosition(x, y, z);
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
        
        var maxe = Mathmax(width, Mathmax(height, depth));
        var mine = Mathmin(width, Mathmin(height, depth));
        
        if (maxe == width && mine == height) 
        {
            this.minAxis = MOD3.ModConstant.Y;
            this.midAxis = MOD3.ModConstant.Z;
            this.maxAxis = MOD3.ModConstant.X;
        } 
        else if (maxe == width && mine == depth) 
        {
            this.minAxis = MOD3.ModConstant.Z;
            this.midAxis = MOD3.ModConstant.Y;
            this.maxAxis = MOD3.ModConstant.X;
        } 
        else if (maxe == height && mine == width) 
        {
            this.minAxis = MOD3.ModConstant.X;
            this.midAxis = MOD3.ModConstant.Z;
            this.maxAxis = MOD3.ModConstant.Y;
        } 
        else if (maxe == height && mine == depth) 
        {
            this.minAxis = MOD3.ModConstant.Z;
            this.midAxis = MOD3.ModConstant.X;
            this.maxAxis = MOD3.ModConstant.Y;
        } 
        else if (maxe == depth && mine == width) 
        {
            this.minAxis = MOD3.ModConstant.X;
            this.midAxis = MOD3.ModConstant.Y;
            this.maxAxis = MOD3.ModConstant.Z;
        } 
        else if (maxe == depth && mine == height) 
        {
            this.minAxis = MOD3.ModConstant.Y;
            this.midAxis = MOD3.ModConstant.X;
            this.maxAxis = MOD3.ModConstant.Z;
        }
        
        i=vc;
        // optimize loop using while counting down instead of up
        while (--i >= 0)
        //for (i = 0; i < vc; i++) 
        {
            v = vertices[i];
            v.setRatios((v.getX() - minX) / width, (v.getY() - minY) / height, (v.getZ() - minZ) / depth);
        }
    };
    MOD3.MeshProxy.prototype.resetGeometry=function()
    {
        var vertices=this.getVertices(), vc = vertices.length;
        // optimize loop using while counting down instead of up
        while (--vc >= 0)
        //for (var i = 0; i < vc; i++) 
        {
            vertices[vc].reset();
        }
    };
    MOD3.MeshProxy.prototype.collapseGeometry=function()
    {
        var vertices=this.getVertices(), vc = vertices.length;
        // optimize loop using while counting down instead of up
        while (--vc >= 0)
        //for (var i = 0; i < vc; i++) 
        {
            vertices[vc].collapse();
        }
        this.analyzeGeometry();
    };
    MOD3.MeshProxy.prototype.getMin=function(axis)
    {
        switch(axis) {
            case MOD3.ModConstant.X: return this.minX;
            case MOD3.ModConstant.Y: return this.minY;
            case MOD3.ModConstant.Z: return this.minZ;
        }
        return -1;
    };
    MOD3.MeshProxy.prototype.getMax=function(axis)
    {
        switch(axis) {
            case MOD3.ModConstant.X: return this.maxX;
            case MOD3.ModConstant.Y: return this.maxY;
            case MOD3.ModConstant.Z: return this.maxZ;
        }
        return -1;
    };
    MOD3.MeshProxy.prototype.getSize=function(axis)
    {
        switch(axis) {
            case MOD3.ModConstant.X: return this.width;
            case MOD3.ModConstant.Y: return this.height;
            case MOD3.ModConstant.Z: return this.depth;
        }
        return -1;
    };
    MOD3.MeshProxy.prototype.setMesh=function(mesh)
    {
        this.mesh = mesh;
        // it seems to work correctly only by resetting the values, else previous values are kept
        this.vertices=[];
        this.faces=[];
    };
    MOD3.MeshProxy.prototype.postApply=function()
    {
    // do nothing
    };
    MOD3.MeshProxy.prototype.updateMeshPosition=function(p)
    {
    // do nothing
    };
})(MOD3);