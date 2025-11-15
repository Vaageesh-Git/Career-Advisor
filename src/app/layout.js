
import "../styles/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MenuProvider } from "./context/menuContext";;

export const metadata = {
  title: "Career Navigator",
  description: "Explore careers, scholarships, and personalized advice",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
          <MenuProvider>
            <Navbar />
              <main>{children}</main>
            <Footer />
          </MenuProvider>
      </body>
    </html>
  );
}
