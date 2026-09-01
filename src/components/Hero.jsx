import { Link } from "react-router-dom";

const Hero = ({heroRef, heroVideoRef, heroTitleRef, heroSubtitleRef, heroButtonsRef, heroOverlayRef}) => {


  return (
    <section ref={heroRef} id="home" className="relative min-h-screen w-full overflow-hidden bg-background">

    <div className="z-30 flex h-1/3 absolute text-center text-text flex-col top-[47%] left-1/2 -translate-x-1/2 -translate-y-1/2">
        <h1 ref={heroTitleRef} className="font-heading text-accent text-8xl md:text-9xl" style={{
            textShadow: "0 4px 12px rgba(0, 0, 0, 0.8)",
        }}>NOIR</h1>
        <h3 ref={heroSubtitleRef} className="text-sm" style={{
            textShadow: "0 4px 12px rgba(0, 0, 0, 0.8)",
        }}>Every dish tells a story</h3>
            </div>

      <div
            ref={heroButtonsRef}
            className="z-30 absolute flex flex-col lg:flex-row items-center justify-center gap-4 bottom-20 lg:bottom-40 w-full"
        >
            {/* VIEW MENU */}
            <Link
                to="/menu"
                className="
                    group
                    inline-flex
                    items-center
                    gap-4
                    border
                    border-accent/60
                    px-7
                    py-4
                    font-body
                    text-xs
                    tracking-[0.2em]
                    uppercase
                    text-accent
                    transition-all
                    duration-500
                    hover:bg-accent
                    hover:text-background
                "
            >
                <span>
                    View Menu
                </span>

                <span className="transition-transform duration-500 group-hover:translate-x-2">
                    →
                </span>
            </Link>


            {/* RESERVE TABLE */}
            <a
                href="#reservation"
                className="
                    group
                    inline-flex
                    items-center
                    gap-4
                    border
                    border-accent/60
                    px-7
                    py-4
                    font-body
                    text-xs
                    tracking-[0.2em]
                    uppercase
                    text-accent
                    transition-all
                    duration-500
                    hover:bg-accent
                    hover:text-background
                "
            >
                <span>
                    Reserve a Table
                </span>

                <span className="transition-transform duration-500 group-hover:translate-x-2">
                    →
                </span>
            </a>


            {/* TAKEAWAY */}
            <Link
                to="/takeaway"
                className="
                    group
                    inline-flex
                    items-center
                    gap-4
                    border
                    border-accent/60
                    px-7
                    py-4
                    font-body
                    text-xs
                    tracking-[0.2em]
                    uppercase
                    text-accent
                    transition-all
                    duration-500
                    hover:bg-accent
                    hover:text-background
                "
            >
                <span>
                    Takeaway
                </span>

                <span className="transition-transform duration-500 group-hover:translate-x-2">
                    →
                </span>
            </Link>
        </div>

      <div
        className="w-80 h-80 lg:w-150 lg:h-150 z-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
        overflow-hidden [clip-path:polygon(50%_0%,61%_35%,98%_35%,68%_57%,79%_91%,50%_70%,21%_91%,32%_57%,2%_35%,39%_35%)]"
        ref={heroVideoRef}
        >
        <video
            src="/photos/hero.mp4"
            alt="Restaurant"
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
        />
      </div>
      <div ref={heroOverlayRef} className="absolute z-20 inset-0 bg-black opacity-0" />
    </section>
  );
};

export default Hero;