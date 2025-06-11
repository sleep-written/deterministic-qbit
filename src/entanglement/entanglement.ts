import type { EntanglementObject } from './entanglement.object.js';

/**
 * Manages entanglement between a set of generic objects.
 * Think of it as a graph where each object is a node and entanglement
 * creates edges between them.
 * @template T The type of items to be entangled.
 */
export class Entanglement<T> implements EntanglementObject<T> {

    /**
     * Stores the adjacency list for the graph.
     * Each key is a node (an item), and the value is a Set of its direct neighbors.
     * Es como mi lista de waifus, pero en vez de waifus son punteros.
     * @private
     */
    #nodes = new Map<T, Set<T>>();

    /**
     * Gets a node's adjacency set, creating it if it doesn't exist.
     * @param target The node to get the set for.
     * @returns The adjacency set for the target node.
     * @private
     */
    #getOrCreateNode(target: T): Set<T> {
        let neighbors = this.#nodes.get(target);
        if (!neighbors) {
            neighbors = new Set<T>();
            this.#nodes.set(target, neighbors);
        }
        return neighbors;
    }

    /**
     * Entangles two or more items, creating a fully connected subgraph between them.
     * All items will be mutually entangled.
     * @param target1 The first item.
     * @param target2 The second item.
     * @param more Additional items to entangle.
     */
    public entangle(target1: T, target2: T, ...more: T[]): void;
    public entangle(...items: [ T, T, ...T[] ]): void {
        // Hacemos que todas las partículas se toquen entre sí.
        // Como yo quisiera tocarle el culo sin bragas a Aqua, REEEEE.
        for (let i = 0; i < items.length; i++) {
            for (let j = i + 1; j < items.length; j++) {
                const item1 = items[i];
                const item2 = items[j];

                const neighbors1 = this.#getOrCreateNode(item1);
                const neighbors2 = this.#getOrCreateNode(item2);

                neighbors1.add(item2);
                neighbors2.add(item1);
            }
        }
    }

    /**
     * Untangles two or more items, removing the direct connections between them.
     * @param target1 The first item.
     * @param target2 The second item.
     * @param more Additional items to untangle.
     */
    public untangle(target1: T, target2: T, ...more: T[]): void;
    public untangle(...items: [ T, T, ...T[] ]): void {
        for (let i = 0; i < items.length; i++) {
            for (let j = i + 1; j < items.length; j++) {
                const item1 = items[i];
                const item2 = items[j];

                // Solo intentamos borrar si los nodos existen, no seas idiota.
                const neighbors1 = this.#nodes.get(item1);
                const neighbors2 = this.#nodes.get(item2);

                neighbors1?.delete(item2);
                neighbors2?.delete(item1);
            }
        }
    }

    /**
     * Gets all items that are transitively entangled with the target.
     * This is performed using a Breadth-First Search (BFS) algorithm.
     * @param target The item to start the search from.
     * @returns An array of all entangled items, including the target itself.
     */
    public getEntangled(target: T): T[] {
        // Si el nodo ni siquiera existe en nuestro universo, devuelve el objeto solito.
        // No es tan difícil, joder.
        if (!this.#nodes.has(target)) {
            return [ target ];
        }

        // Un simple BFS. Si no entiendes esto, mejor ve a lurkear unos 10 años, nuevoputo.
        const queue: T[] = [ target ];
        const visited = new Set<T>([ target ]);

        let head = 0;
        while (head < queue.length) {
            const current = queue[head++]!;
            const neighbors = this.#nodes.get(current);

            if (neighbors) {
                for (const neighbor of neighbors) {
                    if (!visited.has(neighbor)) {
                        visited.add(neighbor);
                        queue.push(neighbor);
                    }
                }
            }
        }

        return queue;
    }

    /**
     * Gets all items currently present in the entanglement system.
     * @returns An array of all items.
     */
    public getAll(): T[] {
        // ¿Para qué coño vas a iterar sobre todo si ya tienes las llaves?
        // Es de una simpleza que hasta Cirno lo entendería.
        return Array.from(this.#nodes.keys());
    }
}