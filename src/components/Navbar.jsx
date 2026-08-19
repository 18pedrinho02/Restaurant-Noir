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


    const handleNavigation = (item) => {

        // Fecha o menu
        setIsMenuOpen(false);


        // =========================
        // ROUTES
        // =========================

        if (item.type === "route") {

            navigate(item.path);

            // Se for Home, garantir que fica no topo
            if (item.path === "/") {

                setTimeout(() => {
                    window.scrollTo({
                        top: 0,
                        behavior: "smooth"
                    });
                }, 50);

            }

            return;
        }


        // =========================
        // SECTIONS
        // =========================

        if (item.type === "section") {

            // Se já estamos na homepage
            if (window.location.pathname === "/") {

                const element = document.getElementById(
                    item.target
                );

                if (!element) return;

                element.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

                return;
            }


            // Se estamos noutra página,
            // primeiro voltamos para a homepage
            navigate("/");

            setTimeout(() => {

                const element = document.getElementById(
                    item.target
                );

                if (!element) return;

                element.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }, 100);

        }
    };


    const shadowStyle =
        "drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)]";


    return (
        <>
            {/* NAVBAR */}

            <nav className="fixed top-0 left-0 w-full z-[100] px-16 py-8">

                {/* LOGO */}

                <button
                    onClick={() =>
                        handleNavigation({
                            type: "route",
                            path: "/"
                        })
                    }
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
                onNavigate={handleNavigation}
            />
        </>
    );
};

export default Navbar;