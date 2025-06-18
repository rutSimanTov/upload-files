// import { createClient, SupabaseClient } from '@supabase/supabase-js';
// import { Item } from '@base-project/shared';

// export class DatabaseService {
//   private readonly tableName = 'items';
//   private supabase: SupabaseClient | null = null;

//   private getClient(): SupabaseClient {
//     if (!this.supabase) {
//       const supabaseUrl = process.env.SUPABASE_URL;
//       const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

//       if (!supabaseUrl || !supabaseKey) {
//         throw new Error('Missing Supabase configuration. Please check your environment variables.');
//       }

//       this.supabase = createClient(supabaseUrl, supabaseKey);
//     }
//     return this.supabase;
//   }

//   canInitialize(): boolean {
//     return this.getClient() !== null;
//   }

//   async getAllItems(): Promise<Item[]> {
//     try {
//       const { data, error } = await this.getClient()
//         .from(this.tableName)
//         .select('*')
//         .order('created_at', { ascending: true });

//       if (error) {
//         console.error('Database error fetching items:', error);
//         throw new Error('Failed to fetch items from database');
//       }

//       return data || [];
//     } catch (error) {
//       console.error('Error in getAllItems:', error);
//       throw error;
//     }
//   }

//   async getItemById(id: string): Promise<Item | null> {
//     try {
//       const { data, error } = await this.getClient()
//         .from(this.tableName)
//         .select('*')
//         .eq('id', id)
//         .single();

//       if (error) {
//         if (error.code === 'PGRST116') {
//           return null; // Item not found
//         }
//         console.error('Database error fetching item:', error);
//         throw new Error('Failed to fetch item from database');
//       }

//       return data;
//     } catch (error) {
//       console.error('Error in getItemById:', error);
//       throw error;
//     }
//   }

//   async createItem(item: Omit<Item, 'id'>): Promise<Item> {
//     try {
//       const { data, error } = await this.getClient()
//         .from(this.tableName)
//         .insert([item])
//         .select()
//         .single();

//       if (error) {
//         console.error('Database error creating item:', error);
//         throw new Error('Failed to create item in database');
//       }

//       return data;
//     } catch (error) {
//       console.error('Error in createItem:', error);
//       throw error;
//     }
//   }

//   // Initialize database with sample data if empty
//   async initializeSampleData(): Promise<void> {
//     try {
//       const items = await this.getAllItems();
      
//       if (items.length === 0) {
//         console.log('Initializing database with sample data...');
        
//         const sampleItems = [
//           { name: 'Laptop', type: 'Electronics', amount: 1200 },
//           { name: 'Coffee Beans', type: 'Food', amount: 25 },
//           { name: 'Office Chair', type: 'Furniture', amount: 350 },
//           { name: 'Notebook', type: 'Stationery', amount: 15 }
//         ];

//         for (const item of sampleItems) {
//           await this.createItem(item);
//         }
        
//         console.log('Sample data initialized successfully');
//       }
//     } catch (error) {
//       console.error('Failed to initialize sample data:', error);
//       // Don't throw the error, just log it
//     }
//   }
// }

// export const databaseService = new DatabaseService();




// import { createClient, SupabaseClient } from '@supabase/supabase-js';

// import { ContentItem, ContentMetadata, ContentAnalytics } from '../../../../types/content.type';

// export class DatabaseService {
//   private readonly contentTableName = 'content_items';
//   private readonly metadataTableName = 'content_metadata';
//   private readonly analyticsTableName = 'content_analytics';
//   private supabase: SupabaseClient | null = null;

//   private getClient(): SupabaseClient {
//     if (!this.supabase) {
//       const supabaseUrl = process.env.SUPABASE_URL;
//       const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

//       if (!supabaseUrl || !supabaseKey) {
//         throw new Error('Missing Supabase configuration. Please check your environment variables.');
//       }

//       this.supabase = createClient(supabaseUrl, supabaseKey);
//     }
//     return this.supabase;
//   }

//   canInitialize(): boolean {
//     return this.getClient() !== null;
//   }

//   async getAllContentItems(): Promise<ContentItem[]> {
//     try {
//       const { data, error } = await this.getClient()
//         .from(this.contentTableName)
//         .select('*')
//         .order('createdAt', { ascending: true });

//       if (error) {
//         console.error('Database error fetching content items:', error);
//         throw new Error('Failed to fetch content items from database');
//       }

//       return data || [];
//     } catch (error) {
//       console.error('Error in getAllContentItems:', error);
//       throw error;
//     }
//   }

//   async createContentItem(item: Omit<ContentItem, 'id'>): Promise<ContentItem> {
//     try {
//       const { data, error } = await this.getClient()
//         .from(this.contentTableName)
//         .insert([item])
//         .select()
//         .single();

//       if (error) {
//         console.error('Database error creating content item:', error);
//         throw new Error('Failed to create content item in database');
//       }

//       return data;
//     } catch (error) {
//       console.error('Error in createContentItem:', error);
//       throw error;
//     }
//   }

//   async createContentMetadata(metadata: ContentMetadata): Promise<ContentMetadata> {
//     try {
//       const { data, error } = await this.getClient()
//         .from(this.metadataTableName)
//         .insert([metadata])
//         .select()
//         .single();

//       if (error) {
//         console.error('Database error creating content metadata:', error);
//         throw new Error('Failed to create content metadata in database');
//       }

//       return data;
//     } catch (error) {
//       console.error('Error in createContentMetadata:', error);
//       throw error;
//     }
//   }

//   async createContentAnalytics(analytics: ContentAnalytics): Promise<ContentAnalytics> {
//     try {
//       const { data, error } = await this.getClient()
//         .from(this.analyticsTableName)
//         .insert([analytics])
//         .select()
//         .single();

//       if (error) {
//         console.error('Database error creating content analytics:', error);
//         throw new Error('Failed to create content analytics in database');
//       }

//       return data;
//     } catch (error) {
//       console.error('Error in createContentAnalytics:', error);
//       throw error;
//     }
//   }

//   async initializeSampleData(contentItem: Omit<ContentItem, 'id'>): Promise<void> {
//     try {
//       const items = await this.getAllContentItems();
      
//       if (items.length === 0) {
//         console.log('Initializing database with sample content data...');
//         await this.createContentItem(contentItem);
//         console.log('Sample content data initialized successfully');
//       }
//     } catch (error) {
//       console.error('Failed to initialize sample data:', error);
//     }
//   }
// }

// export const databaseService = new DatabaseService();


import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { ContentItem, ContentMetadata, ContentAnalytics,ContentType,ContentStatus,ContentCategory } from '../../../../types/content.type';

export class DatabaseService {
  private readonly contentTableName = 'content_items';
  private readonly metadataTableName = 'content_metadata';
  private readonly analyticsTableName = 'content_analytics';
  private supabase: SupabaseClient | null = null;

  private getClient(): SupabaseClient {
    if (!this.supabase) {
      const supabaseUrl = process.env.SUPABASE_URL;
      const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

      if (!supabaseUrl || !supabaseKey) {
        throw new Error('Missing Supabase configuration. Please check your environment variables.');
      }

      this.supabase = createClient(supabaseUrl, supabaseKey);
    }
    return this.supabase;
  }

  canInitialize(): boolean {
    return this.getClient() !== null;
  }

  async getAllContentItems(): Promise<ContentItem[]> {
    try {
      const { data, error } = await this.getClient()
        .from(this.contentTableName)
        .select('*')
        .order('createdAt', { ascending: true });

      if (error) {
        console.error('Database error fetching content items:', error);
        throw new Error('Failed to fetch content items from database');
      }

      return data || [];
    } catch (error) {
      console.error('Error in getAllContentItems:', error);
      throw error;
    }
  }

  async createContentItem(item: Omit<ContentItem, 'id'>): Promise<ContentItem> {
    try {
      const { data, error } = await this.getClient()
        .from(this.contentTableName)
        .insert([item])
        .select()
        .single();

      if (error) {
        console.error('Database error creating content item:', error);
        throw new Error('Failed to create content item in database');
      }

      return data;
    } catch (error) {
      console.error('Error in createContentItem:', error);
      throw error;
    }
  }

  async createContentMetadata(metadata: ContentMetadata): Promise<ContentMetadata> {
    try {
      const { data, error } = await this.getClient()
        .from(this.metadataTableName)
        .insert([metadata])
        .select()
        .single();

      if (error) {
        console.error('Database error creating content metadata:', error);
        throw new Error('Failed to create content metadata in database');
      }

      return data;
    } catch (error) {
      console.error('Error in createContentMetadata:', error);
      throw error;
    }
  }

  async createContentAnalytics(analytics: ContentAnalytics): Promise<ContentAnalytics> {
    try {
      const { data, error } = await this.getClient()
        .from(this.analyticsTableName)
        .insert([analytics])
        .select()
        .single();

      if (error) {
        console.error('Database error creating content analytics:', error);
        throw new Error('Failed to create content analytics in database');
      }

      return data;
    } catch (error) {
      console.error('Error in createContentAnalytics:', error);
      throw error;
    }
  }

  async initializeSampleData(): Promise<void> {
    try {
      const items = await this.getAllContentItems();
      
      if (items.length === 0) {
        console.log('Initializing database with sample content data...');
        
        const sampleItems: Omit<ContentItem, 'id'>[] = [
          {
            title: 'Sample Article 1',
            description: 'Description for Sample Article 1',
            category: ContentCategory.CASE_STUDIES,
            type: ContentType.DOCUMENT,
            status: ContentStatus.PUBLISHED,
            authorId: 'author-1',
            createdAt: new Date(),
            updatedAt: new Date(),
            tags: [],
            metadata: {
              language: 'English'
            }
          },
          // הוסף דוגמאות נוספות לפי הצורך
        ];

        for (const item of sampleItems) {
          await this.createContentItem(item);
        }
        
        console.log('Sample content data initialized successfully');
      }
    } catch (error) {
      console.error('Failed to initialize sample data:', error);
    }
  }
}

export const databaseService = new DatabaseService();
