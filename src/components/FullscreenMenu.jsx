const navbarItems = [
    "Home",
    "Menu",
    "About",
    "Contact"
];

const FullscreenMenu = ({ isMenuOpen }) => {

    return (
        <div
            className={`
                fixed
                inset-0
                z-[90]
                bg-background
                transition-transform
                duration-500
                ease-in-out
                ${
                    isMenuOpen
                        ? "translate-x-0"
                        : "translate-x-full"
                }
            `}
        >

            <div className="flex h-full items-center justify-center">

                <nav className="flex flex-col items-center gap-8">

                    {navbarItems.map((item) => (

                        <a
                            key={item}
                            href={`#${item.toLowerCase()}`}
                            className="
                                font-heading
                                text-2xl
                                text-text
                                transition-colors
                                duration-300
                                hover:text-accent
                            "
                        >
                            {item.toUpperCase()}
                        </a>

                    ))}

                </nav>

            </div>

        </div>
    );
};

export default FullscreenMenu;