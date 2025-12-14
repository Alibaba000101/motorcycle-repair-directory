export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      repair_shops: {
        Row: RepairShop
        Insert: RepairShop
        Update: Partial<RepairShop>
      }
    }
  }
}

export interface RepairShop {
  id: number;
  city: string;
  name: string;
  address: string;
  rating: string | number; // Can be string from Supabase TEXT column
  reviews_count: string | number; // Can be string from Supabase TEXT column
  phone: string;
  website: string;
  business_type: string;
  hours: string;
  latitude: string | number; // Can be string from Supabase TEXT column
  longitude: string | number; // Can be string from Supabase TEXT column
  place_id: string;
  scraped_at: string;
}
