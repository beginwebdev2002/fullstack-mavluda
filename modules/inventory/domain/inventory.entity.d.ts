export declare class Inventory {
    readonly id: string;
    readonly itemName: string;
    readonly quantity: number;
    readonly location: string;
    readonly lastUpdated: Date;
    constructor(id: string, itemName: string, quantity: number, location: string, lastUpdated: Date);
}
