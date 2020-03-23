const getOrThrow = <T>(value?: T, msg?: string): T | never => {
    if (!value) {
        throw new Error(msg);
    }

    return value;
};

export class MockService<Entity> {
    constructor(private name: string) {
    }

    find(toFind: Partial<Entity>): Entity {
        const items = this.readAll();
        const found = items.find(item =>
            Object.entries(toFind).every(([key, value]) =>
                item[key as keyof Entity] === value));

        return getOrThrow(found, `Could not find entity "${this.name}" to match criteria "${JSON.stringify(toFind)}".`);
    }

    save(entity: Entity): Entity {
        const items = this.readAll();
        items.push(entity);
        this.saveAll(items);
        return entity;
    }

    delete(toFind: Partial<Entity>): void {
        let items = this.readAll();
        items = items.filter(item =>
            !Object.entries(toFind).every(([key, value]) =>
                item[key as keyof Entity] === value));
        this.saveAll(items);
    }


    readAll(): Entity[] {
        let encodedItems = localStorage.getItem(this.name);
        encodedItems = encodedItems ?? '[]';
        return JSON.parse(encodedItems);
    }

    saveAll(entities: Entity[]): void {
        localStorage.setItem(this.name, JSON.stringify(entities.map(entity => {
            const entityWithId: Entity & { id: number } = entity as any;
            entityWithId.id = entityWithId.id ?? Math.round(Math.random() * 10**5);

            return entityWithId;
        })));
    }
}