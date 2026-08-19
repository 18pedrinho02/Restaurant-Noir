import { useState } from "react";
import { useNavigate } from "react-router-dom";

import MenuButton from "./MenuButton";
import FullscreenMenu from "./FullscreenMenu";

const Navbar = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navigate = useNavigate();

    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev);
    };


    const scrollToSection = (id) => {

        const element = document.getElementById(id);

        if (!element) return;

        setIsMenuOpen(false);

        element.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    };


    const goHome = () => {

        setIsMenuOpen(false);

        navigate("/");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };


    const shadowStyle =
        "drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)]";


    return (
        <>
            {/* NAVBAR */}

            <nav className="fixed top-0 left-0 w-full z-[100] px-16 py-8">

                {/* LOGO */}

                <button
                    onClick={goHome}
                    className={`
                        font-heading
                        text-lg
                        text-text
                        ${shadowStyle}
                        cursor-pointer
                    `}
                >
                    NOIR
                </button>


                {/* MENU BUTTON */}

                <MenuButton
                    isMenuOpen={isMenuOpen}
                    onClick={toggleMenu}
                />

            </nav>


            {/* FULLSCREEN MENU */}

            <FullscreenMenu
                isMenuOpen={isMenuOpen}
                onNavigate={scrollToSection}
            />
        </>
    );
};

export default Navbar;