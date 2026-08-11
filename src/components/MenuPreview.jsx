import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from "@gsap/react";
import { Link } from "react-router-dom";

const menuCategories = [
    {
        number: '01',
        name: 'Starters',
        dishes: [
            {
                name: 'Burrata',
                description: 'Tomato, basil oil, sea salt',
                price: '€12'
            },
            {
                name: 'Beef Tartare',
                description: 'Caper, shallot, mustard, egg yolk',
                price: '€16'
            }
        ]
    },
    {
        number: '02',
        name: 'Main',
        dishes: [
            {
                name: 'Dry Aged Ribeye',
                description: '30 day aged beef, roasted vegetables, jus',
                price: '€38'
            },
            {
                name: 'Truffle Risotto',
                description: 'Arborio rice, black truffle, Parmesan',
                price: '€28'
            }
        ]
    },
    {
        number: '03',
        name: 'Dessert',
        dishes: [
            {
                name: 'Chocolate Sphere',
                description: 'Dark chocolate, vanilla, hazelnut',
                price: '€11'
            },
            {
                name: 'Lemon Tart',
                description: 'Lemon curd, almond, crème fraîche',
                price: '€10'
            }
        ]
    }
];


const MenuPreview = ({ menuPreviewRef }) => {

    const previewSmallTitleRef=useRef(null);
    const previewBigTitleRef=useRef(null);
    const previewParagraphRef=useRef(null);
    const previewCategoriesRef = useRef(null);
    const previewButtonRef = useRef(null);

    useGSAP(()=>{
        const titleTl=gsap.timeline({
            scrollTrigger:{
                trigger:menuPreviewRef.current,
                start:'top 50%',
                toggleActions:'play none none reverse'
            }
        })

        titleTl.from(previewSmallTitleRef.current,{
            yPercent:15,
            opacity:0,
            duration:1
        })

        .from(previewBigTitleRef.current,{
            yPercent:15,
            opacity:0,
            duration:1
        }, '<0.5')

        .from(previewParagraphRef.current,{
            yPercent:15,
            opacity:0,
            duration:1
        }, '<0.5')


        const categories = gsap.utils.toArray(
            '.menu-category',
            previewCategoriesRef.current
        );

        categories.forEach((category) => {

            const categoryTitle = category.querySelector('.menu-category-title');
            const categoryNumber = category.querySelector('.menu-category-number');
            const dishes = category.querySelectorAll('.menu-dish');

            gsap.set(categoryTitle, {
                opacity: 0,
                y: 30
            });

            gsap.set(categoryNumber, {
                opacity: 0,
                y: 20
            });

            gsap.set(dishes, {
                opacity: 0,
                x: -30
            });

            const categoryTl = gsap.timeline({
                scrollTrigger: {
                    trigger: category,
                    start: 'top 75%',
                    toggleActions: 'play none none reverse'
                }
            });

            categoryTl
                .to(categoryTitle, {
                    opacity: 1,
                    y: 0,
                    duration: 0.7,
                    ease: 'power3.out'
                })

                .to(categoryNumber, {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    ease: 'power3.out'
                }, '<0.15')

                .to(dishes, {
                    opacity: 1,
                    x: 0,
                    duration: 0.7,
                    stagger: 0.2,
                    ease: 'power3.out'
                }, '<0.15');

        });


        // =========================
        // BUTTON
        // =========================

        gsap.fromTo(
            previewButtonRef.current,
            {
                opacity: 0,
                y: 30
            },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: previewButtonRef.current,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            }
        );

    })

    return (
        <section
            ref={menuPreviewRef}
            className="w-full min-h-screen bg-[#EDE9E1] text-[#181818] overflow-hidden relative px-16 py-32"
        >

            {/* HEADER */}
            <div className="w-full flex flex-col items-center text-center mb-28">

                <span ref={previewSmallTitleRef} className="font-body text-xs tracking-[0.3em] text-[#77736C] uppercase">
                    Menu Preview
                </span>

                <h1 ref={previewBigTitleRef} className="font-heading text-6xl max-w-3xl mt-6 leading-tight">
                    A taste of
                    <span className="text-[#A88B5A]"> Noir.</span>
                </h1>

                <p ref={previewParagraphRef} className="font-body text-sm text-[#77736C] max-w-md leading-7 mt-6">
                    A selection of dishes crafted around seasonal ingredients,
                    refined techniques and bold flavours.
                </p>

            </div>


            {/* MENU */}
            <div ref={previewCategoriesRef} className="w-full max-w-5xl mx-auto">

                {menuCategories.map((category) => (

                    <div
                        key={category.number}
                        className="menu-category mb-20"
                    >

                        {/* CATEGORY HEADER */}
                        <div className="flex items-center justify-between border-b border-[#181818]/20 pb-5 mb-8">

                            <h2 className="menu-category-title font-heading text-3xl">
                                {category.name}
                            </h2>

                            <span className="menu-category-number font-body text-xs tracking-[0.2em] text-[#77736C] uppercase">
                                {category.number}
                            </span>

                        </div>


                        {/* DISHES */}
                        <div className="space-y-7">

                            {category.dishes.map((dish) => (

                                <div
                                    key={dish.name}
                                    className="menu-dish flex items-end justify-between gap-8 border-b border-[#181818]/10 pb-5"
                                >

                                    <div>

                                        <h3 className="font-heading text-xl">
                                            {dish.name}
                                        </h3>

                                        <p className="font-body text-xs text-[#77736C] mt-2">
                                            {dish.description}
                                        </p>

                                    </div>

                                    <span className="font-body text-sm whitespace-nowrap">
                                        {dish.price}
                                    </span>

                                </div>

                            ))}

                        </div>

                    </div>

                ))}


                {/* BUTTON */}
                <div ref={previewButtonRef} className="flex justify-center gap-5 pt-8">

                    <a
                        href="#menu"
                        className="group inline-flex items-center gap-4 border border-[#181818]/40 px-8 py-4 font-body text-xs tracking-[0.2em] uppercase transition-all duration-500 hover:bg-[#181818] hover:text-[#EDE9E1]"
                    >
                        <span>
                            View Full Menu
                        </span>

                        <span className="transition-transform duration-500 group-hover:translate-x-2">
                            →
                        </span>
                    </a>
                    
                    <Link
                        to="/takeaway"
                        className="group inline-flex items-center gap-4 border border-[#181818]/40 px-8 py-4 font-body text-xs tracking-[0.2em] uppercase transition-all duration-500 hover:bg-[#181818] hover:text-[#EDE9E1]"
                    >
                        <span>
                            Takeaway orders
                        </span>

                        <span className="transition-transform duration-500 group-hover:translate-x-2">
                            →
                        </span>
                    </Link>

                </div>

            </div>

        </section>
    );
};

export default MenuPreview;