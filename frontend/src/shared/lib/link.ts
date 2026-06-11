import { environment } from "@environments/environment.development";

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
  if (window.location.port === '4200') {
    return environment.apiUrl;
  }

  if ((window as any).API_URL) {
    return (window as any).API_URL;
  }

  return '/api';
}