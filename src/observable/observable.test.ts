import test from 'ava';
import { Observable } from './observable.js';

test('Simple event emitter; emits once', t => {
    const msg: string[] = [];
    const obs = new Observable<boolean>();

    obs.add(v => msg.push(`value: ${v}`));
    obs.emit(true);
    obs.destroy();

    t.true(obs.destroyed);
    t.deepEqual(msg, [ `value: true` ]);
});

test('Simple event emitter; emits three times', t => {
    const msg: string[] = [];
    const obs = new Observable<boolean>();

    obs.add(v => msg.push(`value: ${v}`));
    obs.emit(true);
    obs.emit(false);
    obs.emit(true);
    obs.destroy();

    t.true(obs.destroyed);
    t.deepEqual(msg, [
        `value: true`,
        `value: false`,
        `value: true`,
    ]);
});