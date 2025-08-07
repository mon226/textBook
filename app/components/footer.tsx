import Link from 'next/link';

const Footer = () => {
  const subjects = [
    { name: '英語', href: '/english' },
    { name: '数学', href: '/math' },
    { name: '国語', href: '/japanese' },
    { name: '理科', href: '/science' },
    { name: '社会', href: '/social' },
  ];

  return (
    <footer className="fixed bottom-0 left-0 right-0 transform translate-y-[calc(100%-3rem)] hover:translate-y-0 transition-transform duration-300 bg-gradient-main" style={{ zIndex: 50 }}>
      {/* ハンドル部分 */}
      <div className="h-[3rem] flex items-center justify-center cursor-pointer">
        <div className="flex items-center gap-2">
          <span className="text-secondary" style={{ fontSize: 'clamp(0.875rem, 2vw, 1rem)' }}>Menu</span>
          <span className="text-secondary animate-bounce">↑</span>
        </div>
      </div>
      
      {/* 展開時のコンテンツ */}
      <div className="relative min-h-[calc(100vh-3rem)] flex flex-col justify-center">
        {/* Stars - increased number */}
        <div className="stars">
          {[...Array(20)].map((_, i) => (
            <div 
              key={i} 
              className="star"
              style={{
                width: `${0.4 + Math.random() * 0.8}vw`,
                height: `${0.4 + Math.random() * 0.8}vw`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`
              }}
            ></div>
          ))}
        </div>
        <div className="container-wrapper py-[5vw] relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[5vw] px-[3vw]">
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
            <p className="text-secondary px-[3vw]" style={{ fontSize: 'clamp(0.875rem, 2vw, 1rem)' }}>&copy; 2024 二子玉川参考書紹介 &apos;25</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;