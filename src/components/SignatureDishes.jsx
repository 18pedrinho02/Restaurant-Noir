import { useRef, useState } from 'react'
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from "@gsap/react";
import DishCard from './DishCard';
import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const SignatureDishes =({signatureRef})=>{

    const dishesContainer=useRef(null);
    const exploreFullMenuRef=useRef(null);
    const exploreFullMenuLinkRef=useRef(null);


    useGSAP(()=>{


        const tl = gsap.timeline({
            scrollTrigger:{
                trigger:signatureRef.current,
                start:'top 40%',
                end:'bottom bottom',
                // markers:true,
                toggleActions:'play none none reverse'
            }
        })

        tl.from('#signatureTitle', {
            yPercent:70,
            opacity:0,
            duration:0.8
        })

        .from('#signatureSubtitle',{
            yPercent:60,
            opacity:0,
            duration:0.6
        },'<0.8')

        const tl2=gsap.timeline({
            scrollTrigger:{
                trigger:exploreFullMenuRef.current,
                start:'top 70%',
                toggleActions:'play none none reverse'
            }
        })

        tl2.to(exploreFullMenuRef.current,{
            opacity:0,
            x:-40,
            duration:1
        })

    })




    return(
        <section ref={signatureRef} className="w-full min-h-screen overflow-hidden bg-background relative">
            <div
                id="introduction"
                className="mt-20 lg:mt-32 px-6 flex items-center flex-col text-center"
            >
                <h1
                    id="signatureTitle"
                    className="text-3xl lg:text-5xl font-heading text-text"
                >
                    SIGNATURE DISHES
                </h1>

                <p
                    id="signatureSubtitle"
                    className="text-xs lg:text-sm text-text-secondary font-body mt-4"
                >
                    A curated selection of our most celebrated creations
                </p>
            </div>
            <div ref={dishesContainer} className="mt-24 lg:mt-64 w-full flex flex-col space-y-0">
                <DishCard
                    number="01"
                    name="Dry Aged Ribeye"
                    description="Dry-aged ribeye steak, aged 30 days for maximum richness, deep savory flavor, and tenderness."
                    price="42"
                    image="/photos/dish1.jpg"
                    imageSide="right"
                />

                <DishCard
                    number="02"
                    name="Truffle Risotto"
                    description="Creamy Arborio rice finished with black truffle, aged Parmesan and a touch of white wine."
                    price="28"
                    image="/photos/dish2.jpg"
                    imageSide="left"
                />

                <DishCard
                    number="03"
                    name="Seared Scallops"
                    description="Perfectly seared scallops served with cauliflower purée, citrus and a delicate herb oil."
                    price="32"
                    image="/photos/dish3.png"
                    imageSide="right"
                />
            </div>

            <div ref={exploreFullMenuRef} className="w-full flex flex-col items-center gap-8 lg:gap-12 text-center mb-20 lg:mb-32">                <hr className='w-[90%] text-text-secondary'></hr>
                <Link ref={exploreFullMenuLinkRef} to="/menu" className='font-body group text-sm inline-flex items-center gap-2 text-text-secondary transition-all ease-in duration-300 uppercase hover:text-accent tracking-wide' >Explore full menu <FaArrowRight className='transition-all ease-in duration-300 group-hover:translate-x-3'></FaArrowRight> </Link>
            </div>
        </section>
    )
}

export default SignatureDishes;