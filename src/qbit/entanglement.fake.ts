import type { EntanglementObject } from '@/entanglement/index.js';
import type { QBitBase } from './qbit-base.js';

export class EntanglementFake implements EntanglementObject<QBitBase> {
    #set = new Set<QBitBase>();

    getEntangled(target: QBitBase): QBitBase[] {
        if (this.#set.has(target)) {
            return Array
                .from(this.#set)
                .filter(x => x !== target);
        } else {
            return [];
        }
    }

    entangle(target1: QBitBase, target2: QBitBase, ...more: QBitBase[]): void {
        this.#set.add(target1);
        this.#set.add(target2);
        more.forEach(x => this.#set.add(x));
    }

    untangle(target1: QBitBase, target2: QBitBase, ...more: QBitBase[]): void {
        this.#set.delete(target1);
        this.#set.delete(target2);
        more.forEach(x => this.#set.delete(x));
    }

    getAll(): QBitBase[] {
        throw new Error('Method not implemented.');
    }
}