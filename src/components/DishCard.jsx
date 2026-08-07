import { useRef, useState } from 'react'
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);


const DishCard=({number, name, description, price,image, imageSide, dishesContainer})=>{

    const dishText=useRef(null);
    const dishImage=useRef(null);
    const dish=useRef(null);
    const numberRef = useRef(null);
    const nameRef = useRef(null);
    const hrRef = useRef(null);
    const descriptionRef = useRef(null);
    const priceRef = useRef(null);

    const direction=imageSide === 'right' ? -1 : 1

    useGSAP(()=>{

        gsap.set(dishImage.current,{
            borderRadius:200,
            scale:1.1,
            xPercent:-(20 * direction),
            opacity:0
        })

        const tl=gsap.timeline({
            scrollTrigger:{
                trigger:dish.current,
                start:'top 80%',
                toggleActions:'play none none reverse'
            }
        })

        tl.to(dishImage.current,{
            scale:1,
            opacity:1,
            duration:1.5,
            borderRadius:16,
            xPercent:0,
            ease:'power3.out'
        })

        .from(numberRef.current,{
            xPercent:40 * direction,
            opacity:0,
            duration:0.8,
            ease:'power3.out'
        },'<')

        .from(nameRef.current,{
            xPercent:40 * direction,
            opacity:0,
            duration:0.8,
            ease:'power3.out'
        },'<0.5')

        .from(hrRef.current,{
            xPercent:40 * direction,
            opacity:0,
            duration:0.8,
            ease:'power3.out'
        },'<0.5')

        .from(descriptionRef.current,{
            xPercent:40 * direction,
            opacity:0,
            duration:0.8,
            ease:'power3.out'
        },'<0.5')

        .from(priceRef.current,{
            opacity:0,
            duration:0.8,
            ease:'power3.out'
        },'<0.5')

        const exitTl=gsap.timeline({
            scrollTrigger:{
                trigger:dish.current,
                start:'bottom 60%',
                toggleActions:'play none none reverse'
            }
        })

        exitTl.to(dishImage.current,{
            xPercent:-(10 * direction),
            duration:1.5,
            opacity:0
        })

        .to(dishText.current, {
            xPercent: 20 * direction,
            opacity: 0,
            duration: 1,
            ease: 'power3.inOut'
        },'<')

    })


    return(
        <div ref={dish} className={`w-full h-screen flex py-24 px-16 ${imageSide==='right' ? 'flex-row' : 'flex-row-reverse'}`}>
                    <div ref={dishText} className={`w-[40%] h-full text-text flex flex-col ${imageSide==='right' ? 'text-start pl-32' : 'text-end pr-32'} font-body pt-20`}>
                        <h2 ref={numberRef} className=' text-sm text-text-secondary'>{number}</h2>
                        <h1 ref={nameRef} className=' font-heading text-3xl tracking-wide text-accent mt-4 mb-6'>{name}</h1>
                        <hr ref={hrRef} className={`hr w-[30%] mb-12 ${
                                imageSide === 'right' ? 'self-start' : 'self-end'
                                }`}/>
                        <h3 ref={descriptionRef} className={` max-w-[60%] text-sm mb-28 leading-6 ${
                                imageSide === 'right' ? 'self-start' : 'self-end'
                                }`}>
                                {description} 
                        </h3>
                        <h2 ref={priceRef} className=' text-sm text-accent'>{price}€</h2>
                    </div>
                    <div ref={dishImage} className='w-[60%] h-full overflow-hidden'>
                        <img src={image} alt="" className='w-full h-full object-cover border-1 border-surface'/>
                    </div>
                </div>
    )
}

export default DishCard;