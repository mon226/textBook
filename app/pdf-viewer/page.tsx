'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Footer from '../components/footer';

export default function PDFViewerPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const totalPages = 52;

  // ページ番号を2桁にフォーマット
  const formatPageNumber = (num: number) => {
    return num.toString().padStart(2, '0');
  };

  // 現在表示すべきページを取得
  const getDisplayPages = () => {
    if (currentPage === 1) {
      // 表紙は単体表示
      return [1];
    } else if (currentPage === totalPages) {
      // 裏表紙は単体表示
      return [totalPages];
    } else {
      // 見開き表示（偶数ページとその次のページ）
      const leftPage = currentPage % 2 === 0 ? currentPage : currentPage - 1;
      const rightPage = leftPage + 1;
      
      // 最終ページを超えないようにチェック
      if (rightPage > totalPages) {
        return [leftPage];
      }
      return [leftPage, rightPage];
    }
  };

  // ページ送り
  const nextPage = useCallback(() => {
    if (currentPage === 1) {
      setCurrentPage(2);
    } else if (currentPage === totalPages) {
      return;
    } else {
      const nextPageNum = currentPage % 2 === 0 ? currentPage + 2 : currentPage + 1;
      setCurrentPage(Math.min(nextPageNum, totalPages));
    }
  }, [currentPage, totalPages]);

  // ページ戻し
  const prevPage = useCallback(() => {
    if (currentPage === 1) {
      return;
    } else if (currentPage === 2 || currentPage === 3) {
      setCurrentPage(1);
    } else {
      const prevPageNum = currentPage % 2 === 0 ? currentPage - 2 : currentPage - 1;
      setCurrentPage(Math.max(prevPageNum, 1));
    }
  }, [currentPage]);

  // キーボード操作
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        nextPage();
      } else if (e.key === 'ArrowLeft') {
        prevPage();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [nextPage, prevPage]);

  // タッチ操作用
  useEffect(() => {
    let startX = 0;
    let endX = 0;

    const handleTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].pageX;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      endX = e.changedTouches[0].pageX;
      const diff = startX - endX;
      
      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          nextPage();
        } else {
          prevPage();
        }
      }
    };

    const contentEl = document.getElementById('pdf-content');
    if (contentEl) {
      contentEl.addEventListener('touchstart', handleTouchStart);
      contentEl.addEventListener('touchend', handleTouchEnd);
      
      return () => {
        contentEl.removeEventListener('touchstart', handleTouchStart);
        contentEl.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [nextPage, prevPage]);

  const displayPages = getDisplayPages();

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
              <div className="px-[3vw] py-[2vw] md:px-6 md:py-3 border-b-2 border-[#b28247]/30 flex items-center justify-between">
                <h1 className="text-center font-bold text-[#731a3d] flex-1" style={{ fontSize: 'clamp(1.25rem, 3vw, 1.75rem)' }}>
                  二子玉川参考書紹介 &apos;25
                </h1>
                
                {/* ページ番号表示 */}
                <div className="flex items-center gap-2 text-[#731a3d]">
                  <input 
                    type="number" 
                    min="1" 
                    max={totalPages}
                    value={currentPage}
                    onChange={(e) => {
                      const page = parseInt(e.target.value);
                      if (page >= 1 && page <= totalPages) {
                        setCurrentPage(page);
                      }
                    }}
                    className="w-12 text-center border border-[#b28247]/30 rounded px-1 bg-white/50"
                    style={{ fontSize: 'clamp(0.875rem, 2vw, 1rem)' }}
                  />
                  <span style={{ fontSize: 'clamp(0.875rem, 2vw, 1rem)' }}>/ {totalPages}</span>
                </div>
              </div>
              
              {/* PDF表示エリア */}
              <div id="pdf-content" className="flex-1 relative overflow-hidden bg-white/10">
                {/* 左側のクリックエリア */}
                <div 
                  className="absolute left-0 top-0 bottom-0 w-[20%] md:w-[15%] z-10 cursor-pointer hover:bg-black/5 active:bg-black/10 transition-colors"
                  onClick={prevPage}
                />
                
                {/* 右側のクリックエリア */}
                <div 
                  className="absolute right-0 top-0 bottom-0 w-[20%] md:w-[15%] z-10 cursor-pointer hover:bg-black/5 active:bg-black/10 transition-colors"
                  onClick={nextPage}
                />
                
                {/* ページ画像表示 */}
                <div className="h-full flex items-center justify-center p-4">
                  <div className="relative h-full w-full max-w-[90%] flex items-center justify-center gap-0">
                    {displayPages.map((pageNum) => (
                      <div 
                        key={pageNum}
                        className="relative h-full flex-1"
                        style={{ maxWidth: displayPages.length === 1 ? '50%' : '45%' }}
                      >
                        {isLoading && (
                          <div className="absolute inset-0 flex items-center justify-center bg-white/50 z-20">
                            <div className="text-[#731a3d]">読み込み中...</div>
                          </div>
                        )}
                        <Image
                          src={`/img/pam/二子玉川参考書紹介'25_ページ_${formatPageNumber(pageNum)}.png`}
                          alt={`ページ ${pageNum}`}
                          fill
                          className="object-contain"
                          onLoadingComplete={() => setIsLoading(false)}
                          onLoadStart={() => setIsLoading(true)}
                          priority
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* フッター部分 */}
              <div className="px-[3vw] py-[2vw] md:px-6 md:py-3 border-t-2 border-[#b28247]/30 flex items-center justify-between">
                <button 
                  onClick={prevPage}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-[#731a3d] text-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#b28247] transition-colors duration-300"
                  style={{ fontSize: 'clamp(0.875rem, 2vw, 1rem)' }}
                >
                  ← 前へ
                </button>
                
                <div className="text-[#731a3d] text-center" style={{ fontSize: 'clamp(0.875rem, 2vw, 1rem)' }}>
                  {displayPages.length === 1 
                    ? `${currentPage}ページ` 
                    : `${displayPages[0]}-${displayPages[1]}ページ`
                  }
                </div>
                
                <button 
                  onClick={nextPage}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 bg-[#731a3d] text-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#b28247] transition-colors duration-300"
                  style={{ fontSize: 'clamp(0.875rem, 2vw, 1rem)' }}
                >
                  次へ →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
}