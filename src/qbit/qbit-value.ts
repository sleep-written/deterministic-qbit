export class QBitValue {
    #value?: boolean;

    constructor(value?: boolean) {
        switch (typeof value) {
            case 'boolean': {
                this.#value = value;
                break;
            }
        }
    }

    toString(): string {
        if (typeof this.#value === 'boolean') {
            return `|${this.#value ? 1 : 0}〉`;
        } else {
            return `|ψ〉`;
        }
    }
}