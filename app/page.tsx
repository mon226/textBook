'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import Footer from './components/footer';

export default function Home() {
  const [scrollY, setScrollY] = useState(0);

  const subjects = [
    { 
      name: '英語', 
      href: '/english', 
      color: 'subject-english',
      cardColor: 'subject-card-english',
      description: '英語の基礎から応用まで学習できます'
    },
    { 
      name: '数学', 
      href: '/math', 
      color: 'subject-math',
      cardColor: 'subject-card-math',
      description: '数学の問題演習と解説を提供します'
    },
    { 
      name: '国語', 
      href: '/japanese', 
      color: 'subject-japanese',
      cardColor: 'subject-card-japanese',
      description: '読解力と表現力を養います'
    },
    { 
      name: '理科', 
      href: '/science', 
      color: 'subject-physics',
      cardColor: 'subject-card-science',
      description: '物理・化学・生物を総合的に学習'
    },
    { 
      name: '社会', 
      href: '/social', 
      color: 'subject-history-jp',
      cardColor: 'subject-card-social',
      description: '歴史・地理・公民を体系的に理解'
    },
  ];

  useEffect(() => {
    let animationId: number;
    
    const handleScroll = () => {
      animationId = requestAnimationFrame(() => {
        setScrollY(window.scrollY);
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);


  // Calculate card positions based on scroll
  const getCardTransform = (index: number) => {
    if (typeof window === 'undefined') return 'translateY(100%)';
    
    const cardStart = window.innerHeight + (index * 110 * window.innerHeight / 100);
    const animationStart = cardStart - (50 * window.innerHeight / 100); // Changed to 50vh for much slower animation
    
    if (scrollY < animationStart) {
      // Card is below viewport
      return 'translateY(100%)';
    } else if (scrollY >= animationStart && scrollY < cardStart) {
      // Card is animating in
      const progress = (scrollY - animationStart) / (50 * window.innerHeight / 100);
      // Ease-out curve for smoother animation
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      return `translateY(${100 - (easedProgress * 100)}%)`;
    } else {
      // Card is fully visible
      return 'translateY(0)';
    }
  };

  // Calculate total height needed (use 100vh as fallback for SSR)
  const [windowHeight, setWindowHeight] = useState(0);
  
  useEffect(() => {
    setWindowHeight(window.innerHeight);
  }, []);
  
  const totalHeight = windowHeight ? windowHeight + (subjects.length * 110 * windowHeight / 100) + windowHeight : 700 * (subjects.length + 2);

  return (
    <>
      {/* Spacer div to create scrollable area */}
      <div style={{ height: `${totalHeight}px` }} className="bg-gradient-main">
        {/* Hero Section */}
        <section className="hero-section absolute top-0 left-0 w-full z-10">
          <div className="container-wrapper">
            <h1 className="font-bold text-secondary mb-[2vw]" style={{ fontSize: 'clamp(2.5rem, 8vw, 4rem)' }}>
              二子玉川参考書紹介 &apos;25
            </h1>
            <p className="text-secondary mb-[4vw]" style={{ fontSize: 'clamp(1.125rem, 3vw, 1.5rem)' }}>
              あなたの学習を全力でサポート
            </p>
            <div className="flex flex-col sm:flex-row gap-[2vw] justify-center items-center">
              <Link 
                href="/pdf-viewer"
                className="btn-secondary font-medium"
              >
                PDF閲覧
              </Link>
            </div>
            <div className="mt-[8vw]">
              <p className="text-secondary animate-bounce">↓</p>
              <p className="text-secondary mt-[1vw]" style={{ fontSize: 'clamp(0.875rem, 2vw, 1rem)' }}>scroll</p>
            </div>
          </div>
        </section>

        {/* Subjects Cards - Fixed position */}
        {subjects.map((subject, index) => (
          <div
            key={subject.href}
            className="fixed top-0 left-0 w-full h-screen flex items-center justify-center"
            style={{ 
              transform: getCardTransform(index),
              zIndex: 20 + index,
              transition: 'none' // Disable CSS transitions for smoother animation
            }}
          >
            <div className="container-wrapper w-full">
              <div className={`subject-card ${subject.cardColor} w-full sm:w-full md:max-w-[960px] md:mx-auto`}>
                <div className="text-center">
                  <div className={`${subject.color} inline-block px-[5vw] py-[3vw] rounded-[1vw] mb-[4vw]`}>
                    <h2 className="font-bold text-secondary" style={{ fontSize: 'clamp(2rem, 6vw, 3rem)' }}>{subject.name}</h2>
                  </div>
                  <p className="text-primary mb-[4vw]" style={{ fontSize: 'clamp(1rem, 2.5vw, 1.25rem)' }}>{subject.description}</p>
                  <Link 
                    href={subject.href}
                    className={`inline-flex items-center ${subject.color} px-[6vw] py-[2vw] sm:py-[1.5vw] rounded-full text-secondary font-medium transition-all duration-300 hover:opacity-80 relative`}
                    style={{ fontSize: 'clamp(0.875rem, 2vw, 1rem)', minWidth: '200px' }}
                  >
                    <span>view more!</span>
                    <span className="absolute right-[2vw]">→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Footer />
    </>
  );
}