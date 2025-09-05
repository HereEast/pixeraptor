import Image from "next/image";
import Link from "next/link";

import { CONTACT, ROUTE } from "~/constants";

const LINKS = [
  {
    label: "About",
    href: ROUTE.ABOUT,
  },
  {
    label: "Contact",
    href: `mailto:${CONTACT.EMAIL}`,
  },
];

export function Header() {
  return (
    <header className="item-center flex justify-between px-5 py-4">
      <Link href={ROUTE.HOME} className="flex items-center gap-2">
        <div className="size-5">
          <Image
            src="/assets/images/logo-img.png"
            alt="Pixeraptor"
            width={100}
            height={100}
            className="transition-transform duration-300 hover:scale-160"
          />
        </div>
        <h2 className="font-semibold">Pixeraptor</h2>
      </Link>

      <div>
        <nav className="flex items-center gap-4">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="underline underline-offset-2 hover:no-underline hover:opacity-50"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
