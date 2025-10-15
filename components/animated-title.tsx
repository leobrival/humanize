"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface AnimatedTitleProps {
  children: string;
  className?: string;
}

export function AnimatedTitle({ children, className = "" }: AnimatedTitleProps) {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!titleRef.current) return;

    // Split text into individual characters
    const text = children;
    const chars = text.split("");

    // Clear and rebuild with spans
    titleRef.current.innerHTML = "";
    chars.forEach((char) => {
      const span = document.createElement("span");
      span.textContent = char;
      span.style.display = "inline-block";
      span.style.opacity = "0";
      titleRef.current?.appendChild(span);
    });

    // Get all character spans
    const charElements = titleRef.current.querySelectorAll("span");

    // GSAP Animation
    gsap.fromTo(
      charElements,
      {
        opacity: 0,
        y: 50,
        rotationX: -90,
        transformOrigin: "50% 50%",
      },
      {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration: 1,
        ease: "back.out(1.7)",
        stagger: {
          amount: 0.8,
          from: "start",
        },
      }
    );
  }, [children]);

  return (
    <h2
      ref={titleRef}
      className={className}
      style={{ perspective: "1000px" }}
    >
      {children}
    </h2>
  );
}
