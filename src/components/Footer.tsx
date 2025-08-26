export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="px-5 py-4">
      <div className="flex items-center justify-between text-sm">
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
