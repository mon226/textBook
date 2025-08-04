'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [date, setDate] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const today = new Date();
    const dateString = today.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    setDate(dateString);
  }, []);

  const handleClick = () => {
    const messages = [
      'こんにちは！！！！',
      'Vercelすごい！！！！',
      'デプロイ成功！！！！',
      '今日もいい日だ！！！！'
    ];
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    setMessage(randomMessage);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-main">
      <div className="container-wrapper">
        <div className="card mx-auto text-center">
          <h1 className="font-bold text-primary mb-[2vw]">Welcome to My Site</h1>
          <p className="text-primary mb-[3vw]">今日の日付: <span>{date}</span></p>
          <button 
            onClick={handleClick}
            className="btn-primary font-medium"
          >
            クリックしてみて
          </button>
          <p className="mt-[3vw] text-accent" style={{ fontSize: 'clamp(1.125rem, 3vw, 1.25rem)' }}>{message}</p>
        </div>
      </div>
    </div>
  );
}