export declare class Booking {
    readonly id: string;
    readonly customerName: string;
    readonly date: Date;
    readonly status: 'pending' | 'confirmed' | 'cancelled';
    readonly createdAt: Date;
    readonly updatedAt: Date;
    constructor(id: string, customerName: string, date: Date, status: 'pending' | 'confirmed' | 'cancelled', createdAt: Date, updatedAt: Date);
}
