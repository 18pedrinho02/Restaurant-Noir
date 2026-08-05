
const navbarItems=['Home', 'Menu', 'About', 'Contact'];

const FullscreenMenu = ({ isMenuOpen }) => {
  return (
    <div
      className={`fixed inset-0 bg-background z-100 transition-transform duration-500 ${
        isMenuOpen
          ? "translate-x-0"
          : "translate-x-full"
      }`}
    >
      <nav className="flex flex-col items-center justify-center h-full gap-8">
        {navbarItems.map((item)=>(
            <a className="font-heading text-2xl hover:text-accent text-text" key={item} href={`#${item.toLowerCase()}`}>{item.toUpperCase()}</a>
        ))}
      </nav>
    </div>
  );
};

export default FullscreenMenu;