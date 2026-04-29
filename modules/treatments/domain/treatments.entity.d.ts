export declare class Treatments {
    readonly id: string;
    readonly name: string;
    readonly description: string;
    readonly price: number;
    readonly duration: number;
    readonly category: 'medical' | 'beauty';
    readonly imageUrl: string;
    readonly active: boolean;
    readonly createdAt: Date;
    readonly updatedAt: Date;
    constructor(id: string, name: string, description: string, price: number, duration: number, category: 'medical' | 'beauty', imageUrl: string, active?: boolean, createdAt?: Date, updatedAt?: Date);
}
