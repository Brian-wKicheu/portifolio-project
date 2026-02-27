import React, { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav
      className={[
        "fixed top-0 left-0 w-full z-50 transition-all duration-300",
        "border-b border-white/10",
        scrolled
          ? "bg-slate-950/80 backdrop-blur-md shadow-lg shadow-black/10"
          : "bg-transparent",
      ].join(" ")}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <a
            href="#home"
            className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
          >
            Portfolio
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-3 py-2 rounded-lg text-gray-200 hover:text-white hover:bg-white/10 transition-all duration-200"
              >
                {link.name}
              </a>
            ))}

            <a
              href="#contact"
              className="ml-3 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-200"
            >
              Hire Me
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsOpen((v) => !v)}
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg text-white hover:bg-white/10 transition"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 pt-2">
            <div className="rounded-2xl bg-slate-950/90 backdrop-blur-md border border-white/10 p-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 rounded-xl text-gray-200 hover:text-white hover:bg-white/10 transition-all"
                >
                  {link.name}
                </a>
              ))}

              <a
                href="#contact"
                onClick={() => setIsOpen(false)}
                className="mt-2 block text-center px-4 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold"
              >
                Hire Me
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;