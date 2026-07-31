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
          <Link href="/" className="flex shrink-0 items-center">
            <Image
              src="/logo.png"
              alt="Stamford Publishers"
              width={160}
              height={64}
              priority
              className="h-14 w-auto"
            />
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
                className="btn btn-primary btn-md-pill btn-heading hidden sm:flex sm:px-4"
              >
                <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span className="hidden sm:inline">+1 562 573 2551</span>
              </a>
              <Link
                href={routes.contact}
                className="btn btn-primary btn-md-pill btn-quote hidden sm:block sm:px-5 max-sm:hidden"
              >
                GET A QUOTE
              </Link>
              <MobileMenu />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
