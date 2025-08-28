export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="px-5 py-4">
      <div className="flex flex-col text-sm md:flex-row md:items-center md:justify-between">
        <div>
          <p>
            <span>© {currentYear} Pixeraptor. </span>
            <span>All rights reserved</span>
          </p>
        </div>

        <div>
          <p>By using this site you accept the terms of use.</p>
        </div>
      </div>
    </footer>
  );
}
