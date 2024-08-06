import React, { useEffect } from 'react';
import { ReactSVG } from 'react-svg';
import gsap from 'gsap';
import flower from '../../assets/Flower.svg';
import "./FlowerDisplay.css"

const FlowerDisplay = () => {

  const initAnimations = () => {
        const petals = document.querySelectorAll('#flower > g');

        // Convert NodeList to Array
        const petalsArray = Array.from(petals);

        // Find the index of the element with the specific ID
        const index = petalsArray.findIndex(element => element.id === "center-circle");

        let extractedElement = null;

        if (index !== -1) {
            // Extract the element and remove it from the array
            extractedElement = petalsArray.splice(index, 1)[0];
        }

        // Now animate the remaining petals only
        const svg = document.getElementById('flower');
        const viewBox = svg.getAttribute('viewBox').split(' ');
        const centerX = viewBox[2] / 2;
        const centerY = viewBox[3] / 2;
        // Create a timeline for sequencing animations
        const tl = gsap.timeline({ paused: true }); // Start paused to control when it runs

        // Animate the remaining petals
        petalsArray.forEach((petal, index) => {
            const randomRotation = gsap.utils.random(-360, 360);
            const randomDistance = gsap.utils.random(50, 200);
            const randomAngle = gsap.utils.random(0, 360);

            const translateX = randomDistance * Math.cos((randomAngle * Math.PI) / 180);
            const translateY = randomDistance * Math.sin((randomAngle * Math.PI) / 180);

            tl.to(petal, {
                duration: 5,
                delay: index/8, // Slightly staggered start for each petal
                opacity: 0,
                x: translateX,
                y: translateY,
                rotation: randomRotation,
                transformOrigin: `${centerX}px ${centerY}px`,
                ease: 'power2.out',
            }, 0); // Start all animations at the same time (0)
        });

        // Get the <g> element inside the SVG and the container
        const container = document.getElementById('flower-wrapper');

        // Calculate the bounding box of the extracted <g> element
        const bbox = extractedElement.getBBox();
        // Get the transformation matrix of the <g> element
        const matrix = extractedElement.getScreenCTM();

        const circleSize = Math.max(bbox.width, bbox.height); // Use the larger dimension

        // Calculate the absolute position of the <g> element on the screen
        // The x and y properties of the matrix represent the top-left corner of the bounding box
        const absoluteX = matrix.a * bbox.x + matrix.c * bbox.y + matrix.e;
        const absoluteY = matrix.b * bbox.x + matrix.d * bbox.y + matrix.f;
        
        // Calculate the absolute position of the circle relative to the SVG's origin
        const circleLeft = absoluteX + bbox.width / 2; // Center of <g> in x
        const circleTop = absoluteY + bbox.height / 2; // Center of <g> in y
        
        console.log(circleLeft, circleTop, absoluteX, absoluteY, bbox)

        // Create a normal circle element to replace the extracted <g>
        const normalCircle = document.createElement('div');
        normalCircle.style.width = `${circleSize}px`;
        normalCircle.style.height = `${circleSize}px`;
        normalCircle.style.borderRadius = '50%';
        normalCircle.style.background = 'lightyellow';
        normalCircle.style.position = 'absolute';
        normalCircle.style.left = `${circleLeft}px`;
        normalCircle.style.top = `${circleTop}px`;
        normalCircle.style.transform = 'translate(-50%, -50%)';
        normalCircle.style.opacity = '0';

        // Append the normal circle to the container
        container.appendChild(normalCircle);

        // GSAP Animation
        tl
        .to(extractedElement, {
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
            opacity: 0.8,
            scale: 3,
            ease: 'power2.outIn',
        }, '-=2.7');

        // Start the timeline
        tl.play();

  };

  useEffect(() => {
    console.log("useEffect called");
    setTimeout(() => {
      initAnimations();
    }, 100); // Short delay to ensure SVG is loaded
  }, []);

  return (
    <div id="flower-wrapper">
        <ReactSVG src={flower} />
    </div>
  );
};

export default FlowerDisplay;
