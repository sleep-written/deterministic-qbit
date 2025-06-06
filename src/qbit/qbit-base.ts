import type { EntanglementObject } from '../entanglement/index.js';
import type { WaveFunction } from './wave-function.js';

export class QBitBase {
    #entanglement: EntanglementObject<QBitBase>;
    #waveFunction: WaveFunction;
    #value?: boolean;

    get measured(): boolean {
        return typeof this.#value === 'boolean';
    }

    get value(): boolean {
        if (!this.measured) {
            this.#value = this.#waveFunction();
            this.#entanglement
                .getEntangled(this)
                .filter(x => !x.measured)
                .forEach(x => {
                    x.#value = x.#waveFunction(this.#value);
                });
        }

        return this.#value!;
    }

    constructor(
        waveFunction: WaveFunction,
        entanglement: EntanglementObject<QBitBase>
    ) {
        this.#waveFunction = waveFunction;
        this.#entanglement = entanglement;
    }

    reset(): void {
        this.#entanglement
            .getEntangled(this)
            .forEach(x => {
                x.#value = undefined;
            });
    }

    toString(): string {
        switch (this.#value) {
            case true: {
                return `|1⟩`;
            }

            case false: {
                return `|0⟩`;
            }

            default: {
                return `|ψ⟩`;
            }
        }
    }
}