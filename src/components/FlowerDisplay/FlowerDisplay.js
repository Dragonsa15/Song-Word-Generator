import React, { useEffect, useState, forwardRef } from 'react';
import { ReactSVG } from 'react-svg';
import gsap from 'gsap';

import flower from '../../assets/Flower.svg';
import "./FlowerDisplay.css";
import { Box } from '@mui/system';
import { useAnimationContext } from '../../providers/AnimationProvider';

const FlowerDisplay = forwardRef((props, ref) => {
  const [scale, setScale] = useState(0.5);
  const { isFlowerCenter, triggerDrawAnimation, isDrawAnimationActive } = useAnimationContext();

  useEffect(() => {
    console.log(isFlowerCenter)
    if (isFlowerCenter) {
      moveFlowerCenterAnimation(false); // Move to center
    } else {
      moveFlowerCenterAnimation(true); // Move back to original position
    }
  }, [isFlowerCenter]);

  const moveFlowerCenterAnimation = (reverse = false) => {
    const targetScale = reverse ? 0.5 : 1; // Original scale: 0.5, Centered scale: 1.5
    const targetTop = reverse ? '25%' : '25%';
    const targetLeft = reverse ? '50%' : '50%'; // Center horizontally
    console.log(targetScale,scale)
    gsap.to('#flower-wrapper', {
      top: targetTop,
      left: targetLeft,
      scale: targetScale/scale,
      transformOrigin: 'center center',
      duration: 1.5,
      ease: 'power2.inOut',
      onComplete: () => {
        setScale(targetScale)
        if(!reverse) {
          triggerDrawAnimation()
        }
      }
    });

  };

  useEffect(() => {
    if (isDrawAnimationActive) {
      drawAnimations();
    }
  }, [isDrawAnimationActive]);

  const drawAnimations = () => {
    const petals = document.querySelectorAll('#flower > g');
    const petalsArray = Array.from(petals);
  
    if (petalsArray.length === 0) {
      console.error("No petals found in the SVG.");
      return;
    }
  
    console.log("Petals found:", petalsArray);
  
    petalsArray.forEach((petal, index) => {
      const randomRotation = gsap.utils.random(-360, 360);
      const randomDistance = gsap.utils.random(100, 500);
      const randomAngle = gsap.utils.random(0, 360);
  
      const translateX = randomDistance * Math.cos((randomAngle * Math.PI) / 180);
      const translateY = randomDistance * Math.sin((randomAngle * Math.PI) / 180);
  
      console.log(`Animating petal ${index}`, {
        petal,
        translateX,
        translateY,
        randomRotation
      });
  
      gsap.to(petal, {
        duration: 2,
        opacity: 0.5, // Simplified to just change opacity
        x: translateX,
        y: translateY,
        rotation: randomRotation,
        transformOrigin: 'center center',
        ease: 'power2.out',
        onStart: () => console.log(`Animation started for petal ${index}`),
        onComplete: () => console.log(`Animation completed for petal ${index}`),
      }, 0);
    });
  
    
    // console.log(tl)

    // if (extractedElement) {
    //   const bbox = extractedElement.getBBox();
    //   const matrix = extractedElement.getScreenCTM();
    //   const circleSize = Math.max(bbox.width, bbox.height) * scale;
  
    //   const absoluteX = matrix.a * bbox.x + matrix.c * bbox.y + matrix.e;
    //   const absoluteY = matrix.b * bbox.x + matrix.d * bbox.y + matrix.f;
  
    //   const container = document.getElementById('flower-wrapper');
    //   const containerRect = container.getBoundingClientRect();
    //   const adjustedX = absoluteX - containerRect.left;
    //   const adjustedY = absoluteY - containerRect.top;
  
    //   const normalCircle = document.createElement('div');
    //   normalCircle.style.width = `${circleSize}px`;
    //   normalCircle.style.height = `${circleSize}px`;
    //   normalCircle.style.borderRadius = '50%';
    //   normalCircle.style.background = 'lightyellow';
    //   normalCircle.style.position = 'absolute';
    //   normalCircle.style.left = `${adjustedX - circleSize / 2}px`; // Center the circle
    //   normalCircle.style.top = `${adjustedY - circleSize / 2}px`; // Center the circle
    //   normalCircle.style.opacity = '0';
  
    //   container.appendChild(normalCircle);
  
    //   tl.to(extractedElement, {
    //     duration: 2,
    //     rotation: 540,
    //     scale: 3,
    //     transformOrigin: 'center center',
    //     ease: 'power2.inOut',
    //   }, '-=3.5')
    //   .to(extractedElement, {
    //     duration: 1,
    //     opacity: 0,
    //     onComplete: () => {
    //       extractedElement.style.display = 'none';
    //     }
    //   }, '-=2.5')
    //   .to(normalCircle, {
    //     duration: 1,
    //     opacity: 0.6,
    //     scale: 3,
    //     ease: 'power2.outIn',
    //   }, '-=2.7');
  
    //   tl.play();
    // }
  };
  


  useEffect(() => {
    console.log("useEffect called");
    setTimeout(() => {
      // initAnimations();
    }, 100);
  }, []);

  return (
    <Box
      ref={ref}
      id="flower-wrapper"
      sx={{
        width: 1080 * scale,
        height: 1080 * scale,
        position: 'absolute',
        top: '25%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'transparent',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <ReactSVG 
        src={flower}
        beforeInjection={(svg) => {
          svg.setAttribute('id', 'flower');
        }}
      />
    </Box>
  );
});

export default FlowerDisplay;
