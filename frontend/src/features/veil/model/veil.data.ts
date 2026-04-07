import { required } from "@angular/forms/signals";

export interface Veil {
  id?: string;
  name: string;
  description?: string;
  price: number;
  rentalPrice: number;
  image?: string;
  category: string;
  isAvailable: boolean;
  sku: string;
  silhouette: string;
  neckline: string;
  fabric: string;
  trainLength: string;
  stock: number;
}

export const resetVeilData: Veil = {
  name: "",
  sku: "",
  price: 0,
  rentalPrice: 0,
  stock: 0,
  silhouette: "",
  neckline: "",
  fabric: "",
  trainLength: "",
  category: "",
  isAvailable: true,
  description: "",
};

export function veilValidationSchema(schemaPath) {
  required(schemaPath.name, {
    message: $localize`@@veilNameRequiredMessage: Name is required`,
  });
  required(schemaPath.price, {
    message: $localize`:@@veilPriceRequiredMessage: Price is required`,
  });
  required(schemaPath.rentalPrice, {
    message: $localize`:@@veilRentalPriceRequiredMessage: Rental price is required`,
  });
  required(schemaPath.image, {
    message: $localize`:@@veilImageRequiredMessage: Image is required`,
  });
  required(schemaPath.sku, {
    message: $localize`:@@veilSkuRequiredMessage: SKU is required`,
  });
  required(schemaPath.stock, {
    message: $localize`:@@veilStockRequiredMessage: Stock is required`,
  });
  required(schemaPath.silhouette, {
    message: $localize`:@@veilSilhouetteRequiredMessage: Silhouette is required`,
  });
  required(schemaPath.neckline, {
    message: $localize`:@@veilNecklineRequiredMessage: Neckline is required`,
  });
  required(schemaPath.fabric, {
    message: $localize`:@@veilFabricRequiredMessage: Fabric is required`,
  });
  required(schemaPath.trainLength, {
    message: $localize`:@@veilTrainLengthRequiredMessage: Train length is required`,
  });
  required(schemaPath.category, {
    message: $localize`:@@veilCategoryRequiredMessage: Category is required`,
  });
  required(schemaPath.isAvailable, {
    message: $localize`:@@veilIsAvailableRequiredMessage: Is available is required`,
  });
  required(schemaPath.description, {
    message: $localize`:@@veilDescriptionRequiredMessage: Description is required`,
  });
}
