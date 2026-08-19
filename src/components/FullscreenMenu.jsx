const navbarItems = [
    {
        name: "Home",
        target: "home"
    },
    {
        name: "Menu",
        target: "menu-preview"
    },
    {
        name: "About",
        target: "story"
    },
    {
        name: "Contact",
        target: "reservation"
    }
];

const FullscreenMenu = ({ isMenuOpen, onNavigate }) => {

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

                        <button
                            key={item.name}
                            type="button"
                            onClick={() => onNavigate(item.target)}
                            className="
                                font-heading
                                text-2xl
                                text-text
                                transition-colors
                                duration-300
                                hover:text-accent
                                cursor-pointer
                            "
                        >
                            {item.name.toUpperCase()}
                        </button>

                    ))}

                </nav>

            </div>

        </div>
    );
};

export default FullscreenMenu;