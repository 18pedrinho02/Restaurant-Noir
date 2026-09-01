import { useRef } from 'react';
import { FaLeaf, FaCalendarAlt, FaAward, FaWineGlassAlt } from 'react-icons/fa';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from "@gsap/react";

const Experience = ({ experienceRef }) => {


    const experienceBigTitle=useRef(null);
    const experienceSmallTitle=useRef(null);
    const experienceFeatures=useRef(null);

    useGSAP(() => {

        const mm = gsap.matchMedia();


        // DESKTOP

        mm.add("(min-width: 1024px)", () => {

            const titleTl = gsap.timeline({
                scrollTrigger: {
                    trigger: experienceRef.current,
                    start: 'top 50%',
                    toggleActions: 'play none none reverse'
                }
            });

            titleTl.from(experienceSmallTitle.current, {
                opacity: 0,
                y: 10,
                duration: 1
            })

            .from(experienceBigTitle.current, {
                opacity: 0,
                y: 10,
                duration: 1
            });


            gsap.set('.experience-feature', {
                opacity: 0,
                y: 30,
                scale: 0.9
            });


            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: experienceFeatures.current,
                    start: 'top 40%',
                    toggleActions: 'play none none reverse'
                }
            });

            tl.to('.experience-feature', {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 1,
                stagger: 0.25,
                ease: 'power3.out'
            });

        });


        // MOBILE

        mm.add("(max-width: 1023px)", () => {

            const titleTl = gsap.timeline({
                scrollTrigger: {
                    trigger: experienceRef.current,
                    start: 'top 50%',
                    toggleActions: 'play none none reverse'
                }
            });

            titleTl.from(experienceSmallTitle.current, {
                opacity: 0,
                y: 15,
                duration: 0.7
            })

            .from(experienceBigTitle.current, {
                opacity: 0,
                y: 15,
                duration: 0.7
            }, '<0.2');


            gsap.set('.experience-feature', {
                opacity: 0,
                y: 25,
                scale: 0.97
            });


            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: experienceFeatures.current,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                }
            });

            tl.to('.experience-feature', {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.7,
                stagger: 0.15,
                ease: 'power3.out'
            });

        });


        return () => mm.revert();

    });


    return (
        <section
            ref={experienceRef}
            className="w-full min-h-screen bg-background overflow-hidden relative px-6 py-20 lg:px-16 lg:py-32"
        >

            {/* HEADER */}
            <div className="w-full flex flex-col items-center text-center mb-20 lg:mb-28">

                <span ref={experienceSmallTitle} className="font-body text-xs tracking-[0.3em] text-text-secondary uppercase">
                    Experience
                </span>

                <h1 ref={experienceBigTitle} className="font-heading text-4xl lg:text-6xl text-text max-w-3xl mt-6 leading-tight">
                    What makes
                    <span className="text-accent"> Noir different.</span>
                </h1>

            </div>


            {/* FEATURES */}
            <div ref={experienceFeatures} className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-x-24 gap-y-16 lg:gap-y-20">

                {/* FEATURE 01 */}
                <div className="experience-feature border-t border-text-secondary/30 pt-8 group transition-all duration-500 ease-out">

                    <div className="flex items-start justify-between mb-8">

                        <span className="font-body text-xs tracking-[0.2em] text-text-secondary transition-colors duration-500 group-hover:text-accent">
                            01
                        </span>

                        <FaLeaf className="text-text-secondary text-sm transition-all duration-500 ease-out group-hover:text-accent group-hover:translate-x-1" />

                    </div>

                    <h2 className="font-heading text-3xl text-text tracking-wide transition-colors duration-500 group-hover:text-accent">
                        Fresh Ingredients
                    </h2>

                    <p className="font-body text-sm text-text-secondary leading-7 max-w-md mt-5">
                        Carefully selected ingredients sourced at their peak
                        to preserve flavour, quality and character.
                    </p>

                </div>


                {/* FEATURE 02 */}
                <div className="experience-feature border-t border-text-secondary/30 pt-8 group transition-all duration-500 ease-out">

                    <div className="flex items-start justify-between mb-8">

                        <span className="font-body text-xs tracking-[0.2em] text-text-secondary transition-colors duration-500 group-hover:text-accent">
                            02
                        </span>

                        <FaCalendarAlt className="text-text-secondary text-sm transition-all duration-500 ease-out group-hover:text-accent group-hover:translate-x-1" />

                    </div>

                    <h2 className="font-heading text-3xl text-text tracking-wide transition-colors duration-500 group-hover:text-accent">
                        Seasonal Menu
                    </h2>

                    <p className="font-body text-sm text-text-secondary leading-7 max-w-md mt-5">
                        A menu that evolves with the seasons, bringing new
                        flavours and discoveries throughout the year.
                    </p>

                </div>


                {/* FEATURE 03 */}
                <div className="experience-feature border-t border-text-secondary/30 pt-8 group transition-all duration-500 ease-out">

                    <div className="flex items-start justify-between mb-8">

                        <span className="font-body text-xs tracking-[0.2em] text-text-secondary transition-colors duration-500 group-hover:text-accent">
                            03
                        </span>

                        <FaAward className="text-text-secondary text-sm transition-all duration-500 ease-out group-hover:text-accent group-hover:translate-x-1" />

                    </div>

                    <h2 className="font-heading text-3xl text-text tracking-wide transition-colors duration-500 group-hover:text-accent">
                        Award Winning Chef
                    </h2>

                    <p className="font-body text-sm text-text-secondary leading-7 max-w-md mt-5">
                        Years of experience, refined technique and a passion
                        for creating dishes that leave an impression.
                    </p>

                </div>


                {/* FEATURE 04 */}
                <div className="experience-feature border-t border-text-secondary/30 pt-8 group transition-all duration-500 ease-out">

                    <div className="flex items-start justify-between mb-8">

                        <span className="font-body text-xs tracking-[0.2em] text-text-secondary transition-colors duration-500 group-hover:text-accent">
                            04
                        </span>

                        <FaWineGlassAlt className="text-text-secondary text-sm transition-all duration-500 ease-out group-hover:text-accent group-hover:translate-x-1" />

                    </div>

                    <h2 className="font-heading text-3xl text-text tracking-wide transition-colors duration-500 group-hover:text-accent">
                        Exclusive Atmosphere
                    </h2>

                    <p className="font-body text-sm text-text-secondary leading-7 max-w-md mt-5">
                        An intimate setting where thoughtful design, warm
                        lighting and quiet details come together.
                    </p>

                </div>

            </div>

        </section>
    );
};

export default Experience;