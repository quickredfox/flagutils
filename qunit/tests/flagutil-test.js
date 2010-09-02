var A,B,C,D,E,O1={},O2={},N1 = $('<div>'),N2=$('<div>');

module('newbit helper');

    test('counter',function() {
        same(  newbit(), 1,   'should produce 1'  );
        same(  newbit(), 2,   'should produce 2'  );
        same(  newbit(), 4,   'should produce 4'  );
        same(  newbit(), 8,   'should produce 8'  );
        same(  newbit(), 16,  'should produce 16'  );    
        same(  newbit(), 32,  'should produce 32'  );      
        same(  newbit(), 64,  'should produce 64'  );          
        same(  newbit(), 128, 'should produce 128'  );      
        // reset newbit
        delete(newbit.bit);
    });
    
    test('deleting newbit.bit',function() {
        same(newbit(), 0x1, 'should reset bit to 1');
        // reset newbit
        delete(newbit.bit);
    });
    
module('flagutil core');

    test('Creating a flag',function() {
        A = window.flagutil.flag('A');
        same( A, 0x1,                                   'should create a flag named A returning a value of 1');
        ok(   window.flagutil.flags['A'] ,              'should have stored the flag named A');
        same( ( B = window.flagutil.flag('B') ) , 0x2 , 'should produce 2 like newbit' );
        same( ( C = window.flagutil.flag('C') ) , 0x4 , 'should produce 4 like newbit' );   
        same( ( D = window.flagutil.flag('D') ) , 0x8 , 'should produce 8 like newbit' );
    });
    
    test('flagging an object',function() {
         window.flagutil.flag(O1,A|C|D);
         window.flagutil.flag(O2,B|D);
         // Object 1
         ok(O1.flags & A,       'A should be in A|C|D');
         ok((!(O1.flags & B)),  'B should NOT be in A|C|D');
         ok(O1.flags & C,       'C should be in A|C|D');
         ok(O1.flags & D,       'D should be in A|C|D');
         // Object 2
         ok((!(O2.flags & A)),   'A should NOT be in B|D');
         ok(O2.flags & B,        'B should be in B|D');
         ok((!(O2.flags & C)),   'C should NOT be in B|D');
         ok(O2.flags & D,        'D should be in B|D');
    });
    
    test('verifying flags',function() {
        // Object 1
        ok( window.flagutil.verify(O1,'A')  ,   'A should be in A|C|D');
        ok( (!window.flagutil.verify(O1,'B')) , 'B should NOT be in A|C|D');
        ok( window.flagutil.verify(O1,'C')  ,   'C should be in A|C|D');
        ok( window.flagutil.verify(O1,'D')  ,   'D should be in A|C|D');
        // Object 2
        ok( (!window.flagutil.verify(O2,'A')),  'A should NOT be in B|D')
        ok( window.flagutil.verify(O2,'B'),     'B should be in B|D')     
        ok( (!window.flagutil.verify(O2,'C')),  'C should NOT be in B|D')
        ok( window.flagutil.verify(O2,'D'),     'D should be in B|D')
   
    });
    
    test('toggling flags',function() {
        // Object 1
        window.flagutil.flag(O1,'A');
        window.flagutil.flag(O1,'B');   
        ok( (!window.flagutil.verify(O1,'A'))  , 'A should NOT be in A|C|D');
        ok( window.flagutil.verify(O1,'B')   ,   'B should be in A|C|D');
        ok( window.flagutil.verify(O1,'C')   ,   'C should be in A|C|D');
        ok( window.flagutil.verify(O1,'D')   ,   'D should be in A|C|D');
    });
    
    test('comparing flag masks',function() {
        ok( window.flagutil.verify(O2,O1.flags)  ,'B|D should be in B|C|D');
    });

module('flagutil jquery');

    test('creating flags',function() {
        E = $.flag('E');
        N1.flag($.flag('A')|$.flag('C')|$.flag('D'));
        same(E,16,       'E should be 16');
        ok(N1.hasFlag('A'),'should have flag A')
    });
    
    test('toggling flags',function() {
        N1.flag(A);
        ok(!N1.hasFlag(A),'should NOT have flag A')
    });
    
    test('flag selector query',function() {
        var DIV = $('<div>').append(N1);
        N2.flag(A);
        DIV.append(N2)
        var found = DIV.find('*:withFlag(A)');
        same(   found.get(0),   N2.get(0),    'Should have found N2')
        ok(     found.length === 1,           'Should have found only nodes flagged A')
    });
