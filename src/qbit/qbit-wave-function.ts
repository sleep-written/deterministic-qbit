import { randomInt } from 'crypto';

export class QBitWaveFunction {
    #not = false;
    #phase: 1 | -1 = 1;
    #value?: boolean;

    measure(): boolean {
        if (typeof this.#value === 'boolean') {
            return this.#not
            ?   !this.#value
            :    this.#value;
        }

        this.#value = randomInt(0, 2) === 1;
        if (this.#phase === -1) {
            this.#value = !this.#value;
        }

        return this.measure();
    }
}