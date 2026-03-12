export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.4"
  }
  public: {
    Tables: {
      contact_messages: {
        Row: {
          contact: string
          created_at: string
          id: string
          is_read: boolean
          message: string
          nom: string
        }
        Insert: {
          contact: string
          created_at?: string
          id?: string
          is_read?: boolean
          message: string
          nom: string
        }
        Update: {
          contact?: string
          created_at?: string
          id?: string
          is_read?: boolean
          message?: string
          nom?: string
        }
        Relationships: []
      }
      devices: {
        Row: {
          annee_achat: number | null
          categorie: Database["public"]["Enums"]["device_category"]
          chassis: string | null
          couleur: string | null
          created_at: string
          departement: string | null
          description: string | null
          district: string | null
          id: string
          imei1: string | null
          imei2: string | null
          marque: string
          modele: string | null
          num_serie: string | null
          operateur: string | null
          photos: string[] | null
          plaque: string | null
          region: string | null
          sous_prefecture: string | null
          statut: Database["public"]["Enums"]["device_status"]
          token: string
          updated_at: string
          user_id: string
          village: string | null
        }
        Insert: {
          annee_achat?: number | null
          categorie: Database["public"]["Enums"]["device_category"]
          chassis?: string | null
          couleur?: string | null
          created_at?: string
          departement?: string | null
          description?: string | null
          district?: string | null
          id?: string
          imei1?: string | null
          imei2?: string | null
          marque: string
          modele?: string | null
          num_serie?: string | null
          operateur?: string | null
          photos?: string[] | null
          plaque?: string | null
          region?: string | null
          sous_prefecture?: string | null
          statut?: Database["public"]["Enums"]["device_status"]
          token: string
          updated_at?: string
          user_id: string
          village?: string | null
        }
        Update: {
          annee_achat?: number | null
          categorie?: Database["public"]["Enums"]["device_category"]
          chassis?: string | null
          couleur?: string | null
          created_at?: string
          departement?: string | null
          description?: string | null
          district?: string | null
          id?: string
          imei1?: string | null
          imei2?: string | null
          marque?: string
          modele?: string | null
          num_serie?: string | null
          operateur?: string | null
          photos?: string[] | null
          plaque?: string | null
          region?: string | null
          sous_prefecture?: string | null
          statut?: Database["public"]["Enums"]["device_status"]
          token?: string
          updated_at?: string
          user_id?: string
          village?: string | null
        }
        Relationships: []
      }
      merchant_subscriptions: {
        Row: {
          created_at: string
          expires_at: string
          id: string
          is_active: boolean
          max_registrations_per_month: number | null
          payment_id: string | null
          plan: string
          price: number
          started_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          expires_at: string
          id?: string
          is_active?: boolean
          max_registrations_per_month?: number | null
          payment_id?: string | null
          plan: string
          price: number
          started_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          expires_at?: string
          id?: string
          is_active?: boolean
          max_registrations_per_month?: number | null
          payment_id?: string | null
          plan?: string
          price?: number
          started_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "merchant_subscriptions_payment_id_fkey"
            columns: ["payment_id"]
            isOneToOne: false
            referencedRelation: "payments"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          created_at: string
          id: string
          is_read: boolean
          link: string | null
          message: string
          title: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_read?: boolean
          link?: string | null
          message: string
          title: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_read?: boolean
          link?: string | null
          message?: string
          title?: string
          user_id?: string
        }
        Relationships: []
      }
      payments: {
        Row: {
          amount: number
          created_at: string
          currency: string
          description: string | null
          device_id: string | null
          id: string
          payment_method: string
          payment_reference: string | null
          status: Database["public"]["Enums"]["payment_status"]
          updated_at: string
          user_id: string
          wave_checkout_id: string | null
        }
        Insert: {
          amount: number
          created_at?: string
          currency?: string
          description?: string | null
          device_id?: string | null
          id?: string
          payment_method?: string
          payment_reference?: string | null
          status?: Database["public"]["Enums"]["payment_status"]
          updated_at?: string
          user_id: string
          wave_checkout_id?: string | null
        }
        Update: {
          amount?: number
          created_at?: string
          currency?: string
          description?: string | null
          device_id?: string | null
          id?: string
          payment_method?: string
          payment_reference?: string | null
          status?: Database["public"]["Enums"]["payment_status"]
          updated_at?: string
          user_id?: string
          wave_checkout_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payments_device_id_fkey"
            columns: ["device_id"]
            isOneToOne: false
            referencedRelation: "devices"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          contact_urgence_nom: string | null
          contact_urgence_tel: string | null
          created_at: string
          departement: string | null
          district: string | null
          email: string | null
          email_secours: string | null
          grade: string | null
          id: string
          matricule: string | null
          nom: string
          nom_compagnie: string | null
          nom_entreprise: string | null
          numero_agrement: string | null
          numero_registre_commerce: string | null
          prenoms: string
          region: string | null
          secteur_activite: string | null
          sous_prefecture: string | null
          tel_secours: string | null
          unite: string | null
          updated_at: string
          user_type: Database["public"]["Enums"]["user_type"]
          username: string
          village: string | null
          whatsapp: string | null
        }
        Insert: {
          avatar_url?: string | null
          contact_urgence_nom?: string | null
          contact_urgence_tel?: string | null
          created_at?: string
          departement?: string | null
          district?: string | null
          email?: string | null
          email_secours?: string | null
          grade?: string | null
          id: string
          matricule?: string | null
          nom: string
          nom_compagnie?: string | null
          nom_entreprise?: string | null
          numero_agrement?: string | null
          numero_registre_commerce?: string | null
          prenoms: string
          region?: string | null
          secteur_activite?: string | null
          sous_prefecture?: string | null
          tel_secours?: string | null
          unite?: string | null
          updated_at?: string
          user_type?: Database["public"]["Enums"]["user_type"]
          username: string
          village?: string | null
          whatsapp?: string | null
        }
        Update: {
          avatar_url?: string | null
          contact_urgence_nom?: string | null
          contact_urgence_tel?: string | null
          created_at?: string
          departement?: string | null
          district?: string | null
          email?: string | null
          email_secours?: string | null
          grade?: string | null
          id?: string
          matricule?: string | null
          nom?: string
          nom_compagnie?: string | null
          nom_entreprise?: string | null
          numero_agrement?: string | null
          numero_registre_commerce?: string | null
          prenoms?: string
          region?: string | null
          secteur_activite?: string | null
          sous_prefecture?: string | null
          tel_secours?: string | null
          unite?: string | null
          updated_at?: string
          user_type?: Database["public"]["Enums"]["user_type"]
          username?: string
          village?: string | null
          whatsapp?: string | null
        }
        Relationships: []
      }
      reports: {
        Row: {
          circonstances: string | null
          created_at: string
          date_incident: string
          departement: string | null
          device_id: string
          district: string | null
          heure_incident: string | null
          id: string
          is_active: boolean
          numero_dossier: string
          photo_plainte_url: string | null
          region: string | null
          sous_prefecture: string | null
          type_incident: Database["public"]["Enums"]["incident_type"]
          user_id: string
          village: string | null
        }
        Insert: {
          circonstances?: string | null
          created_at?: string
          date_incident: string
          departement?: string | null
          device_id: string
          district?: string | null
          heure_incident?: string | null
          id?: string
          is_active?: boolean
          numero_dossier: string
          photo_plainte_url?: string | null
          region?: string | null
          sous_prefecture?: string | null
          type_incident: Database["public"]["Enums"]["incident_type"]
          user_id: string
          village?: string | null
        }
        Update: {
          circonstances?: string | null
          created_at?: string
          date_incident?: string
          departement?: string | null
          device_id?: string
          district?: string | null
          heure_incident?: string | null
          id?: string
          is_active?: boolean
          numero_dossier?: string
          photo_plainte_url?: string | null
          region?: string | null
          sous_prefecture?: string | null
          type_incident?: Database["public"]["Enums"]["incident_type"]
          user_id?: string
          village?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reports_device_id_fkey"
            columns: ["device_id"]
            isOneToOne: false
            referencedRelation: "devices"
            referencedColumns: ["id"]
          },
        ]
      }
      transfers: {
        Row: {
          created_at: string
          device_id: string
          from_user_id: string
          id: string
          motif: string | null
          payment_id: string | null
          status: Database["public"]["Enums"]["transfer_status"]
          to_user_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          device_id: string
          from_user_id: string
          id?: string
          motif?: string | null
          payment_id?: string | null
          status?: Database["public"]["Enums"]["transfer_status"]
          to_user_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          device_id?: string
          from_user_id?: string
          id?: string
          motif?: string | null
          payment_id?: string | null
          status?: Database["public"]["Enums"]["transfer_status"]
          to_user_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "transfers_device_id_fkey"
            columns: ["device_id"]
            isOneToOne: false
            referencedRelation: "devices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transfers_payment_id_fkey"
            columns: ["payment_id"]
            isOneToOne: false
            referencedRelation: "payments"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
      device_category:
        | "telephone"
        | "ordinateur"
        | "televiseur"
        | "electromenager"
        | "voiture"
        | "moto"
      device_status: "propre" | "vole" | "perdu" | "enquete" | "retrouve"
      incident_type: "vol" | "perte" | "tentative"
      payment_status: "pending" | "completed" | "failed" | "refunded"
      transfer_status: "pending" | "accepted" | "rejected" | "cancelled"
      user_type:
        | "particulier"
        | "commercant"
        | "entreprise"
        | "assurance"
        | "forces_securite"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user"],
      device_category: [
        "telephone",
        "ordinateur",
        "televiseur",
        "electromenager",
        "voiture",
        "moto",
      ],
      device_status: ["propre", "vole", "perdu", "enquete", "retrouve"],
      incident_type: ["vol", "perte", "tentative"],
      payment_status: ["pending", "completed", "failed", "refunded"],
      transfer_status: ["pending", "accepted", "rejected", "cancelled"],
      user_type: [
        "particulier",
        "commercant",
        "entreprise",
        "assurance",
        "forces_securite",
      ],
    },
  },
} as const
