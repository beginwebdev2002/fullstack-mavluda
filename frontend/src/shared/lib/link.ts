import { environment } from "@environments/environment";

export function linkCombine(...links: string[]): string {
  return links
    .map(link => link.replace(/^\/+|\/+$/g, ''))
    .filter(Boolean)
    .join('/');
}

export function linkServerConvert(...link: string[]): string {
  return `/${linkCombine(environment.apiUrl, ...link)}`;
}

export function linkMerge(...link: string[]): string {
  return linkServerConvert(...link);
}