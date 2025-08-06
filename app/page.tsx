'use client';

import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import Footer from './components/footer';

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [buttonDimensions, setButtonDimensions] = useState<{width: number, height: number}[]>([]);
  const buttonRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  const subjects = [
    { 
      name: '英語', 
      href: '/english', 
      color: 'subject-english',
      cardColor: 'subject-card-english',
      description: '英語の基礎から応用まで学習できます',
      colorCode: '#c3443b'
    },
    { 
      name: '数学', 
      href: '/math', 
      color: 'subject-math',
      cardColor: 'subject-card-math',
      description: '数学の問題演習と解説を提供します',
      colorCode: '#0080b8'
    },
    { 
      name: '国語', 
      href: '/japanese', 
      color: 'subject-japanese',
      cardColor: 'subject-card-japanese',
      description: '読解力と表現力を養います',
      colorCode: '#003c92'
    },
    { 
      name: '理科', 
      href: '/science', 
      color: 'subject-physics',
      cardColor: 'subject-card-science',
      description: '物理・化学・生物を総合的に学習',
      colorCode: '#56a533'
    },
    { 
      name: '社会', 
      href: '/social', 
      color: 'subject-history-jp',
      cardColor: 'subject-card-social',
      description: '歴史・地理・公民を体系的に理解',
      colorCode: '#eeb537'
    },
  ];

  // SVGパスを生成する関数
  const generateSVGPaths = (width: number, height: number) => {
    // アスペクト比を計算（横長なほど値が大きい）
    const aspectRatio = width / height;
    const isMobile = width < 150; // おおよそのモバイルボタンの幅
    
    // 横長のボタンの場合、直線を内側に寄せる（より長く見せる）
    const lineAdjustment = aspectRatio > 4 ? 5 : 0; // アスペクト比が4以上なら調整
    
    // モバイルとPCで微調整
    const semicircleX = 17.5;
    const semicircleRadiusX = 12.5;
    const lineStart = 15 - lineAdjustment; // 横長の場合、より内側から開始
    const lineEnd = 85 + lineAdjustment; // 横長の場合、より外側まで延長
    
    return {
      leftSemicircle: `M ${semicircleX} 0 A ${semicircleRadiusX} 50 0 0 0 ${semicircleX} 100`,
      rightSemicircle: `M ${100 - semicircleX} 100 A ${semicircleRadiusX} 50 0 0 0 ${100 - semicircleX} 0`,
      topLine: { x1: lineEnd, y1: 0, x2: lineStart, y2: 0 },
      bottomLine: { x1: lineStart, y1: 100, x2: lineEnd, y2: 100 }
    };
  };

  // ボタンのサイズを測定
  useEffect(() => {
    const measureButtons = () => {
      const dimensions = buttonRefs.current.map(ref => {
        if (ref) {
          const rect = ref.getBoundingClientRect();
          return { width: rect.width, height: rect.height };
        }
        return { width: 200, height: 40 }; // デフォルト値
      });
      setButtonDimensions(dimensions);
    };

    measureButtons();
    window.addEventListener('resize', measureButtons);
    
    // 初回測定のタイミングを遅らせる
    const timer = setTimeout(measureButtons, 100);
    
    return () => {
      window.removeEventListener('resize', measureButtons);
      clearTimeout(timer);
    };
  }, []);

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
                    ref={(el) => { buttonRefs.current[index] = el; }}
                    href={subject.href}
                    className={`inline-flex items-center ${subject.color} px-[6vw] py-[2vw] sm:py-[1.5vw] rounded-full text-secondary font-medium transition-all duration-300 hover:opacity-80 relative view-more-btn`}
                    style={{ fontSize: 'clamp(0.875rem, 2vw, 1rem)', minWidth: '200px' }}
                    data-color={subject.color}
                  >
                    {buttonDimensions[index] && (
                      <svg 
                        className="absolute inset-0 pointer-events-none" 
                        style={{ width: 'calc(100% + 2.8vw)', height: 'calc(100% + 0.8vw)', left: '-1.4vw', top: '-0.4vw' }}
                        viewBox="0 0 100 100"
                        preserveAspectRatio="none"
                      >
                        {(() => {
                          const paths = generateSVGPaths(buttonDimensions[index].width, buttonDimensions[index].height);
                          return (
                            <>
                              {/* Left semicircle */}
                              <path 
                                d={paths.leftSemicircle}
                                fill="none" 
                                stroke={subject.colorCode} 
                                strokeWidth="0.4" 
                                strokeDasharray="4.8 1.6"
                                className="view-more-border"
                                vectorEffect="non-scaling-stroke"
                              />
                              {/* Right semicircle */}
                              <path 
                                d={paths.rightSemicircle}
                                fill="none" 
                                stroke={subject.colorCode} 
                                strokeWidth="0.4" 
                                strokeDasharray="4.8 1.6"
                                className="view-more-border"
                                vectorEffect="non-scaling-stroke"
                              />
                              {/* Top line */}
                              <line 
                                x1={paths.topLine.x1}
                                y1={paths.topLine.y1}
                                x2={paths.topLine.x2}
                                y2={paths.topLine.y2}
                                stroke={subject.colorCode} 
                                strokeWidth="0.6" 
                                strokeDasharray="4.8 1.6"
                                className="view-more-border"
                                vectorEffect="non-scaling-stroke"
                              />
                              {/* Bottom line */}
                              <line 
                                x1={paths.bottomLine.x1}
                                y1={paths.bottomLine.y1}
                                x2={paths.bottomLine.x2}
                                y2={paths.bottomLine.y2}
                                stroke={subject.colorCode} 
                                strokeWidth="0.6" 
                                strokeDasharray="4.8 1.6"
                                className="view-more-border"
                                vectorEffect="non-scaling-stroke"
                              />
                            </>
                          );
                        })()}
                      </svg>
                    )}
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