$.extend(true,{
    expr: {
      ':': {
          withFlag: function( obj, index, meta, stack ){ 
              return $( obj ).hasFlag( meta[ 3 ] );
          }
      }  
    },
    flag: function(name) {
        return flagutil.flag(name);
    },
    fn: {
        flag: function(flags) {
            var c = $(this),
                data = c.data('flagutil');
            if(!data) data = {};
            flagutil.flag(data,flags);
            c.data('flagutil',data);
            return c;
        },
        hasFlag: function( flags ) {
            var c = $( this ),
                hasData = c.data( 'flagutil' );
            if( !hasData ) return false;
            return flagutil.verify( hasData, flags );
        }
    }
});