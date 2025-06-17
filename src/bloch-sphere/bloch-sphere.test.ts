import test from 'ava';
import { BlochSphere } from './bloch-sphere.js';

test('from (θ = π/2 rad φ = π rad ) to [ -1, 0, 0 ]', t => {
    const sphere = new BlochSphere(Math.PI / 2, Math.PI);
    const [x, y, z] = sphere.toCartesian();

    t.true(Math.abs(x + 1) < 1e-10, `x must be -1, but is ${x}`);
    t.true(Math.abs(y)     < 1e-10, `y must be 0, but is ${y}`);
    t.true(Math.abs(z)     < 1e-10, `z must be 0, but is ${z}`);
});