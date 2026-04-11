"use client";

import { useEffect, useState, useCallback } from "react";
import { ensureSeedDatabase, resetSeedDatabase } from "@/lib/seed";
import { NavBar } from "@/components/nav-bar";
import { AuthProvider } from "@/lib/auth-context";
import { BootstrapProvider, type BootstrapStatus } from "@/lib/bootstrap-context";
import { AppStatusBanner } from "@/components/app-status-banner";

export function Providers({ children }: { children: React.ReactNode }) {
  const [seedStatus, setSeedStatus] = useState<BootstrapStatus>("seeding");
  const [seedError, setSeedError] = useState<string | null>(null);

  const runSeed = useCallback(async (forceReset: boolean = false) => {
    if (forceReset) {
      resetSeedDatabase();
    }

    setSeedStatus("seeding");
    setSeedError(null);

    try {
      await ensureSeedDatabase();
      setSeedStatus("ready");
    } catch (error) {
      console.error("Database seed failed:", error);
      setSeedStatus("error");
      setSeedError(
        error instanceof Error ? error.message : "Unknown seed error",
      );
    }
  }, []);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void runSeed();
    }, 0);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [runSeed]);

  return (
    <BootstrapProvider
      value={{
        seedStatus,
        seedError,
        retrySeed: () => {
          void runSeed(true);
        },
      }}
    >
      <AuthProvider>
        <NavBar />
        <AppStatusBanner />
        <div className="flex-1">{children}</div>
      </AuthProvider>
    </BootstrapProvider>
  );
}
