import { QBit } from './qbit/index.js';

const [ q1, q2, q3 ] = QBit.generate(3);
const [ q4, q5, q6 ] = QBit.generate(3);

q2.collapse();
q6.collapse();

console.log('q1.value →', q1.value);
console.log('q2.value →', q2.value);
console.log('q3.value →', q3.value);
console.log('q4.value →', q4.value);
console.log('q5.value →', q5.value);
console.log('q6.value →', q6.value);