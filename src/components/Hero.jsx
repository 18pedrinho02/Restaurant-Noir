const Hero = ({heroRef, heroVideoRef, heroTitleRef, heroSubtitleRef, heroButtonsRef, heroOverlayRef}) => {


  return (
    <section ref={heroRef} className="relative min-h-screen w-full overflow-hidden bg-background">

    <div className="z-30 flex h-1/3 absolute text-center text-text flex-col top-[47%] left-1/2 -translate-x-1/2 -translate-y-1/2">
        <h1 ref={heroTitleRef} className="font-heading text-accent text-9xl" style={{
            textShadow: "0 4px 12px rgba(0, 0, 0, 0.8)",
        }}>NOIR</h1>
        <h3 ref={heroSubtitleRef} className="text-sm" style={{
            textShadow: "0 4px 12px rgba(0, 0, 0, 0.8)",
        }}>Every dish tells a story</h3>
            </div>

      <div ref={heroButtonsRef} className="z-30 absolute flex items-center justify-center gap-10 bottom-40 w-full h-12">
        <button
            className="
                px-8 py-4
                bg-accent
                text-background
                font-body
                text-sm
                min-w-[220px]
                tracking-[0.2em]
                uppercase
                rounded-lg
                transition-all
                duration-300
                hover:brightness-110
                cursor-pointer
            "
            >
            Reserve a Table
        </button>
        <button
            className="
                px-8 py-4
                border
                min-w-[220px]
                border-accent
                text-accent
                font-body
                text-sm
                tracking-[0.2em]
                uppercase
                rounded-lg
                transition-all
                duration-300
                hover:bg-accent
                hover:text-background
                cursor-pointer
            "
            >
            Explore Menu
        </button>
      </div>
      <div className="font-body font-light absolute w-full h-20 bottom-0 flex items-center">
        <div className="w-1/2 flex justify-start"> 
            <p className="pl-16 text-sm text-text">Michelin Inspired</p>
        </div>
        <div className="w-1/2 flex justify-end"> 
            <p className="pr-16 text-sm text-text">Braga, Portugal</p>
        </div>
      </div>

      <div
        className="w-150 h-150 z-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
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