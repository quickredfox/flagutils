function newbit() {
    if(!newbit.bit) return newbit.bit = 0x1;
    return newbit.bit*=2;
};
var flagutil = {
    flags: {},
    flag: function(obj,flags) {
        if(typeof obj === 'string'){
            // if obj is a string, we are creating a flag in the system
            return ( typeof flagutil.flags[obj] !== 'undefined' ? flagutil.flags[obj] : ( flagutil.flags[obj] = newbit() ) );
        }else{
            if(typeof flags !== 'undefined'){
                if(typeof flags === 'string') flags = flagutil.flags[flags];
                // if we have flags, we are XORing
                if(typeof obj.flags !== 'undefined') obj.flags ^= flags;
                else obj.flags = flags; // otherwise setting.
            };     
        }
        return obj.flags;       
    },
    verify: function(obj,flags) {
        if(typeof flags === 'string') flags = flagutil.flags[flags]
        return !!(obj.flags & flags);
    } 
};
if(typeof window.flagutil === 'undefined'){
    window.flagutil = flagutil;
}


