import { useRef, useState } from 'react'
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from "@gsap/react";
import Hero from './components/Hero';
import SignatureDishes from './components/SignatureDishes'
import Navbar from './components/Navbar';

gsap.registerPlugin(ScrollTrigger);

function App() {

  const heroRef=useRef(null);
  const signatureRef = useRef(null);
  const heroVideoRef=useRef(null);
  const heroTitleRef = useRef(null);
  const heroSubtitleRef = useRef(null);
  const heroButtonsRef = useRef(null);
  const heroOverlayRef = useRef(null);

  useGSAP(()=>{
    const tl = gsap.timeline({
      scrollTrigger:{
        trigger:heroRef.current,
        start:'top top',
        end:'+=100%',
        pin:true,
        scrub:true,
        pinSpacing:false
    }
    })

    tl.to(heroVideoRef.current, {
      scale:1.1,
      clipPath: "polygon(50% 0%, 80% 10%, 100% 35%, 100% 70%, 80% 90%, 50% 100%, 20% 90%, 0% 70%, 0% 35%, 20% 10%)", 
      duration:0.2
    },'<')

    .to(heroTitleRef.current,{
      y:-100,
      scale:0.9,
      color: "#F5F5F5"
    }, '<')

    .to(heroSubtitleRef.current, {
      opacity:0
    },'<')

    .to(heroButtonsRef.current,{
      opacity:0,
      y:30
    }, '<')

    .to(heroOverlayRef.current,{
      opacity:0.5
    }, '<')


  }, {dependencies:[]})


  return (
    <>
      <Navbar/>
      <Hero heroRef={heroRef} 
        heroVideoRef={heroVideoRef} 
        heroTitleRef={heroTitleRef}
        heroSubtitleRef={heroSubtitleRef}
        heroButtonsRef={heroButtonsRef}
        heroOverlayRef={heroOverlayRef}/>
      <SignatureDishes signatureRef={signatureRef} />
    </>
  )
}

export default App
