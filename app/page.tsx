import Link from 'next/link';

export default function Home() {
  const pages = [
    { name: '英語', href: '/english', color: 'subject-english' },
    { name: '数学', href: '/math', color: 'subject-math' },
    { name: '国語', href: '/japanese', color: 'subject-japanese' },
    { name: '理科', href: '/science', color: 'subject-physics' },
    { name: '社会', href: '/social', color: 'subject-history-jp' },
    { name: 'PDF閲覧', href: '/pdf-viewer', color: 'btn-primary' },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-main">
      <div className="container-wrapper">
        <div className="card mx-auto text-center">
          <h1 className="font-bold text-primary mb-[3vw]">学習プラットフォーム</h1>
          <nav>
            <ul className="flex flex-col gap-[2vw]">
              {pages.map((page) => (
                <li key={page.href}>
                  <Link 
                    href={page.href}
                    className={`block ${page.color} p-[2vw] rounded-[1vw] text-secondary`}
                  >
                    {page.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}