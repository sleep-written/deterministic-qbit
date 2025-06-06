import type { EntanglementObject } from './entanglement.object.js';

export class Entanglement<T> implements EntanglementObject<T> {
    #map = new Map<T, Set<T>>();

    entangle(target1: T, target2: T, ...more: T[]): void;
    entangle(...items: [ T, T, ...T[] ]): void {
        for (const item of items) {
            const set = this.#map.get(item) ?? new Set<T>();
            items
                .filter(x => x !== item)
                .forEach(x => set.add(x));

            this.#map.set(item, set);
        }
    }

    untangle(target1: T, target2: T, ...more: T[]): void;
    untangle(...items: [ T, T, ...T[] ]): void {
        items
            .map(item => ({ item, set: this.#map.get(item) }))
            .filter(({ set }) => set)
            .forEach(({ item, set }) => {
                items.forEach(x => set!.delete(x));
                if (set!.size === 0) {
                    this.#map.delete(item);
                }
            });
    }

    getEntangled(target: T): T[] {
        const items = new Set<T>([ target ]);
        const cache = new Set<T>();
        while (cache.size < items.size) {
            for (const item of items) {
                if (item && !cache.has(item)) {
                    cache.add(item);
                    this.#map
                        ?.get(item)
                        ?.forEach(x => items.add(x));
                }
            }
        }

        return Array.from(items);
    }

    getAll(): T[] {
        const items = new Set<T>();
        for (const [ target, set ] of this.#map) {
            items.add(target);
            set.forEach(x => items.add(x));
        }

        return Array.from(items);
    }
}