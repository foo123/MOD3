/**
*
* MOD3  Vector3 Class
*
*
**/
!function(MOD3, undef){
@@USE_STRICT@@

// fast list utilities
MOD3.List = {
     
     operate: function operate( x, F, F0, i0, i1, reverse ) {
        var len = x.length;
        if ( arguments.length < 5 ) i1 = len-1;
        if ( 0 > i1 ) i1 += len;
        if ( arguments.length < 4 ) i0 = 0;
        if ( i0 > i1 ) return F0;
        if ( true === reverse )
        {
        var i, k, l=i1-i0+1, l1=l-1, r=l&15, q=r&1, lr=l1-r, Fv=q?F(F0,x[i1],i1):F0;
        for (i=l1-q; i>lr; i-=2) { k = i0+i; Fv = F(F(Fv,x[k],k),x[k-1],k-1); }
        for (i=lr; i>=0; i-=16)  { k = i0+i; Fv = F(F(F(F(F(F(F(F(F(F(F(F(F(F(F(F(Fv,x[k],k),x[k-1],k-1),x[k-2],k-2),x[k-3],k-3),x[k-4],k-4),x[k-5],k-5),x[k-6],k-6),x[k-7],k-7),x[k-8],k-8),x[k-9],k-9),x[k-10],k-10),x[k-11],k-11),x[k-12],k-12),x[k-13],k-13),x[k-14],k-14),x[k-15],k-15); }
        }
        else
        {
        var i, k, l=i1-i0+1, r=l&15, q=r&1, Fv=q?F(F0,x[i0],i0):F0;
        for (i=q; i<r; i+=2)  { k = i0+i; Fv = F(F(Fv,x[k],k),x[k+1],k+1); }
        for (i=r; i<l; i+=16) { k = i0+i; Fv = F(F(F(F(F(F(F(F(F(F(F(F(F(F(F(F(Fv,x[k],k),x[k+1],k+1),x[k+2],k+2),x[k+3],k+3),x[k+4],k+4),x[k+5],k+5),x[k+6],k+6),x[k+7],k+7),x[k+8],k+8),x[k+9],k+9),x[k+10],k+10),x[k+11],k+11),x[k+12],k+12),x[k+13],k+13),x[k+14],k+14),x[k+15],k+15); }
        }
        return Fv;
    }
    
    ,each: function each( x, F, i0, i1, reverse ) {
        if ( null == x || !x.length ) return x;
        var len = x.length;
        if ( arguments.length < 4 ) i1 = len-1;
        if ( 0 > i1 ) i1 += len;
        if ( arguments.length < 3 ) i0 = 0;
        if ( i0 > i1 ) return x;
        var i, k, l=i1-i0+1, l1, lr, r, q;
        if ( true === reverse )
        {
            l1=l-1; r=l&15; q=r&1; lr=l1-r;
            if ( q ) F( x[i1] );
            for (i=l1-q; i>lr; i-=2)
            { 
                k = i0+i;
                F( x[k  ] );
                F( x[k-1] );
            }
            for (i=lr; i>=0; i-=16)
            {
                k = i0+i;
                F( x[k  ] );
                F( x[k-1] );
                F( x[k-2] );
                F( x[k-3] );
                F( x[k-4] );
                F( x[k-5] );
                F( x[k-6] );
                F( x[k-7] );
                F( x[k-8] );
                F( x[k-9] );
                F( x[k-10] );
                F( x[k-11] );
                F( x[k-12] );
                F( x[k-13] );
                F( x[k-14] );
                F( x[k-15] );
            }
        }
        else
        {
            r=l&15; q=r&1;
            if ( q ) F( x[i0] );
            for (i=q; i<r; i+=2)
            { 
                k = i0+i;
                F( x[k  ] );
                F( x[k+1] );
            }
            for (i=r; i<l; i+=16)
            {
                k = i0+i;
                F( x[k  ] );
                F( x[k+1] );
                F( x[k+2] );
                F( x[k+3] );
                F( x[k+4] );
                F( x[k+5] );
                F( x[k+6] );
                F( x[k+7] );
                F( x[k+8] );
                F( x[k+9] );
                F( x[k+10] );
                F( x[k+11] );
                F( x[k+12] );
                F( x[k+13] );
                F( x[k+14] );
                F( x[k+15] );
            }
        }
        return x;
    }
};

}(MOD3);