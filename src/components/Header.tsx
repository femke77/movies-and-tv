import { Link } from "react-router-dom";
import { ReactNode } from "react";
import { useRef, useState, useEffect } from "react";

const Header = ({ children }: { children: ReactNode }) => {
  const [hideHeader, setHideHeader] = useState(false);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const lastScrollY = useRef(0);
  
  // Scroll behavior to hide header when scrolling down
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
        setHideHeader(true);
      } else {
        setHideHeader(false);
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  return (
    <header className="pb-17">
    <div
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 bg-gray-900 flex-1 items-center px-3 pt-1 w-full flex justify-between z-30 transition-transform duration-300 ${
        hideHeader ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <h1>
        <Link
          to="/"
          className="bg-gray-900 font-kyrilla text-2xl sm:text-3xl py-2 mr-8"
        >
          Movies Unlimited
        </Link>
      </h1>
      {children}
    </div>
    </header>
  );
};

export default Header;