import { ClerkProvider, currentUser } from "@clerk/nextjs";
import "../globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Topbar from "@/components/shared/Topbar";
import LeftSidebar from "@/components/shared/LeftSidebar";
import RightSidebar from "@/components/shared/RightSidebar";
import Bottombar from "@/components/shared/Bottombar";
import { fetchUser } from "@/lib/actions/user.action";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sadness",
  description: "A Next.js 13 Meta Sadness Application",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();

  const userInfo = await fetchUser(user?.id || "-1");
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <Topbar userInfo={userInfo} />
          <main className="flex flex-row">
            <LeftSidebar />
            <section className="main-container">
              <div className="w-full max-w-4xl">{children}</div>
            </section>
            <RightSidebar />
          </main>

          <Bottombar />
        </body>
      </html>
    </ClerkProvider>
  );
}
