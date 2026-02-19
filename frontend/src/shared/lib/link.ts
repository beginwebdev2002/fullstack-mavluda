import { environment } from "@environments/environment";

export function linkCombine(...links: string[]) {
  const linkItems: string[] = [];
  links.forEach((item) => {
    const link = item.split("/");
    if (link) {
      linkItems.push(...link);
    }
  });
  return linkItems.filter(Boolean).join("/");
}

export function linkServerConvert(image: string) {
  return new URL(linkCombine(image), environment.apiUrl).href;
}
