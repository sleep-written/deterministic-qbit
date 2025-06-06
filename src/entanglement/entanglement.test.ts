import test from 'ava';
import { Entanglement } from './entanglement.js';

test('Entangle simple scenario (strings)', t => {
    const foo = 'foo';
    const bar = 'bar';
    const bak = 'bak';
    const baz = 'baz';

    const entanglement = new Entanglement();
    entanglement.entangle(foo, bar);
    entanglement.entangle(bak, baz);

    t.deepEqual(entanglement.getEntangled(foo), [ foo, bar ]);
    t.deepEqual(entanglement.getEntangled(bak), [ bak, baz ]);
});

test('Entangle simple scenario (objects)', t => {
    const foo = { value: 555 };
    const bar = { value: 666 };
    const bak = { value: 777 };
    const baz = { value: 888 };

    const entanglement = new Entanglement();
    entanglement.entangle(foo, bar);
    entanglement.entangle(bak, baz);

    t.deepEqual(entanglement.getEntangled(foo), [ foo, bar ]);
    t.deepEqual(entanglement.getEntangled(bak), [ bak, baz ]);
});

test('Untangle simple scenario (strings)', t => {
    const foo = 'foo';
    const bar = 'bar';
    const bak = 'bak';
    const baz = 'baz';

    const entanglement = new Entanglement();
    entanglement.entangle(foo, bar);
    entanglement.entangle(bak, baz);

    entanglement.untangle(foo, bar);
    entanglement.untangle(bak, baz);

    t.deepEqual(entanglement.getEntangled(foo), [ foo ]);
    t.deepEqual(entanglement.getEntangled(bak), [ bak ]);
});

test('Untangle simple scenario (objects)', t => {
    const foo = { value: 555 };
    const bar = { value: 666 };
    const bak = { value: 777 };
    const baz = { value: 888 };

    const entanglement = new Entanglement();
    entanglement.entangle(foo, bar);
    entanglement.entangle(bak, baz);

    entanglement.untangle(foo, bar);
    entanglement.untangle(bak, baz);

    t.deepEqual(entanglement.getEntangled(foo), [ foo ]);
    t.deepEqual(entanglement.getEntangled(bak), [ bak ]);
});

test('Entangle complex scenario (strings)', t => {
    const foo = 'foo';
    const bar = 'bar';
    const bak = 'bak';
    const baz = 'baz';
    const bax = 'bax';

    const entanglement = new Entanglement();
    entanglement.entangle(foo, bar);
    entanglement.entangle(bak, baz);
    entanglement.entangle(bax, foo, bak);
    
    t.deepEqual(entanglement.getEntangled(bax), [ bax, foo, bak, bar, baz ]);
    t.deepEqual(entanglement.getEntangled(foo), [ foo, bar, bax, bak, baz ]);
    t.deepEqual(entanglement.getEntangled(baz), [ baz, bak, bax, foo, bar ]);
});

test('Entangle complex scenario (objects)', t => {
    const foo = { value: 555 };
    const bar = { value: 666 };
    const bak = { value: 777 };
    const baz = { value: 888 };
    const bax = { value: 999 };

    const entanglement = new Entanglement();
    entanglement.entangle(foo, bar);
    entanglement.entangle(bak, baz);
    entanglement.entangle(bax, foo, bak);
    
    t.deepEqual(entanglement.getEntangled(bax), [ bax, foo, bak, bar, baz ]);
    t.deepEqual(entanglement.getEntangled(foo), [ foo, bar, bax, bak, baz ]);
    t.deepEqual(entanglement.getEntangled(baz), [ baz, bak, bax, foo, bar ]);
});

test('Untangle complex scenario (strings)', t => {
    const foo = 'foo';
    const bar = 'bar';
    const bak = 'bak';
    const baz = 'baz';
    const bax = 'bax';

    const entanglement = new Entanglement();
    entanglement.entangle(foo, bar);
    entanglement.entangle(bak, baz);
    entanglement.entangle(bax, foo, bak);

    entanglement.untangle(bax, foo, bak);
    
    t.deepEqual(entanglement.getEntangled(bax), [ bax ]);
    t.deepEqual(entanglement.getEntangled(foo), [ foo, bar ]);
    t.deepEqual(entanglement.getEntangled(baz), [ baz, bak ]);
});

test('Untangle complex scenario (objects)', t => {
    const foo = { value: 555 };
    const bar = { value: 666 };
    const bak = { value: 777 };
    const baz = { value: 888 };
    const bax = { value: 999 };

    const entanglement = new Entanglement();
    entanglement.entangle(foo, bar);
    entanglement.entangle(bak, baz);
    entanglement.entangle(bax, foo, bak);

    entanglement.untangle(bax, foo, bak);
    
    t.deepEqual(entanglement.getEntangled(bax), [ bax ]);
    t.deepEqual(entanglement.getEntangled(foo), [ foo, bar ]);
    t.deepEqual(entanglement.getEntangled(baz), [ baz, bak ]);
});