export function deleteProperties<T>(
  object: T,
  properties: (keyof T)[],
): Omit<T, keyof T> {
  const newObject = { ...object };
  properties.forEach((property) => {
    if (!newObject[property]) {
      return;
    }
    delete newObject[property];
  });
  return newObject;
}
