export declare class Partnership {
    readonly id: string;
    readonly partnerName: string;
    readonly contactEmail: string;
    readonly type: string;
    readonly status: 'active' | 'inactive';
    readonly createdAt: Date;
    constructor(id: string, partnerName: string, contactEmail: string, type: string, status: 'active' | 'inactive', createdAt: Date);
}
