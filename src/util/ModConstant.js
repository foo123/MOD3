/**
*
* MOD3  Constants and Auxilliary methods
*
*
**/
(function(MOD3, undef){
    
    //
    //
    // Constants
    MOD3.Constants = {
        // cache math constants for reference and optimization
        PI : Math.PI,
        invPI : 1.0 / Math.PI,
        halfPI : 0.5 * Math.PI,
        doublePI : 2 * Math.PI,
        toRad : Math.PI / 180,// 1.0 / 180 * Math.PI,
        toDeg : 180 / Math.PI //1.0 / 180 * Math.PI
    };
    MOD3.ModConstant = {
        LEFT : -1, 
        RIGHT : 1, 
        NONE : 0, 
        X : 1, 
        Y : 2, 
        Z : 4
    };
    
    //
    //
    // Typed Arrays Substitutes 
    MOD3.Array32F = (typeof Float32Array !== "undefined") ? Float32Array : Array;
    MOD3.Array64F = (typeof Float64Array !== "undefined") ? Float64Array : Array;
    MOD3.Array8I = (typeof Int8Array !== "undefined") ? Int8Array : Array;
    MOD3.Array16I = (typeof Int16Array !== "undefined") ? Int16Array : Array;
    MOD3.Array32I = (typeof Int32Array !== "undefined") ? Int32Array : Array;
    MOD3.Array8U = (typeof Uint8Array !== "undefined") ? Uint8Array : Array;
    MOD3.Array16U = (typeof Uint16Array !== "undefined") ? Uint16Array : Array;
    MOD3.Array32U = (typeof Uint32Array !== "undefined") ? Uint32Array : Array;
    // vector typed-array
    MOD3.VecArray = MOD3.Array32F;
    
    
    //
    //
    // SubClassing/Extending Methods
    var 
        hasOwn=Object.prototype.hasOwnProperty,
        
        slice = Array.prototype.slice, splice = Array.prototype.splice,
        
        superCall = function() { 
            var args=slice.call( arguments ), argslen=args.length;
            
            if ( argslen )
            {
                var method = args.shift();
                if ( this.__super__[method] )
                {
                    return this.__super__[method].apply(this, args);
                }
            }
            
            return null;
        },
        
        Merge = MOD3.Merge = function(o1, o2) { 
            o1 = o1 || {}; 
            for (var p in o2) 
                if ( hasOwn.call(o2, p) )  o1[p] = o2[p];  
            
            return o1; 
        },
        
        // http://javascript.crockford.com/prototypal.html
        // http://stackoverflow.com/questions/12592913/what-is-the-reason-to-use-the-new-keyword-here
        // http://perfectionkills.com/how-ecmascript-5-still-does-not-allow-to-subclass-an-array/
        Extends = MOD3.Extends = MOD3.Inherits = MOD3.SubClass = function(Parent, ChildProto) {
            var F = function(){}; 
            var C = ChildProto.constructor;
            //ChildProto.constructor=null;
            //delete ChildProto.constructor;
            F.prototype = Parent.prototype;
            C.prototype = new F();
            C.prototype.constructor = C;
            C.prototype = Merge( C.prototype, ChildProto );
            C.prototype.__super__ = Parent.prototype;
            C.prototype.superCall = superCall;
            return C;
        }
    ;
    
})(MOD3);