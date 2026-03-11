import { required } from "@angular/forms/signals";

export interface TreatmentItem {
  id: string | number;
  name: string;
  category: string;
  description: string;
  price: number;
  duration: number;
  active: boolean;
  imageUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}

export const resetTreatmentData = {
  id: "",
  name: "",
  description: "",
  price: 0,
  duration: 0,
  active: true,
  image: "",
};

export function treatmentsValidationSchema(schemaPath) {
  required(schemaPath.name, {
    message: $localize`@@treatmentNameRequiredMessage: Name is required`,
  });
  required(schemaPath.description, {
    message: $localize`@@treatmentDescriptionRequiredMessage: Description is required`,
  });
  required(schemaPath.price, {
    message: $localize`@@treatmentPriceRequiredMessage: Price is required`,
  });
  required(schemaPath.duration, {
    message: $localize`@@treatmentDurationRequiredMessage: Duration is required`,
  });
  required(schemaPath.image, {
    message: $localize`@@treatmentImageRequiredMessage: Image is required`,
  });
  required(schemaPath.active, {
    message: $localize`@@treatmentActiveRequiredMessage: Active is required`,
  });
}
