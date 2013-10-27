/**
*
* MOD3  Skew Modifier
*
*
**/
(function(MOD3, undef){
    
    var Abs=Math.abs, Pow=Math.pow,
        Sign=MOD3.XMath.sign,
        ModConstant=MOD3.ModConstant,
        NONE=ModConstant.NONE,
        LEFT=ModConstant.LEFT, RIGHT=ModConstant.RIGHT,
        X=ModConstant.X, Y=ModConstant.Y, Z=ModConstant.Z
    ;
    
    var Skew = MOD3.Skew = MOD3.Extends ( MOD3.Modifier,
    {
        constructor : function(f) {
            this.force = (f!==undef) ? f : 0;
            this.offset = 0.5;
            this.constraint = NONE;
            this.power = 1;
            this.falloff = 1;
            this.inverseFalloff = false;
            this.oneSide = false;
            this.swapAxes = false;
            this.skewAxis = 0;
        },
        
        force : 0,
        skewAxis : 0,
        offset : 0.5,
        constraint : NONE,
        power : 1,
        falloff : 1,
        inverseFalloff : false,
        oneSide : false,
        swapAxes : false,
        
        setModifiable : function(mod) {
            this.superCall("setModifiable", mod)
            this.skewAxis = this.skewAxis || this.mod.maxAxis;
            
            return this;
        },
        
        apply : function() {
            var vs = this.mod.getVertices(), vc = vs.length,
                constraint = this.constraint, 
                skewAxis = this.skewAxis, 
                offset = this.offset,
                oneSide = this.oneSide, 
                inverseFalloff = this.inverseFalloff, 
                falloff = this.falloff, 
                mirrorfalloff = 1-falloff,
                power = this.power, 
                force = this.force, 
                displaceAxis = this.getDisplaceAxis(),
                v, r, dr, f, p, vl, vRatio, sign;

            // optimize loop using while counting down instead of up
            while (--vc >= 0)
            //for (var i = 0; i < vc; i++) 
            {
                v = vs[vc];
                vRatio = v.getRatio(skewAxis);
                if (constraint == LEFT && vRatio <= offset) continue;
                if (constraint == RIGHT && vRatio > offset) continue;

                r = vRatio - offset;
                if (oneSide) r = Abs(r);

                dr = v.getRatio(displaceAxis);
                if (inverseFalloff) dr = 1 - dr;

                f = falloff + dr * mirrorfalloff;

                sign = (0>r) ? -1 : 1;
                p = Pow(Abs(r), power) * sign /*Sign(r, 1)*/;
                vl = v.getValue(displaceAxis) + force * p * f;
                v.setValue(displaceAxis, vl);
            }
            
            return this;
        },
        
        getDisplaceAxis : function() {
            var ska=this.skewAxis, swa=this.swapAxes;
            
            switch(ska) 
            {
                case X:
                    return (swa) ? Z : Y;
                case Y:
                    return (swa) ? Z : X;
                case Z:
                    return (swa) ? Y : X;
                return 0;
            }
        }
    });
    
})(MOD3);