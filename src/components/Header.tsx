import Image from "next/image";

export function Header() {
  return (
    <header className="px-5 py-4">
      <div className="flex items-center gap-2">
        <Image
          src="/assets/logo-img.svg"
          alt="Pixeraptor"
          width={20}
          height={20}
          className="transition-transform duration-300 hover:scale-160"
        />
        <h1 className="font-semibold">Pixeraptor</h1>
      </div>
    </header>
  );
}
