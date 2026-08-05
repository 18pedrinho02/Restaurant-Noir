import { HiOutlineBars3, HiOutlineXMark } from "react-icons/hi2";

const MenuButton = ({ isMenuOpen, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="absolute top-8 right-16 z-101 text-text hover:text-accent transition-colors cursor-pointer"
      aria-label="Open menu"
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