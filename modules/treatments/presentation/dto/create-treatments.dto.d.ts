export declare enum TreatmentCategory {
    Medical = "medical",
    Beauty = "beauty",
    Injectables = "injectables",
    Massage = "massage",
    Skin = "skin",
    Hair = "hair",
    Nails = "nails",
    Other = "other"
}
export declare class CreateServiceDto {
    name: string;
    description: string;
    price: number;
    active: boolean;
    duration: number;
    category: string;
    imageUrl: string;
}
