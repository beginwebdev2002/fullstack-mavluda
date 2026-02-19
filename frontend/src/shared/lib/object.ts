export function objectExcludePropety<T>(obj: T, prop: (keyof T)[]): Partial<T> {
  const rest = obj;
  prop.forEach((item) => {
    delete rest[item];
  });
  return rest;
}

export function formDataExcludeProperty<T extends FormData>(
  obj: T,
  prop: string[],
): FormData {
  const rest = obj;
  prop.forEach((item) => {
    rest.delete(item);
  });
  return rest;
}

export function formDataAppendObject<T extends Object>(
  ...prop: T[] | File[]
): FormData {
  const formData = new FormData();
  if (prop.length === 0) return formData;
  prop.forEach((item) => {
    if (!item) return;
    if (item instanceof File) {
      formData.append("files", item);
    } else {
      Object.keys(item).forEach((key) => {
        const value = item[key];
        if (!value) return;
        formData.append(key, value.toString());
      });
    }
  });

  return formData;
}
