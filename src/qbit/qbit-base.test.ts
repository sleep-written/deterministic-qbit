import { Entanglement } from '@/entanglement/index.js';
import { QBitBase } from './qbit-base.js';
import test from 'ava';

test('Collapse q1 = T; q2 = F; q3 = F; q4 = F; entangled q1 + q2 + q3 + q4', t => {
    const universe = new Entanglement<QBitBase>();
    const waveFunc = (v?: boolean) => typeof v === 'boolean' ? !v : true;
    const q1 = new QBitBase(waveFunc, universe);
    const q2 = new QBitBase(waveFunc, universe);
    const q3 = new QBitBase(waveFunc, universe);
    const q4 = new QBitBase(waveFunc, universe);

    universe.entangle(q1, q2, q3, q4);

    t.true (q1.value);
    t.false(q2.value);
    t.false(q3.value);
    t.false(q4.value);
});

test('Collapse q1 = T; q2 = F; q3 = T; q4 = F; entangled q1 + q2; entangled q3 + q4', t => {
    const universe = new Entanglement<QBitBase>();
    const waveFunc = (v?: boolean) => typeof v === 'boolean' ? !v : true;
    const q1 = new QBitBase(waveFunc, universe);
    const q2 = new QBitBase(waveFunc, universe);
    const q3 = new QBitBase(waveFunc, universe);
    const q4 = new QBitBase(waveFunc, universe);

    universe.entangle(q1, q2);
    universe.entangle(q3, q4);

    t.true (q1.value);
    t.false(q2.value);
    t.true (q3.value);
    t.false(q4.value);
});
