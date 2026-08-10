import { useState } from "react";
import MenuButton from "./MenuButton";
import FullscreenMenu from "./FullscreenMenu";

const Navbar = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev);
    };

    const shadowStyle = "drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)]";

    return (
        <>
            {/* NAVBAR */}

            <nav className="fixed top-0 left-0 w-full z-[100] px-16 py-8">

                {/* LOGO */}

                <a
                    href="#top"
                    className={`font-heading text-lg text-text ${shadowStyle}`}
                >
                    NOIR
                </a>


                {/* MENU BUTTON */}

                <MenuButton
                    isMenuOpen={isMenuOpen}
                    onClick={toggleMenu}
                />

            </nav>


            {/* FULLSCREEN MENU */}

            <FullscreenMenu
                isMenuOpen={isMenuOpen}
            />
        </>
    );
};

export default Navbar;