'use client';

import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import Footer from './components/footer';

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [buttonDimensions, setButtonDimensions] = useState<{width: number, height: number}[]>([]);
  const buttonRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  // 色を白と混ぜる関数
  
  const mixWithWhite = (color: string, whiteRatio: number) => {
    // HEXカラーをRGBに変換
    const hex = color.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    
    // 白（255, 255, 255）と混ぜる
    const mixedR = Math.round(r + (255 - r) * whiteRatio);
    const mixedG = Math.round(g + (255 - g) * whiteRatio);
    const mixedB = Math.round(b + (255 - b) * whiteRatio);
    
    // RGBをHEXに戻す
    const toHex = (n: number) => n.toString(16).padStart(2, '0');
    return `#${toHex(mixedR)}${toHex(mixedG)}${toHex(mixedB)}`;
  };

  const subjects = [
    { 
      name: '英語', 
      href: '/english', 
      color: 'subject-english',
      cardColor: 'subject-card-english',
      description: '英語の基礎から応用まで学習できます',
      colorCode: '#c3443b',
    },
    { 
      name: '数学', 
      href: '/math', 
      color: 'subject-math',
      cardColor: 'subject-card-math',
      description: '数学の問題演習と解説を提供します',
      colorCode: '#0080b8',
    },
    { 
      name: '国語', 
      href: '/japanese', 
      color: 'subject-japanese',
      cardColor: 'subject-card-japanese',
      description: '読解力と表現力を養います',
      colorCode: '#003c92',
    },
    { 
      name: '理科', 
      href: '/science', 
      color: 'subject-physics',
      cardColor: 'subject-card-science',
      description: '物理・化学・生物を総合的に学習',
      colorCode: '#56a533',
    },
    { 
      name: '社会', 
      href: '/social', 
      color: 'subject-history-jp',
      cardColor: 'subject-card-social',
      description: '歴史・地理・公民を体系的に理解',
      colorCode: '#eeb537',
    },
  ];

  // SVGパスを生成する関数（数学的定義に基づく）
  const generateSVGPaths = (width: number, height: number) => {
    // ボタンの寸法（実際のピクセル値）
    const w = width;
    const h = height;
    const r = h / 2; // ボタンのradius
    
    // ボタンと点線の距離（ピクセル）
    const d = h * 0.10; // 高さの10%
    
    // SVGの全体サイズ
    const svgWidth = w + 2 * (r + d);
    const svgHeight = h + 2 * d;
    
    // SVGの中心を(0,0)として計算し、その後viewBoxに合わせて変換
    // viewBoxは0-100なので、変換係数を計算
    const scaleX = 100 / svgWidth;
    const scaleY = 100 / svgHeight;
    const offsetX = 50; // viewBoxの中心
    const offsetY = 50;
    
    // 実座標からviewBox座標への変換関数
    const toViewBoxX = (x: number) => x * scaleX + offsetX;
    const toViewBoxY = (y: number) => y * scaleY + offsetY;
    
    // 半円の中心座標
    const leftSemicircleX = -(w - h) / 2;
    const rightSemicircleX = (w - h) / 2;
    const semicircleRadius = r + d;
    
    // 直線のy座標と長さ
    const lineY = d + r;
    const lineLength = w - h;
    const lineStartX = leftSemicircleX;
    const lineEndX = rightSemicircleX;
    
    // viewBox座標に変換
    const viewBoxRadius = semicircleRadius * scaleX; // 楕円の場合は異なるスケールが必要
    const viewBoxRadiusY = semicircleRadius * scaleY;
    
    return {
      leftSemicircle: `M ${toViewBoxX(leftSemicircleX)} ${toViewBoxY(-lineY)} A ${viewBoxRadius} ${viewBoxRadiusY} 0 0 0 ${toViewBoxX(leftSemicircleX)} ${toViewBoxY(lineY)}`,
      rightSemicircle: `M ${toViewBoxX(rightSemicircleX)} ${toViewBoxY(lineY)} A ${viewBoxRadius} ${viewBoxRadiusY} 0 0 0 ${toViewBoxX(rightSemicircleX)} ${toViewBoxY(-lineY)}`,
      topLine: { 
        x1: toViewBoxX(lineEndX), 
        y1: toViewBoxY(-lineY), 
        x2: toViewBoxX(lineStartX), 
        y2: toViewBoxY(-lineY) 
      },
      bottomLine: { 
        x1: toViewBoxX(lineStartX), 
        y1: toViewBoxY(lineY), 
        x2: toViewBoxX(lineEndX), 
        y2: toViewBoxY(lineY) 
      }
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
                    className={`inline-flex items-center px-[6vw] py-[2vw] sm:py-[1.5vw] rounded-full font-medium transition-all duration-300 relative view-more-btn group`}
                    style={{ 
                      fontSize: 'clamp(0.875rem, 2vw, 1.125rem)', 
                      minWidth: '200px',
                      backgroundColor: mixWithWhite(subject.colorCode, 0.85),
                      border: `2px solid ${mixWithWhite(subject.colorCode, 0.3)}`,
                      color: subject.colorCode
                    }}
                    data-color={subject.color}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = subject.colorCode;
                      e.currentTarget.style.color = mixWithWhite(subject.colorCode, 0.85);
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = mixWithWhite(subject.colorCode, 0.85);
                      e.currentTarget.style.color = subject.colorCode;
                    }}
                  >
                    {buttonDimensions[index] && (
                      <svg 
                        className="absolute inset-0 pointer-events-none" 
                        style={{ 
                          width: `calc(100% + ${buttonDimensions[index].height * 1.2}px)`,
                          height: `calc(100% + ${buttonDimensions[index].height * 0.2}px)`,
                          left: `-${buttonDimensions[index].height * 0.6}px`,
                          top: `-${buttonDimensions[index].height * 0.1}px`
                        }}
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
                                strokeWidth="1.0" 
                                strokeDasharray="10 2"
                                className="view-more-border"
                                vectorEffect="non-scaling-stroke"
                              />
                              {/* Right semicircle */}
                              <path 
                                d={paths.rightSemicircle}
                                fill="none" 
                                stroke={subject.colorCode} 
                                strokeWidth="1.0" 
                                strokeDasharray="10 2"
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
                                strokeWidth="2.4" 
                                strokeDasharray="10 2"
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
                                strokeWidth="2.4" 
                                strokeDasharray="10 2"
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