import { environment } from "@environments/environment";

export function linkCombine(...links: string[]): string {
  const linkItems: string[] = [];
  links.forEach((item) => {
    const link = item.split("/");
    if (link) {
      linkItems.push(...link);
    }
  });
  return linkItems.filter(Boolean).join("/");
}

export function linkServerConvert(...link: string[]): string {
  return new URL(linkCombine(...link), environment.apiUrl).href;
}

export function linkMerge(...link: string[]): string {
  return new URL(linkCombine(...link), environment.apiUrl).href;
}
