import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from "@gsap/react";

const OurStory = ({ storyRef }) => {

    const storyImageRef = useRef(null);
    const storyContentRef = useRef(null);
    const ourStoryBigHeaderRef=useRef(null);
    const ourStorySmallHeaderRef=useRef(null);
    const ourStoryContentRef=useRef(null);
    const storySignatureRef=useRef(null);

    useGSAP(() => {

        const mm = gsap.matchMedia();

        // DESKTOP

        mm.add("(min-width: 1024px)", () => {

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: storyRef.current,
                    start: 'top 50%',
                    toggleActions: 'play none none reverse'
                }
            });

            tl.from(ourStorySmallHeaderRef.current, {
                y: 40,
                opacity: 0,
                duration: 1.2
            })

            .from(ourStoryBigHeaderRef.current, {
                y: 40,
                opacity: 0,
                duration: 1.2
            }, '<0.8');


            const tl2 = gsap.timeline({
                scrollTrigger: {
                    trigger: ourStoryContentRef.current,
                    start: 'top 20%',
                    toggleActions: 'play none none reverse'
                }
            });

            tl2.from(storyImageRef.current, {
                opacity: 0,
                borderRadius: 100,
                scale: 1.1,
                xPercent: -10,
                duration: 2
            })

            .from(storyContentRef.current, {
                opacity: 0,
                xPercent: 10,
                duration: 1
            }, '<0.6')

            .from(storySignatureRef.current, {
                yPercent: 30,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out'
            }, '<0.4');


            const exitTl = gsap.timeline({
                scrollTrigger: {
                    trigger: ourStoryContentRef.current,
                    start: 'bottom 50%',
                    toggleActions: 'play none none reverse'
                }
            });

            exitTl.to(storyImageRef.current, {
                xPercent: -10,
                opacity: 0,
                scale: 0.8,
                duration: 1
            })

            .to(storyContentRef.current, {
                xPercent: 10,
                opacity: 0,
                duration: 1
            }, '<0.4');

        });


        // MOBILE

        mm.add("(max-width: 1023px)", () => {

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: storyRef.current,
                    start: 'top 75%',
                    toggleActions: 'play none none reverse'
                }
            });

            tl.from(ourStorySmallHeaderRef.current, {
                y: 25,
                opacity: 0,
                duration: 0.8
            })

            .from(ourStoryBigHeaderRef.current, {
                y: 25,
                opacity: 0,
                duration: 0.8
            }, '<0.3');


            const tl2 = gsap.timeline({
                scrollTrigger: {
                    trigger: ourStoryContentRef.current,
                    start: 'top 75%',
                    toggleActions: 'play none none reverse'
                }
            });

            tl2.from(storyImageRef.current, {
                opacity: 0,
                borderRadius: 50,
                scale: 1.05,
                duration: 1
            })

            .from(storyContentRef.current, {
                opacity: 0,
                y: 30,
                duration: 0.8
            }, '<0.3')

            .from(storySignatureRef.current, {
                y: 20,
                opacity: 0,
                duration: 0.6,
                ease: 'power3.out'
            }, '<0.2');

        });

        const exitTl = gsap.timeline({
            scrollTrigger: {
                trigger: ourStoryContentRef.current,
                start: 'bottom 50%',
                toggleActions: 'play none none reverse'
            }
        });

        exitTl.to(storyImageRef.current, {
            opacity: 0,
            y: -40,
            scale: 0.95,
            duration: 0.8,
            ease: 'power3.inOut'
        })

        .to(storyContentRef.current, {
            opacity: 0,
            y: -30,
            duration: 0.8,
            ease: 'power3.inOut'
        }, '<0.2')

        .to(storySignatureRef.current, {
            opacity: 0,
            y: -20,
            duration: 0.6,
            ease: 'power3.inOut'
        }, '<0.2');


        return () => mm.revert();

    });

    return (
        <section
            ref={storyRef}
            id='about'
            className="w-full min-h-screen bg-background overflow-hidden relative px-6 py-20 lg:px-16 lg:py-32"
        >

            {/* HEADER */}
            <div className="w-full flex flex-col items-center text-center mb-20 lg:mb-32">

                <span ref={ourStorySmallHeaderRef} className="font-body text-xs tracking-[0.3em] text-text-secondary uppercase">
                    Our Story
                </span>

                <h1 ref={ourStoryBigHeaderRef} className="font-heading text-4xl lg:text-6xl text-text max-w-3xl mt-6 leading-tight">                    Where tradition meets
                    <span className="text-accent"> a modern point of view.</span>
                </h1>

            </div>


            {/* CONTENT */}
            <div ref={ourStoryContentRef} className="w-full flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
                {/* IMAGE */}
                <div
                    ref={storyImageRef}
                    className="w-full lg:w-[50%] h-[450px] lg:h-[640px] overflow-hidden rounded-2xl"
                >
                    <img
                        src="/photos/ourStory.jpg"
                        alt="Noir restaurant"
                        className="w-full h-full object-cover"
                    />
                </div>


                {/* TEXT */}
                <div
                    ref={storyContentRef}
                    className="w-full lg:w-[40%] font-body text-text"
                >

                    <span className="text-xs tracking-[0.2em] text-text-secondary uppercase">
                        The beginning
                    </span>

                    <h2 className="font-heading text-4xl text-accent mt-5 mb-8">
                        Built around the fire.
                    </h2>

                    <p className="text-sm text-text-secondary leading-7 max-w-md">
                        Noir was created around a simple belief: great food
                        doesn't need to be complicated. It needs time, quality
                        and intention.
                    </p>

                    <p className="text-sm text-text-secondary leading-7 max-w-md mt-6">
                        From carefully selected ingredients to the final plate,
                        every detail is considered. Our kitchen brings
                        traditional techniques together with a modern
                        perspective, creating dishes that feel familiar,
                        yet unexpected.
                    </p>

                    <div className="mt-16">
                        <span className="font-body text-xs tracking-[0.2em] text-text-secondary uppercase">
                            Est. 2026
                        </span>

                        <span className="block font-body text-xs tracking-[0.2em] text-text-secondary uppercase mt-2">
                            Braga, Portugal
                        </span>
                    </div>

                    {/* SIGNATURE */}
                    <div ref={storySignatureRef} className="mt-12">
                        <div className="w-20 h-px bg-text-secondary/40 mb-5"></div>

                        <span className="font-heading text-4xl tracking-wide text-text">
                            NOIR
                        </span>
                    </div>

                </div>

            </div>

        </section>
    );
};

export default OurStory;