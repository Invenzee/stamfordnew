import Image from "next/image";
import Link from "next/link";
import { Phone } from "lucide-react";
import MobileMenu from "@/components/MobileMenu";
import ServicesDropdown from "@/components/ServicesDropdown";
import { routes } from "@/data/routes";

export default function Header() {
  return (
    <header className="w-full bg-white">
      <div className="h-1 bg-black" />

      <div className="border-b border-black/5">
        <div className="site-container flex items-center justify-between gap-6 py-4">
          <Link href="/" className="flex shrink-0 items-center gap-3">
            <Image
              src="/logo.svg"
              alt=""
              width={52}
              height={52}
              priority
              className="h-[52px] w-[52px]"
            />
            <div className="flex flex-col leading-none">
              <span className="font-heading text-[22px] font-semibold tracking-wide text-black">
                STAMFORD
              </span>
              <span className="mt-1 font-body text-[9px] font-bold tracking-[0.35em] text-primary">
                PUBLISHERS
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-6 xl:gap-10">
            <nav className="hidden items-center gap-7 lg:flex xl:gap-9">
              <Link
                href="/"
                className="font-heading text-[17px] text-black transition-opacity hover:opacity-70"
              >
                Home
              </Link>
              <ServicesDropdown />
              <Link
                href={routes.about}
                className="font-heading text-[17px] text-primary transition-opacity hover:opacity-70"
              >
                About Us
              </Link>
              <Link
                href={routes.contact}
                className="font-heading text-[17px] text-primary transition-opacity hover:opacity-70"
              >
                Contact Us
              </Link>
            </nav>

            <div className="flex items-center gap-2.5 sm:gap-3">
              <a
                href="tel:+15625732551"
                className="hidden items-center gap-2 rounded-md bg-primary px-3 py-2.5 font-heading text-sm font-semibold text-white transition-opacity hover:opacity-90 sm:flex sm:px-4 sm:text-[15px]"
              >
                <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span className="hidden sm:inline">+1 562 573 2551</span>
              </a>
              <Link
                href="/quote"
                className="hidden rounded-md bg-primary px-4 py-2.5 font-heading text-sm font-bold uppercase tracking-wide text-white transition-opacity hover:opacity-90 sm:block sm:px-5 sm:text-[15px]"
              >
                GET QUOTE
              </Link>
              <MobileMenu />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
