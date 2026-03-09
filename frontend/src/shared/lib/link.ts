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

export function linkServerConvert(...link: string[]) {
  return new URL(linkCombine(...link), environment.apiUrl).href;
}
