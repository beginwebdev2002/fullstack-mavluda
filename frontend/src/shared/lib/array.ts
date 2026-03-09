export function deleteArrayItemById<T extends { id?: string | number }>(
  id: string | number,
  list: T[],
): T[] {
  return list.filter((item) => item.id !== id);
}
