import { required } from "@angular/forms/signals";
import { Gallery } from "@shared/models";

export const resetGalleryData: Gallery = {
  imageUrl: "",
  title: "",
  category: "visage",
  status: "draft",
  alt: "",
};

export function galleryValidationSchema(schemaPath: any) {
  required(schemaPath.title, {
    message: $localize`:@@galleryTitleRequiredMessage: Title is required`,
  });
  required(schemaPath.category, {
    message: $localize`:@@galleryCategoryRequiredMessage: Category is required`,
  });
}
