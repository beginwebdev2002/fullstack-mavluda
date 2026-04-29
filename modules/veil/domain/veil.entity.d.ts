export interface VeilProps {
    id: string;
    name: string;
    description: string;
    price: number;
    rentalPrice: number;
    image: string;
    category: string;
    isAvailable?: boolean;
    sku?: string;
    silhouette?: string;
    neckline?: string;
    fabric?: string;
    trainLength?: string;
    stock?: number;
    createdAt?: Date;
    updatedAt?: Date;
}
export declare class Veil {
    readonly id: string;
    readonly name: string;
    readonly description: string;
    readonly price: number;
    readonly rentalPrice: number;
    readonly image: string;
    readonly category: string;
    readonly isAvailable: boolean;
    readonly sku?: string;
    readonly silhouette?: string;
    readonly neckline?: string;
    readonly fabric?: string;
    readonly trainLength?: string;
    readonly stock?: number;
    readonly createdAt: Date;
    readonly updatedAt: Date;
    constructor(props: VeilProps);
}
