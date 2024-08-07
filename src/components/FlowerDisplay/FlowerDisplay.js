import React, { useEffect, useState, forwardRef } from 'react';
import { ReactSVG } from 'react-svg';
import gsap from 'gsap';

import flower from '../../assets/Flower.svg';
import "./FlowerDisplay.css";
import { Box } from '@mui/system';
import { useAnimationContext } from '../../providers/AnimationProvider';

const FlowerDisplay = forwardRef((props, ref) => {
  const [scale, setScale] = useState(1);
  const { isFlowerCenter, triggerDrawAnimation, isDrawAnimationActive, randomWord, audioLink, ResetStateButton } = useAnimationContext();

  useEffect(() => {
    console.log(isFlowerCenter)
    if (isFlowerCenter) {
      moveFlowerCenterAnimation(false); // Move to center
    } else {
      moveFlowerCenterAnimation(true); // Move back to original position
    }
  }, [isFlowerCenter]);

  const moveFlowerCenterAnimation = (reverse = false) => {
    if(!reverse) {
      triggerDrawAnimation()
    }
    else {
      gsap.killTweensOf("#flower-wrapper")


      removeChit()
    }
  };

  const removeChit = () => {
    const chit = document.getElementById("chit")
    if(chit) {
      chit.remove()
    }

    const petals = document.querySelectorAll('#flower > g');

    petals.forEach((petal) => {
      gsap.killTweensOf(petal)
    })

    gsap.killTweensOf(chit)
    
  }
  // };

  // useEffect(() => {
  //   if (isDrawAnimationActive) {
  //     drawAnimations();
  //   }
  // }, [isDrawAnimationActive]);

  const drawAnimations = () => {
    const petals = document.querySelectorAll('#flower > g');
    const petalsArray = Array.from(petals);

    const index = petalsArray.findIndex(element => element.id === "center-circle");
    let extractedElement = null;

    if (index !== -1) {
      extractedElement = petalsArray.splice(index, 1)[0];
    }

    const svg = document.getElementById('flower');
    const viewBox = svg.getAttribute('viewBox').split(' ');
    const centerX = viewBox[2] / 2;
    const centerY = viewBox[3] / 2;

    const tl = gsap.timeline({ paused: true });

    petalsArray.forEach((petal, index) => {
      const randomRotation = gsap.utils.random(-360, 360);
      const randomDistance = gsap.utils.random(10, 50);
      const randomAngle = gsap.utils.random(0, 360);

      const translateX = randomDistance * Math.cos((randomAngle * Math.PI) / 180);
      const translateY = randomDistance * Math.sin((randomAngle * Math.PI) / 180);

      tl.to(petal, {
        duration: 4,
        delay: index / 10,
        opacity: 0,
        x: translateX,
        y: translateY,
        rotation: randomRotation,
        transformOrigin: `${centerX}px ${centerY}px`,
        ease: 'power2.out',
      }, 0);
    });

    const bbox = extractedElement.getBBox();
    const matrix = extractedElement.getScreenCTM();
    const circleSize = Math.max(bbox.width, bbox.height) * 0.5;

    const absoluteX = matrix.a * bbox.x + matrix.c * bbox.y + matrix.e;
    const absoluteY = matrix.b * bbox.x + matrix.d * bbox.y + matrix.f;

    const container = document.getElementById('flower-wrapper');
    const containerRect = container.getBoundingClientRect();
    const adjustedX = absoluteX - containerRect.left;
    const adjustedY = absoluteY - containerRect.top;

    console.log(adjustedX, adjustedY, absoluteX, absoluteY, bbox, circleSize);

    const normalCircle = document.createElement('div');
  normalCircle.id = "chit";
  normalCircle.style.width = `${circleSize}px`;
  normalCircle.style.height = `${circleSize}px`;
  normalCircle.style.borderRadius = '50%';
  normalCircle.style.background = 'lightyellow';
  normalCircle.style.position = 'absolute';
  normalCircle.style.left = `${adjustedX}px`;
  normalCircle.style.top = `${adjustedY}px`;
  normalCircle.style.opacity = '0';
  normalCircle.style.display = 'flex';
  normalCircle.style.flexDirection = 'column';  // Stack text and audio vertically
  normalCircle.style.alignItems = 'center';
  normalCircle.style.justifyContent = 'center';
  normalCircle.style.padding = '10px';
  normalCircle.style.fontSize = '10px'; // Smaller font size before scaling
  normalCircle.style.color = 'black';

  // Create and style the text element
  const textElement = document.createElement('div');
  textElement.innerText = randomWord;
  textElement.style.textAlign = 'center';
  textElement.style.width = '100%';  // Full width to center text correctly

  // Append audio player and text to the normalCircle
  normalCircle.appendChild(textElement);
  
  container.appendChild(normalCircle);

    tl.to(extractedElement, {
      duration: 2,
      rotation: 540,
      scale: 8,
      transformOrigin: 'center center',
      ease: 'power2.inOut',
    }, '-=5')
    .to(extractedElement, {
      duration: 1,
      opacity: 0,
      onComplete: () => {
        extractedElement.style.display = 'none';
      }
    }, '-=4')
    .to(normalCircle, {
      duration: 1,
      opacity: 0.9,
      scale: 8,
      ease: 'power2.outIn',
      onComplete: () => {
        // Create and style the audio element
        // const audioPlayer = document.createElement('audio');
        // audioPlayer.controls = true;
        // audioPlayer.src = `${process.env.PUBLIC_URL}/${audioLink}`;
        // audioPlayer.style.maxWidth = '100%';  // Limit the width of the audio player
        // audioPlayer.style.marginBottom = '5px';  // Space between text and audio
        // normalCircle.appendChild(audioPlayer);
        // audioPlayer.nodeType = "audio/ogg"
        // audioPlayer.play()
      }
    }, '-=4');

    tl.play();
  };



  useEffect(() => {
    console.log("useEffect called");
    if(isDrawAnimationActive) {
      console.log("inside is draw animation Active");
      setTimeout(() => {
        drawAnimations()
      }, 100);
    }
    else {
      ResetStateButton();
    }
  }, [isDrawAnimationActive]);

  return (
    <Box
      ref={ref}
      id="flower-wrapper"
      sx={{
        width: 1080 * scale,
        height: 1080 * scale,
        position: 'absolute',
        top: '35%',
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
