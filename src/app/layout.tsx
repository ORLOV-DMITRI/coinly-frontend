import type {Metadata} from "next";
import {Geist, Geist_Mono, Unbounded, Space_Grotesk, Onest} from "next/font/google";
import '@/styles/globals.scss'
import Script from "next/script";
import ReactQueryProvider from "@/app/ReactQueryProvider";
import {AuthProvider} from "@/lib/auth/authContext";
import Header from "@/components/Header/Header";
import BottomNavigationWrapper from "@/components/BottomNavigation/BottomNavigationWrapper";
import {cookies} from 'next/headers';
import CustomToaster from "@/shared/ui/CustomToaster/CustomToaster";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const numberFont = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

const titleFont = Unbounded({
    variable: "--font-unbounded",
    subsets: ["cyrillic"],
});

const logoFont = Space_Grotesk({
    variable: "--font-logo",
    subsets: ["latin"],
});

const textFont = Onest({
    variable: "--font-onest",
    subsets: ["cyrillic"],
});


export const metadata: Metadata = {
    title: "Coinly - учёт расходов",
    description: "Отслеживай расходы легко и быстро",
    icons: {
        icon: [
            {
                media: '(prefers-color-scheme: light)',
                url: '/icon-light.svg',
                href: '/icon-light.svg',
            },
            {
                media: '(prefers-color-scheme: dark)',
                url: '/icon-dark.svg',
                href: '/icon-dark.svg',
            },
        ],
    }
};

export default async function RootLayout({
                                             children,
                                         }: Readonly<{
    children: React.ReactNode;
}>) {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;
    const isAuthenticated = !!token;

    return (
        <html lang="en" suppressHydrationWarning>
        <head>
            <Script id="theme-noflash" strategy="beforeInteractive">
                {`(function(){try{
        var v = localStorage.getItem('theme');
        if (v === 'light' || v === 'dark') {
          var map = {light: 'light-theme', dark: 'dark-theme'};
          document.documentElement.classList.add(map[v]);
        }
      }catch(_){}})();`}
            </Script>

        </head>


        <body className={`${geistSans.variable} ${numberFont.variable} ${titleFont.variable} ${logoFont.variable} ${textFont.variable}`}>
        <ReactQueryProvider>
            <AuthProvider>
                <Header isAuthenticated={isAuthenticated}/>
                {children}
                <BottomNavigationWrapper isAuthenticated={isAuthenticated}/>
            </AuthProvider>
        </ReactQueryProvider>
        <CustomToaster/>
        </body>
        </html>
    );
}
