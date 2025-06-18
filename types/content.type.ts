// Knowledge Hub Content related types

export enum ContentCategory {
  RESEARCH_PAPERS = 'research_papers',
  INDUSTRY_NEWS = 'industry_news',
  CASE_STUDIES = 'case_studies',
  TOOLKITS_GUIDES = 'toolkits_guides',
  WEBINARS = 'webinars'
}

export enum ContentStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  ARCHIVED = 'archived'
}

export enum ContentType {
  ARTICLE = 'article',
  LINK = 'link',
  DOCUMENT = 'document',
  VIDEO = 'video',
  WEBINAR = 'webinar'
}

export interface ContentItem {
  id: string;
  title: string;
  description: string;
  content?: string; // Rich text content for articles
  category: ContentCategory;
  type: ContentType;
  status: ContentStatus;
  authorId: string;
  publishedAt?: Date;
  externalUrl?: string; // For links and external resources
  downloadUrl?: string; // For downloadable documents
  attachmentUrls?: string[]; // Support for multiple file attachments (PDFs, docs, etc.)
  thumbnailUrl?: string;
  tags: string[];
  metadata: ContentMetadata;
  createdAt: Date;
  updatedAt?: Date;
}

export interface ContentMetadata {
  readTime?: number; // Estimated read time in minutes
  fileSize?: number; // For downloadable content
  fileType?: string; // PDF, DOCX, etc.
  videoLength?: number; // For video content in seconds
  webinarDate?: Date; // For webinar content
  source?: string; // Original source if aggregated content
  language: string;
}

export interface ContentSearchFilters {
  query?: string;
  category?: ContentCategory;
  type?: ContentType;
  tags?: string[];
  publishedAfter?: Date;
  publishedBefore?: Date;
  authorId?: string;
}

export interface ContentSearchResult {
  items: ContentItem[];
  totalCount: number;
  page: number;
  pageSize: number;
  facets: {
    categories: { [key in ContentCategory]: number };
    types: { [key in ContentType]: number };
    tags: { [tag: string]: number };
  };
}

export interface ContentAnalytics {
  contentId: string;
  views: number;
  downloads: number;
  shares: number;
  lastViewedAt?: Date;
  popularityScore: number;
  createdAt: Date;
  updatedAt: Date;
}