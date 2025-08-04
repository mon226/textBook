'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

export default function Home() {
  const subjectsRef = useRef<HTMLDivElement>(null);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const checkWidth = () => {
      setIsTablet(window.innerWidth >= 768);
    };
    checkWidth();
    window.addEventListener('resize', checkWidth);
    return () => window.removeEventListener('resize', checkWidth);
  }, []);

  const subjects = [
    { 
      name: '英語', 
      href: '/english', 
      color: 'subject-english',
      description: '英語の基礎から応用まで学習できます',
      animationMobile: 'fade-in-up',
      animationTablet: 'fade-in-up'
    },
    { 
      name: '数学', 
      href: '/math', 
      color: 'subject-math',
      description: '数学の問題演習と解説を提供します',
      animationMobile: 'fade-in-up',
      animationTablet: 'fade-in-left'
    },
    { 
      name: '国語', 
      href: '/japanese', 
      color: 'subject-japanese',
      description: '読解力と表現力を養います',
      animationMobile: 'fade-in-up',
      animationTablet: 'fade-in-right'
    },
    { 
      name: '理科', 
      href: '/science', 
      color: 'subject-physics',
      description: '物理・化学・生物を総合的に学習',
      animationMobile: 'fade-in-up',
      animationTablet: 'fade-in-up'
    },
    { 
      name: '社会', 
      href: '/social', 
      color: 'subject-history-jp',
      description: '歴史・地理・公民を体系的に理解',
      animationMobile: 'fade-in-up',
      animationTablet: 'fade-in-left'
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
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
      <section ref={subjectsRef} className="bg-white">
        {subjects.map((subject, index) => (
          <div className="min-h-screen flex items-center justify-center" key={subject.href}>
            <div className="container-wrapper w-full">
              <div 
                className={`subject-card ${isTablet ? subject.animationTablet : subject.animationMobile}`}
                style={{ 
                  animationDelay: `${index * 0.2}s`
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
        ))}
      </section>

      {/* Footer */}
      <footer>
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