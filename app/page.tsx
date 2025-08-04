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
      <div className="card rounded-lg p-12 max-w-lg text-center">
        <h1 className="text-3xl font-bold text-primary mb-4">Welcome to My Site</h1>
        <p className="text-primary mb-8">今日の日付: <span>{date}</span></p>
        <button 
          onClick={handleClick}
          className="btn-primary px-8 py-3 rounded-md text-lg font-medium"
        >
          クリックしてみて
        </button>
        <p className="mt-8 text-xl text-accent">{message}</p>
      </div>
    </div>
  );
}