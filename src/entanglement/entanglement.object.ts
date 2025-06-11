export interface EntanglementObject<T> {
    /**
     * Entangles two or more items, creating a fully connected subgraph between them.
     * All items will be mutually entangled.
     * @param target1 The first item.
     * @param target2 The second item.
     * @param more Additional items to entangle.
     */
    entangle(target1: T, target2: T, ...more: T[]): void;

    /**
     * Untangles two or more items, removing the direct connections between them.
     * @param target1 The first item.
     * @param target2 The second item.
     * @param more Additional items to untangle.
     */
    untangle(target1: T, target2: T, ...more: T[]): void;

    /**
     * Gets all items that are transitively entangled with the target.
     * This is performed using a Breadth-First Search (BFS) algorithm.
     * @param target The item to start the search from.
     * @returns An array of all entangled items, including the target itself.
     */
    getEntangled(target: T): T[];

    /**
     * Gets all items currently present in the entanglement system.
     * @returns An array of all items.
     */
    getAll(): T[];
}