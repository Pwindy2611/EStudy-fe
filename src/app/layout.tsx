import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import "../../public/handicraftCSS/base.css";
import "../../public/handicraftCSS/responsive.css";
import "../../public/handicraftCSS/grid.css";
import "../../public/handicraftCSS/header.css";
import "../../public/handicraftCSS/footer.css";
import "../../public/handicraftCSS/home.css";
import "../../public/handicraftCSS/iconFontA.css";
import ReduxProvider from "@/redux/provider";

import Header from "./components/partialView/header";
import Footer from "./components/partialView/footer";

const roboto = Roboto({ subsets: ["vietnamese"],weight: ['100','300','400','500','700','900']});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{children: React.ReactNode;}>){
  return (
      <html lang="en" suppressHydrationWarning>
        <body className={roboto.className}>
          <div className="bg-primary-bg-color fixed top-[-500px] bottom-0 left-[-200px] rounded-br-full w-7/12"></div>
          <div className="backdrop-blur-xl fixed top-0 bottom-0 right-0 left-0  bg-white/90">
          </div>
          <div className=" absolute z-20 left-0 right-0">
          <ReduxProvider>
              <Header />
              <div className=" pt-[120px] z-30">
                  {children}
              </div>
              <Footer />
            </ReduxProvider>
          </div>
        </body>
      </html>
  );
}
