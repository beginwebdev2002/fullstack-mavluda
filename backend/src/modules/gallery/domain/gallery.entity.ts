export class Gallery {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly imageUrl: string,
    public readonly category: string, // 'makeup' | 'veil' | 'service'
    public readonly status: string = 'draft',
    public readonly alt: string = '',
  ) {}
}
