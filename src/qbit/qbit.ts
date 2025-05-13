import type { WaveFunction } from './interfaces/index.js';

import { randomInt } from 'crypto';

export class QBit {
    static generate(amount: number, waveFunction?: WaveFunction): QBit[] {
        const qbits: QBit[] = [];
        while (qbits.length < amount) {
            const qbit = new QBit(waveFunction);
            qbits.push(qbit);
        }

        for (const qbit of qbits) {
            qbit.entangle(...qbits);
        }

        return qbits;
    }

    #measuredValue: boolean | null = null;
    #waveFunction: WaveFunction;
    #entanglement = new Set<QBit>();

    get value(): boolean {
        if (!this.collapsed) {
            this.collapse();
        }

        return this.#measuredValue!;
    }

    get collapsed(): boolean {
        return typeof this.#measuredValue === 'boolean';
    }

    constructor(waveFunction?: WaveFunction) {
        this.#waveFunction = waveFunction ?? (v => typeof v !== 'boolean'
            ?   randomInt(0, 2) === 0
            :   v
        );
    }

    entangle(...qbits: QBit[]): void {
        if (!this.collapsed) {
            qbits
                .filter(qbit => qbit !== this)
                .forEach(qbit => {
                    this.#entanglement.add(qbit);
                    qbit.#entanglement.add(this);
                });
        }
    }

    #collapse(previousValue?: boolean): void {
        if (this.collapsed) {
            return;
        }

        previousValue = this.#waveFunction(previousValue);
        this.#measuredValue = previousValue;

        for (const qbit of this.#entanglement) {
            if (!qbit.collapsed) {
                qbit.#collapse(previousValue);
                previousValue = qbit.value;
            }
        }
    }

    collapse(): void {
        return this.#collapse();
    }

    reset(): void {
        if (!this.collapsed) {
            return;
        }

        this.#measuredValue = null;
        for (const qbit of this.#entanglement) {
            qbit.reset();
        }
    }
}