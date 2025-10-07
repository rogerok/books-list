export type Json =
  | Json[]
  | { [key: string]: Json | undefined }
  | boolean
  | number
  | string
  | null;

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: '13.0.5';
  };
  graphql_public: {
    CompositeTypes: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    Functions: {
      graphql: {
        Args: {
          extensions?: Json;
          operationName?: string;
          query?: string;
          variables?: Json;
        };
        Returns: Json;
      };
    };
    Tables: {
      [_ in never]: never;
    };
    Views: {
      [_ in never]: never;
    };
  };
  public: {
    CompositeTypes: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    Functions: {
      getRecentRated: {
        Args: { plimit: number; puserid: string };
        Returns: {
          author: string;
          rating: number;
          status: string;
          title: string;
          userBookId: string;
        }[];
      };
      getUserBook: {
        Args: { inbookid: string; inuserid: string };
        Returns: {
          author: string;
          bookCreatedAt: string;
          bookId: string;
          bookUpdatedAt: string;
          coverUrl: string;
          createdAt: string;
          genreId: string;
          genreName: string;
          id: string;
          notes: string;
          progress: number;
          rating: number;
          status: string;
          title: string;
          updatedAt: string;
          userId: string;
        }[];
      };
      getUserBooks: {
        Args: { inuserid: string; insearchterm?: string; instatus?: string };
        Returns: {
          author: string;
          bookCreatedAt: string;
          bookId: string;
          bookUpdatedAt: string;
          coverUrl: string;
          createdAt: string;
          genreId: string;
          genreName: string;
          id: string;
          notes: string;
          progress: number;
          rating: number;
          status: string;
          title: string;
          updatedAt: string;
          userId: string;
        }[];
      };
      getUserGoal: {
        Args: { inuserid: string };
        Returns: {
          createdAt: string;
          id: string;
          readCount: number;
          targetBooks: number;
          targetDate: string;
          updatedAt: string;
          userId: string;
        }[];
      };
      getUserStats: {
        Args: { puserid: string; insearchterm?: string };
        Returns: {
          read: number;
          reading: number;
          toRead: number;
        }[];
      };
      upsertGoalForYear: {
        Args: { ptargetbooks: number; puserid: string };
        Returns: {
          createdAt: string;
          id: string;
          targetBooks: number;
          targetDate: string;
          updatedAt: string;
          userId: string;
        }[];
      };
    };
    Tables: {
      books: {
        Insert: {
          author: string;
          title: string;
          coverUrl?: string | null;
          createdAt?: string | null;
          genreId?: string | null;
          id?: string;
          search?: unknown | null;
          updatedAt?: string | null;
        };
        Relationships: [
          {
            columns: ['genreId'];
            foreignKeyName: 'books_genreId_fkey';
            isOneToOne: false;
            referencedColumns: ['id'];
            referencedRelation: 'genres';
          },
        ];
        Row: {
          author: string;
          coverUrl: string | null;
          createdAt: string | null;
          genreId: string | null;
          id: string;
          search: unknown | null;
          title: string;
          updatedAt: string | null;
        };
        Update: {
          author?: string;
          coverUrl?: string | null;
          createdAt?: string | null;
          genreId?: string | null;
          id?: string;
          search?: unknown | null;
          title?: string;
          updatedAt?: string | null;
        };
      };
      genres: {
        Insert: {
          name: string;
          id?: string;
        };
        Relationships: [];
        Row: {
          id: string;
          name: string;
        };
        Update: {
          id?: string;
          name?: string;
        };
      };
      goals: {
        Insert: {
          targetBooks: number;
          createdAt?: string | null;
          id?: string;
          targetDate?: string | null;
          updatedAt?: string | null;
          userId?: string | null;
        };
        Relationships: [
          {
            columns: ['userId'];
            foreignKeyName: 'goals_userId_fkey';
            isOneToOne: false;
            referencedColumns: ['id'];
            referencedRelation: 'users';
          },
          {
            columns: ['userId'];
            foreignKeyName: 'goals_userId_fkey';
            isOneToOne: false;
            referencedColumns: ['userId'];
            referencedRelation: 'viewUserStats';
          },
        ];
        Row: {
          createdAt: string | null;
          id: string;
          targetBooks: number;
          targetDate: string | null;
          updatedAt: string | null;
          userId: string | null;
        };
        Update: {
          createdAt?: string | null;
          id?: string;
          targetBooks?: number;
          targetDate?: string | null;
          updatedAt?: string | null;
          userId?: string | null;
        };
      };
      notes: {
        Insert: {
          content: string;
          createdAt?: string | null;
          id?: string;
          updatedAt?: string | null;
          userBookId?: string | null;
        };
        Relationships: [
          {
            columns: ['userBookId'];
            foreignKeyName: 'notes_userBookId_fkey';
            isOneToOne: false;
            referencedColumns: ['id'];
            referencedRelation: 'userBooks';
          },
          {
            columns: ['userBookId'];
            foreignKeyName: 'notes_userBookId_fkey';
            isOneToOne: false;
            referencedColumns: ['id'];
            referencedRelation: 'viewUserBookDetails';
          },
        ];
        Row: {
          content: string;
          createdAt: string | null;
          id: string;
          updatedAt: string | null;
          userBookId: string | null;
        };
        Update: {
          content?: string;
          createdAt?: string | null;
          id?: string;
          updatedAt?: string | null;
          userBookId?: string | null;
        };
      };
      userBooks: {
        Insert: {
          bookId?: string | null;
          createdAt?: string | null;
          id?: string;
          notes?: string | null;
          progress?: number;
          rating?: number | null;
          status?: string;
          updatedAt?: string | null;
          userId?: string | null;
        };
        Relationships: [
          {
            columns: ['bookId'];
            foreignKeyName: 'userBooks_bookId_fkey';
            isOneToOne: false;
            referencedColumns: ['id'];
            referencedRelation: 'books';
          },
          {
            columns: ['userId'];
            foreignKeyName: 'userBooks_userId_fkey';
            isOneToOne: false;
            referencedColumns: ['id'];
            referencedRelation: 'users';
          },
          {
            columns: ['userId'];
            foreignKeyName: 'userBooks_userId_fkey';
            isOneToOne: false;
            referencedColumns: ['userId'];
            referencedRelation: 'viewUserStats';
          },
        ];
        Row: {
          bookId: string | null;
          createdAt: string | null;
          id: string;
          notes: string | null;
          progress: number;
          rating: number | null;
          status: string;
          updatedAt: string | null;
          userId: string | null;
        };
        Update: {
          bookId?: string | null;
          createdAt?: string | null;
          id?: string;
          notes?: string | null;
          progress?: number;
          rating?: number | null;
          status?: string;
          updatedAt?: string | null;
          userId?: string | null;
        };
      };
      users: {
        Insert: {
          email: string;
          id: string;
          name: string;
          createdAt?: string | null;
          updatedAt?: string | null;
        };
        Relationships: [];
        Row: {
          createdAt: string | null;
          email: string;
          id: string;
          name: string;
          updatedAt: string | null;
        };
        Update: {
          createdAt?: string | null;
          email?: string;
          id?: string;
          name?: string;
          updatedAt?: string | null;
        };
      };
    };
    Views: {
      viewUserBookDetails: {
        Relationships: [
          {
            columns: ['genreId'];
            foreignKeyName: 'books_genreId_fkey';
            isOneToOne: false;
            referencedColumns: ['id'];
            referencedRelation: 'genres';
          },
          {
            columns: ['bookId'];
            foreignKeyName: 'userBooks_bookId_fkey';
            isOneToOne: false;
            referencedColumns: ['id'];
            referencedRelation: 'books';
          },
          {
            columns: ['userId'];
            foreignKeyName: 'userBooks_userId_fkey';
            isOneToOne: false;
            referencedColumns: ['id'];
            referencedRelation: 'users';
          },
          {
            columns: ['userId'];
            foreignKeyName: 'userBooks_userId_fkey';
            isOneToOne: false;
            referencedColumns: ['userId'];
            referencedRelation: 'viewUserStats';
          },
        ];
        Row: {
          author: string | null;
          bookCreatedAt: string | null;
          bookId: string | null;
          bookUpdatedAt: string | null;
          coverUrl: string | null;
          createdAt: string | null;
          genreId: string | null;
          genreName: string | null;
          id: string | null;
          notes: string | null;
          progress: number | null;
          rating: number | null;
          status: string | null;
          title: string | null;
          updatedAt: string | null;
          userId: string | null;
        };
      };
      viewUserStats: {
        Relationships: [];
        Row: {
          email: string | null;
          name: string | null;
          readCount: number | null;
          readingCount: number | null;
          toReadCount: number | null;
          userId: string | null;
        };
      };
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, '__InternalSupabase'>;

type DefaultSchema = DatabaseWithoutInternals[Extract<
  keyof Database,
  'public'
>];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | { schema: keyof DatabaseWithoutInternals }
    | keyof (DefaultSchema['Tables'] & DefaultSchema['Views']),
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables'] &
        DefaultSchema['Views'])
    ? (DefaultSchema['Tables'] &
        DefaultSchema['Views'])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | { schema: keyof DatabaseWithoutInternals }
    | keyof DefaultSchema['Tables'],
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | { schema: keyof DatabaseWithoutInternals }
    | keyof DefaultSchema['Tables'],
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | { schema: keyof DatabaseWithoutInternals }
    | keyof DefaultSchema['Enums'],
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums'][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums']
    ? DefaultSchema['Enums'][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | { schema: keyof DatabaseWithoutInternals }
    | keyof DefaultSchema['CompositeTypes'],
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes']
    ? DefaultSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {},
  },
} as const;
