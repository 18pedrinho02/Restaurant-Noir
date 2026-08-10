import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';


const testimonials = [
    {
        quote: 'An exceptional dining experience from beginning to end. Every detail felt carefully considered.',
        author: 'James Wilson',
        role: 'Food Critic'
    },
    {
        quote: 'Beautiful food, incredible atmosphere and impeccable service. Noir is truly something special.',
        author: 'Sophie Martin',
        role: 'Guest'
    },
    {
        quote: 'One of the finest dining experiences I have had in Portugal. Elegant without ever feeling pretentious.',
        author: 'Daniel Costa',
        role: 'Guest'
    }
];

const Testimonials = ({ testimonialsRef }) => {

    const testimonialsTitleRef = useRef(null);
    const testimonialsSubtitleRef = useRef(null);
    const testimonialCardsRef = useRef(null);

    useGSAP(() => {

        // =========================
        // HEADER ANIMATION
        // =========================

        const titleTl = gsap.timeline({
            scrollTrigger: {
                trigger: testimonialsRef.current,
                start: 'top 55%',
                toggleActions: 'play none none reverse'
            }
        });

        titleTl
            .from(testimonialsSubtitleRef.current, {
                opacity: 0,
                y: 15,
                duration: 0.8,
                ease: 'power3.out'
            })
            .from(
                testimonialsTitleRef.current,
                {
                    opacity: 0,
                    y: 20,
                    duration: 0.9,
                    ease: 'power3.out'
                },
                '<0.2'
            );


        // =========================
        // CARDS INITIAL STATE
        // =========================

        const cards = testimonialCardsRef.current.querySelectorAll(
            '.testimonial-card'
        );

        gsap.set(cards, {
            opacity: 0,
            y: 40
        });


        // =========================
        // CARDS ANIMATION
        // =========================

        gsap.to(cards, {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.2,
            ease: 'power3.out',

            scrollTrigger: {
                trigger: testimonialCardsRef.current,
                start: 'top 70%',
                toggleActions: 'play none none reverse'
            }
        });

    }, { scope: testimonialsRef });


    return (
        <section
            ref={testimonialsRef}
            className="w-full min-h-screen bg-background text-text overflow-hidden relative px-16 py-32"
        >

            {/* =========================
                HEADER
            ========================= */}

            <div className="w-full flex flex-col items-center text-center mb-28">

                <span
                    ref={testimonialsSubtitleRef}
                    className="font-body text-xs tracking-[0.3em] text-text-secondary uppercase"
                >
                    Testimonials
                </span>

                <h1
                    ref={testimonialsTitleRef}
                    className="font-heading text-6xl max-w-3xl mt-6 leading-tight"
                >
                    Words from
                    <span className="text-accent">
                        {' '}our guests.
                    </span>
                </h1>

            </div>


            {/* =========================
                TESTIMONIALS
            ========================= */}

            <div
                ref={testimonialCardsRef}
                className="w-full max-w-6xl mx-auto grid grid-cols-3 gap-x-16"
            >

                {testimonials.map((testimonial, index) => (

                    <div
                        key={testimonial.author}
                        className="testimonial-card group border-t border-text-secondary/30 pt-8 transition-all duration-500 ease-out hover:-translate-y-1 hover:border-accent"
                    >

                        {/* TOP */}

                        <div className="flex items-center justify-between mb-12">

                            <span className="font-body text-xs tracking-[0.2em] text-text-secondary transition-colors duration-500 group-hover:text-accent">
                                0{index + 1}
                            </span>

                            <span className="font-body text-xs tracking-[0.2em] text-text-secondary uppercase transition-colors duration-500 group-hover:text-accent">
                                {testimonial.role}
                            </span>

                        </div>


                        {/* QUOTE */}

                        <div className="min-h-[180px]">

                            <span className="inline-block font-heading text-5xl text-accent leading-none transition-transform duration-500 ease-out group-hover:-translate-y-2">
                                “
                            </span>

                            <p className="font-heading text-2xl leading-relaxed mt-2 transition-transform duration-500 ease-out group-hover:translate-x-1">
                                {testimonial.quote}
                            </p>

                        </div>


                        {/* AUTHOR */}

                        <div className="mt-12">

                            <h3 className="font-body text-sm tracking-wide text-text transition-colors duration-500 group-hover:text-accent">
                                {testimonial.author}
                            </h3>

                            <p className="font-body text-xs text-text-secondary mt-2 transition-colors duration-500 group-hover:text-text">
                                {testimonial.role}
                            </p>

                        </div>

                    </div>

                ))}

            </div>

        </section>
    );
};

export default Testimonials;