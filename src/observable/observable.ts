import type { Callback } from './callback.js';

export class Observable<T> {
    #callbacks = new Set<Callback<T>>();

    #destroyed = false;
    get destroyed(): boolean {
        return this.#destroyed;
    }

    add(callback: Callback<T>): void {
        if (this.#destroyed) {
            return;
        }

        this.#callbacks.add(callback);
    }

    delete(callback: Callback<T>): void {
        if (this.#destroyed) {
            return;
        }

        this.#callbacks.delete(callback);
    }

    emit(value: T): void {
        if (this.#destroyed) {
            return;
        }

        for (const callback of this.#callbacks) {
            callback(value);
        }
    }

    destroy(): void {
        if (this.#destroyed) {
            return;
        }

        this.#callbacks.clear();
        this.#destroyed = true;
    }
}
