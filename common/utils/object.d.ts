export declare function deleteProperties<T>(object: T, properties: (keyof T)[]): Omit<T, keyof T>;
