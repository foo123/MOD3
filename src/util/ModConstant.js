// constants -----------------------------------------------------------------------------------------------
(function(MOD3){
    // cache math constants for reference and optimization
    MOD3.Constants = {
        PI : Math.PI,
        invPI : 1.0/Math.PI,
        halfPI : 0.5*Math.PI,
        doublePI : 2*Math.PI,
        toRad : 1.0 / 180 * Math.PI,
        toDeg : 1.0 / 180 * Math.PI
    };
    
    MOD3.ModConstant = {
        LEFT : -1, 
        RIGHT : 1, 
        NONE : 0, 
        X : 1, 
        Y : 2, 
        Z : 4
    };
})(MOD3);
