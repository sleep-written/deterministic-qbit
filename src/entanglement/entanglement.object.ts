export interface EntanglementObject<T> {
    getEntangled(target: T): T[];
    entangle(target1: T, target2: T, ...more: T[]): void;
    untangle(target1: T, target2: T, ...more: T[]): void;
    getAll(): T[];
}