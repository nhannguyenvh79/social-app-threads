"use client";
import { fetchUser } from "@/lib/actions/user.action";
import {
  currentUser,
  OrganizationSwitcher,
  SignedIn,
  SignOutButton,
} from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Topbar = ({ userInfo }: { userInfo: any }) => {
  const router = useRouter();
  return (
    <nav className="topbar">
      <Link href="/" className="flex items-center gap-4">
        <Image src="/assets/logo.svg" alt="logo" width={28} height={28} />
        <p className="text-heading3-bold text-light-1 max-xs:hidden">Sadness</p>
      </Link>
      <div className="flex items-center gap-1">
        <div className="block md:hidden">
          <SignedIn>
            <SignOutButton>
              <div className="flex cursor-pointer">
                <Image
                  alt="logout"
                  src="/assets/logout.svg"
                  width={24}
                  height={24}
                />
              </div>
            </SignOutButton>
          </SignedIn>
        </div>
        <Image
          src={userInfo.image}
          alt="avt"
          width={32}
          height={32}
          className="rounded-full object-cover shadow-2xl"
          onClick={() => router.push(`/profile/edit`)}
        />
      </div>
    </nav>
  );
};

export default Topbar;
