import { BlogPost } from '../../shared/data/blog-posts';

const DEFAULT_IMAGE =
  'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=80';

export function unwrapOdataList(response: any): any[] {
  if (!response) {
    return [];
  }
  if (Array.isArray(response)) {
    return response;
  }
  if (Array.isArray(response.value)) {
    return response.value;
  }
  if (Array.isArray(response.results)) {
    return response.results;
  }
  if (Array.isArray(response.data)) {
    return response.data;
  }
  return [];
}

export function unwrapOdataEntity(response: any): any | null {
  if (!response) {
    return null;
  }
  if (Array.isArray(response)) {
    return response[0] ?? null;
  }
  if (typeof response === 'object') {
    if ('value' in response && response.value && !Array.isArray(response.value)) {
      return response.value;
    }
    if ('data' in response && response.data && typeof response.data === 'object') {
      return response.data;
    }
    if ('result' in response && response.result && typeof response.result === 'object') {
      return response.result;
    }
  }
  return response;
}

export function mapApiBlogToBlogPost(entity: any): BlogPost {
  const description = entity?.description ?? '';
  const createdDate = entity?.created_at ?? new Date().toISOString();
  const publishDate = String(createdDate).slice(0, 10);
  const categoryName = entity?.category?.name ?? entity?.category_name ?? 'Uncategorized';
  const status: 'draft' | 'published' = entity?.is_published ? 'published' : 'draft';
  const tags = parseTags(entity?.tags);

  return {
    id: entity?.id ?? 0,
    title: entity?.title ?? '',
    excerpt: entity?.excerpt_title ?? '',
    content: description,
    category: categoryName,
    categoryId: entity?.category_id ?? null,
    flags: buildFlags(categoryName, Boolean(entity?.is_featured), Boolean(entity?.is_trending), status),
    date: publishDate,
    publishDate,
    readTime: entity?.read_time ?? calculateReadTime(description),
    views: String(entity?.views_count ?? 0),
    tags,
    image: resolveImage(entity),
    featured: Boolean(entity?.is_featured),
    trending: Boolean(entity?.is_trending),
    status,
    mediaId: entity?.media?.[0]?.id ?? null
  };
}

export function buildFlags(
  category: string,
  featured: boolean,
  trending: boolean,
  status: 'draft' | 'published'
): string[] {
  const flags = [category];
  if (featured) {
    flags.push('Featured');
  }
  if (trending) {
    flags.push('Trending');
  }
  flags.push(status === 'published' ? 'Published' : 'Draft');
  return flags;
}

export function parseTags(tags: unknown): string[] {
  if (Array.isArray(tags)) {
    return tags
      .map((tag) => (typeof tag === 'string' ? tag.trim() : String(tag)))
      .filter((tag) => Boolean(tag));
  }
  if (typeof tags === 'string') {
    return tags
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean);
  }
  return [];
}

export function calculateReadTime(content: string): string {
  const text = content.replace(/<[^>]+>/g, ' ');
  const words = text.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
}

export function resolveImage(entity: any): string {
  if (entity?.image) {
    return entity.image;
  }
  const mediaItems = entity?.media ?? entity?.registerMediaCollections ?? [];
  if (Array.isArray(mediaItems) && mediaItems.length > 0) {
    const media = mediaItems[0];
    if (media?.media_url) {
      return media.media_url;
    }
    if (media?.original_url) {
      return media.original_url;
    }
    if (media?.url) {
      return media.url;
    }
  }
  return DEFAULT_IMAGE;
}
