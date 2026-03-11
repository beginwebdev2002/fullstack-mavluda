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
        if (value === undefined || value === null) return;
        formData.append(key, value.toString());
      });
    }
  });

  return formData;
}

export function deleteProperties<T>(object: T, properties: string[]): Omit<T, keyof T> {
    const newObject = { ...object };
    properties.forEach((property) => {
        if (!newObject[property]) {
            return;
        }
        delete newObject[property];
    });
    return newObject;
}

export function excludeFormDataProperties(
  formData: FormData, 
  properties: string[]
): FormData {
  formData.forEach((value, key) => {
    if (properties.includes(key)) {
      formData.delete(key);
    }
  });

  return formData;
}
