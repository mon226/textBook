'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';

export default function Home() {
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
    const handleScroll = () => {
      const sections = document.querySelectorAll('.subject-section');
      
      sections.forEach((section, index) => {
        const card = section.querySelector('.subject-card') as HTMLElement;
        if (!card) return;
        
        const sectionTop = (section as HTMLElement).offsetTop;
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;
        
        // Calculate progress of scroll through this section
        const scrollProgress = (scrollPosition - sectionTop + windowHeight) / windowHeight;
        
        if (scrollProgress > 0 && scrollProgress <= 1) {
          // Card is entering view
          card.style.transform = `translateY(${(1 - scrollProgress) * 100}%)`;
          card.style.opacity = String(scrollProgress);
        } else if (scrollProgress > 1) {
          // Card is fully visible
          card.style.transform = 'translateY(0)';
          card.style.opacity = '1';
        } else {
          // Card is below viewport
          card.style.transform = 'translateY(100%)';
          card.style.opacity = '0';
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSubjects = () => {
    subjectsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Hero Section */}
      <section className="hero-section bg-gradient-main">
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
      <div ref={subjectsRef}>
        {subjects.map((subject, index) => (
          <section key={subject.href} className="subject-section">
            <div 
              className="subject-card-wrapper"
              style={{
                zIndex: subjects.length - index,
              }}
            >
              <div className="container-wrapper w-full">
                <div 
                  className={`subject-card ${subject.cardColor}`}
                  style={{
                    transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.8s ease-out',
                  }}
                >
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
          </section>
        ))}
      </div>

      {/* Footer */}
      <footer className="relative" style={{ zIndex: subjects.length + 1 }}>
        <div className="container-wrapper">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[3vw]">
            <div>
              <h3 className="font-bold mb-[1vw]">ページ一覧</h3>
              <ul className="space-y-[0.5vw]">
                <li><Link href="/" className="hover:underline">ホーム</Link></li>
                {subjects.map((subject) => (
                  <li key={subject.href}>
                    <Link href={subject.href} className="hover:underline">{subject.name}</Link>
                  </li>
                ))}
                <li><Link href="/pdf-viewer" className="hover:underline">PDF閲覧</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-[1vw]">その他</h3>
              <ul className="space-y-[0.5vw]">
                <li><Link href="/policy" className="hover:underline">サイトポリシー</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-[3vw] pt-[3vw] border-t border-gray-light text-center">
            <p>&copy; 2024 学習プラットフォーム</p>
          </div>
        </div>
      </footer>
    </>
  );
}