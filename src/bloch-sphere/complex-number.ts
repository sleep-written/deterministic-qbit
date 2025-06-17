export class ComplexNumber {
    #x: number;
    get x(): number {
        return this.#x;
    }

    #i: number;
    get i(): number {
        return this.#i;
    }

    constructor(x: number, i: number) {
        if (typeof x === 'number' && !isNaN(x)) {
            this.#x = x;
        } else {
            throw new Error(`The first argument (real part) must be a valid number`);
        }
        
        if (typeof i === 'number' && !isNaN(i)) {
            this.#i = i;
        } else {
            throw new Error(`The second argument (imaginary part) must be a valid number`);
        }
    }
}