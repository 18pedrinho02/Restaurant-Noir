import { useState } from "react";
import MenuButton from "./MenuButton";
import FullscreenMenu from "./FullscreenMenu";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const shadowStyle = "drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)]";

  return (
    <div className="w-full min-h-[80px] fixed top-0 left-0 z-50">
      <div className="absolute top-8 left-16 z-30">
        <a href="#home" className={`font-heading text-lg text-text ${shadowStyle}`}>
          NOIR
        </a>
      </div>

      <div className={shadowStyle}>
        <MenuButton
          isMenuOpen={isMenuOpen}
          onClick={toggleMenu}
        />
      </div>

      <FullscreenMenu
        isMenuOpen={isMenuOpen}
      />
    </div>
  );
};

export default Navbar;