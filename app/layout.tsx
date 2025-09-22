import type { Metadata } from "next";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { AppContext, AppContextProvisder } from "./context/Appcontext";
import { Poppins } from "next/font/google";
import { ToastContainer } from "react-toastify";
import { ClerkProvider } from "@clerk/nextjs";

const outfit = Poppins({
  variable: "--font-poppins",
  display:'swap',
  weight:["100","200","300","400","500","600"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "uniStore",
  description: "E-commerce store",
  icons:{
    icon:'/heart_icon.svg'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} antialiased text-gray-700`} >
     
       <SessionProvider>
        <AppContextProvisder>
          {children}
        </AppContextProvisder>
        </SessionProvider>
        <ToastContainer />
      </body>
    </html>
  );
}
