import MemoryStorage from "./memory-storage.interface";

export default class LocalMemoryStorage<T, K> implements MemoryStorage<T, K> {
    private storage = new Map<K, T>();

    async get(key: K): Promise<T> {
        const found = this.storage.get(key);

        if (!found) {
            throw new Error(`Object with key ${key} does not exist in the memory storage.`);
        }

        return found;
    }

    async exists(key: K): Promise<boolean> {
        return this.storage.has(key);
    }

    async set(key: K, object: T): Promise<T> {
        this.storage.set(key, object);
        return object;
    }

    async remove(key: K): Promise<void> {
        this.storage.delete(key);
    }

    async removeAll(): Promise<void> {
        this.storage.clear();
    }
}