import { brown } from "@/style/typography";
import "react-datepicker/dist/react-datepicker.css";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider } from "@/components/integrated/ThemeProvider";
import Navbar from "@/components/integrated/Navbar";
import AuthListenerProvider from "@/components/integrated/AuthListenerProvider";
import SessionProvider from "@/hooks/session";
import SWRConfigProvider from "@/components/integrated/SWRConfigProvider";
import { NavigationEventsListener } from "@/hooks/navigation";

export const metadata = {
  title: "SKILDWorld",
  description: "",
  icons: {
    icon: "/assets/images/logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <SessionProvider>
            <AuthListenerProvider>
              <SWRConfigProvider>
                <ToastContainer
                  position="top-center"
                  autoClose={3000}
                  newestOnTop
                  transition={Slide}
                  theme="colored"
                />
                <Navbar />
                {children}
                <NavigationEventsListener />
              </SWRConfigProvider>
            </AuthListenerProvider>
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
