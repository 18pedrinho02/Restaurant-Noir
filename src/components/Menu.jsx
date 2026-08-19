import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const menuCategories = [
    {
        number: "01",
        name: "Starters",
        description: "A delicate beginning.",
        dishes: [
            {
                name: "Burrata",
                description: "Tomato, basil oil, sea salt",
                price: "€12",
            },
            {
                name: "Beef Tartare",
                description: "Caper, shallot, mustard, egg yolk",
                price: "€16",
            },
            {
                name: "Scallop Crudo",
                description: "Citrus, fennel, olive oil, sea herbs",
                price: "€18",
            },
            {
                name: "Wild Mushroom",
                description: "Roasted mushrooms, thyme, aged parmesan",
                price: "€14",
            },
        ],
    },

    {
        number: "02",
        name: "Main",
        description: "The heart of the experience.",
        dishes: [
            {
                name: "Dry Aged Ribeye",
                description: "30 day aged beef, roasted vegetables, jus",
                price: "€38",
            },
            {
                name: "Truffle Risotto",
                description: "Arborio rice, black truffle, Parmesan",
                price: "€28",
            },
            {
                name: "Roasted Sea Bass",
                description: "Seasonal vegetables, beurre blanc, herbs",
                price: "€32",
            },
            {
                name: "Duck Breast",
                description: "Caramelised pear, celeriac, red wine jus",
                price: "€34",
            },
        ],
    },

    {
        number: "03",
        name: "Vegetarian",
        description: "Thoughtfully composed.",
        dishes: [
            {
                name: "Forest Risotto",
                description: "Wild mushrooms, parmesan, truffle oil",
                price: "€26",
            },
            {
                name: "Charred Cauliflower",
                description: "Tahini, herbs, hazelnut, lemon",
                price: "€22",
            },
            {
                name: "Garden Ravioli",
                description: "Seasonal vegetables, sage butter",
                price: "€24",
            },
        ],
    },

    {
        number: "04",
        name: "Dessert",
        description: "A final impression.",
        dishes: [
            {
                name: "Chocolate Sphere",
                description: "Dark chocolate, vanilla, hazelnut",
                price: "€11",
            },
            {
                name: "Lemon Tart",
                description: "Lemon curd, almond, crème fraîche",
                price: "€10",
            },
            {
                name: "Vanilla Panna Cotta",
                description: "Seasonal berries, pistachio",
                price: "€10",
            },
            {
                name: "Cheese Selection",
                description: "Three artisan cheeses, crackers, fig",
                price: "€14",
            },
        ],
    },

    {
        number: "05",
        name: "Drinks",
        description: "Selected to complement the table.",
        dishes: [
            {
                name: "Noir Signature",
                description: "Gin, elderflower, citrus, champagne",
                price: "€12",
            },
            {
                name: "Old Fashioned",
                description: "Bourbon, bitters, orange",
                price: "€11",
            },
            {
                name: "House Red",
                description: "Douro, Portugal",
                price: "€7",
            },
            {
                name: "House White",
                description: "Vinho Verde, Portugal",
                price: "€6",
            },
            {
                name: "Sparkling Water",
                description: "750ml",
                price: "€4",
            },
        ],
    },
];

const Menu = () => {
    const menuRef = useRef(null);
    const heroRef = useRef(null);
    const heroSmallTitleRef = useRef(null);
    const heroTitleRef = useRef(null);
    const heroParagraphRef = useRef(null);
    const categoryRefs = useRef([]);
    const bottomRef = useRef(null);

    useGSAP(
        () => {
            // =========================
            // HERO
            // =========================

            const heroTl = gsap.timeline({
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: "top 80%",
                    toggleActions: "play none none reverse",
                },
            });

            heroTl
                .from(heroSmallTitleRef.current, {
                    opacity: 0,
                    y: 20,
                    duration: 0.8,
                    ease: "power3.out",
                })
                .from(
                    heroTitleRef.current,
                    {
                        opacity: 0,
                        y: 40,
                        duration: 1,
                        ease: "power3.out",
                    },
                    "<0.2"
                )
                .from(
                    heroParagraphRef.current,
                    {
                        opacity: 0,
                        y: 20,
                        duration: 0.8,
                        ease: "power3.out",
                    },
                    "<0.3"
                );

            // =========================
            // CATEGORIES
            // =========================

            categoryRefs.current.forEach((category) => {
                if (!category) return;

                const title = category.querySelector(".menu-title");
                const number = category.querySelector(".menu-number");
                const description = category.querySelector(".menu-description");
                const dishes = category.querySelectorAll(".menu-dish");

                gsap.set(title, {
                    opacity: 0,
                    y: 30,
                });

                gsap.set(number, {
                    opacity: 0,
                    y: 20,
                });

                gsap.set(description, {
                    opacity: 0,
                    y: 20,
                });

                gsap.set(dishes, {
                    opacity: 0,
                    x: -30,
                });

                const categoryTl = gsap.timeline({
                    scrollTrigger: {
                        trigger: category,
                        start: "top 75%",
                        toggleActions: "play none none reverse",
                    },
                });

                categoryTl
                    .to(title, {
                        opacity: 1,
                        y: 0,
                        duration: 0.7,
                        ease: "power3.out",
                    })
                    .to(
                        number,
                        {
                            opacity: 1,
                            y: 0,
                            duration: 0.5,
                            ease: "power3.out",
                        },
                        "<0.15"
                    )
                    .to(
                        description,
                        {
                            opacity: 1,
                            y: 0,
                            duration: 0.6,
                            ease: "power3.out",
                        },
                        "<0.1"
                    )
                    .to(
                        dishes,
                        {
                            opacity: 1,
                            x: 0,
                            duration: 0.7,
                            stagger: 0.12,
                            ease: "power3.out",
                        },
                        "<0.15"
                    );
            });

            // =========================
            // BOTTOM
            // =========================

            gsap.fromTo(
                bottomRef.current,
                {
                    opacity: 0,
                    y: 30,
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: bottomRef.current,
                        start: "top 85%",
                        toggleActions: "play none none reverse",
                    },
                }
            );
        },
        { scope: menuRef }
    );

    return (
        <main
            ref={menuRef}
            className="w-full bg-[#EDE9E1] text-[#181818] overflow-hidden"
        >
            {/* ===================================== */}
            {/* HERO */}
            {/* ===================================== */}

            <section
                ref={heroRef}
                className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6"
            >
                <span
                    ref={heroSmallTitleRef}
                    className="font-body text-xs tracking-[0.3em] text-[#77736C] uppercase"
                >
                    Noir Restaurant
                </span>

                <h1
                    ref={heroTitleRef}
                    className="font-heading text-7xl md:text-9xl leading-none mt-8"
                >
                    Our
                    <span className="text-[#A88B5A]"> Menu.</span>
                </h1>

                <p
                    ref={heroParagraphRef}
                    className="font-body text-sm text-[#77736C] max-w-md leading-7 mt-8"
                >
                    A carefully composed menu inspired by seasonal
                    ingredients, traditional techniques and contemporary
                    flavours.
                </p>

            </section>

            {/* ===================================== */}
            {/* MENU */}
            {/* ===================================== */}

            <section className="w-full px-6 md:px-16 pb-32">
                <div className="w-full max-w-5xl mx-auto">
                    {menuCategories.map((category, index) => (
                        <div
                            key={category.number}
                            ref={(el) => {
                                categoryRefs.current[index] = el;
                            }}
                            className="mb-32"
                        >
                            {/* CATEGORY HEADER */}

                            <div className="flex items-end justify-between border-b border-[#181818]/20 pb-6 mb-10">
                                <div>
                                    <span className="menu-number font-body text-xs tracking-[0.2em] text-[#A88B5A] uppercase">
                                        {category.number}
                                    </span>

                                    <h2 className="menu-title font-heading text-5xl md:text-6xl mt-3">
                                        {category.name}
                                    </h2>
                                </div>

                                <p className="menu-description hidden md:block font-body text-xs tracking-wide text-[#77736C] italic">
                                    {category.description}
                                </p>
                            </div>

                            {/* DISHES */}

                            <div className="space-y-8">
                                {category.dishes.map((dish) => (
                                    <div
                                        key={dish.name}
                                        className="menu-dish group flex items-end justify-between gap-8 border-b border-[#181818]/10 pb-6"
                                    >
                                        <div className="max-w-2xl">
                                            <h3 className="font-heading text-2xl md:text-3xl transition-colors duration-300 group-hover:text-[#A88B5A]">
                                                {dish.name}
                                            </h3>

                                            <p className="font-body text-xs md:text-sm text-[#77736C] mt-2 leading-6">
                                                {dish.description}
                                            </p>
                                        </div>

                                        <span className="font-body text-sm md:text-base whitespace-nowrap">
                                            {dish.price}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ===================================== */}
            {/* BOTTOM */}
            {/* ===================================== */}

            <section
                ref={bottomRef}
                className="px-6 md:px-16 pb-32"
            >
                <div className="max-w-5xl mx-auto border-t border-[#181818]/20 pt-16">
                    <div className="flex flex-col items-center text-center">
                        <span className="font-body text-xs tracking-[0.3em] text-[#77736C] uppercase">
                            Your table awaits
                        </span>

                        <h2 className="font-heading text-5xl md:text-6xl mt-6">
                            Experience Noir.
                        </h2>

                        <p className="font-body text-sm text-[#77736C] max-w-md leading-7 mt-6">
                            Join us in Braga for an evening shaped around
                            exceptional food, thoughtful service and an
                            atmosphere designed to linger.
                        </p>

                        <div className="flex flex-wrap justify-center gap-4 mt-10">
                            <Link
                                to="/"
                                className="group inline-flex items-center gap-4 border border-[#181818]/40 px-8 py-4 font-body text-xs tracking-[0.2em] uppercase transition-all duration-500 hover:bg-[#181818] hover:text-[#EDE9E1]"
                            >
                                <span>
                                    Back Home
                                </span>

                                <span className="transition-transform duration-500 group-hover:translate-x-2">
                                    →
                                </span>
                            </Link>

                            <Link
                                to="/takeaway"
                                className="group inline-flex items-center gap-4 border border-[#181818]/40 px-8 py-4 font-body text-xs tracking-[0.2em] uppercase transition-all duration-500 hover:bg-[#181818] hover:text-[#EDE9E1]"
                            >
                                <span>
                                    Takeaway
                                </span>

                                <span className="transition-transform duration-500 group-hover:translate-x-2">
                                    →
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===================================== */}
            {/* FOOTER INFO */}
            {/* ===================================== */}

            <footer className="w-full border-t border-[#181818]/10 px-6 md:px-16 py-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 font-body text-xs text-[#77736C]">
                    <span>
                        Michelin Inspired
                    </span>

                    <span>
                        Braga, Portugal
                    </span>
                </div>
            </footer>
        </main>
    );
};

export default Menu;