'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const subjectsRef = useRef<HTMLDivElement>(null);

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
    if (!containerRef.current) return;

    // Clean up previous ScrollTriggers
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());

    const cards = gsap.utils.toArray<HTMLElement>('.subject-card-container');
    
    cards.forEach((card, index) => {
      const isLast = index === cards.length - 1;
      
      ScrollTrigger.create({
        trigger: card,
        start: 'top top',
        end: isLast ? 'bottom top' : '+=110vh',
        pin: true,
        pinSpacing: false,
      });

      if (!isLast) {
        gsap.set(cards[index + 1], {
          yPercent: 100
        });

        ScrollTrigger.create({
          trigger: card,
          start: 'top top+=80vh',
          end: 'top top+=100vh',
          onUpdate: (self) => {
            gsap.set(cards[index + 1], {
              yPercent: 100 - (self.progress * 100)
            });
          }
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const scrollToSubjects = () => {
    subjectsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div ref={containerRef} className="bg-gradient-main">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container-wrapper">
          <h1 className="font-bold text-secondary mb-[2vw]" style={{ fontSize: 'clamp(2.5rem, 8vw, 4rem)' }}>
            学習プラットフォーム
          </h1>
          <p className="text-secondary mb-[4vw]" style={{ fontSize: 'clamp(1.125rem, 3vw, 1.5rem)' }}>
            あなたの学習を全力でサポート
          </p>
          <div className="flex flex-col sm:flex-row gap-[2vw] justify-center items-center">
            <button 
              onClick={scrollToSubjects}
              className="btn-primary font-medium"
            >
              科目を選ぶ
            </button>
            <Link 
              href="/pdf-viewer"
              className="btn-secondary font-medium"
            >
              PDF閲覧
            </Link>
          </div>
          <div className="mt-[8vw] animate-bounce">
            <p className="text-secondary">↓</p>
          </div>
        </div>
      </section>

      {/* Subjects Section */}
      <div ref={subjectsRef} className="relative" style={{ height: `${subjects.length * 110 + 20}vh` }}>
        {subjects.map((subject, index) => (
          <div
            key={subject.href}
            className="subject-card-container absolute top-0 left-0 w-full"
            style={{ 
              top: `${index * 110}vh`,
              height: '100vh',
              zIndex: subjects.length - index
            }}
          >
            <div className="h-full flex items-center justify-center">
              <div className="container-wrapper w-full">
                <div className={`subject-card ${subject.cardColor} w-full sm:w-full md:max-w-[960px] md:mx-auto`}>
                  <div className="text-center">
                    <div className={`${subject.color} inline-block px-[5vw] py-[3vw] rounded-[1vw] mb-[4vw]`}>
                      <h2 className="font-bold text-secondary" style={{ fontSize: 'clamp(2rem, 6vw, 3rem)' }}>{subject.name}</h2>
                    </div>
                    <p className="text-primary mb-[4vw]" style={{ fontSize: 'clamp(1rem, 2.5vw, 1.25rem)' }}>{subject.description}</p>
                    <Link 
                      href={subject.href}
                      className="btn-primary inline-block"
                    >
                      {subject.name}を学習する
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer className="relative min-h-screen flex flex-col justify-center" style={{ backgroundColor: 'var(--gray)' }}>
        <div className="container-wrapper py-[5vw]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[5vw]">
            <div>
              <h3 className="font-bold mb-[2vw] text-secondary" style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}>ページ一覧</h3>
              <ul className="space-y-[1vw]">
                <li><Link href="/" className="hover:underline text-secondary" style={{ fontSize: 'clamp(1rem, 2vw, 1.125rem)' }}>ホーム</Link></li>
                {subjects.map((subject) => (
                  <li key={subject.href}>
                    <Link href={subject.href} className="hover:underline text-secondary" style={{ fontSize: 'clamp(1rem, 2vw, 1.125rem)' }}>{subject.name}</Link>
                  </li>
                ))}
                <li><Link href="/pdf-viewer" className="hover:underline text-secondary" style={{ fontSize: 'clamp(1rem, 2vw, 1.125rem)' }}>PDF閲覧</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-[2vw] text-secondary" style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}>その他</h3>
              <ul className="space-y-[1vw]">
                <li><Link href="/policy" className="hover:underline text-secondary" style={{ fontSize: 'clamp(1rem, 2vw, 1.125rem)' }}>サイトポリシー</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-[5vw] pt-[5vw] border-t border-gray-light text-center">
            <p className="text-secondary" style={{ fontSize: 'clamp(0.875rem, 2vw, 1rem)' }}>&copy; 2024 学習プラットフォーム</p>
          </div>
        </div>
      </footer>
    </div>
  );
}