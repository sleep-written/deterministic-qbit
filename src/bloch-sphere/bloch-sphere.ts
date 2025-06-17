import { ComplexNumber } from './complex-number.js';

export class BlochSphere {
    #theta: number;
    /**
     * Polar angle vertical from _north pole_ to _south pole_ in radians.
     * `0` rad = _north pole_.
     * `π` rad = _south pole_.
     */
    get theta(): number {
        return this.#theta;
    }

    #phi: number;
    /**
     * Azimuthal angle in radians using Z index (from north ple to south pole) as axis.
     */
    get phi(): number {
        return this.#phi;
    }

    constructor(theta: number, phi: number);
    constructor(alpha: ComplexNumber, beta: ComplexNumber);
    constructor(
        ...args:
            [ number, number ] |
            [ ComplexNumber, ComplexNumber ]
    ) {
        if (typeof args[0] === 'number' && typeof args[1] === 'number') {
            const [ theta, phi ] = args;
            this.#theta = theta;
            this.#phi = phi;

        } else if (args[0] instanceof ComplexNumber && args[1] instanceof ComplexNumber) {
            const [ alpha, beta ] = args;
            const prob0 = this.#modulusSquared(alpha);
            this.#theta = 2 * Math.acos(Math.sqrt(prob0));
            
            const phase0 = Math.atan2(alpha.i, alpha.x);
            const phase1 = Math.atan2(beta.i, beta.x);
            this.#phi = phase1 - phase0;
            
            if (this.#phi < 0) this.#phi += 2 * Math.PI;

        } else {
            throw new TypeError([
                'Unsupported format. must be `number, number` or',
                '`[ number, number ], [ number, number ]`'
            ].join(' '));
        }
    }

    // |a + bi|² = a² + b²
    #modulusSquared(input: ComplexNumber): number {
        const real = input.x;
        const imag = input.i;
        return real * real + imag * imag;
    }

    #normalizeAngles(): void {
        this.#theta = ((this.#theta % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
        if (this.#theta > Math.PI) this.#theta = 2 * Math.PI - this.#theta;
        this.#phi = ((this.#phi % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
    }

    toAmplitudes(): [ ComplexNumber, ComplexNumber ] {
        const cosHalfTheta = Math.cos(this.#theta / 2);
        const sinHalfTheta = Math.sin(this.#theta / 2);
        
        const alpha = new ComplexNumber(
            cosHalfTheta,
            0
        );
        
        const beta = new ComplexNumber(
            sinHalfTheta * Math.cos(this.#phi),
            sinHalfTheta * Math.sin(this.#phi)
        );
        
        return [ alpha, beta ];
    }

    rotateX(angle: number): void {
        const c = Math.cos(angle);
        const s = Math.sin(angle);
        const [x, y, z] = this.toCartesian();
        
        // Matriz de rotación para eje X:
        // [1  0   0 ]
        // [0  c  -s ]
        // [0  s   c ]
        const newY = y * c - z * s;
        const newZ = y * s + z * c;
        
        // Convertir nuevamente a esféricas
        this.#updateFromCartesian(x, newY, newZ);
    }

    rotateY(angle: number): void {
        const c = Math.cos(angle);
        const s = Math.sin(angle);
        const [x, y, z] = this.toCartesian();
        
        // Matriz de rotación para eje Y:
        // [c  0  s ]
        // [0  1  0 ]
        // [-s 0  c ]
        const newX = x * c + z * s;
        const newZ = -x * s + z * c;
        
        this.#updateFromCartesian(newX, y, newZ);
    }

    rotateZ(angle: number): void {
        const c = Math.cos(angle);
        const s = Math.sin(angle);
        const [x, y] = this.toCartesian();
        
        // Matriz de rotación para eje Z:
        // [c -s 0]
        // [s  c 0]
        // [0  0 1]
        const newX = x * c - y * s;
        const newY = x * s + y * c;
        
        // Z no cambia en rotación Z
        const z = this.toCartesian()[2];
        this.#updateFromCartesian(newX, newY, z);
    }

    // Método privado para actualizar desde coordenadas cartesianas
    #updateFromCartesian(x: number, y: number, z: number): void {
        // Calcular nuevo theta
        this.#theta = Math.acos(z);
        
        // Calcular nuevo phi
        this.#phi = Math.atan2(y, x);
        if (this.#phi < 0) this.#phi += 2 * Math.PI;
    }

    toCartesian(): [number, number, number] {
        return [
            Math.sin(this.#theta) * Math.cos(this.#phi),
            Math.sin(this.#theta) * Math.sin(this.#phi),
            Math.cos(this.#theta)
        ];
    }

    toString(): string {
        return `θ: ${this.#theta.toFixed(4)} rad, φ: ${this.#phi.toFixed(4)} rad`;
    }
}