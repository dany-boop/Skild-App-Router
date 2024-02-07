export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  graphql_public: {
    Tables: {
      [_ in never]: never;
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      graphql: {
        Args: {
          operationName?: string;
          query?: string;
          variables?: Json;
          extensions?: Json;
        };
        Returns: Json;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  public: {
    Tables: {
      contractortypes: {
        Row: {
          created_at: string;
          deleted: boolean;
          description: string | null;
          id: number;
          name: string | null;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          deleted?: boolean;
          description?: string | null;
          id?: number;
          name?: string | null;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          deleted?: boolean;
          description?: string | null;
          id?: number;
          name?: string | null;
          updated_at?: string;
        };
        Relationships: [];
      };
      jobapplications: {
        Row: {
          created_at: string;
          deleted: boolean;
          description: string | null;
          id: number;
          job_id: number | null;
          name: string | null;
          roles: string | null;
          tradesperson_id: string | null;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          deleted?: boolean;
          description?: string | null;
          id?: number;
          job_id?: number | null;
          name?: string | null;
          roles?: string | null;
          tradesperson_id?: string | null;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          deleted?: boolean;
          description?: string | null;
          id?: number;
          job_id?: number | null;
          name?: string | null;
          roles?: string | null;
          tradesperson_id?: string | null;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'jobapplications_job_id_fkey';
            columns: ['job_id'];
            referencedRelation: 'jobs';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'jobapplications_tradesperson_id_fkey';
            columns: ['tradesperson_id'];
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          }
        ];
      };
      jobcategories: {
        Row: {
          created_at: string;
          deleted: boolean;
          description: string | null;
          id: number;
          jobcategory_id: number | null;
          name: string | null;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          deleted?: boolean;
          description?: string | null;
          id?: number;
          jobcategory_id?: number | null;
          name?: string | null;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          deleted?: boolean;
          description?: string | null;
          id?: number;
          jobcategory_id?: number | null;
          name?: string | null;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'jobcategories_jobcategory_id_fkey';
            columns: ['jobcategory_id'];
            referencedRelation: 'jobcategories';
            referencedColumns: ['id'];
          }
        ];
      };
      jobcontracts: {
        Row: {
          created_at: string;
          date: string | null;
          deleted: boolean;
          description: string | null;
          due_date: string | null;
          id: number;
          job_id: number | null;
          long_id: string | null;
          name: string | null;
          status: string | null;
          terms: string | null;
          total: number | null;
          tradesperson_id: string | null;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          date?: string | null;
          deleted?: boolean;
          description?: string | null;
          due_date?: string | null;
          id?: number;
          job_id?: number | null;
          long_id?: string | null;
          name?: string | null;
          status?: string | null;
          terms?: string | null;
          total?: number | null;
          tradesperson_id?: string | null;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          date?: string | null;
          deleted?: boolean;
          description?: string | null;
          due_date?: string | null;
          id?: number;
          job_id?: number | null;
          long_id?: string | null;
          name?: string | null;
          status?: string | null;
          terms?: string | null;
          total?: number | null;
          tradesperson_id?: string | null;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'jobcontracts_job_id_fkey';
            columns: ['job_id'];
            referencedRelation: 'jobs';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'jobcontracts_tradesperson_id_fkey';
            columns: ['tradesperson_id'];
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          }
        ];
      };
      jobinvoiceitems: {
        Row: {
          created_at: string;
          deleted: boolean;
          description: string | null;
          id: number;
          jobinvoice_id: number | null;
          name: string | null;
          price: number | null;
          quantity: number | null;
          status: string | null;
          total: number | null;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          deleted?: boolean;
          description?: string | null;
          id?: number;
          jobinvoice_id?: number | null;
          name?: string | null;
          price?: number | null;
          quantity?: number | null;
          status?: string | null;
          total?: number | null;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          deleted?: boolean;
          description?: string | null;
          id?: number;
          jobinvoice_id?: number | null;
          name?: string | null;
          price?: number | null;
          quantity?: number | null;
          status?: string | null;
          total?: number | null;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'jobinvoiceitems_jobinvoice_id_fkey';
            columns: ['jobinvoice_id'];
            referencedRelation: 'jobinvoices';
            referencedColumns: ['id'];
          }
        ];
      };
      jobinvoices: {
        Row: {
          created_at: string;
          date: string | null;
          deleted: boolean;
          description: string | null;
          due_date: string | null;
          gst_amount: number | null;
          gst_percent: number | null;
          id: number;
          job_id: number | null;
          long_id: string | null;
          name: string | null;
          status: string | null;
          total: number | null;
          tradesperson_id: string | null;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          date?: string | null;
          deleted?: boolean;
          description?: string | null;
          due_date?: string | null;
          gst_amount?: number | null;
          gst_percent?: number | null;
          id?: number;
          job_id?: number | null;
          long_id?: string | null;
          name?: string | null;
          status?: string | null;
          total?: number | null;
          tradesperson_id?: string | null;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          date?: string | null;
          deleted?: boolean;
          description?: string | null;
          due_date?: string | null;
          gst_amount?: number | null;
          gst_percent?: number | null;
          id?: number;
          job_id?: number | null;
          long_id?: string | null;
          name?: string | null;
          status?: string | null;
          total?: number | null;
          tradesperson_id?: string | null;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'jobinvoices_job_id_fkey';
            columns: ['job_id'];
            referencedRelation: 'jobs';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'jobinvoices_tradesperson_id_fkey';
            columns: ['tradesperson_id'];
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          }
        ];
      };
      jobreviews: {
        Row: {
          created_at: string;
          deleted: boolean;
          description: string | null;
          id: number;
          job_id: number | null;
          name: string | null;
          rating: number | null;
          tradesperson_id: string | null;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          deleted?: boolean;
          description?: string | null;
          id?: number;
          job_id?: number | null;
          name?: string | null;
          rating?: number | null;
          tradesperson_id?: string | null;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          deleted?: boolean;
          description?: string | null;
          id?: number;
          job_id?: number | null;
          name?: string | null;
          rating?: number | null;
          tradesperson_id?: string | null;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'jobreviews_job_id_fkey';
            columns: ['job_id'];
            referencedRelation: 'jobs';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'jobreviews_tradesperson_id_fkey';
            columns: ['tradesperson_id'];
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          }
        ];
      };
      jobs: {
        Row: {
          address: string | null;
          brief: string | null;
          building_area_m2: number | null;
          confirmed_budget: number | null;
          contractor_id: string | null;
          created_at: string;
          date_finish: string | null;
          date_start: string | null;
          deleted: boolean;
          description: string | null;
          district: string | null;
          estimated_budget: number | null;
          estimated_days: number | null;
          id: number;
          jobcategory_id: number | null;
          jobtype_id: number | null;
          land_area_m2: number | null;
          name: string | null;
          number_of_floors: number | null;
          number_of_trades: number | null;
          recommended: boolean;
          updated_at: string;
        };
        Insert: {
          address?: string | null;
          brief?: string | null;
          building_area_m2?: number | null;
          confirmed_budget?: number | null;
          contractor_id?: string | null;
          created_at?: string;
          date_finish?: string | null;
          date_start?: string | null;
          deleted?: boolean;
          description?: string | null;
          district?: string | null;
          estimated_budget?: number | null;
          estimated_days?: number | null;
          id?: number;
          jobcategory_id?: number | null;
          jobtype_id?: number | null;
          land_area_m2?: number | null;
          name?: string | null;
          number_of_floors?: number | null;
          number_of_trades?: number | null;
          recommended?: boolean;
          updated_at?: string;
        };
        Update: {
          address?: string | null;
          brief?: string | null;
          building_area_m2?: number | null;
          confirmed_budget?: number | null;
          contractor_id?: string | null;
          created_at?: string;
          date_finish?: string | null;
          date_start?: string | null;
          deleted?: boolean;
          description?: string | null;
          district?: string | null;
          estimated_budget?: number | null;
          estimated_days?: number | null;
          id?: number;
          jobcategory_id?: number | null;
          jobtype_id?: number | null;
          land_area_m2?: number | null;
          name?: string | null;
          number_of_floors?: number | null;
          number_of_trades?: number | null;
          recommended?: boolean;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'jobs_contractor_id_fkey';
            columns: ['contractor_id'];
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'jobs_jobcategory_id_fkey';
            columns: ['jobcategory_id'];
            referencedRelation: 'jobcategories';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'jobs_jobtype_id_fkey';
            columns: ['jobtype_id'];
            referencedRelation: 'jobtypes';
            referencedColumns: ['id'];
          }
        ];
      };
      jobslogs: {
        Row: {
          created_at: string;
          date_finish: string | null;
          date_start: string | null;
          deleted: boolean;
          description: string | null;
          id: number;
          job_id: number | null;
          name: string | null;
          tradesperson_id: string | null;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          date_finish?: string | null;
          date_start?: string | null;
          deleted?: boolean;
          description?: string | null;
          id?: number;
          job_id?: number | null;
          name?: string | null;
          tradesperson_id?: string | null;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          date_finish?: string | null;
          date_start?: string | null;
          deleted?: boolean;
          description?: string | null;
          id?: number;
          job_id?: number | null;
          name?: string | null;
          tradesperson_id?: string | null;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'jobslogs_job_id_fkey';
            columns: ['job_id'];
            referencedRelation: 'jobs';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'jobslogs_tradesperson_id_fkey';
            columns: ['tradesperson_id'];
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          }
        ];
      };
      jobtypes: {
        Row: {
          created_at: string;
          deleted: boolean;
          description: string | null;
          id: number;
          name: string | null;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          deleted?: boolean;
          description?: string | null;
          id?: number;
          name?: string | null;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          deleted?: boolean;
          description?: string | null;
          id?: number;
          name?: string | null;
          updated_at?: string;
        };
        Relationships: [];
      };
      payments: {
        Row: {
          created_at: string;
          date: string | null;
          deleted: boolean;
          id: number;
          jobinvoice_id: number | null;
          method: string | null;
          status: string | null;
          total: number | null;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          date?: string | null;
          deleted?: boolean;
          id?: number;
          jobinvoice_id?: number | null;
          method?: string | null;
          status?: string | null;
          total?: number | null;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          date?: string | null;
          deleted?: boolean;
          id?: number;
          jobinvoice_id?: number | null;
          method?: string | null;
          status?: string | null;
          total?: number | null;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'payments_jobinvoice_id_fkey';
            columns: ['jobinvoice_id'];
            referencedRelation: 'jobinvoices';
            referencedColumns: ['id'];
          }
        ];
      };
      profiles: {
        Row: {
          address: string | null;
          avatar: string | null;
          bank_account_number: string | null;
          bank_name: string | null;
          contractortype_id: number | null;
          created_at: string;
          deleted: boolean;
          description: string | null;
          dob: string | null;
          email: string | null;
          gender: string | null;
          id: string;
          is_admin: boolean;
          mobile: string | null;
          name: string | null;
          phone: string | null;
          registration_number: string | null;
          role_id: number | null;
          updated_at: string;
        };
        Insert: {
          address?: string | null;
          avatar?: string | null;
          bank_account_number?: string | null;
          bank_name?: string | null;
          contractortype_id?: number | null;
          created_at?: string;
          deleted?: boolean;
          description?: string | null;
          dob?: string | null;
          email?: string | null;
          gender?: string | null;
          id: string;
          is_admin?: boolean;
          mobile?: string | null;
          name?: string | null;
          phone?: string | null;
          registration_number?: string | null;
          role_id?: number | null;
          updated_at?: string;
        };
        Update: {
          address?: string | null;
          avatar?: string | null;
          bank_account_number?: string | null;
          bank_name?: string | null;
          contractortype_id?: number | null;
          created_at?: string;
          deleted?: boolean;
          description?: string | null;
          dob?: string | null;
          email?: string | null;
          gender?: string | null;
          id?: string;
          is_admin?: boolean;
          mobile?: string | null;
          name?: string | null;
          phone?: string | null;
          registration_number?: string | null;
          role_id?: number | null;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'profiles_contractortype_id_fkey';
            columns: ['contractortype_id'];
            referencedRelation: 'contractortypes';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'profiles_id_fkey';
            columns: ['id'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'profiles_role_id_fkey';
            columns: ['role_id'];
            referencedRelation: 'roles';
            referencedColumns: ['id'];
          }
        ];
      };
      roles: {
        Row: {
          created_at: string;
          deleted: boolean;
          description: string | null;
          id: number;
          name: string | null;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          deleted?: boolean;
          description?: string | null;
          id?: number;
          name?: string | null;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          deleted?: boolean;
          description?: string | null;
          id?: number;
          name?: string | null;
          updated_at?: string;
        };
        Relationships: [];
      };
      skills: {
        Row: {
          created_at: string;
          deleted: boolean;
          description: string | null;
          id: number;
          name: string | null;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          deleted?: boolean;
          description?: string | null;
          id?: number;
          name?: string | null;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          deleted?: boolean;
          description?: string | null;
          id?: number;
          name?: string | null;
          updated_at?: string;
        };
        Relationships: [];
      };
      tradesskills: {
        Row: {
          created_at: string;
          deleted: boolean;
          description: string | null;
          id: number;
          name: string | null;
          skill_id: number | null;
          tradesperson_id: string | null;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          deleted?: boolean;
          description?: string | null;
          id?: number;
          name?: string | null;
          skill_id?: number | null;
          tradesperson_id?: string | null;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          deleted?: boolean;
          description?: string | null;
          id?: number;
          name?: string | null;
          skill_id?: number | null;
          tradesperson_id?: string | null;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'tradesskills_skill_id_fkey';
            columns: ['skill_id'];
            referencedRelation: 'skills';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'tradesskills_tradesperson_id_fkey';
            columns: ['tradesperson_id'];
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  storage: {
    Tables: {
      buckets: {
        Row: {
          allowed_mime_types: string[] | null;
          avif_autodetection: boolean | null;
          created_at: string | null;
          file_size_limit: number | null;
          id: string;
          name: string;
          owner: string | null;
          public: boolean | null;
          updated_at: string | null;
        };
        Insert: {
          allowed_mime_types?: string[] | null;
          avif_autodetection?: boolean | null;
          created_at?: string | null;
          file_size_limit?: number | null;
          id: string;
          name: string;
          owner?: string | null;
          public?: boolean | null;
          updated_at?: string | null;
        };
        Update: {
          allowed_mime_types?: string[] | null;
          avif_autodetection?: boolean | null;
          created_at?: string | null;
          file_size_limit?: number | null;
          id?: string;
          name?: string;
          owner?: string | null;
          public?: boolean | null;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'buckets_owner_fkey';
            columns: ['owner'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
      };
      migrations: {
        Row: {
          executed_at: string | null;
          hash: string;
          id: number;
          name: string;
        };
        Insert: {
          executed_at?: string | null;
          hash: string;
          id: number;
          name: string;
        };
        Update: {
          executed_at?: string | null;
          hash?: string;
          id?: number;
          name?: string;
        };
        Relationships: [];
      };
      objects: {
        Row: {
          bucket_id: string | null;
          created_at: string | null;
          id: string;
          last_accessed_at: string | null;
          metadata: Json | null;
          name: string | null;
          owner: string | null;
          path_tokens: string[] | null;
          updated_at: string | null;
          version: string | null;
        };
        Insert: {
          bucket_id?: string | null;
          created_at?: string | null;
          id?: string;
          last_accessed_at?: string | null;
          metadata?: Json | null;
          name?: string | null;
          owner?: string | null;
          path_tokens?: string[] | null;
          updated_at?: string | null;
          version?: string | null;
        };
        Update: {
          bucket_id?: string | null;
          created_at?: string | null;
          id?: string;
          last_accessed_at?: string | null;
          metadata?: Json | null;
          name?: string | null;
          owner?: string | null;
          path_tokens?: string[] | null;
          updated_at?: string | null;
          version?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'objects_bucketId_fkey';
            columns: ['bucket_id'];
            referencedRelation: 'buckets';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'objects_owner_fkey';
            columns: ['owner'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      can_insert_object: {
        Args: {
          bucketid: string;
          name: string;
          owner: string;
          metadata: Json;
        };
        Returns: undefined;
      };
      extension: {
        Args: {
          name: string;
        };
        Returns: string;
      };
      filename: {
        Args: {
          name: string;
        };
        Returns: string;
      };
      foldername: {
        Args: {
          name: string;
        };
        Returns: unknown;
      };
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>;
        Returns: {
          size: number;
          bucket_id: string;
        }[];
      };
      search: {
        Args: {
          prefix: string;
          bucketname: string;
          limits?: number;
          levels?: number;
          offsets?: number;
          search?: string;
          sortcolumn?: string;
          sortorder?: string;
        };
        Returns: {
          name: string;
          id: string;
          updated_at: string;
          created_at: string;
          last_accessed_at: string;
          metadata: Json;
        }[];
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
