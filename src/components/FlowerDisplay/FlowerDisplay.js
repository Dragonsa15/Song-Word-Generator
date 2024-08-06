import React, { useEffect, useState } from 'react';
import { ReactSVG } from 'react-svg';
import gsap from 'gsap';
import flower from '../../assets/Flower.svg';
import "./FlowerDisplay.css";
import { Box } from '@mui/system';

const FlowerDisplay = () => {
  const [scale, setScale] = useState(0.5);

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
        duration: 5,
        delay: index / 8,
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
    const circleSize = Math.max(bbox.width, bbox.height) * scale;

    const absoluteX = matrix.a * bbox.x + matrix.c * bbox.y + matrix.e;
    const absoluteY = matrix.b * bbox.x + matrix.d * bbox.y + matrix.f;

    const container = document.getElementById('flower-wrapper');
    const containerRect = container.getBoundingClientRect();
    const adjustedX = absoluteX - containerRect.left;
    const adjustedY = absoluteY - containerRect.top;

    console.log(adjustedX, adjustedY, absoluteX, absoluteY, bbox, circleSize);

    const normalCircle = document.createElement('div');
    normalCircle.style.width = `${circleSize}px`;
    normalCircle.style.height = `${circleSize}px`;
    normalCircle.style.borderRadius = '50%';
    normalCircle.style.background = 'lightyellow';
    normalCircle.style.position = 'absolute';
    normalCircle.style.left = `${adjustedX}px`;
    normalCircle.style.top = `${adjustedY}px`;
    normalCircle.style.opacity = '0';

    container.appendChild(normalCircle);

    tl.to(extractedElement, {
      duration: 2,
      rotation: 540,
      scale: 3,
      transformOrigin: 'center center',
      ease: 'power2.inOut',
    }, '-=3.5')
    .to(extractedElement, {
      duration: 1,
      opacity: 0,
      onComplete: () => {
        extractedElement.style.display = 'none';
      }
    }, '-=2.5')
    .to(normalCircle, {
      duration: 1,
      opacity: 0.6,
      scale: 3,
      ease: 'power2.outIn',
    }, '-=2.7');

    tl.play();
  };

  useEffect(() => {
    console.log("useEffect called");
    setTimeout(() => {
      //initAnimations();
    }, 100);
  }, []);

  return (
    <Box
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
          svg.setAttribute('style', `transform: scale(${scale}); transform-origin: center;`);
        }}
      />
    </Box>
  );
};

export default FlowerDisplay;
