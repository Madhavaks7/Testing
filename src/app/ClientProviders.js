"use client";

import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { ProductProvider } from "@/context/ProductContext";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "next-themes";

export function ClientProviders({ children }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <AuthProvider>
        <ProductProvider>
          <CartProvider>
            <div className="flex flex-col min-h-screen transition-colors duration-300">
              <Navbar />
              <main className="flex-grow bg-slate-50 dark:bg-zinc-950 transition-colors duration-300">
                {children}
              </main>
            </div>
          </CartProvider>
        </ProductProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
