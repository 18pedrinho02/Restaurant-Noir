import {
    HiOutlineBars3,
    HiOutlineXMark
} from "react-icons/hi2";

const MenuButton = ({ isMenuOpen, onClick }) => {

    return (
        <button
            type="button"
            onClick={onClick}
            className="
                fixed
                top-8
                right-6
                lg:right-16
                z-[110]
                text-text
                hover:text-accent
                transition-colors
                duration-300
                cursor-pointer
            "
            aria-label={
                isMenuOpen
                    ? "Close menu"
                    : "Open menu"
            }
        >

            {isMenuOpen ? (
                <HiOutlineXMark className="text-3xl" />
            ) : (
                <HiOutlineBars3 className="text-3xl" />
            )}

        </button>
    );
};

export default MenuButton;