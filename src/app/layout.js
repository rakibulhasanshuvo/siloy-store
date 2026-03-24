import { Inter } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: "Factory Direct Fashion - Premium Borkhas & 3-Pieces",
  description: "High-quality fashion directly from our state-of-the-art factory floor to your doorstep.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${inter.variable} antialiased bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100`}>
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
