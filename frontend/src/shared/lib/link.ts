import { environment } from "@environments/environment";

export function linkCombine(...links: string[]): string {
  return links
    .map(link => link.replace(/^\/+|\/+$/g, ''))
    .filter(Boolean)
    .join('/');
}

export function linkServerConvert(...link: string[]): string {
  const url = getApiBaseUrl();
  return `${linkCombine(url, ...link)}`;
}

export function linkMerge(...link: string[]): string {
  return linkServerConvert(...link);
}

export function getApiBaseUrl(): string {
  const port = window.location.port;
  const isProduction = environment.production;
  if (port && !isProduction) {
    return environment.apiUrl;
  }

  

  if (!port && isProduction) {
    return (window as any).API_URL;
  }

  return '/api';
}