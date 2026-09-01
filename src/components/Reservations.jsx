import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';


gsap.registerPlugin(ScrollTrigger);

const Reservation = ({ reservationRef }) => {

    const reservationLabelRef = useRef(null);
    const reservationLocationRef = useRef(null);

    const reservationSubtitleRef = useRef(null);
    const reservationTitleRef = useRef(null);
    const reservationParagraphRef = useRef(null);

    const reservationInfoRef = useRef(null);
    const reservationButtonRef = useRef(null);
    const reservationNoteRef = useRef(null);

    const reservationBottomRef = useRef(null);

    useGSAP(() => {

        // =========================
        // INITIAL STATES
        // =========================

        gsap.set(
            [
                reservationLabelRef.current,
                reservationLocationRef.current,
                reservationSubtitleRef.current,
                reservationTitleRef.current,
                reservationParagraphRef.current,
                reservationInfoRef.current,
                reservationButtonRef.current,
                reservationNoteRef.current,
                reservationBottomRef.current
            ],
            {
                opacity: 0
            }
        );

        gsap.set(
            [
                reservationLabelRef.current,
                reservationLocationRef.current,
                reservationSubtitleRef.current,
                reservationTitleRef.current,
                reservationParagraphRef.current,
                reservationInfoRef.current,
                reservationButtonRef.current,
                reservationNoteRef.current,
                reservationBottomRef.current
            ],
            {
                y: 30
            }
        );


        // =========================
        // MAIN TIMELINE
        // =========================

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: reservationRef.current,
                start: 'top 60%',
                toggleActions: 'play none none reverse'
            }
        });


        // TOP

        tl.to(
            reservationLabelRef.current,
            {
                opacity: 1,
                y: 0,
                duration: 0.7,
                ease: 'power3.out'
            }
        )

        .to(
            reservationLocationRef.current,
            {
                opacity: 1,
                y: 0,
                duration: 0.7,
                ease: 'power3.out'
            },
            '<0.15'
        );


        // LEFT SIDE

        tl.to(
            reservationSubtitleRef.current,
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'power3.out'
            },
            '-=0.1'
        )

        .to(
            reservationTitleRef.current,
            {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: 'power3.out'
            },
            '<0.15'
        )

        .to(
            reservationParagraphRef.current,
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'power3.out'
            },
            '<0.2'
        );


        // RIGHT SIDE

        tl.to(
            reservationInfoRef.current,
            {
                opacity: 1,
                y: 0,
                duration: 0.9,
                ease: 'power3.out'
            },
            '-=0.3'
        );


        // BUTTON

        tl.to(
            reservationButtonRef.current,
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'power3.out'
            },
            '-=0.3'
        );


        // NOTE

        tl.to(
            reservationNoteRef.current,
            {
                opacity: 1,
                y: 0,
                duration: 0.7,
                ease: 'power3.out'
            },
            '<0.1'
        );


        // BOTTOM

        tl.to(
            reservationBottomRef.current,
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'power3.out'
            },
            '-=0.1'
        );

    }, { scope: reservationRef });


    return (
        <section
        id='reservation'
            ref={reservationRef}
            className="w-full min-h-screen bg-background text-text overflow-hidden relative px-6 py-20 lg:px-16 lg:py-32 flex items-center"
        >

            <div className="w-full max-w-6xl mx-auto">

                {/* TOP */}

                <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between mb-16 lg:mb-20">

                    <span
                        ref={reservationLabelRef}
                        className="font-body text-xs tracking-[0.3em] text-text-secondary uppercase"
                    >
                        Reservations
                    </span>

                    <span
                        ref={reservationLocationRef}
                        className="font-body text-xs tracking-[0.2em] text-text-secondary uppercase"
                    >
                        Braga · Portugal
                    </span>

                </div>


                {/* MAIN CONTENT */}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

                    {/* LEFT */}

                    <div>

                        <span
                            ref={reservationSubtitleRef}
                            className="font-body text-xs tracking-[0.25em] text-accent uppercase"
                        >
                            Your table awaits
                        </span>

                        <h1
                            ref={reservationTitleRef}
                            className="font-heading text-5xl lg:text-7xl leading-[0.95] mt-6 lg:mt-8"
                        >
                            An evening
                            <br />
                            worth
                            <br className="lg:hidden" />
                            <span className="text-accent">
                                remembering.
                            </span>
                        </h1>

                        <p
                            ref={reservationParagraphRef}
                            className="font-body text-sm text-text-secondary leading-7 max-w-md mt-10"
                        >
                            Join us at Noir for an evening shaped by exceptional
                            ingredients, thoughtful cooking and an atmosphere
                            designed to be remembered.
                        </p>

                    </div>


                    {/* RIGHT */}

                    <div className="border-t border-text-secondary/30 pt-8">

                        {/* RESERVATION INFO */}

                        <div
                            ref={reservationInfoRef}
                            className="space-y-8"
                        >

                            <div className="flex items-center justify-between border-b border-text-secondary/20 pb-6">

                                <span className="font-body text-xs tracking-[0.2em] text-text-secondary uppercase">
                                    Opening Hours
                                </span>

                                <span className="font-body text-sm text-text">
                                    Tue — Sat
                                </span>

                            </div>


                            <div className="flex items-center justify-between border-b border-text-secondary/20 pb-6">

                                <span className="font-body text-xs tracking-[0.2em] text-text-secondary uppercase">
                                    Dinner
                                </span>

                                <span className="font-body text-sm text-text">
                                    19:00 — 23:30
                                </span>

                            </div>


                            <div className="flex items-center justify-between border-b border-text-secondary/20 pb-6">

                                <span className="font-body text-xs tracking-[0.2em] text-text-secondary uppercase">
                                    Location
                                </span>

                                <span className="font-body text-sm text-text">
                                    Braga, Portugal
                                </span>

                            </div>

                        </div>


                        {/* BUTTON */}

                        <div
                            ref={reservationButtonRef}
                            className="mt-12"
                        >

                            <a
                                href="#bottom"
                                className="group w-full flex items-center justify-between border border-accent px-8 py-5 font-body text-xs tracking-[0.25em] uppercase transition-all duration-500 hover:bg-accent hover:text-background"
                            >

                                <span>
                                    To reserve contact us by email or phone number
                                </span>

                                <span className="text-lg transition-transform duration-500 group-hover:translate-x-2">
                                    →
                                </span>

                            </a>

                        </div>

                    </div>

                </div>


                {/* BOTTOM */}

                <div
                    ref={reservationBottomRef}
                    className="flex items-center justify-between mt-24 pt-8 border-t border-text-secondary/20"
                >

                    <span className="font-heading text-2xl">
                        NOIR
                    </span>

                    <span className="font-body text-xs tracking-[0.2em] text-text-secondary uppercase">
                        A dining experience
                    </span>

                </div>

            </div>

        </section>
    );
};

export default Reservation;