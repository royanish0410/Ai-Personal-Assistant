"use client";
import React, { useState } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { AuthContext } from "@/context/AuthContext";

function Provider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [user, setUser] = useState();
  const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false} // Disable system preference for now
      disableTransitionOnChange={false}
      forcedTheme="light" // Force light theme
    >
      <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
        <ConvexProvider client={convex}>
          <AuthContext.Provider value={{ user, setUser }}>
            {children}
          </AuthContext.Provider>
        </ConvexProvider>
      </GoogleOAuthProvider>
    </NextThemesProvider>
  );
}

export default Provider;