import { useRef } from 'react';
import { FaInstagram, FaFacebookF } from 'react-icons/fa';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const Footer = ({ footerRef }) => {

    const footerLogoRef = useRef(null);
    const footerContentRef = useRef(null);
    const footerBottomRef = useRef(null);

    useGSAP(() => {

        // LOGO

        gsap.from(footerLogoRef.current, {
            opacity: 0,
            y: 40,
            duration: 1,
            ease: 'power3.out',

            scrollTrigger: {
                trigger: footerRef.current,
                start: 'top 75%',
                toggleActions: 'play none none reverse'
            }
        });


        // CONTENT

        const footerItems = footerContentRef.current.querySelectorAll(
            '.footer-item'
        );

        gsap.set(footerItems, {
            opacity: 0,
            y: 30
        });

        gsap.to(footerItems, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',

            scrollTrigger: {
                trigger: footerContentRef.current,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            }
        });

    }, { scope: footerRef });


    return (
        <footer
            ref={footerRef}
            id='footer'
            className="w-full bg-background text-text overflow-hidden relative px-16 pt-32 pb-8"
        >

            {/* =========================
                LOGO / INTRO
            ========================= */}

            <div
                ref={footerLogoRef}
                className="w-full flex flex-col items-center text-center mb-32"
            >

                <span className="font-body text-xs tracking-[0.35em] text-text-secondary uppercase">
                    Braga, Portugal
                </span>

                <h2 className="font-heading text-[clamp(5rem,15vw,14rem)] leading-none text-accent mt-6">
                    NOIR
                </h2>

                <p className="font-body text-sm text-text-secondary max-w-md leading-7 mt-8">
                    An intimate dining experience shaped by seasonal
                    ingredients, refined technique and timeless elegance.
                </p>

            </div>


            {/* =========================
                FOOTER CONTENT
            ========================= */}

            <div
                ref={footerContentRef}
                className="w-full max-w-7xl mx-auto grid grid-cols-4 gap-16 border-t border-text-secondary/20 pt-12"
            >

                {/* LOCATION */}

                <div className="footer-item">

                    <span className="font-body text-[10px] tracking-[0.25em] text-text-secondary uppercase">
                        Visit
                    </span>

                    <h3 className="font-heading text-2xl mt-5">
                        Find us
                    </h3>

                    <p className="font-body text-sm text-text-secondary leading-7 mt-4">
                        Rua do Carmo 24
                        <br />
                        4700-000 Braga
                        <br />
                        Portugal
                    </p>

                </div>


                {/* CONTACT */}

                <div className="footer-item" id='bottom'>

                    <span className="font-body text-[10px] tracking-[0.25em] text-text-secondary uppercase">
                        Contact
                    </span>

                    <h3 className="font-heading text-2xl mt-5">
                        Get in touch
                    </h3>

                    <div className="flex flex-col gap-2 mt-4">

                        <a
                            href="tel:+351000000000"
                            className="font-body text-sm text-text-secondary transition-colors duration-300 hover:text-accent"
                        >
                            +351 000 000 000
                        </a>

                        <a
                            href="mailto:hello@noir.pt"
                            className="font-body text-sm text-text-secondary transition-colors duration-300 hover:text-accent"
                        >
                            hello@noir.pt
                        </a>

                    </div>

                </div>


                {/* OPENING HOURS */}

                <div className="footer-item">

                    <span className="font-body text-[10px] tracking-[0.25em] text-text-secondary uppercase">
                        Hours
                    </span>

                    <h3 className="font-heading text-2xl mt-5">
                        Opening hours
                    </h3>

                    <div className="font-body text-sm text-text-secondary leading-7 mt-4">

                        <p>
                            Tuesday — Thursday
                            <br />
                            19:00 — 23:30
                        </p>

                        <p className="mt-3">
                            Friday — Saturday
                            <br />
                            19:00 — 00:00
                        </p>

                    </div>

                </div>


                {/* SOCIAL */}

                <div className="footer-item">

                    <span className="font-body text-[10px] tracking-[0.25em] text-text-secondary uppercase">
                        Follow
                    </span>

                    <h3 className="font-heading text-2xl mt-5">
                        Social
                    </h3>

                    <div className="flex items-center gap-5 mt-5">

                        <a
                            href="#instagram"
                            aria-label="Instagram"
                            className="w-10 h-10 border border-text-secondary/30 flex items-center justify-center transition-all duration-300 hover:border-accent hover:text-accent hover:-translate-y-1"
                        >
                            <FaInstagram className="text-sm" />
                        </a>

                        <a
                            href="#facebook"
                            aria-label="Facebook"
                            className="w-10 h-10 border border-text-secondary/30 flex items-center justify-center transition-all duration-300 hover:border-accent hover:text-accent hover:-translate-y-1"
                        >
                            <FaFacebookF className="text-sm" />
                        </a>

                    </div>

                </div>

            </div>


            {/* =========================
                CTA
            ========================= */}

            <div className="w-full flex justify-center py-24">

                <a
                    href="#reservation"
                    className="group inline-flex items-center gap-5 border border-accent px-10 py-5 font-body text-xs tracking-[0.25em] uppercase text-accent transition-all duration-500 hover:bg-accent hover:text-background"
                >

                    <span>
                        Reserve a Table
                    </span>

                    <span className="transition-transform duration-500 group-hover:translate-x-2">
                        →
                    </span>

                </a>

            </div>


            {/* =========================
                BOTTOM
            ========================= */}

            <div
                ref={footerBottomRef}
                className="w-full border-t border-text-secondary/20 pt-6 flex items-center justify-between"
            >

                <span className="font-body text-[10px] tracking-[0.15em] text-text-secondary uppercase">
                    © 2026 Noir
                </span>

                <span className="font-body text-[10px] tracking-[0.15em] text-text-secondary uppercase">
                    Crafted with intention
                </span>

                <a
                    href="#top"
                    className="font-body text-[10px] tracking-[0.15em] text-text-secondary uppercase transition-colors duration-300 hover:text-accent"
                >
                    Back to top ↑
                </a>

            </div>

        </footer>
    );
};

export default Footer;