export default interface MemoryStorage<ObjectType, KeyType> {
    get(key: KeyType): Promise<ObjectType>;
    set(key: KeyType, object: ObjectType): Promise<ObjectType>;
    exists(key: KeyType): Promise<boolean>;
    remove(key: KeyType): Promise<void>;
    removeAll(): Promise<void>;
}