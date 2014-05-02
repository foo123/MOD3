/**
*
*   Classy.js
*   @version: 0.5.5
*
*   Object-Oriented mini-framework for JavaScript
*   https://github.com/foo123/classy.js
*
**/!function(e,t,n,r,o){var i="undefined"!=typeof global&&"[object global]"=={}.toString.call(global)?1:0,l=i||"undefined"==typeof navigator?0:1,a="function"==typeof importScripts&&navigator instanceof WorkerNavigator?1:0,u=Array,c=u.prototype,f=function(){var e=null;if(i)return e=__filename,{path:__dirname,file:__filename};if(a)e=self.location.href;else if(l){var t;(t=document.getElementsByTagName("script"))&&t.length&&(e=t[t.length-1].src)}return e?{path:e.split("/").slice(0,-1).join("/"),file:e}:{path:null,file:null}},s=f(),p=function(e,t){if(i)return t;if("."==t.charAt(0)){e=e.split("/"),t=t.split("/");var n,r=0,o=0,l=t.length,a=e.length;for(n=0;l>n;n++)if(/^\.\./.test(t[n]))r++,o++;else{if(!/^\./.test(t[n]))break;o++}r=r>=a?0:a-r,t=e.slice(0,r).concat(t.slice(o)).join("/")}return t};n=n?[].concat(n):[];var b,d,y,g=n.length,v=new u(g),m=new u(g),h=new u(g),w=new u(g);for(b=0;g>b;b++)v[b]=n[b][0],m[b]=n[b][1],h[b]=/\.js$/i.test(m[b])?p(s.path,m[b]):p(s.path,m[b]+".js");if("object"==typeof module&&module.exports){if(o===module.exports[t]){for(b=0;g>b;b++)w[b]=module.exports[v[b]]||require(h[b])[v[b]];d=r.apply(e,w),module.exports[t]=d||1}}else if("function"==typeof define&&define.amd)define(["exports"].concat(m),function(n){if(o===n[t]){for(var i=c.slice.call(arguments,1),l=i.length,a=0;l>a;a++)w[a]=n[v[a]]||i[a];d=r.apply(e,w),n[t]=d||1}});else if(a){for(b=0;g>b;b++)self[v[b]]||importScripts(h[b]),w[b]=self[v[b]];d=r.apply(e,w),self[t]=d||1}else if(o===e[t]){var j=function(e,t){y=y||document.getElementsByTagName("head")[0];var n=0,r=document.createElement("script");r.type="text/javascript",r.language="javascript",r.src=e,r.onload=r.onreadystatechange=function(){n||r.readyState&&"loaded"!=r.readyState&&"complete"!=r.readyState||(n=1,r.onload=r.onreadystatechange=null,y.removeChild(r),r=null,t&&t())},y.appendChild(r)},E=function(t,n,r){e[t]?r():j(n,r)},x=function(n){return function(){g>n&&(w[n]=e[v[n]]),++n<g?E(v[n],h[n],x(n)):(d=r.apply(e,w),e[t]=d||1)}};g?E(v[0],h[0],x(0)):(d=r.apply(e,w),e[t]=d||1)}}(this,"Classy",null,function(){var e={};return function(e,t){var n=function(e,t,n){this.v=e||null,this.prev=t||null,this.next=n||null};n.prototype={constructor:n,v:null,prev:null,next:null};var r=Array.prototype,o=Object.prototype,i=Function.prototype,l=i.call.bind(r.slice),a=i.call.bind(o.toString),u=i.call.bind(o.hasOwnProperty),c=i.call.bind(o.propertyIsEnumerable),f=Object.keys,s=Object.defineProperty,p=2,b=3,d=4,y=8,g=9,v=16,m=32,h=64,w=128,j=256,E=512,x=1024,_=function(e){var t=typeof e,n=a(e);return"undefined"===t?E:"number"===t||e instanceof Number?isNaN(e)?b:p:null===e?j:!0===e||!1===e?d:e&&("string"===t||e instanceof String)?1===e.length?g:y:e&&("[object Array]"===n||e instanceof Array)?v:e&&("[object RegExp]"===n||e instanceof RegExp)?w:e&&("function"===t&&"[object Function]"===n||e instanceof Function)?h:e&&"[object Object]"===n?m:x},O=function(e,t){var n,r=t.length,o=[].concat(e);for(n=0;r>n;n++)o.indexOf(t[n])>-1||o.push(t[n]);return o},N=function(e,t){if(m!==_(e))throw new TypeError("bad desc");var n={};if(u(e,"enumerable")&&(n.enumerable=!!t.enumerable),u(e,"configurable")&&(n.configurable=!!t.configurable),u(e,"value")&&(n.value=t.value),u(e,"writable")&&(n.writable=!!e.writable),u(e,"get")){var r=e.get;if(h!==_(r)&&"undefined"!==r)throw new TypeError("bad get");n.get=r}if(u(e,"set")){var o=e.set;if(h!==_(o)&&"undefined"!==o)throw new TypeError("bad set");n.set=o}if(("get"in n||"set"in n)&&("value"in n||"writable"in n))throw new TypeError("identity-confused descriptor");return n},T=Object.defineProperties||function(e,t){if("object"!=typeof e||null===e)throw new TypeError("bad obj");t=Object(t);for(var n=f(t),r=[],o=0;o<n.length;o++)r.push([n[o],N(t[n[o]],e)]);for(var o=0;o<r.length;o++)s(e,r[o][0],r[o][1]);return e},S=Object.create||function(e,t){var n,r=function(){};return r.prototype=e,n=new r,n.__proto__=e,"object"==typeof t&&T(n,t),n},A=function(e){var t=new n(e);return function(e){if(e&&t&&t.v){var r,o=this;if(e="constructor"==e?t.v:t.v.prototype[e])return t=new n(t.v.$super,t),r=e.apply(o,l(arguments,1)),t=t.prev,r}}},C=function(){var e,t,n,r,o,i,a,f=l(arguments);for(t=f.shift()||{},e=f.length,i=0;e>i;i++)if(n=f[i],m===_(n))for(o in n)u(n,o)&&c(n,o)&&(r=n[o],a=_(r),t[o]=p&a?0+r:(y|v)&a?r.slice(0):r);return t},R=function(e,n){e=e||Object,n=n||{};var r,o,i,l,a,c,s,b,d=null,g=e.$static||null;if(u(n,"constructor")?o=n.constructor:(r=function(){},n.constructor=o=r),u(n,"__static__")&&(d=n.__static__,delete n.__static__,g=O(g||[],f(d))),o.prototype=S(e.prototype),o.prototype=C(o.prototype,n),T(o.prototype,{constructor:{value:o,enumerable:!1,writable:!0,configurable:!0},$class:{value:o,enumerable:!1,writable:!0,configurable:!0},$super:{value:A(e),enumerable:!1,writable:!0,configurable:!0}}),T(o,{$super:{value:e,enumerable:!1,writable:!0,configurable:!0},$static:{value:g,enumerable:!1,writable:!0,configurable:!0}}),g){for(l=g.length,a={},i=0;l>i;i++)c=g[i],s=null,d&&t!==d[c]?s=d[c]:t!==e[c]&&(b=_(e[c]),s=m===b?C(null,e[c]):(y|v)&b?e[c].slice(0):p&b?0+e[c]:e[c]),a[c]={value:s,enumerable:!1,writable:!0,configurable:!0};T(o,a)}return o},I=Mixin=C,M=function(){var e=l(arguments),t=e.length,n=null;if(t>=2){var r=_(e[0]);r=h===r?{Extends:e[0]}:m===r?e[0]:{Extends:Object};var o,i,a=e[1]||{},u={},c=r.Extends||r.extends||Object,f=r.Implements||r.implements,s=r.Mixin||r.mixin;if(f=f?[].concat(f):null,s=s?[].concat(s):null)for(o=0,i=s.length;i>o;o++)s[o].prototype&&(u=Mixin(u,s[o].prototype));if(f)for(o=0,i=f.length;i>o;o++)f[o].prototype&&(u=I(u,f[o].prototype));n=R(c,C(u,a))}else n=R(Object,e[0]);return n};e.Classy={VERSION:"0.5.5",T:{UNDEFINED:E,NULL:j,BOOLEAN:d,STRING:y,NUMBER:p,NAN:b,FUNCTION:h,REGEXP:w,ARRAY:v,OBJECT:m},Type:_,Create:S,Merge:C,Implements:I,Mixin:Mixin,Extends:R,Static:function(e){return e},Class:M}}(e),e.Classy});
/**
*
*   MOD3.js
*   @version: 0.4
*   @dependencies: Classy.js
*
*   MOD3 3D Modifier Library for JavaScript 
*   port of AS3DMod ActionScript3 library (http://code.google.com/p/as3dmod/)
*   https://github.com/foo123/MOD3
*
**/!function ( root, name, deps, factory, undef ) {

    //
    // export the module in a umd-style generic way
    deps = ( deps ) ? [].concat(deps) : [];
    var A = Array, AP = A.prototype, i, dl = deps.length, mods = new A( dl ), mod;
        
    // node, commonjs, etc..
    if ( "object" === typeof( module ) && module.exports ) 
    {
        if ( undef === module.exports[name] )
        {
            for (i=0; i<dl; i++)  mods[i] = module.exports[ deps[i][0] ] || require( deps[i][1] )[ deps[i][0] ];
            mod = factory.apply(root, mods );
            // allow factory just to add to existing modules without returning a new module
            module.exports[ name ] = mod || 1;
        }
    }
    
    // amd, etc..
    else if ( "function" === typeof( define ) && define.amd ) 
    {
        define( ['exports'].concat( deps.map(function(d){return d[1];}) ), function( exports ) {
            if ( undef === exports[name] )
            {
                var i, args = AP.slice.call( arguments, 1 ), dl = args.length;
                for (i=0; i<dl; i++)   mods[i] = exports[ deps[i][0] ] || args[ i ];
                mod = factory.apply(root, mods );
                // allow factory just to add to existing modules without returning a new module
                exports[ name ] = mod || 1;
            }
        });
    }
    
    // browsers, other loaders, etc..
    else
    {
        if ( undef === root[name] )
        {
            
            for (i=0; i<dl; i++)  mods[i] = root[ deps[i][0] ];
            mod = factory.apply(root, mods );
            // allow factory just to add to existing modules without returning a new module
            root[name] = mod || 1;
        }
    }


}(  /* current root */          this, 
    /* module name */           "MOD3",
    /* module dependencies */   [ ['Classy', './classy'] ], 
    /* module factory */        function( Classy ) {
        
        /* main code starts here */

/**
*
*   MOD3.js
*   @version: 0.4
*   @dependencies: Classy.js
*
*   MOD3 3D Modifier Library for JavaScript 
*   port of AS3DMod ActionScript3 library (http://code.google.com/p/as3dmod/)
*   https://github.com/foo123/MOD3
*
**/
var MOD3 = MOD3 || { VERSION: "0.4", Class: Classy.Class, StaticClass: Classy.Static };
/**
*
* MOD3  Constants and Auxilliary methods
*
*
**/
(function(MOD3, undef){
    
    "use strict";
    
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
        
        NONE : 0,  LEFT : -1, RIGHT : 1,
        
        X : 1, Y : 2, Z : 4,
        
        Xi : 0, Yi : 1, Zi : 2
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
    
})(MOD3);/**
*
* MOD3  Worker Interface
*
*
**/
!function(root, MOD3, undef){
    
    var OP = Object.prototype, FP = Function.prototype, AP = Array.prototype
        ,slice = FP.call.bind( AP.slice ), toString = FP.call.bind( OP.toString )
        
        ,isNode = "undefined" !== typeof( global ) && '[object global]' === toString( global )
        ,isBrowser = !isNode && "undefined" !== typeof( navigator )
        ,isWorker = "function" === typeof( importScripts ) && navigator instanceof WorkerNavigator
        ,supportsWorker = "function" === typeof( Worker )
    ;
    
    MOD3.supportsWorker = supportsWorker;
    // Get current filename/path
    MOD3.getPath = function( ) {
        var file = null, scripts;
        
        if ( isNode ) 
        {
            // http://nodejs.org/docs/latest/api/globals.html#globals_filename
            // this should hold the current file in node
            return { path: __dirname, file: __filename };
        }
        else if ( isWorker )
        {
            // https://developer.mozilla.org/en-US/docs/Web/API/WorkerLocation
            // this should hold the current url in a web worker
            file = self.location.href;
        }
        else if ( isBrowser && (scripts = document.getElementsByTagName('script')) && scripts.length )
        {
            // get last script (should be the current one) in browser
            file  = scripts[ scripts.length - 1 ].src;
        }
        
        return file 
                ? { path: file.split('/').slice(0, -1).join('/'), file: ''+file }
                : { path: null, file: null }
        ;
    };
    
    //
    //
    // logging
    if ( isWorker )
    {
        var modifier = null;
        
        root.console = {
            log: function(s){
                postMessage({event: 'console.log', data: {output: s||''}});
            },
            error: function(s){
                postMessage({event: 'console.error', data: {output: s||''}});
            },
        };
        
        onmessage = function( evt ) {
            var event = evt.data.event, data = evt.data.data || null;
            switch( event )
            {
                case 'init':
                    if ( modifier ) 
                    {
                        modifier.dispose( );
                        modifier = null;
                    }
                    if ( data && data.modifier && MOD3[ data.modifier ] )
                    {
                        modifier = new MOD3[ data.modifier ]( );
                    }
                    break;
                case 'import':
                    if ( data && data["import"] && data["import"].length )
                    {
                        importScripts( data["import"].join(',') );
                    }
                    break;
                case 'apply':
                    if ( modifier )
                    {
                        if ( data && data.modifiable )
                            modifier.setModifiable( MOD3.MeshProxy.unserialize( data.modifiable ) );
                        modifier.send( 'apply', { modifiable: modifier._apply( ).mod } );
                    }
                    break;
                case 'dispose':
                default:
                    if ( modifier ) 
                    {
                        modifier.dispose( );
                        modifier = null;
                    }
                    close( );
                    break;
            }
        };        
    }
    var WorkerInterface = MOD3.WorkerInterface = MOD3.Class({
        
        path: MOD3.getPath( )
        ,name: null
        
        ,_worker: null
        ,_workerListeners: null
        
        ,disposeWorker: function( ) {
            var self = this;
            if ( self._worker )
            {
                self.send( 'dispose' );
                //self._worker.terminate( );
                self._worker = null;
                self._workerListeners = null;
            }
            return self;
        }
        
        ,scripts: function( ) {
            var scripts = slice( arguments );
            if ( scripts.length )
            {
                this.send('import', {'import': scripts});
            }
            return this;
        }
        
        // get or de-activate a worker filter
        ,worker: function( bool ) {
            var self = this, worker;
            
            if ( !arguments.length ) bool = true;
            bool = !!bool;
            
            // de-activate worker (if was activated before)
            if ( false === bool )
            {
                if ( self._worker ) self.disposeWorker( );
                return self;
            }
            
            if ( !self._worker )
            {
                if ( !supportsWorker )
                {
                    throw new Error('Worker is not supported');
                    return;
                }
                
                self._workerListeners = { };
                
                worker = self._worker = new Worker( this.path.file );
                
                worker.onmessage = function( evt ) {
                    if ( evt.data.event )
                    {
                        var event = evt.data.event, data = evt.data.data || null;
                        if ( self._workerListeners && self._workerListeners[ event ] ) 
                        {
                            self._workerListeners[ event ]( data );
                        }
                        
                        if ( "console.log" === event || "console.error" === event )
                        {
                            log( 'Worker: ' + data.output );
                        }
                    }
                };
                
                worker.onerror = function( evt ) {
                    if ( self._workerListeners && self._workerListeners.error )
                    {
                        self._workerListeners.error( evt );
                    }
                    else
                    {
                        throw new Error( 'Worker Error: ' + evt.message + ' file: ' + evt.filename + ' line: ' + evt.lineno );
                    }
                };
                
                self.send( 'init', { modifier: self.name } );
            }
            
            return self;
        }
        
        ,bind: function( event, handler ) {
            if ( event && handler && this._workerListeners )
            {
                this._workerListeners[ event ] = handler.bind( this );
            }
            return this;
        }
        
        ,unbind: function( event ) {
            if ( event && this._workerListeners && this._workerListeners[ event ] )
            {
                delete this._workerListeners[ event ];
            }
            return this;
        }
        
        ,send: function( event, data ) {
            if ( event )
            {
                if ( isWorker )
                {
                    postMessage({event: event, data: data || null});
                }
                else if ( this._worker )
                {
                    this._worker.postMessage({event: event, data: data || null});
                }
            }
            return this;
        }
    });
    
}(this, MOD3);/**
*
* MOD3  Math Utilities Class
*
*
**/
(function(MOD3, undef){
    "use strict";
    
    // cache constants
    var 
        toRad = MOD3.Constants.toRad, toDeg = MOD3.Constants.toDeg,
        Min = Math.min, Max = Math.max,
        Pow = Math.pow, Round = Math.round,
        Floor = Math.florr, Ceil = Math.ceil, Trim
    ;

    var XMath = MOD3.XMath = MOD3.StaticClass({

        normalize: function( start, end, val ) {
            var range = end - start, normal;

            if ( 0 === range ) 
            {
                normal = 1;
            } 
            else 
            {
                normal = Trim(0, 1, (val - start) / end);
            }

            return normal;
        },

        toRange: function( start, end, normalized ) {
            var range = end - start, val;

            if ( 0 === range ) 
            {
                val = 0;
            } 
            else 
            {
                val = start + (end - start) * normalized;
            }

            return val;
        },

        inRange: function( start, end, value, excluding ) {
            if (excluding===undef) excluding = false;
            return (excluding) ? (value >= start && value <= end) : (value > start && value < end);
        },

        sign: function( val, ifZero ) {
            if (ifZero===undef) ifZero = 0;
            return (0 == val) ? ifZero : (val > 0) ? 1 : -1;
        },

        trim: function( start, end, value ) {
            return Min( end, Max( start, value ) );
        },

        wrap: function( start, end, value ) {
            var r = end-start;
            if (value < start) return value + r;
            else if (value >= end) return value - r;
            else return value;
        },

        degToRad: function( deg ) {
            return deg * toRad;
        },

        radToDeg: function( rad )  {
            return rad * toDeg;
        },

        presicion: function( number, precision ) {
            var r = Pow( 10, precision );
            return Round( number * r ) / r;
        },

        uceil: function( val ) {
            return (val < 0) ? Floor(val) : Ceil(val);
        }
    });
    // alias
    Trim = XMath.clamp = XMath.trim;

})(MOD3);/**
*
* MOD3  Range Auxilliary Class
*
*
**/
(function(MOD3, undef){
    "use strict";
    
    var 
        normalize = MOD3.XMath.normalize,
        toRange = MOD3.XMath.toRange,
        trim = MOD3.XMath.trim
    ;

    var Range = MOD3.Range = MOD3.Class( Object, {
        
        constructor: function( s, e )  {
            this.start = 0;
            this.end = 1;
            if (s !== undef)  this.start=s;
            if (e !== undef)  this.end=e;
        },
        
        start: 0,
        end: 1,

        dispose: function( ) {
            this.start = null;
            this.end = null;
            
            return this;
        },
        
        getSize: function( )  {
            return this.end - this.start;
        },

        move: function( amount )  {
            this.start += amount;
            this.end += amount;
        },

        isIn: function( n ) {
            return (n >= this.start && n <= this.end);
        },

        normalize: function( n ) {
            return normalize( this.start, this.end, n );
        },

        toRange: function( n ) {
            return toRange( this.start, this.end, n );
        },

        trim: function( n ) {
            return trim( this.start, this.end, n );
        },

        interpolate: function( n, r ) {
            return toRange( this.start, this.end, r.normalize( n ) );
        },

        toString: function( ) {
            return "[" + this.start + " - " + this.end + "]";
        }
    });
    
})(MOD3);/**
*
* MOD3  Phase Auxilliary Class
*
*
**/
(function(MOD3, undef){
    "use strict";
    
    var Sin = Math.sin, Abs = Math.abs;
    
    var Phase = MOD3.Phase = MOD3.Class( Object,{
        
        constructor: function( v ) {
            this.value = 0;
            if  (v !== undef) this.value = v;
        },
        
        value: 0,
        
        dispose: function( ) {
            this.value = null;
            
            return this;
        },
        
        getPhasedValue: function( )  {
            return Sin( this.value );
        },
        
        getAbsPhasedValue: function( )  {
            return Abs( Sin( this.value ) );
        },
        
        getNormValue: function( ) {
            return ( Sin( this.value ) + 1 ) * 0.5;
        }
    });
    
})(MOD3);/**
*
* MOD3  2D Point Class
*
*
**/
!function(MOD3, undef){
    
    "use strict";
    
    var Point = MOD3.Point = MOD3.Class({
        
        constructor: function( x, y ) {
            this.x = (x===undef) ? 0 : x;
            this.y = (y===undef) ? 0 : y;
        },

        x: 0,
        y: 0,

        dispose: function( ) {
            this.x = null;
            this.y = null;
            
            return this;
        },
        
        clone: function( ) {
            return new Point(this.x, this.y);
        }
    });
    
}(MOD3);/**
*
* MOD3  2D Transform Matrix Class
*
*
**/
!function(MOD3, undef){
    
    "use strict";
    
    var Sin = Math.sin, Cos = Math.cos, Point = MOD3.Point;

    var Matrix = MOD3.Matrix = MOD3.Class({
        
        constructor: function( m11, m12, m21, m22 ) {
            this.m11 = (m11===undef) ? 1 : m11;
            this.m12 = (m12===undef) ? 0 : m12;
            this.m21 = (m21===undef) ? 0 : m21;
            this.m22 = (m22===undef) ? 1 : m22;
        },
        
        m11: 1,
        m12: 0,
        m21: 0,
        m22: 1,

        dispose: function( ) {
            this.m11 = null;
            this.m12 = null;
            this.m21 = null;
            this.m22 = null;
            
            return this;
        },
        
        reset: function( ) {
            this.m11 = 1;
            this.m12 = 0;
            this.m21 = 0;
            this.m22 = 1;
            
            return this;
        },
        
        rotate: function( angle )  {
            var c = Cos( angle ),
                s = Sin( angle );
            
            this.m11 = c;
            this.m12 = -s;
            this.m21 = s;
            this.m22 = c;
            
            return this;
        },

        scale: function( sx, sy ) {
            this.m12 = 0;
            this.m21 = 0;
            this.m11 = 1;
            this.m22 = 1;
            
            if ( sx!==undef )
            {
                this.m11 = sx;
                this.m22 = sx;
            }
            
            if ( sy!==undef )
            {
                this.m22 = sy;
            }
            
            return this;
        },

        multiply: function( a ) {
            // optimize by caching
            var m11 = this.m11, m12 = this.m12, m21 = this.m21, m22 = this.m22,
                am11 = a.m11, am12 = a.m12, am21 = a.m21, am22 = a.m22
            ;
            
            this.m11 = m11*am11 + m12*am21;
            this.m12 = m11*am12 + m12*am22;
            this.m21 = m21*am11 + m22*am21;
            this.m22 = m21*am12 + m22*am22;
            
            return this;
        },

        transformPoint: function( p ) {
            var ipx = p.x, ipy = p.y;
            var px = this.m11*ipx + this.m12*ipy;
            var py = this.m21*ipx + this.m22*ipy;
            
            return new Point( px, py );
        },
        
        transformPointSelf: function( p ) {
            var ipx = p.x, ipy = p.y;
            p.x = this.m11*ipx + this.m12*ipy;
            p.y = this.m21*ipx + this.m22*ipy;
            
            return p;
        },
        
        clone: function( ) {
            return new Matrix( this.m11, this.m12, this.m21, this.m22 );
        }
    });
    
}(MOD3);/**
*
* MOD3  Vector3 Class
*
*
**/
!function(MOD3, undef){
    
    "use strict";
    
    var Sqrt = Math.sqrt, A = MOD3.VecArray;

    var Vector3 = MOD3.Vector3 = MOD3.Class({
        
        // static
        __static__: {
            
            ZERO: function( ) {
                return new Vector3( [0, 0, 0] );
            },
            
            dot: function( a, b ) { 
                var aa = a.xyz, bb = b.xyz;
                return (aa[0]*bb[0] + aa[1]*bb[1] + aa[2]*bb[2]); 
            },
            
            equals: function( a, b ) {
                var aa = a.xyz, bb = b.xyz;
                return ((aa[0] == bb[0]) && (aa[1] == bb[1]) && (aa[2] == bb[2]));
            },
            
            cross: function( a, b ) {
                var aa = a.xyz, bb = b.xyz,
                    ax = aa[0], ay = aa[1], az = aa[2], 
                    bx = bb[0], by = bb[1], bz = bb[2];
                return new Vector3( [ay * bz - az * by, az * bx - ax * bz, ax * by - ay * bx] );
            },
            
            distance: function( a, b ) {
                var aa = a.xyz, bb = b.xyz,
                    dx = aa[0] - bb[0],
                    dy = aa[1] - bb[1],
                    dz = aa[2] - bb[2];
                return Sqrt(dx * dx + dy * dy + dz * dz);
            },
            
            sum: function( a, b ) {
                var aa = a.xyz, bb = b.xyz;
                return new Vector3( [aa[0] + bb[0], aa[1] + bb[1], aa[2] + bb[2]] );
            }
        },
        
        constructor: function( x, y, z ) {
            // use an internal typed-array for speed
            if ( x && x.length )
            {
                // array passed
                this.xyz = new A( [x[0], x[1], x[2]] );
            }
            else
            {
                // numbers passed
                x = (x===undef) ? 0 : x;
                y = (y===undef) ? 0 : y;
                z = (z===undef) ? 0 : z;
                this.xyz = new A( [ x, y, z ] );
            }
        },
        
        xyz: null,
        
        dispose: function( ) {
            this.xyz = null;
            
            return this;
        },
        
        getXYZ: function( ) {
           // copy it
           return new A( this.xyz );
        },
        
        getXYZRef: function( ) {
           return this.xyz;
        },
        
        setXYZ: function( xyz ) {
           // copy it
           this.xyz = new A( xyz );
           return this;
        },
        
        setXYZRef: function( xyz ) {
           this.xyz = xyz;
           return this;
        },
        
        clone: function( ) {
            return new Vector3( this.xyz );
        },

        equalsSelf: function( v ) {
            var aa = this.xyz, bb = v.xyz;
            return ((aa[0] == bb[0]) && (aa[1] == bb[1]) && (aa[2] == bb[2]));
        },

        zeroSelf: function( ) {
            this.xyz[0] = 0; this.xyz[1] = 0; this.xyz[2] = 0;
            return this;
        },

        negate: function( ) {
            var aa = this.xyz;
            return new Vector3( [-aa[0], -aa[1], -aa[2]] );
        },

        negateSelf: function( ) {
            var aa = this.xyz;
            aa[0] = -aa[0]; aa[1] = -aa[1]; aa[2] = -aa[2];
            return this;
        },

        add: function( v ) {
            var aa = this.xyz, bb = v.xyz;
            return new Vector3( [aa[0] + bb[0], aa[1] + bb[1], aa[2] + bb[2]] );
        },

        addSelf: function( v ) {
            var aa = this.xyz, bb = v.xyz;
            aa[0] += bb[0]; aa[1] += bb[1]; aa[2] += bb[2];
            return this;
        },

        subtract: function( v ) {
            var aa = this.xyz, bb = v.xyz;
            return new Vector3( [aa[0] - bb[0], aa[1] - bb[1], aa[2] - bb[2]] );
        },

        subtractSelf: function( v ) {
            var aa = this.xyz, bb = v.xyz;
            aa[0] -= bb[0]; aa[1] -= bb[1]; aa[2] -= bb[2];
            return this;
        },

        multiplyScalar: function( s ) {
            var aa = this.xyz;
            return new Vector3( [aa[0] * s, aa[1] * s, aa[2] * s] );
        },

        multiplyScalarSelf: function( s ) {
            var aa = this.xyz;
            aa[0] *= s; aa[1] *= s; aa[2] *= s;
            return this;
        },

        multiply: function( v ) {
            var aa = this.xyz, bb = v.xyz;
            return new Vector3( [aa[0] * bb[0], aa[1] * bb[1], aa[2] * bb[2]] );
        },

        multiplySelf: function( v ) {
            var aa = this.xyz, bb = v.xyz;
            aa[0] *= bb[0]; aa[1] *= bb[1]; aa[2] *= bb[2];
            return this;
        },

        divide: function( s ) {
            var os = 1 / s,
                aa = this.xyz;
            return new Vector3( [aa[0] * os, aa[1] * os, aa[2] * os] );
        },

        divideSelf: function( s ) {
            var os = 1 / s,
                aa = this.xyz;
            aa[0] *= os; aa[1] *= os; aa[2] *= os;
            return this;
        },

        normalize: function( ) {
            var aa = this.xyz,
                x = aa[0], y = aa[1], z = aa[2],
                m = x * x + y * y + z * z, n;
            if(m > 0) 
            {
                n = 1 / Sqrt(m);
                x *= n;
                y *= n;
                z *= n;
            }
            return new Vector3( [x, y, z] );
        },

        normalizeSelf: function( ) {
            var aa = this.xyz,
                x = aa[0], y = aa[1], z = aa[2],
                m = x * x + y * y + z * z, n;
            if(m > 0) 
            {
                n = 1 / Sqrt(m);
                x *= n;
                y *= n;
                z *= n;
            }
            aa[0] = x; aa[1] = y; aa[2] = z;
            return this;
        },

        getMagnitude: function( ) {
            var aa = this.xyz,
                x = aa[0], y = aa[1], z = aa[2];
            return Sqrt(x * x + y * y + z * z);
        },

        setMagnitude: function( m ) {
            this.normalizeSelf( ); 
            var aa = this.xyz;
            aa[0] *= m;  aa[1] *= m;  aa[2] *= m;
            return this;
        },

        dotSelf: function( v ) {
            var aa = this.xyz, bb = v.xyz;
            return aa[0] * bb[0] + aa[1] * bb[1] + aa[2] * bb[2];
        },

        crossSelf: function( v ) {
            var aa = this.xyz, bb = v.xyz,
                ax = aa[0], ay = aa[1], az = aa[2], 
                bx = bb[0], by = bb[1], bz = bb[2];
            aa[0] = ay * bz - az * by; 
            aa[1] = az * bx - ax * bz; 
            aa[2] = ax * by - ay * bx;
            return this;
        },

        distanceSelf: function( v ) {
            var aa = this.xyz, bb = v.xyz,
                dx = aa[0] - bb[0],
                dy = aa[1] - bb[1],
                dz = aa[2] - bb[2];
            return Sqrt(dx * dx + dy * dy + dz * dz);
        },

        toString: function( ) {
            return "[" + this.xyz[0] + " , " + this.xyz[1] + " , " + this.xyz[2] + "]";
        }
    });
    

}(MOD3);/**
*
* MOD3  3D Transform Matrix Class
*
*
**/
!function(MOD3, undef){
    "use strict";
    
    var Sin = Math.sin, Cos = Math.cos;

    var Matrix4 = MOD3.Matrix4 = MOD3.Class({
        
        // static
        __static__: {
            
            multiplyVector: function( m, v ) {
                var vxyz = v.xyz,
                    vx = vxyz[0],
                    vy = vxyz[1],
                    vz = vxyz[2];

                vxyz[0] = vx * m.n11 + vy * m.n12 + vz * m.n13 + m.n14;
                vxyz[1] = vx * m.n21 + vy * m.n22 + vz * m.n23 + m.n24;
                vxyz[2] = vx * m.n31 + vy * m.n32 + vz * m.n33 + m.n34;
                
                return v;
            },
            
            calculateMultiply: function( a, b ) {
                var 
                    a11 = a.n11,
                    b11 = b.n11,
                    a21 = a.n21, 
                    b21 = b.n21,
                    a31 = a.n31, 
                    b31 = b.n31,
                    a12 = a.n12, 
                    b12 = b.n12,
                    a22 = a.n22, 
                    b22 = b.n22,
                    a32 = a.n32, 
                    b32 = b.n32,
                    a13 = a.n13, 
                    b13 = b.n13,
                    a23 = a.n23, 
                    b23 = b.n23,
                    a33 = a.n33, 
                    b33 = b.n33,
                    a14 = a.n14, 
                    b14 = b.n14,
                    a24 = a.n24, 
                    b24 = b.n24,
                    a34 = a.n34, 
                    b34 = b.n34;

                a.n11 = a11 * b11 + a12 * b21 + a13 * b31;
                a.n12 = a11 * b12 + a12 * b22 + a13 * b32;
                a.n13 = a11 * b13 + a12 * b23 + a13 * b33;
                a.n14 = a11 * b14 + a12 * b24 + a13 * b34 + a14;

                a.n21 = a21 * b11 + a22 * b21 + a23 * b31;
                a.n22 = a21 * b12 + a22 * b22 + a23 * b32;
                a.n23 = a21 * b13 + a22 * b23 + a23 * b33;
                a.n24 = a21 * b14 + a22 * b24 + a23 * b34 + a24;

                a.n31 = a31 * b11 + a32 * b21 + a33 * b31;
                a.n32 = a31 * b12 + a32 * b22 + a33 * b32;
                a.n33 = a31 * b13 + a32 * b23 + a33 * b33;
                a.n34 = a31 * b14 + a32 * b24 + a33 * b34 + a34;
                
                return a;
            }
        },
        
        constructor: function( n11, n12, n13, n14,
                                n21, n22, n23, n24,
                                n31, n32, n33, n34,
                                n41, n42, n43, n44 )
        {
            this.n11 = (n11===undef) ? 1 : n11;
            this.n12 = (n12===undef) ? 0 : n12;
            this.n13 = (n13===undef) ? 0 : n13;
            this.n14 = (n14===undef) ? 0 : n14;
            
            this.n21 = (n21===undef) ? 0 : n21;
            this.n22 = (n22===undef) ? 1 : n22;
            this.n23 = (n23===undef) ? 0 : n23;
            this.n24 = (n24===undef) ? 0 : n24;
            
            this.n31 = (n31===undef) ? 0 : n31;
            this.n32 = (n32===undef) ? 0 : n32;
            this.n33 = (n33===undef) ? 1 : n33;
            this.n34 = (n34===undef) ? 0 : n34;
            
            this.n41 = (n41===undef) ? 0 : n41;
            this.n42 = (n42===undef) ? 0 : n42;
            this.n43 = (n43===undef) ? 0 : n43;
            this.n44 = (n44===undef) ? 1 : n44;
        },
    
        n11: 1,
        n12: 0,
        n13: 0,
        n14: 0,
        n21: 0,
        n22: 1,
        n23: 0,
        n24: 0,
        n31: 0,
        n32: 0,
        n33: 1,
        n34: 0,
        n41: 0,
        n42: 0,
        n43: 0,
        n44: 1,

        dispose: function( ) {
            this.n11 = null;
            this.n12 = null;
            this.n13 = null;
            this.n14 = null;
            this.n21 = null;
            this.n22 = null;
            this.n23 = null;
            this.n24 = null;
            this.n31 = null;
            this.n32 = null;
            this.n33 = null;
            this.n34 = null;
            this.n41 = null;
            this.n42 = null;
            this.n43 = null;
            this.n44 = null;
            
            return this;
        },
        
        reset: function( ) {
            this.n11 = 1;
            this.n12 = 0;
            this.n13 = 0;
            this.n14 = 0;
            this.n21 = 0;
            this.n22 = 1;
            this.n23 = 0;
            this.n24 = 0;
            this.n31 = 0;
            this.n32 = 0;
            this.n33 = 1;
            this.n34 = 0;
            this.n41 = 0;
            this.n42 = 0;
            this.n43 = 0;
            this.n44 = 1;
            
            return this;
        },
        
        translationMatrix: function( x, y, z ) {
            this.n14 = x;
            this.n24 = y;
            this.n34 = z;
            
            return this;
        },

        translationMatrixFromVector: function( v ) {
            var xyz = v.xyz;
            
            this.n14 = xyz[0];
            this.n24 = xyz[1];
            this.n34 = xyz[2];
            
            return this;
        },

        scaleMatrix: function( x, y, z ) {
            this.n11 = x;
            this.n22 = y;
            this.n33 = z;
            
            return this;
        },

        scaleMatrixFromVector: function( v ) {
            var xyz = v.xyz;
            
            this.n11 = xyz[0];
            this.n22 = xyz[0];
            this.n33 = xyz[0];
            
            return this;
        },

        rotationMatrix: function( x, y, z, rad )  {
            var nCos = Cos(rad);
            var nSin = Sin(rad);
            var scos = 1 - nCos;

            var sxy = x * y * scos;
            var syz = y * z * scos;
            var sxz = x * z * scos;
            var sz = nSin * z;
            var sy = nSin * y;
            var sx = nSin * x;

            this.n11 = nCos + x * x * scos;
            this.n12 = -sz + sxy;
            this.n13 = sy + sxz;
            this.n14 = 0;

            this.n21 = sz + sxy;
            this.n22 = nCos + y * y * scos;
            this.n23 = -sx + syz;
            this.n24 = 0;

            this.n31 = -sy + sxz;
            this.n32 = sx + syz;
            this.n33 = nCos + z * z * scos;
            this.n34 = 0;

            return this;
        },

        rotationMatrixFromVector: function( v, rad )  {
            var xyz = v.xyz, 
                x = xyz[0],
                y = xyz[1],
                z = xyz[2]
            ;
            var nCos = Cos(rad);
            var nSin = Sin(rad);
            var scos = 1 - nCos;

            var sxy = x * y * scos;
            var syz = y * z * scos;
            var sxz = x * z * scos;
            var sz = nSin * z;
            var sy = nSin * y;
            var sx = nSin * x;

            this.n11 = nCos + x * x * scos;
            this.n12 = -sz + sxy;
            this.n13 = sy + sxz;
            this.n14 = 0;

            this.n21 = sz + sxy;
            this.n22 = nCos + y * y * scos;
            this.n23 = -sx + syz;
            this.n24 = 0;

            this.n31 = -sy + sxz;
            this.n32 = sx + syz;
            this.n33 = nCos + z * z * scos;
            this.n34 = 0;

            return this;
        },

        multiply: function( b ) {
            Matrix4.calculateMultiply( this, b );
            return this;
        },

        multiplyVector: function( v ) {
            var vxyz = v.xyz,
                vx = vxyz[0],
                vy = vxyz[1],
                vz = vxyz[2];
            
            vxyz[0] = vx * this.n11 + vy * this.n12 + vz * this.n13 + this.n14;
            vxyz[1] = vx * this.n21 + vy * this.n22 + vz * this.n23 + this.n24;
            vxyz[2] = vx * this.n31 + vy * this.n32 + vz * this.n33 + this.n34;
            
            return v;
        }
    });
    
}(MOD3);/**
*
* MOD3  VertexProxy Super Class
*
*
**/
!function(MOD3, undef){
    
    "use strict";
    
    var ModConstant = MOD3.ModConstant,
        X = ModConstant.X, Y = ModConstant.Y, Z = ModConstant.Z,
        Vector3 = MOD3.Vector3, A = MOD3.VecArray
    ;
    
    var VertexProxy = MOD3.VertexProxy = MOD3.Class({
        
        constructor: function( vertex ) {
            // use internal typed-arrays for speed
            this.xyz = new A( [0,0,0] );
            this.original = new A( [0,0,0] );
            this.ratio = new A( [0,0,0] );
            
            // vertex can be zero
            if ( 
                (undef !== vertex) && 
                (null !== vertex) && 
                (false !== vertex) 
            )  this.setVertex( vertex );
        },
        
        name: "VertexProxy",
        
        vertex: null,
        xyz: null,
        original: null,
        ratio: null,
        
        dispose: function( ) {
            this.vertex = null;
            this.xyz = null;
            this.original = null;
            this.ratio = null;
            
            return this;
        },
        
        serialize: function( ) {
            return { 
                vertex: this.name, 
                xyz: this.getXYZ( ),
                original: this.original,
                ratio: this.ratio
            };
            
        },
        
        unserialize: function( json ) {
            if ( json && this.name === json.vertex )
            {
                this.xyz = this.setXYZ( json.xyz );
                this.original = json.original;
                this.ratio = json.ratio;
            }
            return this;
        },
        
        setVertex: function( vertex )  { 
            // override
            this.vertex = vertex;
            
            return this;
        },

        getRatioVector: function( ) {
            return new Vector3( this.ratio );
        },

        getRatio: function( axis ) {
            switch( axis ) 
            {
                case X: return this.ratio[0];
                case Y: return this.ratio[1];
                case Z: return this.ratio[2];
            }
            return -1;
        },

        getOriginalValue: function( axis ) {
            switch( axis ) 
            {
                case X: return this.original[0];
                case Y: return this.original[1];
                case Z: return this.original[2];
            }
            return 0;
        },

        setRatios: function( rx, ry, rz ) {
            rx = (rx===undef) ? 0 : rx;
            ry = (ry===undef) ? 0 : ry;
            rz = (rz===undef) ? 0 : rz;
            this.ratio = new A( [rx, ry, rz] );
            
            return this;
        },

        setOriginalPosition: function( ox, oy, oz ) {
            ox = (ox===undef) ? 0 : ox;
            oy = (oy===undef) ? 0 : oy;
            oz = (oz===undef) ? 0 : oz;
            this.original = new A( [ox, oy, oz] );
            
            return this;
        },

        getXYZ: function( ) {
            // override
            return new A( this.xyz );
        },
        
        getXYZRef: function( ) {
            // override
            return this.xyz;
        },
        
        getX: function( ) {
            // override
            return this.xyz[0];
        },

        getY: function( ) {
            // override
            return this.xyz[1];
        },

        getZ: function( ) {
            // override
            return this.xyz[2];
        },

        setXYZ: function( xyz ) {
            // override
            this.xyz = new A( xyz );
            return this;
        },
        
        setXYZRef: function( xyz ) {
            // override
            this.xyz = xyz;
            return this;
        },
        
        setX: function( v ) {
            // override
            this.xyz[0] = v;
            return this;
        },

        setY: function( v ) {
            // override
            this.xyz[1] = v;
            return this;
        },

        setZ: function( v ) {
            // override
            this.xyz[2] = v;
            return this;
        },

        getValue: function( axis )  {
            // override
            switch( axis ) 
            {
                case X: return this.getX( );
                case Y: return this.getY( );
                case Z: return this.getZ( );
            }
            return 0;
        },

        setValue: function( axis, v ) {
            // override
            switch( axis ) 
            {
                case X: this.setX( v ); break;
                case Y: this.setY( v ); break;
                case Z: this.setZ( v ); break;
            }
            return this;
        },

        reset: function( ) {
            // override ??
            this.setXYZ( this.original );
            return this;
        },

        collapse: function( ) {
            // override ??
            this.original = this.getXYZ( );
            return this;
        },

        getVector: function( ) {
            // override
            return new Vector3( this.getXYZ( ) );
        },

        setVector: function( v ) {
            // override
            this.setXYZ( v.xyz );
        }
    });
    VertexProxy.unserialize - function( json ) {
        if ( json && json.vertex && MOD3[ json.vertex ] )
        {
            return new MOD3[ json.vertex ]( ).unserialize( json );
        }
        // dummy, default
        return new VertexProxy( );
    };
    
}(MOD3);/**
*
* MOD3  FaceProxy Super Class
*
*
**/
!function(MOD3, undef){
    
    "use strict";
    
    var FaceProxy = MOD3.FaceProxy = MOD3.Class( Object, {
        
        constructor: function( ) {
            this.vertices = [ ];
        },
        
        name: "FaceProxy",
        
        vertices: null,

        dispose: function( ) {
            this.vertices = null;
            
            return this;
        },
        
        serialize: function( ) {
            return { 
                face: this.name, 
                vertices: null
            };
            
        },
        
        unserialize: function( json ) {
            if ( json && this.name === json.face )
            {
                this.vertices = json.vertices || null;
            }
            return this;
        },
        
        addVertex: function( v )  {
            this.vertices.push( v );
        },

        getVertices: function( ) {
            return this.vertices;
        }
    });
    FaceProxy.unserialize - function( json ) {
        if ( json && json.face && MOD3[ json.face ] )
        {
            return new MOD3[ json.face ]( ).unserialize( json );
        }
        // dummy, default
        return new FaceProxy( );
    };
    
}(MOD3);/**
*
* MOD3  MeshProxy Super Class
*
*
**/
!function(MOD3, undef){
    
    "use strict";
    
    var ModConstant = MOD3.ModConstant,
        X = ModConstant.X, Y = ModConstant.Y, Z = ModConstant.Z,
        Min = Math.min, Max = Math.max
    ;

    var MeshProxy = MOD3.MeshProxy = MOD3.Class({
        
        constructor: function( mesh ) {
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
            if ( undef !== mesh ) this.setMesh( mesh );
        },
        
        name : "MeshProxy",
        
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

        dispose: function( ) {
            this.maxX = null;
            this.maxY = null;
            this.maxZ = null;
            this.minX = null;
            this.minY = null;
            this.minZ = null;
            
            this.maxAxis = null;
            this.midAxis = null;
            this.minAxis = null;
            
            this.widht = null;
            this.height = null;
            this.depth = null;
            
            this.disposeFaces( );
            this.disposeVertices( );
            this.mesh = null;
            
            return this;
        },
        
        disposeVertices: function( ) {
            var i, l;
            if ( this.vertices )
            {
                l = this.vertices.length;
                for (i=0; i<l; i++) this.vertices[ i ].dispose( );
            }
            this.vertices = null;
            return this;
        },
        
        disposeFaces: function( ) {
            var i, l;
            if ( this.faces )
            {
                l = this.faces.length;
                for (i=0; i<l; i++) this.faces[ i ].dispose( );
            }
            this.faces = null;
            return this;
        },
        
        serialize: function( ) {
            var serialize = function( vertex ) {
                return vertex ? vertex.serialize( ) : vertex;
            };
            return { 
                mesh: this.name, 
                vertices: this.vertices ? this.vertices.map( serialize ) : null,
                faces: null //this.faces ? this.faces.map( serialize ) : null
            };
            
        },
        
        unserialize: function( json ) {
            if ( json && this.name === json.mesh )
            {
                var unserialize = function( vertex ) {
                    if ( vertex )
                    {
                        if ( vertex.vertex ) return MOD3.VertexProxy.unserialize( vertex );
                        /*else if ( vertex.face ) return MOD3.FaceProxy.unserialize( vertex );*/
                    }
                    return vertex;
                };
                this.disposeFaces( );
                this.disposeVertices( );
                this.vertices = (json.vertices || [ ]).map( unserialize );
                this.faces = null; // (json.faces || [ ]).map( unserialize );
            }
            return this;
        },
        
        setMesh: function( mesh ) {
            this.mesh = mesh;
            this.vertices = [ ];
            // not used
            //this.faces = [];
            
            return this;
        },

        getVertices: function( ) {
            return this.vertices;
        },

        getFaces: function( ) {
            return this.faces;
        },

        analyzeGeometry: function( ) {
            // cache
            var vertices = this.vertices, vc = vertices.length, i = vc,
                v, xyz, x, y, z, 
                minX, maxX, 
                minY, maxY, 
                minZ, maxZ, 
                width, height, depth
            ;

            // get initial values
            if ( vc )
            {
                v = vertices[ 0 ];
                xyz = v.getXYZ( );
                x = xyz[ 0 ]; y = xyz[ 1 ]; z = xyz[ 2 ];
                minX = maxX = x;
                minY = maxY = y;
                minZ = maxZ = z;
            }
            // optimize loop using while counting down instead of up
            while ( --i >= 0 )
            {
                // cache
                v = vertices[ i ];
                xyz = v.getXYZ( );
                x = xyz[ 0 ]; y = xyz[ 1 ]; z = xyz[ 2 ];
                v.setOriginalPosition( x, y, z );
                
                minX = Min( minX, x );
                minY = Min( minY, y );
                minZ = Min( minZ, z );

                maxX = Max( maxX, x ); 
                maxY = Max( maxY, y ); 
                maxZ = Max( maxZ, z ); 
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

            var maxe = Max( width, height, depth );
            var mine = Min( width, height, depth );

            if ( maxe == width && mine == height ) 
            {
                this.minAxis = Y;
                this.midAxis = Z;
                this.maxAxis = X;
            } 
            else if ( maxe == width && mine == depth ) 
            {
                this.minAxis = Z;
                this.midAxis = Y;
                this.maxAxis = X;
            } 
            else if ( maxe == height && mine == width ) 
            {
                this.minAxis = X;
                this.midAxis = Z;
                this.maxAxis = Y;
            } 
            else if ( maxe == height && mine == depth ) 
            {
                this.minAxis = Z;
                this.midAxis = X;
                this.maxAxis = Y;
            } 
            else if ( maxe == depth && mine == width ) 
            {
                this.minAxis = X;
                this.midAxis = Y;
                this.maxAxis = Z;
            } 
            else if ( maxe == depth && mine == height ) 
            {
                this.minAxis = Y;
                this.midAxis = X;
                this.maxAxis = Z;
            }

            i = vc;
            // optimize loop using while counting down instead of up
            while ( --i >= 0 )
            {
                v = vertices[ i ];
                xyz = v.getXYZ( );
                v.setRatios((xyz[ 0 ] - minX) / width, (xyz[ 1 ] - minY) / height, (xyz[ 2 ] - minZ) / depth);
            }
            
            return this;
        },

        resetGeometry: function( ) {
            var vertices = this.vertices, vc = vertices.length;
            
            // optimize loop using while counting down instead of up
            while ( --vc >= 0 ) vertices[ vc ].reset( );
            this.update( );
            
            return this;
        },

        collapseGeometry: function( ) {
            var vertices = this.vertices, vc = vertices.length;
            
            // optimize loop using while counting down instead of up
            while ( --vc >= 0 ) vertices[ vc ].collapse( );
            this.update( );
            
            this.analyzeGeometry( );
            
            return this;
        },

        getMin: function( axis ) {
            switch( axis ) 
            {
                case X: return this.minX;
                case Y: return this.minY;
                case Z: return this.minZ;
            }
            return -1;
        },

        getMax: function( axis ) {
            switch( axis ) 
            {
                case X: return this.maxX;
                case Y: return this.maxY;
                case Z: return this.maxZ;
            }
            return -1;
        },

        getSize: function( axis ) {
            switch( axis ) 
            {
                case X: return this.width;
                case Y: return this.height;
                case Z: return this.depth;
            }
            return -1;
        },

        update: function( )  {
            // do nothing
            return this;
        },

        postApply: function( )  {
            // do nothing
            return this;
        },

        updateMeshPosition: function( p ) {
            // do nothing
            return this;
        }
    });
    MeshProxy.unserialize - function( json ) {
        if ( json && json.mesh && MOD3[ json.mesh ] )
        {
            return new MOD3[ json.mesh ]( ).unserialize( json );
        }
        // dummy, default
        return new MeshProxy( );
    };

    
}(MOD3);/**
*
* MOD3  Modifier Super Class
*
*
**/
!function(MOD3, undef){
    
    "use strict";
    
    var _modCount = 0, NONE = MOD3.ModConstant.NONE;
    
    var Modifier = MOD3.Modifier = MOD3.Class( MOD3.WorkerInterface, {
        
        constructor: function( mod ) {
            this.id = ++_modCount;
            this.name = 'Modifier';
            this.mod = mod || null;
            this.axes = NONE;
            this.constraint = NONE;
            this.enabled = true;
        },
        
        id: null,
        name: 'Modifier',
        mod : null,
        axes: null,
        constraint: null,
        enabled: true,

        dispose: function( withModifiable ) {
            this.disposeWorker( );
            if ( true === withModifiable && this.mod ) this.mod.dispose( );
            this.mod = null;
            this.name = null;
            this.axes = null;
            this.constraint = null;
            
            return this;
        },
        
        enable: function( enabled ) {
            if ( arguments.length )
            {
                this.enabled = !!enabled;
                return this;
            }
            return this.enabled;
        },
        
        constraintAxes: function( axes ) {
            this.axes = axes || NONE;
            return this;
        },
        
        setConstraint: function( c ) {
            this.constraint = c || NONE;
            return this;
        },
        
        setModifiable: function( mod ) {
            this.mod = mod;
            
            return this;
        },

        getVertices: function( ) {
            return this.mod ? this.mod.getVertices( ) : null;
        },

        // override
        _apply: function( ) {
            return this;
        },
        
        // override
        apply: function( cb ) {
            var self = this;
            if ( self._worker )
            {
                self
                    .bind( 'apply', function( data ) { 
                        self.unbind('apply');
                        if ( data && data.modifiable )
                            self.mod.unserialize( data.modifiable );
                        if ( cb ) cb.call( self );
                    })
                    .send( 'apply', { modifiable: self.mod.serialize( ) } )
                ;
            }
            else
            {
                self._apply( );
                if ( cb ) cb.call( self );
            }
            return self;
        },
        
        toString: function( ) {
            return '[Modifier '+this.name+']';
        }
    });
    
}(MOD3);/**
*
* MOD3  Library3D Super Class
*
*
**/
!function(MOD3, undef){
    
    "use strict";
    
    var Library3d = MOD3.Library3d = MOD3.Class({
        
        constructor: function( ) {
            this.id = '';
            this.meshClass = null;
            this.vertexClass = null;
        },
        
        id: '',
        meshClass: null,
        vertexClass: null
    });
    
    var PluginFactory = MOD3.PluginFactory = MOD3.StaticClass({
        
        getMeshProxy: function( lib3d ) {
            var MeshProxyClass = lib3d.meshClass;
            return (MeshProxyClass) ? new MeshProxyClass( ) : null;
        }
    });
    
}(MOD3);/**
*
* MOD3  ModifierStack Class
*
*
**/
!function(MOD3, undef){
    
    "use strict";
    
    var getMeshProxy = MOD3.PluginFactory.getMeshProxy;
    
    var ModifierStack = MOD3.ModifierStack = MOD3.Class( MOD3.WorkerInterface, {
        
        constructor: function( lib3d, mesh ) {
            this.baseMesh = null;
            this.stack = [ ];
            
            this.lib3d = lib3d;
            this.baseMesh = getMeshProxy( lib3d );
            this.baseMesh.setMesh( mesh );
            this.baseMesh.analyzeGeometry( );
        },

        name: "ModifierStack",
        
        lib3d: null,
        baseMesh: null,
        stack: null,

        dispose: function( withModifiers ) {
            this.lib3d = null;
            if ( withModifiers && this.stack )
            {
                while ( this.stack.length ) 
                    this.stack.pop( ).dispose( );
            }
            this.stack = null;
            if ( this.baseMesh ) this.baseMesh.dispose( );
            this.baseMesh = null;
            
            return this;
        },
        
        add: function( modifier ) {
            if ( modifier )
            {
                modifier.setModifiable( this.baseMesh );
                this.stack.push( modifier );
            }
            return this;
        },

        apply: function( ) {
            if ( this.baseMesh && this.stack && this.stack.length )
            {
                var stack = this.stack, sl = stack.length, 
                    baseMesh = this.baseMesh, i = 0;

                baseMesh.resetGeometry( );
                
                // optimize loop using while
                while ( i < sl )
                {
                    stack[ i ].enabled && stack[ i ].apply( );
                    i++;
                    // update the mesh after each modifier apply
                    // avoid to update with each vertex change, 
                    // if possible update the mesh all at once
                    //baseMesh.update();
                }
                baseMesh.update( );
                
                // do any post-process if needed
                //baseMesh.postApply();
            }
            return this;
        },

        collapse: function( ) {
            if ( this.baseMesh && this.stack && this.stack.length )
            {
                this.apply( );
                this.baseMesh.collapseGeometry( );
                this.stack.length = 0;
            }
            
            return this;
        },

        clear: function( ) {
            if ( this.stack ) this.stack.length = 0;
            
            return this;
        },

        getMeshInfo: function( ) {
            return this.baseMesh;
        }
    });
    // aliases
    ModifierStack.prototype.addModifier = ModifierStack.prototype.add;
    
}(MOD3);/*
 * A speed-improved perlin and simplex noise algorithms for 2D.
 *
 * Based on example code by Stefan Gustavson (stegu@itn.liu.se).
 * Optimisations by Peter Eastman (peastman@drizzle.stanford.edu).
 * Better rank ordering method by Stefan Gustavson in 2012.
 * Converted to Javascript by Joseph Gentle.
 *
 * Version 2012-03-09
 *
 * This code was placed in the public domain by its original author,
 * Stefan Gustavson. You may use it as you see fit, but
 * attribution is appreciated.
 *
 */

(function(global){
  var module = global.noise = {};

  function Grad(x, y, z) {
    this.x = x; this.y = y; this.z = z;
  }
  
  Grad.prototype.dot2 = function(x, y) {
    return this.x*x + this.y*y;
  };

  Grad.prototype.dot3 = function(x, y, z) {
    return this.x*x + this.y*y + this.z*z;
  };

  var grad3 = [new Grad(1,1,0),new Grad(-1,1,0),new Grad(1,-1,0),new Grad(-1,-1,0),
               new Grad(1,0,1),new Grad(-1,0,1),new Grad(1,0,-1),new Grad(-1,0,-1),
               new Grad(0,1,1),new Grad(0,-1,1),new Grad(0,1,-1),new Grad(0,-1,-1)];

  var p = [151,160,137,91,90,15,
  131,13,201,95,96,53,194,233,7,225,140,36,103,30,69,142,8,99,37,240,21,10,23,
  190, 6,148,247,120,234,75,0,26,197,62,94,252,219,203,117,35,11,32,57,177,33,
  88,237,149,56,87,174,20,125,136,171,168, 68,175,74,165,71,134,139,48,27,166,
  77,146,158,231,83,111,229,122,60,211,133,230,220,105,92,41,55,46,245,40,244,
  102,143,54, 65,25,63,161, 1,216,80,73,209,76,132,187,208, 89,18,169,200,196,
  135,130,116,188,159,86,164,100,109,198,173,186, 3,64,52,217,226,250,124,123,
  5,202,38,147,118,126,255,82,85,212,207,206,59,227,47,16,58,17,182,189,28,42,
  223,183,170,213,119,248,152, 2,44,154,163, 70,221,153,101,155,167, 43,172,9,
  129,22,39,253, 19,98,108,110,79,113,224,232,178,185, 112,104,218,246,97,228,
  251,34,242,193,238,210,144,12,191,179,162,241, 81,51,145,235,249,14,239,107,
  49,192,214, 31,181,199,106,157,184, 84,204,176,115,121,50,45,127, 4,150,254,
  138,236,205,93,222,114,67,29,24,72,243,141,128,195,78,66,215,61,156,180];
  // To remove the need for index wrapping, double the permutation table length
  var perm = new Array(512);
  var gradP = new Array(512);

  // This isn't a very good seeding function, but it works ok. It supports 2^16
  // different seed values. Write something better if you need more seeds.
  module.seed = function(seed) {
    if(seed > 0 && seed < 1) {
      // Scale the seed out
      seed *= 65536;
    }

    seed = Math.floor(seed);
    if(seed < 256) {
      seed |= seed << 8;
    }

    for(var i = 0; i < 256; i++) {
      var v;
      if (i & 1) {
        v = p[i] ^ (seed & 255);
      } else {
        v = p[i] ^ ((seed>>8) & 255);
      }

      perm[i] = perm[i + 256] = v;
      gradP[i] = gradP[i + 256] = grad3[v % 12];
    }
  };

  module.seed(0);

  /*
  for(var i=0; i<256; i++) {
    perm[i] = perm[i + 256] = p[i];
    gradP[i] = gradP[i + 256] = grad3[perm[i] % 12];
  }*/

  // Skewing and unskewing factors for 2, 3, and 4 dimensions
  var F2 = 0.5*(Math.sqrt(3)-1);
  var G2 = (3-Math.sqrt(3))/6;

  var F3 = 1/3;
  var G3 = 1/6;

  // 2D simplex noise
  module.simplex2 = function(xin, yin) {
    var n0, n1, n2; // Noise contributions from the three corners
    // Skew the input space to determine which simplex cell we're in
    var s = (xin+yin)*F2; // Hairy factor for 2D
    var i = Math.floor(xin+s);
    var j = Math.floor(yin+s);
    var t = (i+j)*G2;
    var x0 = xin-i+t; // The x,y distances from the cell origin, unskewed.
    var y0 = yin-j+t;
    // For the 2D case, the simplex shape is an equilateral triangle.
    // Determine which simplex we are in.
    var i1, j1; // Offsets for second (middle) corner of simplex in (i,j) coords
    if(x0>y0) { // lower triangle, XY order: (0,0)->(1,0)->(1,1)
      i1=1; j1=0;
    } else {    // upper triangle, YX order: (0,0)->(0,1)->(1,1)
      i1=0; j1=1;
    }
    // A step of (1,0) in (i,j) means a step of (1-c,-c) in (x,y), and
    // a step of (0,1) in (i,j) means a step of (-c,1-c) in (x,y), where
    // c = (3-sqrt(3))/6
    var x1 = x0 - i1 + G2; // Offsets for middle corner in (x,y) unskewed coords
    var y1 = y0 - j1 + G2;
    var x2 = x0 - 1 + 2 * G2; // Offsets for last corner in (x,y) unskewed coords
    var y2 = y0 - 1 + 2 * G2;
    // Work out the hashed gradient indices of the three simplex corners
    i &= 255;
    j &= 255;
    var gi0 = gradP[i+perm[j]];
    var gi1 = gradP[i+i1+perm[j+j1]];
    var gi2 = gradP[i+1+perm[j+1]];
    // Calculate the contribution from the three corners
    var t0 = 0.5 - x0*x0-y0*y0;
    if(t0<0) {
      n0 = 0;
    } else {
      t0 *= t0;
      n0 = t0 * t0 * gi0.dot2(x0, y0);  // (x,y) of grad3 used for 2D gradient
    }
    var t1 = 0.5 - x1*x1-y1*y1;
    if(t1<0) {
      n1 = 0;
    } else {
      t1 *= t1;
      n1 = t1 * t1 * gi1.dot2(x1, y1);
    }
    var t2 = 0.5 - x2*x2-y2*y2;
    if(t2<0) {
      n2 = 0;
    } else {
      t2 *= t2;
      n2 = t2 * t2 * gi2.dot2(x2, y2);
    }
    // Add contributions from each corner to get the final noise value.
    // The result is scaled to return values in the interval [-1,1].
    return 70 * (n0 + n1 + n2);
  };

  // 3D simplex noise
  module.simplex3 = function(xin, yin, zin) {
    var n0, n1, n2, n3; // Noise contributions from the four corners

    // Skew the input space to determine which simplex cell we're in
    var s = (xin+yin+zin)*F3; // Hairy factor for 2D
    var i = Math.floor(xin+s);
    var j = Math.floor(yin+s);
    var k = Math.floor(zin+s);

    var t = (i+j+k)*G3;
    var x0 = xin-i+t; // The x,y distances from the cell origin, unskewed.
    var y0 = yin-j+t;
    var z0 = zin-k+t;

    // For the 3D case, the simplex shape is a slightly irregular tetrahedron.
    // Determine which simplex we are in.
    var i1, j1, k1; // Offsets for second corner of simplex in (i,j,k) coords
    var i2, j2, k2; // Offsets for third corner of simplex in (i,j,k) coords
    if(x0 >= y0) {
      if(y0 >= z0)      { i1=1; j1=0; k1=0; i2=1; j2=1; k2=0; }
      else if(x0 >= z0) { i1=1; j1=0; k1=0; i2=1; j2=0; k2=1; }
      else              { i1=0; j1=0; k1=1; i2=1; j2=0; k2=1; }
    } else {
      if(y0 < z0)      { i1=0; j1=0; k1=1; i2=0; j2=1; k2=1; }
      else if(x0 < z0) { i1=0; j1=1; k1=0; i2=0; j2=1; k2=1; }
      else             { i1=0; j1=1; k1=0; i2=1; j2=1; k2=0; }
    }
    // A step of (1,0,0) in (i,j,k) means a step of (1-c,-c,-c) in (x,y,z),
    // a step of (0,1,0) in (i,j,k) means a step of (-c,1-c,-c) in (x,y,z), and
    // a step of (0,0,1) in (i,j,k) means a step of (-c,-c,1-c) in (x,y,z), where
    // c = 1/6.
    var x1 = x0 - i1 + G3; // Offsets for second corner
    var y1 = y0 - j1 + G3;
    var z1 = z0 - k1 + G3;

    var x2 = x0 - i2 + 2 * G3; // Offsets for third corner
    var y2 = y0 - j2 + 2 * G3;
    var z2 = z0 - k2 + 2 * G3;

    var x3 = x0 - 1 + 3 * G3; // Offsets for fourth corner
    var y3 = y0 - 1 + 3 * G3;
    var z3 = z0 - 1 + 3 * G3;

    // Work out the hashed gradient indices of the four simplex corners
    i &= 255;
    j &= 255;
    k &= 255;
    var gi0 = gradP[i+   perm[j+   perm[k   ]]];
    var gi1 = gradP[i+i1+perm[j+j1+perm[k+k1]]];
    var gi2 = gradP[i+i2+perm[j+j2+perm[k+k2]]];
    var gi3 = gradP[i+ 1+perm[j+ 1+perm[k+ 1]]];

    // Calculate the contribution from the four corners
    var t0 = 0.5 - x0*x0-y0*y0-z0*z0;
    if(t0<0) {
      n0 = 0;
    } else {
      t0 *= t0;
      n0 = t0 * t0 * gi0.dot3(x0, y0, z0);  // (x,y) of grad3 used for 2D gradient
    }
    var t1 = 0.5 - x1*x1-y1*y1-z1*z1;
    if(t1<0) {
      n1 = 0;
    } else {
      t1 *= t1;
      n1 = t1 * t1 * gi1.dot3(x1, y1, z1);
    }
    var t2 = 0.5 - x2*x2-y2*y2-z2*z2;
    if(t2<0) {
      n2 = 0;
    } else {
      t2 *= t2;
      n2 = t2 * t2 * gi2.dot3(x2, y2, z2);
    }
    var t3 = 0.5 - x3*x3-y3*y3-z3*z3;
    if(t3<0) {
      n3 = 0;
    } else {
      t3 *= t3;
      n3 = t3 * t3 * gi3.dot3(x3, y3, z3);
    }
    // Add contributions from each corner to get the final noise value.
    // The result is scaled to return values in the interval [-1,1].
    return 32 * (n0 + n1 + n2 + n3);

  };

  // ##### Perlin noise stuff

  function fade(t) {
    return t*t*t*(t*(t*6-15)+10);
  }

  function lerp(a, b, t) {
    return (1-t)*a + t*b;
  }

  // 2D Perlin Noise
  module.perlin2 = function(x, y) {
    // Find unit grid cell containing point
    var X = Math.floor(x), Y = Math.floor(y);
    // Get relative xy coordinates of point within that cell
    x = x - X; y = y - Y;
    // Wrap the integer cells at 255 (smaller integer period can be introduced here)
    X = X & 255; Y = Y & 255;

    // Calculate noise contributions from each of the four corners
    var n00 = gradP[X+perm[Y]].dot2(x, y);
    var n01 = gradP[X+perm[Y+1]].dot2(x, y-1);
    var n10 = gradP[X+1+perm[Y]].dot2(x-1, y);
    var n11 = gradP[X+1+perm[Y+1]].dot2(x-1, y-1);

    // Compute the fade curve value for x
    var u = fade(x);

    // Interpolate the four results
    return lerp(
        lerp(n00, n10, u),
        lerp(n01, n11, u),
       fade(y));
  };

  // 3D Perlin Noise
  module.perlin3 = function(x, y, z) {
    // Find unit grid cell containing point
    var X = Math.floor(x), Y = Math.floor(y), Z = Math.floor(z);
    // Get relative xyz coordinates of point within that cell
    x = x - X; y = y - Y; z = z - Z;
    // Wrap the integer cells at 255 (smaller integer period can be introduced here)
    X = X & 255; Y = Y & 255; Z = Z & 255;

    // Calculate noise contributions from each of the eight corners
    var n000 = gradP[X+  perm[Y+  perm[Z  ]]].dot3(x,   y,     z);
    var n001 = gradP[X+  perm[Y+  perm[Z+1]]].dot3(x,   y,   z-1);
    var n010 = gradP[X+  perm[Y+1+perm[Z  ]]].dot3(x,   y-1,   z);
    var n011 = gradP[X+  perm[Y+1+perm[Z+1]]].dot3(x,   y-1, z-1);
    var n100 = gradP[X+1+perm[Y+  perm[Z  ]]].dot3(x-1,   y,   z);
    var n101 = gradP[X+1+perm[Y+  perm[Z+1]]].dot3(x-1,   y, z-1);
    var n110 = gradP[X+1+perm[Y+1+perm[Z  ]]].dot3(x-1, y-1,   z);
    var n111 = gradP[X+1+perm[Y+1+perm[Z+1]]].dot3(x-1, y-1, z-1);

    // Compute the fade curve value for x, y, z
    var u = fade(x);
    var v = fade(y);
    var w = fade(z);

    // Interpolate
    return lerp(
        lerp(
          lerp(n000, n100, u),
          lerp(n001, n101, u), w),
        lerp(
          lerp(n010, n110, u),
          lerp(n011, n111, u), w),
       v);
  };

})(this);
/**
*
* MOD3  Pivot Modifier
*
*
**/

/**[DOC_MD]
 * ###Pivot modifier 
 *
 * Allows to move the pivot point of a 3D mesh.
 *
 * @author Bartek Drozdz
 *  
[/DOC_MD]**/

(function(MOD3, undef){
    
    "use strict";
    
    var Vector3 = MOD3.Vector3;
    
    var Pivot = MOD3.Pivot = MOD3.Class ( MOD3.Modifier, {
        
        constructor: function( x, y, z ) {
            this.$super('constructor');
            this.name = 'Pivot';
            this.pivot = new Vector3([x, y, z]);
        },
        
        pivot: null,
        
        dispose: function( ) {
            this.pivot.dispose( );
            this.pivot = null;
            this.$super('dispose');
            
            return this;
        },
        
        setMeshCenter: function( ) {
            // cache
            var mod = this.mod;
            
            this.pivot = new Vector3(
                -(mod.minX + 0.5*mod.width), 
                -(mod.minY + 0.5*mod.height), 
                -(mod.minZ + 0.5*mod.depth)
            );
            
            return this;
        },
        
        apply: function( ) {
            var vs = this.mod.vertices, vc = vs.length, 
                pivot = this.pivot, v, vv;

            // optimize loop using while counting down instead of up
            while ( --vc >= 0 )
            {
                v = vs[ vc ];
                v.setVector( v.getVector( ).addSelf( pivot ) );
            }

            this.mod.updateMeshPosition( pivot.negate( ) );
            
            return this;
        }
    });
    
})(MOD3);/**
*
* MOD3  Bend Modifier
*
*
**/

/**[DOC_MD]
 * ###Bend modifier 
 *
 * Bends an object along an axis. 
 *
 * @author Bartek Drozdz
 *  
[/DOC_MD]**/

(function(MOD3, undef){
    
    "use strict";
    
    var NONE = MOD3.ModConstant.NONE, LEFT = MOD3.ModConstant.LEFT,  RIGHT = MOD3.ModConstant.RIGHT,
        Matrix = MOD3.Matrix,  Atan = Math.atan, Atan2 = Math.atan2, Sin = Math.sin, Cos = Math.cos,
        PI = MOD3.Constants.PI, halfPI = MOD3.Constants.halfPI, doublePI = MOD3.Constants.doublePI,
        Point = MOD3.Point
    ;
    
    var Bend = MOD3.Bend = MOD3.Class ( MOD3.Modifier, {
        
        constructor: function( f, o, a ) {
            this.$super('constructor');
            this.name = 'Bend';
            this.constraint = NONE;
            this.max = 0;
            this.min = 0;
            this.mid = 0;
            this.width = 0;
            this.height = 0;
            this.origin = 0;
            this.m1 = null;
            this.m2 = null;
            this.diagAngle = 0;
            this.switchAxes = false;

            this.force = (f!==undef) ? f : 0;
            this.offset = (o!==undef) ? o : 0;
            if (a!==undef) this.setAngle( a );
            else this.setAngle( 0 );
        },
    
        force: 0,
        offset: 0,
        angle: 0,
        diagAngle: 0,
        max: 0,
        min: 0,
        mid: 0,
        width: 0,
        height: 0,
        origin: 0,
        m1: null,
        m2: null,
        switchAxes: false,
        
        dispose: function( ) {
            this.force = null;
            this.offset = null;
            this.angle = null;
            this.diagAngle = null;
            this.max = null;
            this.min = null;
            this.mid = null;
            this.width = null;
            this.height = null;
            this.origin = null;
            this.m1 && this.m1.dispose( );
            this.m2 && this.m2.dispose( );
            this.m1 = null;
            this.m2 = null;
            this.switchAxes = null;
            this.$super('dispose');
            
            return this;
        },
        
        setAngle: function( a ) { 
            this.angle = a; 
            this.m1 = new Matrix( ).rotate( a );
            this.m2 = new Matrix( ).rotate( -a );
            
            return this;
        },
        
        setModifiable: function( mod ) {
            this.$super("setModifiable", mod);
            
            this.max = (this.switchAxes) ? this.mod.midAxis : this.mod.maxAxis;
            this.min = this.mod.minAxis;
            this.mid = (this.switchAxes) ? this.mod.maxAxis : this.mod.midAxis;
                
            this.width = this.mod.getSize( this.max );    
            this.height = this.mod.getSize( this.mid );
            this.origin = this.mod.getMin( this.max );
            
            this.diagAngle = Atan( this.width / this.height );
            
            return this;
        },
        
        apply: function( ) {   
            if ( !this.force ) return  this;

            var vs = this.mod.vertices, vc = vs.length,
                constraint = this.constraint,
                width = this.width, 
                offset = this.offset, 
                origin = this.origin, 
                force = this.force, 
                max = this.max, 
                min = this.min, 
                mid = this.mid, 
                m1 = this.m1, 
                m2 = this.m2,
            
                distance = origin + width * offset,
                radius = width / PI / force,
                bendAngle = doublePI * (width / (radius * doublePI)),
                v, vmax, vmid, vmin, np, p, fa, op, ow, np2,
                invwidth = 1.0/width
            ;
            
            // optimize loop using while counting down instead of up
            while ( --vc >= 0 )
            {
                v = vs[ vc ];
                
                vmax = v.getValue( max );
                vmid = v.getValue( mid );
                vmin = v.getValue( min );

                np = m1.transformPointSelf( new Point( vmax, vmid ) );
                vmax = np.x;
                vmid = np.y;

                p = (vmax - origin) * invwidth;

                if (
                    ( (LEFT === constraint) && (p <= offset) ) || 
                    ( (RIGHT === constraint) && (p >= offset) )
                ) 
                {  
                    /* do nothing */ 
                } 
                else 
                {
                    fa = (halfPI - bendAngle * offset) + (bendAngle * p);
                    op = Sin(fa) * (radius + vmin);
                    ow = Cos(fa) * (radius + vmin);
                    vmin = op - radius;
                    vmax = distance - ow;
                }

                np2 = m2.transformPointSelf( new Point( vmax, vmid ) );
                vmax = np2.x;
                vmid = np2.y;
                
                v.setValue( max, vmax );
                v.setValue( mid, vmid );
                v.setValue( min, vmin );
            }
            
            return this;
        }
    });
    
})(MOD3);/**
*
* MOD3  Bloat Modifier
*
*
**/

/**[DOC_MD]
 * ###Bloat modifier 
 *
 * Bloats a mesh by forcing vertices out of specified sphere
 *
 * @author makc
 *  
[/DOC_MD]**/

(function(MOD3, undef){
    
    "use strict";
    
    var Vector3 = MOD3.Vector3, Max = Math.max, Exp = Math.exp;
    
    var Bloat = MOD3.Bloat = MOD3.Class ( MOD3.Modifier, {
        
        constructor: function( ) {
            this.$super('constructor');
            this.name = 'Bloat';
            this.radius = 0;
            this.a = 0.01;
            this.center = Vector3.ZERO( );
            //this.u = Vector3.ZERO();
        },
        
        center: null,
        radius: 0,
        a: 0.01,
        //u: null,
        
        dispose: function( ) {
            this.center.dispose( );
            this.center = null;
            this.radius = null;
            this.a = null;
            this.$super('dispose');
            
            return this;
        },
        
        setRadius: function( v )  {
            this.radius = Max( 0, v ); 
            
            return this;
        },
        
        setA: function( v )  {
            this.a = Max( 0, v ); 
            
            return this;
        },
        
        apply: function( )  {
            var vs = this.mod.vertices, vc = vs.length, 
                center = this.center, radius = this.radius, a = this.a;
            var v, magn, uu; //=Vector3.ZERO();

            // optimize loop using while counting down instead of up
            while ( --vc >= 0 )
            {
                v = vs[ vc ];
                
                // get a vector towards vertex
                uu = v.getVector( ).subtractSelf( center );
                
                // change norm to norm + r * exp (-a * norm)
                magn = uu.getMagnitude( );
                uu.setMagnitude( magn + radius * Exp ( - magn * a ) );

                // move vertex accordingly
                v.setVector( uu.addSelf( center ) );
                
                // ?? needed??
                //this.u=uu;
            }
            
            return this;
        }
    });
    
})(MOD3);﻿/**
*
* MOD3  Twist Modifier
*
*
**/

/**[DOC_MD]
 * ###Twist modifier 
 *
 * Twist mesh along an axis
 * Adapted from the Twist modifier for PV3D
 * 
[/DOC_MD]**/

(function(MOD3, undef){
    
    "use strict";
    
    var Vector3 = MOD3.Vector3, Matrix4 = MOD3.Matrix4;
    
    var Twist = MOD3.Twist = MOD3.Class ( MOD3.Modifier, {
        
        constructor: function( a ) {
            this.$super('constructor');
            this.name = 'Twist';
            this.vector = new Vector3([0, 1, 0]).normalizeSelf( );
            this.angle = (a !== undef) ? a : 0;
            this.center = Vector3.ZERO( );
            this.mat1 = new Matrix4( );
            this.mat2 = new Matrix4( );
        },
        
        vector: null,
        angle: 0,
        center: null,
        mat1: null,
        mat2: null,
        
        dispose: function( ) {
            this.vector.dispose( );
            this.vector = null;
            this.angle = null;
            this.center.dispose( );
            this.center = null;
            this.mat1.dispose( );
            this.mat2.dispose( );
            this.mat1 = null;
            this.mat2 = null;
            this.$super('dispose');
            
            return this;
        },
        
        apply: function( ) {
            var mod = this.mod, vs = mod.vertices, vc = vs.length,
                vector = this.vector, angle = this.angle, center = this.center,
                dv = new Vector3([0.5*mod.maxX, 0.5*mod.maxY, 0.5*mod.maxZ]), 
                invdvm = 1.0 / dv.getMagnitude( ), 
                factor = invdvm * angle,
                d = -Vector3.dot( vector, center ),
                v, dd, vec
            ;

            // optimize loop using while counting down instead of up
            while ( --vc >= 0 )
            {
                v = vs[ vc ];
                vec = v.getVector( );
                dd = Vector3.dot( vec, vector ) + d;
                v.setVector( this.twistPoint( vec, vector, dd * factor ) );
            }
            
            return this;
        },
        
        twistPoint: function( vertexvector, vector, a ) {
            var mat1 = this.mat1.reset( ).translationMatrixFromVector( vertexvector ),
                mat2 = this.mat2.reset( ).rotationMatrixFromVector( vector, a )
            ;   
            mat2.multiply( mat1 );
            
            return new Vector3([mat2.n14, mat2.n24, mat2.n34]);
        }
    });
    
})(MOD3);/**
*
* MOD3  Skew Modifier
*
*
**/

/**[DOC_MD]
 * ###Skew modifier 
 *
 * Skew mesh along an axis
 *
 * @author Bartek Drozdz
 *  
[/DOC_MD]**/

(function(MOD3, undef){
    
    "use strict";
    
    var Abs = Math.abs, Pow = Math.pow,
        Sign = MOD3.XMath.sign,
        ModConstant = MOD3.ModConstant,
        NONE = ModConstant.NONE, LEFT = ModConstant.LEFT, RIGHT = ModConstant.RIGHT,
        X = ModConstant.X, Y = ModConstant.Y, Z = ModConstant.Z
    ;
    
    var Skew = MOD3.Skew = MOD3.Class ( MOD3.Modifier, {
        
        constructor: function( f ) {
            this.$super('constructor');
            this.name = 'Skew';
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
        
        force: 0,
        skewAxis: 0,
        offset: 0.5,
        power: 1,
        falloff:  1,
        inverseFalloff: false,
        oneSide: false,
        swapAxes: false,
        
        dispose: function( ) {
            this.force = null;
            this.skewAxis = null;
            this.offset = null;
            this.power = null;
            this.falloff = null;
            this.inverseFalloff = null;
            this.oneSide = null;
            this.swapAxes = null;
            this.$super('dispose');
            
            return this;
        },
        
        setModifiable: function( mod ) {
            this.$super("setModifiable", mod)
            this.skewAxis = this.skewAxis || this.mod.maxAxis;
            
            return this;
        },
        
        apply: function( ) {
            var vs = this.mod.vertices, vc = vs.length,
                constraint = this.constraint, 
                skewAxis = this.skewAxis, 
                offset = this.offset,
                oneSide = this.oneSide, 
                inverseFalloff = this.inverseFalloff, 
                falloff = this.falloff, 
                mirrorfalloff = 1-falloff,
                power = this.power, 
                force = this.force, 
                displaceAxis = this.getDisplaceAxis( ),
                v, r, dr, f, p, vl, vRatio, sign
            ;

            // optimize loop using while counting down instead of up
            while ( --vc >= 0 )
            {
                v = vs[ vc ];
                vRatio = v.getRatio( skewAxis );
                if ( LEFT === constraint && vRatio <= offset ) continue;
                if ( RIGHT === constraint && vRatio > offset ) continue;

                r = vRatio - offset;
                if ( oneSide ) r = Abs( r );

                dr = v.getRatio( displaceAxis );
                if ( inverseFalloff ) dr = 1 - dr;

                f = falloff + dr * mirrorfalloff;

                sign = (0 > r) ? -1 : 1;
                p = Pow( Abs( r ), power ) * sign /*Sign(r, 1)*/;
                vl = v.getValue( displaceAxis ) + force * p * f;
                v.setValue( displaceAxis, vl );
            }
            
            return this;
        },
        
        getDisplaceAxis: function( ) {
            var ska = this.skewAxis, swa = this.swapAxes;
            
            switch( ska ) 
            {
                case X:
                    return ( swa ) ? Z : Y;
                case Y:
                    return ( swa ) ? Z : X;
                case Z:
                    return ( swa ) ? Y : X;
                return 0;
            }
        }
    });
    
})(MOD3);/**
*
* MOD3  Taper Modifier
*
*
**/

/**[DOC_MD]
 * ###Taper modifier 
 *
 * The taper modifier displaces the vertices on two axes proportionally to their position on the third axis.
 *
 * @author Bartek Drozdz
 *  
[/DOC_MD]**/

(function(MOD3, undef){
    
    "use strict";
    
    var Vector3 = MOD3.Vector3, Matrix4 = MOD3.Matrix4, Pow = Math.pow;
    
    var Taper = MOD3.Taper = MOD3.Class ( MOD3.Modifier, {
        
        constructor: function( f, p )  {
            this.$super('constructor');
            this.name = 'Taper';
            /*this.start = 0;
            this.end = 1;*/

            this.vector = new Vector3([1, 0, 1]);
            this.vector2 = new Vector3([0, 1, 0]);
            
            this.force = (f !== undef) ? f : 0;
            this.power = (p !== undef) ? p : 1;
        },
        
        force: 0,
        power: 1,
        /*start: 0,
        end: 1,*/
        vector: null,
        vector2: null,
        
        /*setFalloff : function(start, end)  {
            this.start = (start!==undef) ? start : 0;
            this.end = (end!==undef) ? end : 1;
            
            return this;
        },*/
        
        dispose: function( ) {
            this.vector.dispose( );
            this.vector2.dispose( );
            this.vector = null;
            this.vector2 = null;
            this.force = null;
            this.power = null;
            this.$super('dispose');
            
            return this;
        },
        
        apply: function( ) {
            var vs = this.mod.vertices, vc = vs.length,
                vector = this.vector, 
                vector2 = this.vector2, 
                force = this.force, 
                power = this.power,
                v, ar, sc, m, n, vxyz
            ;
            
            m = new Matrix4( );
            
            // optimize loop using while counting down instead of up
            while ( --vc >= 0 )
            {
                v = vs[ vc ];
                
                ar = v.getRatioVector( ).multiply( vector2 );
                sc = (1 !== power) ? force * Pow(ar.getMagnitude( ), power) : force * ar.getMagnitude( );
                vxyz = vector.xyz;
                m.reset( ).scaleMatrix( 1 + sc * vxyz[ 0 ], 1 + sc * vxyz[ 1 ], 1 + sc * vxyz[ 2 ] );
                n = v.getVector( );
                v.setVector( m.multiplyVector( n ) );
            }
            
            return this;
        }
    });
    
})(MOD3);/**
*
* MOD3  Wheel Modifier
*
*
**/

/**[DOC_MD]
 * ###Wheel modifier 
 *
 * Use it with vehicle models for wheels.
 *
 *      The usual problem with a 3d wheel in a vahicle is that it is 
 *      supposed to turn (steer) and roll in the same time. 
 *      So, this code:
 *      
 *      ```javascript
 *      wheel.rotationY = 10; // Steer 10deg to the left
 *      wheel.rotationZ +- 5; // Roll with a speed of 5
 *      ```
 *      This will make the wheel roll incorectly.
 *      
 *      A usual way to solve this problem is to put the wheel in another DisplayObject3D/Mesh, 
 *      turn the parent and roll the child, like that:
 *      ```javascript
 *      steer.rotationY = 10; // Steer 10deg to the left
 *      steer.wheel.rotationZ +- 5; // Roll with a speed of 5
 *      ```
 *      That will make the wheel behave correctly. But it can be uncomfortanble to apply, especially
 *      to imported complex Collada models.
 *      
 *      The Wheel modifier elegantly solves this problem by doind the proper math in order to steer and roll 
 *      a single mesh at the same time. The only thing you need to do is to specify a steer vector and 
 *      roll vector - usually it will be 2 of the cardinal axes. The default value is:
 *      
 *      * steer - along the Y axis / new Vector3(0, 1, 0)</li>
 *      * roll - along the Z axis / new Vector3(0, 0, 1)</li>
 *      
 *      
 *      It should work with most car models imported from 3D editors as this is the natural position of a wheel.
 *      
 *      <i>Please note, that Papervision primitive cylinder, which may also be used as wheel, will require different axes
 *      (Y for roll and Z or X for steer).</i>
 *  
 * @author Bartek Drozdz
 * 
 [/DOC_MD]**/
 
(function(MOD3, undef){
    
    "use strict";
    
    var invPI = MOD3.Constants.invPI, 
        doublePI = MOD3.Constants.doublePI,
        Vector3 = MOD3.Vector3, Matrix4 = MOD3.Matrix4
    ;
    
    var Wheel = MOD3.Wheel = MOD3.Class( MOD3.Modifier, {
       
       constructor: function( ) {
            this.$super('constructor');
            this.name = 'Wheel';
            this.speed = 0;
            this.turn = 0;
            this.roll = 0;
            this.radius = 0;
            this.steerVector = new Vector3([0, 1, 0]);
            this.rollVector = new Vector3([0, 0, 1]);
        },
        
        speed:  0,
        turn: 0,
        roll: 0,
        radius: 0,
        steerVector: null,
        rollVector: null,
        
        dispose: function( ) {
            this.speed = null;
            this.turn = null;
            this.roll = null;
            this.radius = null;
            this.steerVector.dispose( );
            this.rollVector.dispose( );
            this.steerVector = null;
            this.rollVector = null;
            this.$super('dispose');
            
            return this;
        },
        
        setModifiable: function( mod ) {
            this.$super("setModifiable", mod);
            this.radius = 0.5*this.mod.width;
            
            return this;
        },
        
        apply: function( ) {
            var vs = this.mod.vertices, vc = vs.length,
                steerVector = this.steerVector, 
                turn = this.turn, 
                rollVector = this.rollVector, 
                roll = this.roll,
                ms = null, mt = null, rv = null, v, c
            ;
            
            this.roll += this.speed;
            
            if ( turn ) 
            {
                mt = new Matrix4( ).rotationMatrixFromVector( steerVector, turn );
                rv = mt.multiplyVector( rollVector.clone( ) );
                ms = new Matrix4( ).rotationMatrixFromVector( rv, roll );
            } 
            else 
            {
                ms = new Matrix4( ).rotationMatrixFrom( rollVector, roll );
            }

            // optimize loop using while counting down instead of up
            while ( --vc >= 0 )
            {
                v = vs[ vc ];
                c = v.getVector( );
                
                if ( mt ) mt.multiplyVector( c );
                
                v.setVector( ms.multiplyVector( c ) );
            }
             
            return this;
       },
        
        getStep: function( )  {
            return this.radius * this.speed * invPI;
        },
        
        getPerimeter: function( )  {
            return this.radius * doublePI;
        }
    });
    
})(MOD3);/**
*
* MOD3  Break Modifier
*
*
**/

/**[DOC_MD]
 * ###Break modifier 
 *
 * Allow to break a mesh
 *
 * @author Bartek Drozdz
 *  
[/DOC_MD]**/

(function(MOD3, undef){
    
    "use strict";
    
    var Vector3 = MOD3.Vector3, Range = MOD3.Range, Matrix4 = MOD3.Matrix4;
    
    var Break = MOD3.Break = MOD3.Class ( MOD3.Modifier, {
        
        constructor: function( o, a ) {
            this.$super('constructor');
            this.name = 'Break';
            this.bv = new Vector3([0, 1, 0]);
            this.range = new Range(0, 1);
            
            this.offset = (o !== undef) ? o : 0;
            this.angle = (a !== undef) ? a : 0;
        },
        
        bv: null,
        range: null,
        offset: 0,
        angle: 0,
        
        dispose: function( ) {
            this.bv.dispose( );
            this.bv = null;
            this.range.dispose( );
            this.range = null;
            this.offset = null;
            this.angle = null;
            this.$super('dispose');
            
            return this;
        },
        
        apply: function( ) {
            var mod = this.mod, vs = mod.vertices, vc = vs.length,
                offset = this.offset, range = this.range, angle = this.angle, bv = this.bv, bvxyz = bv.xyz,
                pv, npv, v, c, rm;

            pv = new Vector3([0, 0, -(mod.minZ + mod.depth * offset)]);
            npv = pv.negate( );
            rm = new Matrix4( ).rotationMatrix( bvxyz[ 0 ], bvxyz[ 1 ], bvxyz[ 2 ], angle );


            // optimize loop using while counting down instead of up
            while ( --vc >= 0 )
            {
                v = vs[ vc ];
                c = v.getVector( ).addSelf( pv );

                if( c.xyz[ 2 ] >= 0 && range.isIn( v.ratio[ 1 ] ) ) 
                {
                    rm.multiplyVector( c );
                }
                
                v.setVector( c.addSelf( npv ) );
            }
             
            return this;
       }
    });
    
})(MOD3);/**
*
* MOD3  Noise Modifier
*
*
**/

/**[DOC_MD]
 * ###Noise modifier 
 *
 * Randomly displaces each vertex in all 3 axes
 *
 *  
[/DOC_MD]**/

(function(MOD3, undef){
    
    "use strict";
    
    var NONE = MOD3.ModConstant.NONE,
        X = MOD3.ModConstant.X, Y = MOD3.ModConstant.Y, Z = MOD3.ModConstant.Z,
        A = MOD3.VecArray, Rand = Math.random
    ;
    
    var Noise = MOD3.Noise = MOD3.Class ( MOD3.Modifier, {
        
        constructor: function( f ) {
            this.$super('constructor');
            this.name = 'Noise';
            this.axes = NONE;
            this.start = 0;
            this.end = 0; //1;
            this.force = (f !== undef) ? f : 0;
        },
        
        force: 0,
        start: 0,
        end: 1,
        
        dispose: function( ) {
            this.force = null;
            this.start = null;
            this.end = null;
            this.$super('dispose');
            
            return this;
        },
        
        setFalloff: function( start, end ) {
            this.start = (start !== undef) ? start : 0;
            this.end = (end !== undef) ? end : 1;
            
            return this;
        },
        
        apply: function( ) {
            var mod = this.mod, axes = this.axes, start = this.start, end = this.end, 
                vs = mod.vertices, vc = vs.length, force = this.force, halfforce = 0.5*force,
                maxAxis = mod.maxAxis, v, r, p, rp, xyz;

            if ( !axes || !force ) return this;
            // optimize loop using while counting down instead of up
            while ( --vc >= 0 )
            {
                v = vs[ vc ];
                r = (Rand( ) * force) - (halfforce);

                p = v.getRatio( maxAxis );
                if ( start < end ) 
                {
                    if ( p < start ) p = 0;
                    else if ( p > end ) p = 1;
                } 
                else if ( start > end ) 
                {
                    p = 1 - p;
                    if ( p > start ) p = 0;
                    else if ( p < end ) p = 1;
                } 
                else 
                {
                    p = 1;
                }

                rp = r * p;
                xyz = v.getXYZ( );
                v.setXYZ( [ 
                    xyz[ 0 ] + (( !(axes & X) ) ? rp : 0), 
                    xyz[ 1 ] + (( !(axes & Y) ) ? rp : 0), 
                    xyz[ 2 ] + (( !(axes & Z) ) ? rp : 0) 
                ] );
            }
            
            return this;
        }
    });
    
})(MOD3);/**
*
* MOD3  DisplaceMap (BitmapDisplacement) Modifier
*
*
**/

/**[DOC_MD]
 * ###DisplaceMap (BitmapDisplacement) Modifier 
 *
 * Displaces vertices based on RGB values of bitmapData pixels. 
 * 
 * BitmapDisplacement is inspired by both the AS3 built-in DisplacementMapFilter. It allows
 * to use color values for each channels of a bitmap to modify the position of vertices in a mesh.
 * 
 * The displacement takes place along the cardinal axes, and each axis is mapped to a 
 * channel in the bitmap: X for Red, Y for Green and Z for Blue.
 * 
 * @author Bartek Drozdz
 * 
[/DOC_MD]**/

(function(MOD3, undef){
    
    "use strict";
    
    var ModConstant = MOD3.ModConstant, NONE = ModConstant.NONE,
        X = ModConstant.X, Y = ModConstant.Y, Z = ModConstant.Z
    ;

    var DisplaceMap = MOD3.DisplaceMap = MOD3.Class ( MOD3.Modifier, {
        
        constructor: function( bmp, w, h, f ) {
            this.$super('constructor');
            this.name = 'DisplaceMap';
            if ( arguments.length >= 3 )
            {
                this.setBitmap( bmp, w, h );
                this.force = f || 1;
            }
            else
            {
                this.force = bmp || 1;
            }
            this.offset = 0x7F;
            this.axes = X | Y | Z;
        },
        
        width: null,
        height: null,
        bitmapData: null,
        force: 1,
        offset: 0x7F,
        
        dispose: function( ) {
            this.bitmapData = null;
            this.width = null;
            this.height = null;
            this.force = null;
            this.offset = null;
            this.$super('dispose');
            
            return this;
        },
        
        setBitmap: function( bmpData, w, h ) {
            this.bitmapData = bmpData || null;
            this.width = w || 0;
            this.height = h || 0;
            return this;
        },
        
        apply: function( ) {
            var vs = this.mod.vertices, vc = vs.length, axes = this.axes,
                w = this.width, h = this.height, bmp = this.bitmapData,
                force = this.force, offset = this.offset, v, uv, x, y, xyz;

            if ( !axes || !bmp ) return this;
            
            // optimize loop using while counting down instead of up
            while ( --vc >= 0 )
            {
                v = vs[ vc ];
                xyz = v.getXYZ( );
                
                x = ~~( (w - 1) * v.ratio[ 0 ]/* X */ );
                y = ~~( (h - 1) * v.ratio[ 2 ]/* Z */ );
                uv = ( y * w + x ) << 2;
                
                if ( axes & X ) xyz[ 0 ] += ((bmp[ uv ] >> 16 & 0xff) - offset) * force;
                if ( axes & Y ) xyz[ 1 ] += ((bmp[ uv+1 ] >> 8 & 0xff) - offset) * force;
                if ( axes & Z ) xyz[ 2 ] += ((bmp[ uv+2 ] & 0xff) - offset) * force;
                
                v.setXYZ( xyz );
            }

            return this;
        }
    });
    
})(MOD3);/**
*
* MOD3  Perlin/Simplex Noise Modifier
*
*
**/

/**[DOC_MD]
 * ###Perlin modifier 
 *
 *  Displaces vertices based on a perlin/simplex noise source.
 * 
 *  Generates perlin/simplex noise source and displaces vertices 
 *  based on the value of each point of the noise map.
 *  
 *  @author Bartek Drozdz
 *
 *  @uses: https://github.com/josephg/noisejs for JavaScript
 *  
[/DOC_MD]**/

(function(MOD3, undef){
    
    "use strict";
    
    var Vector3 = MOD3.Vector3, round = Math.round,
        A = MOD3.VecArray,
        ModConstant = MOD3.ModConstant, NONE = ModConstant.NONE,
        X = ModConstant.X, Y = ModConstant.Y, Z = ModConstant.Z
    ;

    var PerlinNoise = MOD3.PerlinNoise = MOD3.Class(Object, {
        
        constructor: function( w, h ) {
            this.width = (undef !== w) ? round( w ) : 10;
            this.height = (undef !== h) ? round( h ) : 10;
        },
        
        width: 10,
        height: 10,
        data: null,
        
        dispose: function( ) {
            this.data = null;
            this.width = this.height = null;
            return this;
        },
        
        uvIndex: function( u, v ) {
            var w = this.width, h = this.height,
                x = ~~( (w - 1) * u ), y = ~~( (h - 1) * v )
            ;
            return ( x + y * w );
        },

        generate: function( ) {
            var w = this.width, h = this.height, size = w*h, a = new A( size ), i, j, index, v;
            i = 0; j = 0;
            for (index=0; index<size; index++,i++)
            {
                if ( i >= w )
                {
                    i = 0;
                    j++;
                }
                //v = noise.simplex2( i/w, j/h );
                a[ index ] = noise.simplex2( i/w, j/h );
                //a[ index+1 ] = noise.simplex2( i/w, j/h );
                //a[ index+2 ] = noise.simplex2( i/w, j/h );
            }
            this.data = a;
            return this;
        },
        
        move: function( dX, dY ) {
            var w = this.width, h = this.height, size = w*h, 
                a = this.data, b = new A( size ), 
                i, j, i2, j2, index, index2
            ;
            if ( dX < 0 ) dX += w;
            if ( dY < 0 ) dY += h;
            dX = ~~dX;
            dY = ~~dY;
            i = 0; j = 0;
            for (index=0; index<size; index++,i++)
            {
                if ( i >= w )
                {
                    i = 0;
                    j++;
                }
                i2 = (i + dX) % w;
                j2 = (j + dY) % h;
                index2 = ( i2 + j2 * w );
                b[ index ] = a[ index2 ];
                //b[ index+1 ] = a[ index2+1 ];
                //b[ index+2 ] = a[ index2+2 ];
            }
            this.data = b;
            return this;
        }
    });
    
    var Perlin = MOD3.Perlin = MOD3.Class ( MOD3.Modifier, {
        
        constructor: function( f, n, a ) {
            this.$super('constructor');
            this.name = 'Perlin';
            this.source = undef === n ? new PerlinNoise( 25, 25 ).generate( ) : n;
            this.force = f || 1;
            this.autoRun = (undef !== a) ? (!!a) : true;
            this.axes = X | Y | Z;
        },
        
        speedX: 1,
        speedY: 1,
        source: null,
        force: 1,
        offset: 0,
        autoRun: true,
        
        dispose: function( ) {
            this.source = null;
            this.speedX = null;
            this.speedY = null;
            this.force = null;
            this.offset = null;
            this.autoRun = null;
            this.$super('dispose');
            
            return this;
        },
        
        setSpeed: function( dX, dY ) {
            this.speedX = dX;
            this.speedY = dY;
            return this;
        },
        
        apply: function( ) {
            var vs = this.mod.vertices, vc = vs.length, axes = this.axes,
                force = this.force, offset = this.offset, 
                src = this.source, nsv, v, uv, xyz;

            if ( !axes || !src ) return this;
            if ( this.autoRun ) src.move( this.speedX, this.speedY );
            
            nsv = src.data;
            // optimize loop using while counting down instead of up
            while ( --vc >= 0 )
            {
                v = vs[ vc ];
                xyz = v.getXYZ( );
                uv = src.uvIndex( v.ratio[ 0 ]/* X */, v.ratio[ 2 ]/* Z */ );
                
                if ( axes & X ) xyz[ 0 ] += (nsv[ uv ] - offset) * force;
                if ( axes & Y ) xyz[ 1 ] += (nsv[ uv/*+1*/ ] - offset) * force;
                if ( axes & Z ) xyz[ 2 ] += (nsv[ uv/*+2*/ ] - offset) * force;
                
                v.setXYZ( xyz );
            }

            return this;
        }
    });
    
})(MOD3);/**
*
* MOD3  Three.js Vertex Class
*
*
**/
!function(MOD3, undef){
    
    "use strict";
    
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
    
}(MOD3);/**
*
* MOD3  Three.js Mesh Class
*
*
**/
!function(MOD3, undef){
    
    "use strict";
    
    var VertexThree = MOD3.VertexThree, FaceProxy = MOD3.FaceProxy;
    
    var MeshThree = MOD3.MeshThree = MOD3.Class( MOD3.MeshProxy, {
        
        constructor: function( mesh ) { 
            this.$super('constructor', mesh );
            this.name = "MeshThree";
        },
        
        setMesh: function( mesh ) {
            this.$super('setMesh', mesh );
            
            var i = 0,
                mesh = this.mesh, vertices = this.vertices,
                vs = mesh.geometry.vertices, vc = vs.length,
                ts = mesh.geometry.faces, tc = ts.length,
                nv, nt;
            
            // optimize loop using while
            i = 0;
            while ( i < vc )
            {
                nv = new VertexThree( mesh, vs[ i ] );
                vertices.push( nv );
                i++;
            }
            
            this.faces = null;
            
            return this;
        },
        
        // use a batch update, instead of update vertex by vertex (faster??)
        update: function( )  {
            var geometry = this.mesh.geometry;
            geometry.verticesNeedUpdate = true;
            geometry.normalsNeedUpdate = true;
            geometry.buffersNeedUpdate = true;
            geometry.dynamic = true;
            
            return this;
        },

        updateMeshPosition: function( p ) {
            var position = this.mesh.position, xyz = p.xyz;
            position.x += xyz[0];
            position.y += xyz[1];
            position.z += xyz[2];
            
            return this;
        }
    });
    
}(MOD3);/**
*
* MOD3  Plugin for Three.js
*
*
**/
!function(MOD3, undef){
    
    "use strict";
    
    var LibraryThree = MOD3.Class( MOD3.Library3d, {
        
        constructor: function( ) {
            this.id = "Three.js";
            this.meshClass = MOD3.MeshThree;
            this.vertexClass = MOD3.VertexThree;
        }
    });
    
    // export it, singleton
    MOD3.LibraryThree = new LibraryThree( );
    
}(MOD3);/**
*
* MOD3  J3D Vertex Class
*
*
**/
!function(MOD3, undef){
    
    "use strict";
    
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
    
}(MOD3);/**
*
* MOD3  Three.js Mesh Class
*
*
**/
!function(MOD3, undef){
    
    "use strict";
    
    var VertexJ3D = MOD3.VertexJ3D,
        FaceProxy = MOD3.FaceProxy, A = MOD3.VecArray
    ;
    
    var MeshJ3D = MOD3.MeshJ3D = MOD3.Class( MOD3.MeshProxy, {
        
        constructor: function( mesh ) { 
            this.VERTEX_POSITION = J3D.Mesh.VERTEX_POSITION;
            this.$super('constructor', mesh );
            this.name = "MeshJ3D";
        },
        
        VERTEX_POSITION: null,
        
        dispose: function( ) {
            this.VERTEX_POSITION = null;
            this.$super('dispose');
            
            return this;
        },
        
        setMesh: function( transformObject ) {
            this.$super('setMesh', transformObject );
            
            var i = 0, 
                geometry = transformObject.geometry,
                vbo = geometry.arraysByName[this.VERTEX_POSITION],
                vs = vbo.data, vc = vs.length,
                ii = vbo.itemSize,
                vertices = this.vertices,
                nv;
            
            // optimize loop using while
            i = 0;
            while ( i < vc )
            {
                nv = new VertexJ3D( geometry, i );
                vertices.push( nv );
                i += ii;
            }
            
            this.faces = null;
            
            return this;
        },
        
        // use a batch update, instead of update vertex by vertex (faster??)
        update: function( )  {
            var geometry = this.mesh.geometry,
                vbo = geometry.arraysByName[this.VERTEX_POSITION],
                data = vbo.data;
            
            geometry.replaceArray(vbo, data);
            
            return this;
        },

        updateMeshPosition: function( p ) {
            var position = this.mesh.position, xyz = p.xyz;
            position.x += xyz[0];
            position.y += xyz[1];
            position.z += xyz[2];
            
            return this;
        }
    });
    
}(MOD3);/**
*
* MOD3  Plugin for J3D
*
*
**/
!function(MOD3, undef){
    
    "use strict";
    
    var LibraryJ3D = MOD3.Class( MOD3.Library3d, {
        
        constructor: function( ) {
            this.id = "J3D";
            this.meshClass = MOD3.MeshJ3D;
            this.vertexClass = MOD3.VertexJ3D;
        }
    });
    
    // export it, singleton
    MOD3.LibraryJ3D = new LibraryJ3D( );
    
}(MOD3);/**
*
* MOD3  Copperlicht Vertex Class
*
*
**/
!function(MOD3, undef){
    
    "use strict";
    
    var ModConstant = MOD3.ModConstant,
        X = ModConstant.X, Y = ModConstant.Y, Z = ModConstant.Z,
        Vector3 = MOD3.Vector3, A = MOD3.VecArray
    ;
    
    var VertexCopperlicht = MOD3.VertexCopperlicht = MOD3.Class( MOD3.VertexProxy, {
        
        constructor: function( node, buffer, vertex ) {
            this.node = node;
            this.buffer = buffer;
            this.$super('constructor', vertex );
            this.name = "VertexCopperlicht";
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
    
}(MOD3);/**
*
* MOD3  Copperlicht Mesh Class
*
*
**/
!function(MOD3){
    
    "use strict";
    
    var VertexCopperlicht = MOD3.VertexCopperlicht,
        FaceProxy = MOD3.FaceProxy
    ;
    
    var MeshCopperlicht = MOD3.MeshCopperlicht = MOD3.Class( MOD3.MeshProxy, {
        
        constructor: function( mesh ) { 
            this.$super('constructor', mesh );
            this.name = "MeshCopperlicht";
        },
        
        setMesh: function( mesh ) {
            this.$super('setMesh', mesh );
            
            var i, b, bl,
                buffers = this.mesh.getMesh().GetMeshBuffers(),
                vertices = this.vertices,
                vs=[], vc, nv;
                
            for (b = 0, bl = buffers.length; b<bl; b++)
            {
                vs = buffers[b].Vertices;
                for (i = 0, vc = vs.length; i < vc; i++) 
                {
                    nv = new VertexCopperlicht( this.mesh, buffers[b], vs[i] );
                    vertices.push( nv );
                }
            }
            this.faces = null;
            
            return this;
        },
        
        // use a batch update, instead of update vertex by vertex (faster??)
        update: function( )  {
            var buffers = this.mesh.getMesh().GetMeshBuffers(), 
                l = buffers.length, i = 0;
            
            while ( i < l )
            {
                buffers[ i ].update( true );
                i++;
            }
            
            return this;
        },

        updateMeshPosition: function( p ) {
            var Pos = this.mesh.Pos, xyz = p.xyz;
            Pos.X += xyz[0];
            Pos.Y += xyz[1];
            Pos.Z += xyz[2];
            
            return this;
        }
    });
    
}(MOD3);/**
*
* MOD3  Plugin for Copperlicht
*
*
**/
!function(MOD3, undef){
    
    "use strict";
    
    var LibraryCopperlicht = MOD3.Class( MOD3.Library3d, {
        
        constructor: function( ) {
            this.id = "Copperlicht";
            this.meshClass = MOD3.MeshCopperlicht;
            this.vertexClass = MOD3.VertexCopperlicht;
        }
    });
    // export it, singleton
    MOD3.LibraryCopperlicht = new LibraryCopperlicht( );
    
}(MOD3);/**
*
* MOD3  CubicVR.js Vertex Class
*
*
**/
!function(MOD3, undef){
    
    "use strict";
    
    var ModConstant = MOD3.ModConstant,
        X = ModConstant.X, Y = ModConstant.Y, Z = ModConstant.Z,
        Vector3 = MOD3.Vector3, A = MOD3.VecArray
    ;
    
    var VertexCubicVR = MOD3.VertexCubicVR = MOD3.Class( MOD3.VertexProxy, {
        
        constructor: function( sceneObject, vertex ) {
            this.sceneObject = sceneObject;
            this.$super('constructor', vertex );
            this.name = "VertexCubicVR";
        },
        
        sceneObject: null,
        
        dispose: function( ) {
            this.sceneObject = null;
            this.$super('dispose');
            
            return this;
        },
        
        setVertex: function( vertex ) {
            this.vertex = vertex;
            this.original = new A( vertex );
            this.xyz = new A( vertex );
            
            return this;
        },
        
        getXYZ: function( ) {
            return new A( this.vertex );
        },
        
        getX: function( ) {
            return this.vertex[0];
        },
        
        getY: function( ) {
            return this.vertex[1];
        },
        
        getZ: function( ) {  
            return this.vertex[2];
        },
        
        setXYZ: function( xyz ) {
            var vt = this.vertex;
            
            vt[0] = xyz[0];
            vt[1] = xyz[1];
            vt[2] = xyz[2];
            //this.sceneObject.dirty=true;
            
            return this;
        },
        
        setX: function( v ) {
            var vt = this.vertex, _update = false;
            
            //if ( v != vt[0] ) _update = true;
            
            vt[0] = v;
            
            /*if (_update)
            {
                this.sceneObject.dirty=true;
            }*/
            
            return this;
        },
        
        setY: function( v ) {
            var vt = this.vertex, _update = false;
            
            //if ( v != vt[1] ) _update = true;
            
            vt[1] = v;
            
            /*if (_update)
            {
                this.sceneObject.dirty=true;
            }*/
            
            return this;
        },
        
        setZ: function( v ) {
            var vt = this.vertex, _update = false;
            
            //if ( v != vt[2] ) _update = true;
            
            vt[2] = v;
            
            /*if (_update)
            {
                this.sceneObject.dirty=true;
            }*/
            
            return this;
        },
        
        reset: function( ) {
            var vt = this.vertex, xyz = this.original;
            
            vt[0] = xyz[0];
            vt[1] = xyz[1];
            vt[2] = xyz[2];
            //this.sceneObject.dirty=true;
                
            return this;
        },

        collapse: function( ) {
            this.original = new A( this.vertex );
            
            return this;
        },

        getValue: function( axis )  {
            var vt = this.vertex;
            switch( axis ) 
            {
                case X: return vt[0];
                case Y: return vt[1];
                case Z: return vt[2];
            }
            return 0;
        },

        setValue: function( axis, v ) {
            var vt = this.vertex, _update = false;
            switch( axis ) 
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
       
       setVector: function( v ) {
            var vt = this.vertex, xyz = v.xyz;
            
            vt[0] = xyz[0];
            vt[1] = xyz[1];
            vt[2] = xyz[2];
            //this.sceneObject.dirty=true;
            
            return this;
        },

        getVector: function( ) {
            return new Vector3( this.vertex );
        }
    });
    // aliases
    VertexCubicVR.prototype.getXYZRef = VertexCubicVR.prototype.getXYZ;
    VertexCubicVR.prototype.setXYZRef = VertexCubicVR.prototype.setXYZ;
    
}(MOD3);/**
*
* MOD3  CubicVR.js Mesh Class
*
*
**/
!function(MOD3, undef){
    
    "use strict";
    
    var VertexCubicVR = MOD3.VertexCubicVR,
        FaceProxy = MOD3.FaceProxy
    ;
    
    var MeshCubicVR = MOD3.MeshCubicVR = MOD3.Class( MOD3.MeshProxy, {
        
        constructor: function( mesh ) { 
            this.$super('constructor', mesh );
            this.name = "MeshCubicVR";
        },
        
        setMesh: function( sceneObject )  {
            this.$super('setMesh', sceneObject/*.obj*/ );
            
            var i = 0,
                vs = sceneObject.obj.points, vc = vs.length,
                ts = sceneObject.obj.faces, tc = ts.length,
                vertices = this.vertices, 
                nv, nt;
            
            // optimize loop using while
            i = 0;
            while ( i < vc )
            {
                nv = new VertexCubicVR( sceneObject, vs[i] );
                vertices.push( nv );
                i++;
            }
            
            this.faces = null;
            
            return this;
        },
        
        // use a batch update, instead of update vertex by vertex (faster??)
        update: function( )  {
            this.mesh.dirty = true;
            
            return this;
        },

        updateMeshPosition: function( p ) {
            var position = this.mesh.position, xyz = p.xyz;
            position[0] += xyz[0];
            position[1] += xyz[1];
            position[2] += xyz[2];
            
            return this;
        }
    });
    
}(MOD3);/**
*
* MOD3  Plugin for CubicVR.js
*
*
**/
!function(MOD3, undef){
    
    "use strict";
    
    var LibraryCubicVR = MOD3.Class( MOD3.Library3d, {
        
        constructor: function( ) {
            this.id = "CubicVR.js";
            this.meshClass = MOD3.MeshCubicVR;
            this.vertexClass = MOD3.VertexCubicVR;
        }
    });
    // export it, singleton
    MOD3.LibraryCubicVR = new LibraryCubicVR( );
    
}(MOD3);/**
*
* MOD3  Pre3D Vertex Class
*
*
**/
!function(MOD3, undef){
    
    "use strict";
    
    var ModConstant = MOD3.ModConstant,
        X = ModConstant.X, Y = ModConstant.Y, Z = ModConstant.Z,
        Vector3 = MOD3.Vector3, A = MOD3.VecArray
    ;
    
    var VertexPre3D = MOD3.VertexPre3D = MOD3.Class( MOD3.VertexProxy, {
        
        constructor: function( vertex ) {
            this.$super('constructor', vertex );
            this.name = "VertexPre3D";
        },
        
        setVertex: function( vertex ) {
            this.vertex = vertex;
            this.original = new A( [vertex.x, vertex.y, vertex.z] );
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
            var vt = this.vertex;
            
            vt.x = xyz[0];
            vt.y = xyz[1];
            vt.z = xyz[2];
            
            return this;
        },
        
        setX: function( v ) {
            this.vertex.x = v;
            
            return this;
        },
        
        setY: function( v ) {
            this.vertex.y = v;
            
            return this;
        },
        
        setZ: function( v ) {
            this.vertex.z = v;
            
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
            var vt = this.vertex;
            switch( axis ) 
            {
                case X: vt.x = v; break;
                case Y: vt.y = v; break;
                case Z: vt.z = v; break;
            }
            return this;
       },
       
       setVector: function( v ) {
            var vt = this.vertex, xyz = v.xyz;
            
            vt.x = xyz[0];
            vt.y = xyz[1];
            vt.z = xyz[2];
            
            return this;
        },

        getVector: function( ) {
            var vt = this.vertex;
            return new Vector3( [vt.x, vt.y, vt.z] );
        }
    });
    // aliases
    VertexPre3D.prototype.getXYZRef = VertexPre3D.prototype.getXYZ;
    VertexPre3D.prototype.setXYZRef = VertexPre3D.prototype.setXYZ;
    
}(MOD3);/**
*
* MOD3  Pre3D Mesh Class
*
*
**/
!function(MOD3, undef){
    
    "use strict";
    
    var VertexPre3D = MOD3.VertexPre3D,
        FaceProxy = MOD3.FaceProxy
    ;
    
    var MeshPre3D = MOD3.MeshPre3D = MOD3.Class( MOD3.MeshProxy, {
        
        constructor: function( mesh ) { 
            this.$super('constructor', mesh );
            this.name = "MeshPre3D";
        },
        
        setMesh: function( mesh ) {
            this.$super('setMesh', mesh );
            
            var i,
                vs = this.mesh.vertices,
                ts = this.mesh.quads,
                vc = vs.length,
                tc = ts.length,
                vertices = this.vertices,
                nv, nt
            ;
            
            for (i = 0; i < vc; i++) 
            {
                nv = new VertexPre3D( vs[i] );
                vertices.push( nv );
            }
            
            this.faces = null;
            
            return this;
        }//,
        
        // Pre3D does not support this operation
        /*updateMeshPosition : function(p) {
            /*this.mesh.position.x += p.x;
            this.mesh.position.y += p.y;
            this.mesh.position.z += p.z;* /
            
            return this;
        }*/
    });
    
}(MOD3);/**
*
* MOD3  Plugin for Pre3D
*
*
**/
!function(MOD3, undef){
    
    "use strict";
    
    var LibraryPre3D = MOD3.Class( MOD3.Library3d, {
        
        constructor: function( ) {
            this.id = "pre3d.js";
            this.meshClass = MOD3.MeshPre3D;
            this.vertexClass = MOD3.VertexPre3D;
        }
    });
    // export it, singleton
    MOD3.LibraryPre3D = new LibraryPre3D( );
    
}(MOD3);

    /* main code ends here */
    
    /* export the module "MOD3" */
    return MOD3;
});
