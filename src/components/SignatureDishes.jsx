import { useRef, useState } from 'react'
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const SignatureDishes =({signatureRef})=>{

    const dishesContainer=useRef(null);
    const disheText=useRef(null);
    const disheImage=useRef(null);
    const dishe=useRef(null);


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

    })



    return(
        <section ref={signatureRef} className="w-full min-h-screen overflow-hidden bg-background relative">
            <div id="introduction" className="mt-32 flex items-center flex-col">
                <h1 id='signatureTitle' className="text-5xl font-heading text-text">SIGNATURE DISHES</h1>
                <p id='signatureSubtitle' className="text-sm text-text-secondary font-body mt-4">A curated selection of our most celebrated creations</p>
            </div>
            <div ref={dishesContainer} className='mt-64 w-full flex flex-col space-y-14'>
                <div ref={dishe} className='w-full h-screen flex py-24 px-16'>
                    <div ref={disheText} className='w-[40%] h-full text-text flex flex-col text-start pl-32 font-body pt-20 '>
                        <h2 className=' text-sm text-text-secondary'>01</h2>
                        <h1 className=' font-heading text-3xl tracking-wide text-accent mt-4 mb-6'>Dry Aged Ribeye</h1>
                        <hr className='text-text-secondary w-[30%] mb-12'/>
                        <h3 className='max-w-[60%] text-sm mb-28 leading-6'>Dry-aged ribeye steak, aged 30 days for maximum
                            richness, deep savory flavor, and tenderness.
                            Grilled over open embers to highlight its marbling.</h3>
                        <h2 className='text-sm text-accent'>42€</h2>
                    </div>
                    <div ref={disheImage} className='w-[60%] h-full overflow-hidden'>
                        <img src="/photos/dishe1.jpg" alt="" className='w-full h-full object-cover border-1 border-surface'/>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SignatureDishes;