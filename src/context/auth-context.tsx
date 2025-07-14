
"use client";

import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import type { User as SupabaseUser, AuthError } from "@supabase/supabase-js";

export type UserRole = "passenger" | "driver" | "admin";

interface UserProfile {
  name: string;
  role: UserRole;
}

interface User extends SupabaseUser, UserProfile {}

interface AuthContextType {
  user: User | null;
  login: (credentials: {email: string, password: string}) => Promise<{error: AuthError | null}>;
  logout: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setIsLoading(true);
        if (session) {
          const supabaseUser = session.user;
          // In a real app, you'd fetch the user's role and name from a 'profiles' table.
          // For now, we'll derive it from the email for demo purposes.
          const role = (supabaseUser.email?.split('@')[0] as UserRole) || 'passenger';
          const name = supabaseUser.user_metadata.name || `${role.charAt(0).toUpperCase() + role.slice(1)} User`;
          
          setUser({ ...supabaseUser, role, name });

        } else {
          setUser(null);
        }
        setIsLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (credentials: {email: string, password: string}) => {
    const { error } = await supabase.auth.signInWithPassword(credentials);
    if (!error) {
       router.refresh(); // Refresh server components
    }
    return { error };
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.push("/");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
