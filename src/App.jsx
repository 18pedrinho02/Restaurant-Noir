import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

import Hero from './components/Hero';
import SignatureDishes from './components/SignatureDishes';
import Navbar from './components/Navbar';
import OurStory from './components/OurStory';
import Experience from './components/Experience';
import MenuPreview from './components/MenuPreview';
import Testimonials from './components/Testimonials';
import Reservation from './components/Reservations';
import Footer from './components/Footer';
import Takeaway from './components/Takeaway';
import OrderSuccess from './components/OrderSuccess';
import Admin from "./components/Admin";
import Menu from './components/Menu';

import { CartProvider } from './context/CartContext';

import {
    BrowserRouter,
    Routes,
    Route
} from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);


// ======================================================
// HOMEPAGE
// ======================================================

function App() {

    // Hero
    const heroRef = useRef(null);
    const heroVideoRef = useRef(null);
    const heroTitleRef = useRef(null);
    const heroSubtitleRef = useRef(null);
    const heroButtonsRef = useRef(null);
    const heroOverlayRef = useRef(null);

    // Our Story
    const storyRef = useRef(null);

    // Experience
    const experienceRef = useRef(null);

    // Menu Preview
    const menuPreviewRef = useRef(null);

    // Testimonials
    const testimonialsRef = useRef(null);

    // Reservation
    const reservationRef = useRef(null);

    // Footer
    const footerRef = useRef(null);

    // Signature Dishes
    const signatureRef = useRef(null);


    // ==================================================
    // GSAP
    // ==================================================

    useGSAP(() => {

        // =========================
        // HERO
        // =========================

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: heroRef.current,
                start: 'top top',
                end: '+=100%',
                pin: true,
                scrub: true,
                pinSpacing: false
            }
        });


        tl.to(
            heroVideoRef.current,
            {
                scale: 1.1,
                clipPath:
                    "polygon(50% 0%, 80% 10%, 100% 35%, 100% 70%, 80% 90%, 50% 100%, 20% 90%, 0% 70%, 0% 35%, 20% 10%)",
                duration: 0.2
            },
            '<'
        );


        tl.to(
            heroTitleRef.current,
            {
                y: -100,
                scale: 0.9,
                color: "#F5F5F5"
            },
            '<'
        );


        tl.to(
            heroSubtitleRef.current,
            {
                opacity: 0
            },
            '<'
        );


        tl.to(
            heroButtonsRef.current,
            {
                opacity: 0,
                y: 30
            },
            '<'
        );


        tl.to(
            heroOverlayRef.current,
            {
                opacity: 0.5
            },
            '<'
        );


        // =========================
        // EXPERIENCE
        // =========================

        gsap.timeline({
            scrollTrigger: {
                trigger: experienceRef.current,
                start: 'bottom bottom',
                end: '+=100%',
                pin: true,
                scrub: true,
                pinSpacing: false
            }
        });

    }, {
        dependencies: []
    });


    // ==================================================
    // PAGE
    // ==================================================

    return (
        <>


            <Hero
                heroRef={heroRef}
                heroVideoRef={heroVideoRef}
                heroTitleRef={heroTitleRef}
                heroSubtitleRef={heroSubtitleRef}
                heroButtonsRef={heroButtonsRef}
                heroOverlayRef={heroOverlayRef}
            />

            <SignatureDishes
                signatureRef={signatureRef}
            />

            <OurStory
                storyRef={storyRef}
            />

            <Experience
                experienceRef={experienceRef}
            />

            <MenuPreview
                menuPreviewRef={menuPreviewRef}
            />

            <Testimonials
                testimonialsRef={testimonialsRef}
            />

            <Reservation
                reservationRef={reservationRef}
            />

            <Footer
                footerRef={footerRef}
            />

        </>
    );
}


// ======================================================
// ROUTER
// ======================================================

function Root() {

    return (
        <BrowserRouter>

            <CartProvider>
                <Navbar/>

                <Routes>

                    {/* HOMEPAGE */}

                    <Route
                        path="/"
                        element={<App />}
                    />


                    {/* TAKEAWAY */}

                    <Route
                        path="/takeaway"
                        element={<Takeaway />}
                    />

                    <Route
                        path="/success"
                        element={<OrderSuccess />}
                    />

                    <Route
                        path="/admin"
                        element={<Admin />}
                    />
                    
                    <Route
                        path="/menu"
                        element={<Menu />}
                    />

                </Routes>

            </CartProvider>

        </BrowserRouter>
    );
}


export default Root;