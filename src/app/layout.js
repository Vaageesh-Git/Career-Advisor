"use client"
import "../styles/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MenuProvider } from "./context/menuContext";;
import { AuthProvider } from "./context/authContext";
import { QuestionAnswersProvider } from "./context/questionAnswersContext";
import { DataContextProvider } from "./context/aiDataContext";

// export const metadata = {
//   title: "Career Navigator",
//   description: "Explore careers, scholarships, and personalized advice",
// };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <DataContextProvider>
            <QuestionAnswersProvider>
              <MenuProvider>
                <Navbar />
                <main>{children}</main>
                <Footer />
              </MenuProvider>
            </QuestionAnswersProvider>
          </DataContextProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
