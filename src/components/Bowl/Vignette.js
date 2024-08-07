import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './VignetteEffect.css';

const VignetteEffect = ({ targetRef, isActive }) => {
  const overlayRef = useRef(null);
  const exclusionRef = useRef(null);

  useEffect(() => {
    if (isActive && targetRef.current) {
      const targetRect = targetRef.current.getBoundingClientRect();
      console.log("V: ", targetRect)
      const circleDiameter = Math.max(targetRect.width, targetRect.height);
      const circleX = targetRect.left + targetRect.width / 2;
      const circleY = targetRect.top + targetRect.height / 2;
      
      console.log("V: ", circleDiameter, circleX, circleY)
      
      gsap.to(overlayRef.current, { opacity: 1, duration: 0.5 });
      gsap.to(exclusionRef.current, {
        width: circleDiameter,
        height: circleDiameter,
        left: circleX - circleDiameter / 2,
        top: circleY - circleDiameter / 2,
        duration: 0.25,
      });
    } else {
      gsap.to(overlayRef.current, { opacity: 0, duration: 0.25 });
    }
  }, [isActive, targetRef]);

  return (
    <div className="vignette-overlay" ref={overlayRef}>
      <div className="vignette-exclusion" ref={exclusionRef}></div>
    </div>
  );
};

export default VignetteEffect;
