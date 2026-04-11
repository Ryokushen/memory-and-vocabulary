"use client";

import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from "react";
import type { User } from "@supabase/supabase-js";
import { supabase } from "./supabase";
import {
  CLOUD_SYNC_EVENT,
  syncOnLogin,
  type CloudSyncEventDetail,
} from "./sync";

const LAST_SYNC_STORAGE_KEY = "lexforge-last-sync-at";

export type CloudSyncState =
  | "idle"
  | "syncing"
  | "synced"
  | "offline"
  | "error";

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  syncState: CloudSyncState;
  syncError: string | null;
  lastSyncAt: string | null;
  isOnline: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
  retrySync: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  loading: true,
  syncState: "idle",
  syncError: null,
  lastSyncAt: null,
  isOnline: true,
  signIn: async () => {},
  signOut: async () => {},
  retrySync: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [syncState, setSyncState] = useState<CloudSyncState>("idle");
  const [syncError, setSyncError] = useState<string | null>(null);
  const [lastSyncAt, setLastSyncAt] = useState<string | null>(() => {
    if (typeof window === "undefined") return null;
    return window.localStorage.getItem(LAST_SYNC_STORAGE_KEY);
  });
  const [isOnline, setIsOnline] = useState(
    typeof navigator === "undefined" ? true : navigator.onLine,
  );

  const persistLastSync = useCallback((timestamp: string | null) => {
    setLastSyncAt(timestamp);

    if (typeof window === "undefined") return;

    if (timestamp) {
      window.localStorage.setItem(LAST_SYNC_STORAGE_KEY, timestamp);
    } else {
      window.localStorage.removeItem(LAST_SYNC_STORAGE_KEY);
    }
  }, []);

  const runCloudSync = useCallback(async (currentUser: User) => {
    if (!navigator.onLine) {
      setSyncState("offline");
      setSyncError(null);
      return;
    }

    try {
      setSyncError(null);
      await syncOnLogin(currentUser);
    } catch (error) {
      setSyncState(navigator.onLine ? "error" : "offline");
      setSyncError(
        error instanceof Error ? error.message : "Cloud sync failed",
      );
    }
  }, []);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      setLoading(false);
      if (currentUser) {
        void runCloudSync(currentUser);
      } else {
        setSyncState(navigator.onLine ? "idle" : "offline");
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        const currentUser = session?.user ?? null;
        setUser(currentUser);
        if (currentUser) {
          await runCloudSync(currentUser);
        } else {
          setSyncError(null);
          setSyncState(navigator.onLine ? "idle" : "offline");
        }
      },
    );

    return () => subscription.unsubscribe();
  }, [persistLastSync, runCloudSync]);

  useEffect(() => {
    function handleSyncEvent(event: Event) {
      const detail = (event as CustomEvent<CloudSyncEventDetail>).detail;

      if (detail.state === "syncing") {
        setSyncState("syncing");
        setSyncError(null);
        return;
      }

      if (detail.state === "synced") {
        const nextSyncAt = detail.lastSyncAt ?? new Date().toISOString();
        persistLastSync(nextSyncAt);
        setSyncError(null);
        setSyncState(navigator.onLine ? "synced" : "offline");
        return;
      }

      setSyncError(detail.error ?? "Cloud sync failed");
      setSyncState(navigator.onLine ? "error" : "offline");
    }

    function handleOnline() {
      setIsOnline(true);
      setSyncError(null);

      if (user) {
        void runCloudSync(user);
      } else {
        setSyncState("idle");
      }
    }

    function handleOffline() {
      setIsOnline(false);
      setSyncState("offline");
    }

    window.addEventListener(CLOUD_SYNC_EVENT, handleSyncEvent as EventListener);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener(
        CLOUD_SYNC_EVENT,
        handleSyncEvent as EventListener,
      );
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [persistLastSync, runCloudSync, user]);

  const signIn = useCallback(async () => {
    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: typeof window !== "undefined" ? window.location.origin : undefined,
      },
    });
  }, []);

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSyncError(null);
    setSyncState(navigator.onLine ? "idle" : "offline");
  }, []);

  const retrySync = useCallback(async () => {
    if (!user) return;
    await runCloudSync(user);
  }, [runCloudSync, user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        syncState,
        syncError,
        lastSyncAt,
        isOnline,
        signIn,
        signOut,
        retrySync,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
