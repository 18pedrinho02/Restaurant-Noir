import { useState} from "react";
import MenuButton from "./MenuButton";
import FullscreenMenu from "./FullscreenMenu";

const Navbar =()=>{

const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

    return(
        <div className="w-full min-h-[80px] fixed top-0 left-0 z-50 bg-black/20 backdrop-blur-sm">
            <div className="absolute top-8 left-16 z-30">
                <a href="#home" className=" font-heading text-lg text-text">
                NOIR
                </a>
            </div>
            <MenuButton
                isMenuOpen={isMenuOpen}
                onClick={toggleMenu}
            />

            <FullscreenMenu
                isMenuOpen={isMenuOpen}
            />
        </div>
    )
}

export default Navbar;