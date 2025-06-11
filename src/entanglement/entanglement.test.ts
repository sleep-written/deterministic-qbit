// src/entanglement/entanglement.test.ts
import test from 'ava';
import { Entanglement } from './entanglement.js';

const sortComplexCallback = (
    a: { value: number; },
    b: { value: number; }
) => a.value - b.value;

test('Entangle simple scenario (strings)', t => {
    const foo = 'foo';
    const bar = 'bar';
    const bak = 'bak';
    const baz = 'baz';
 
    const entanglement = new Entanglement<string>();
    entanglement.entangle(foo, bar);
    entanglement.entangle(bak, baz);
    
    const expectFoo = entanglement.getEntangled(foo).sort();
    const actualFoo = [ foo, bar ].sort();
    t.deepEqual(expectFoo, actualFoo);
    
    const expectBak = entanglement.getEntangled(bak).sort();
    const actualBak = [ bak, baz ].sort();
    t.deepEqual(expectBak, actualBak);
});

test('Entangle simple scenario (objects)', t => {
    const foo = { value: 555 };
    const bar = { value: 666 };
    const bak = { value: 777 };
    const baz = { value: 888 };

    const entanglement = new Entanglement<{ value: number; }>();
    entanglement.entangle(foo, bar);
    entanglement.entangle(bak, baz);

    
    const expectFoo = entanglement.getEntangled(foo).sort(sortComplexCallback);
    const actualFoo = [ foo, bar ].sort(sortComplexCallback);
    t.deepEqual(expectFoo, actualFoo);
    
    const expectBak = entanglement.getEntangled(bak).sort(sortComplexCallback);
    const actualBak = [ bak, baz ].sort(sortComplexCallback);
    t.deepEqual(expectBak, actualBak);
});

test('Untangle simple scenario (strings)', t => {
    const foo = 'foo';
    const bar = 'bar';
    const bak = 'bak';
    const baz = 'baz';

    const entanglement = new Entanglement<string>();
    entanglement.entangle(foo, bar);
    entanglement.entangle(bak, baz);

    entanglement.untangle(foo, bar);
    entanglement.untangle(bak, baz);


    const expectFoo = entanglement.getEntangled(foo).sort();
    const actualFoo = [ foo ].sort();
    t.deepEqual(expectFoo, actualFoo);

    const expectBak = entanglement.getEntangled(bak).sort();
    const actualBak = [ bak ].sort();
    t.deepEqual(expectBak, actualBak);
});

test('Untangle simple scenario (objects)', t => {
    const foo = { value: 555 };
    const bar = { value: 666 };
    const bak = { value: 777 };
    const baz = { value: 888 };

    const entanglement = new Entanglement<{ value: number; }>();
    entanglement.entangle(foo, bar);
    entanglement.entangle(bak, baz);

    entanglement.untangle(foo, bar);
    entanglement.untangle(bak, baz);

    
    const expectFoo = entanglement.getEntangled(foo).sort(sortComplexCallback);
    const actualFoo = [ foo ].sort(sortComplexCallback);
    t.deepEqual(expectFoo, actualFoo);
    
    const expectBak = entanglement.getEntangled(bak).sort(sortComplexCallback);
    const actualBak = [ bak ].sort(sortComplexCallback);
    t.deepEqual(expectBak, actualBak);
});

test('Entangle complex scenario (strings)', t => {
    const foo = 'foo';
    const bar = 'bar';
    const bak = 'bak';
    const baz = 'baz';
    const bax = 'bax';

    const entanglement = new Entanglement<string>();
    entanglement.entangle(foo, bar);
    entanglement.entangle(bak, baz);
    entanglement.entangle(bax, foo, bak);
    
    const expectBax = entanglement.getEntangled(bax).sort();
    const actualBax = [ bax, foo, bak, bar, baz ].sort();
    t.deepEqual(expectBax, actualBax);

    const expectFoo = entanglement.getEntangled(foo).sort();
    const actualFoo = [ foo, bar, bax, bak, baz ].sort();
    t.deepEqual(expectFoo, actualFoo);

    const expectBaz = entanglement.getEntangled(baz).sort();
    const actualBaz = [ baz, bak, bax, foo, bar ].sort();
    t.deepEqual(expectBaz, actualBaz);
});

test('Entangle complex scenario (objects)', t => {
    const foo = { value: 555 };
    const bar = { value: 666 };
    const bak = { value: 777 };
    const baz = { value: 888 };
    const bax = { value: 999 };

    const entanglement = new Entanglement<{ value: number; }>();
    entanglement.entangle(foo, bar);
    entanglement.entangle(bak, baz);
    entanglement.entangle(bax, foo, bak);

    const expecBax = entanglement.getEntangled(bax).sort(sortComplexCallback);
    const actualBax = [ bax, foo, bak, bar, baz ].sort(sortComplexCallback);
    t.deepEqual(expecBax, actualBax);

    const expecFoo = entanglement.getEntangled(foo).sort(sortComplexCallback);
    const actualFoo = [ foo, bar, bax, bak, baz ].sort(sortComplexCallback);
    t.deepEqual(expecFoo, actualFoo);

    const expecBaz = entanglement.getEntangled(baz).sort(sortComplexCallback);
    const actualBaz = [ baz, bak, bax, foo, bar ].sort(sortComplexCallback);
    t.deepEqual(expecBaz, actualBaz);
});

test('Untangle complex scenario (strings)', t => {
    const foo = 'foo';
    const bar = 'bar';
    const bak = 'bak';
    const baz = 'baz';
    const bax = 'bax';

    const entanglement = new Entanglement<string>();
    entanglement.entangle(foo, bar);
    entanglement.entangle(bak, baz);
    entanglement.entangle(bax, foo, bak);

    entanglement.untangle(bax, foo, bak);
    
    
    const expectBax = entanglement.getEntangled(bax).sort();
    const actualBax = [ bax ].sort();
    t.deepEqual(expectBax, actualBax);
    
    const expectFoo = entanglement.getEntangled(foo).sort();
    const actualFoo = [ foo, bar ].sort();
    t.deepEqual(expectFoo, actualFoo);
    
    const expectBaz = entanglement.getEntangled(baz).sort();
    const actualBaz = [ baz, bak ].sort();
    t.deepEqual(expectBaz, actualBaz);
});

test('Untangle complex scenario (objects)', t => {
    const foo = { value: 555 };
    const bar = { value: 666 };
    const bak = { value: 777 };
    const baz = { value: 888 };
    const bax = { value: 999 };

    const entanglement = new Entanglement<{ value: number; }>();
    entanglement.entangle(foo, bar);
    entanglement.entangle(bak, baz);
    entanglement.entangle(bax, foo, bak);

    entanglement.untangle(bax, foo, bak);
    
    
    const expectBax = entanglement.getEntangled(bax).sort(sortComplexCallback);
    const actualBax = [ bax ].sort(sortComplexCallback);
    t.deepEqual(expectBax, actualBax);
    
    const expectFoo = entanglement.getEntangled(foo).sort(sortComplexCallback);
    const actualFoo = [ foo, bar ].sort(sortComplexCallback);
    t.deepEqual(expectFoo, actualFoo);
    
    const expectBaz = entanglement.getEntangled(baz).sort(sortComplexCallback);
    const actualBaz = [ baz, bak ].sort(sortComplexCallback);
    t.deepEqual(expectBaz, actualBaz);
});

test('Get all item in complex scenario (strings)', t => {
    const foo = 'foo';
    const bar = 'bar';
    const bak = 'bak';
    const baz = 'baz';
    const bax = 'bax';

    const entanglement = new Entanglement<string>();
    entanglement.entangle(foo, bar);
    entanglement.entangle(bak, baz);
    entanglement.entangle(bax, foo, bak);

    const expect = entanglement.getAll().sort();
    const actual = [ foo, bar, bak, baz, bax ].sort();
    t.deepEqual(expect, actual);
});

test('Get all item in complex scenario (objects)', t => {
    const foo = { value: 555 };
    const bar = { value: 666 };
    const bak = { value: 777 };
    const baz = { value: 888 };
    const bax = { value: 999 };

    const entanglement = new Entanglement<{ value: number; }>();
    entanglement.entangle(foo, bar);
    entanglement.entangle(bak, baz);
    entanglement.entangle(bax, foo, bak);

    // Test with "bax" entanglement
    const expectBax = entanglement.getAll().sort(sortComplexCallback);
    const actualBax = [ foo, bar, bak, baz, bax ].sort(sortComplexCallback);
    t.deepEqual(expectBax, actualBax);
});