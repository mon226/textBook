'use client';

import { useState } from 'react';
import Footer from '../components/footer';

export default function PDFViewerPage() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <div className="h-screen bg-gradient-main relative overflow-hidden">
        {/* PC版の境界線 */}
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[960px] -translate-x-1/2 pointer-events-none">
          <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#b28247]" />
          <div className="absolute right-0 top-0 bottom-0 w-[3px] bg-[#b28247]" />
        </div>
        
        {/* メインコンテンツ */}
        <div className="h-full flex flex-col">
          <div className="container-wrapper h-full">
            <div 
              className="h-full w-full md:max-w-[960px] md:mx-auto flex flex-col"
              style={{
                background: 'linear-gradient(135deg, #fbdfe1 0%, #cc8699 100%)'
              }}
            >
              {/* ヘッダー部分 */}
              <div className="px-[5vw] py-[3vw] md:px-8 md:py-4 border-b-2 border-[#b28247]/30">
                <h1 className="text-center font-bold text-[#731a3d]" style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)' }}>
                  二子玉川参考書紹介 &apos;25
                </h1>
              </div>
              
              {/* PDF表示エリア */}
              <div className="flex-1 relative overflow-hidden">
                {isLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-white/50 z-10">
                    <div className="text-[#731a3d] text-lg">読み込み中...</div>
                  </div>
                )}
                
                <iframe
                  src="/pdf/二子玉川参考書紹介'25.pdf"
                  className="w-full h-full border-0"
                  onLoad={() => setIsLoading(false)}
                  title="二子玉川参考書紹介'25"
                />
              </div>
              
              {/* フッター部分 */}
              <div className="px-[5vw] py-[2vw] md:px-8 md:py-3 border-t-2 border-[#b28247]/30 text-center">
                <a 
                  href="/pdf/二子玉川参考書紹介'25.pdf" 
                  download
                  className="inline-flex items-center gap-2 px-6 py-2 bg-[#731a3d] text-white rounded-full hover:bg-[#b28247] transition-colors duration-300"
                  style={{ fontSize: 'clamp(0.875rem, 2vw, 1rem)' }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  PDFをダウンロード
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
}