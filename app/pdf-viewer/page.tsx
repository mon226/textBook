'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Footer from '../components/footer';

export default function PDFViewerPage() {
  const [currentPage, setCurrentPage] = useState(0); // 0ページ（表紙）から開始
  const [inputPage, setInputPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const totalPages = 52; // 実際のページ数（画像は1-52）
  const maxDisplayPage = 51; // 表示上の最大ページ（0-51）

  // ページ番号をフォーマット（webpファイル用）
  const formatPageNumber = (num: number) => {
    return num.toString();
  };

  // 現在表示すべきページを取得（0ベースから1ベースの画像番号に変換）
  const getDisplayPages = () => {
    if (currentPage === 0) {
      // 表紙は単体表示（画像番号1）
      return [1];
    } else if (currentPage === maxDisplayPage) {
      // 裏表紙は単体表示（画像番号52）
      return [52];
    } else {
      // 見開き表示（currentPageは奇数、画像は+1した偶数と奇数のペア）
      const leftImageNum = currentPage + 1;  // 左ページの画像番号
      const rightImageNum = currentPage + 2; // 右ページの画像番号
      return [leftImageNum, rightImageNum];
    }
  };

  // ページ送り（基本的に+2、ただし0→1、50→51は+1）
  const nextPage = useCallback(() => {
    if (currentPage === 0) {
      setCurrentPage(1);
      setInputPage(1);
    } else if (currentPage >= maxDisplayPage - 1) {
      setCurrentPage(maxDisplayPage);
      setInputPage(maxDisplayPage);
    } else {
      setCurrentPage(currentPage + 2);
      setInputPage(currentPage + 2);
    }
  }, [currentPage, maxDisplayPage]);

  // ページ戻し（基本的に-2、ただし1→0、51→49は特殊）
  const prevPage = useCallback(() => {
    if (currentPage === 0) {
      return;
    } else if (currentPage === 1) {
      setCurrentPage(0);
      setInputPage(0);
    } else if (currentPage === maxDisplayPage) {
      setCurrentPage(maxDisplayPage - 2);
      setInputPage(maxDisplayPage - 2);
    } else {
      setCurrentPage(currentPage - 2);
      setInputPage(currentPage - 2);
    }
  }, [currentPage, maxDisplayPage]);
  
  // ユーザー入力の処理（偶数は奇数に変換）
  const handlePageInput = (value: number) => {
    if (value < 0) {
      setCurrentPage(0);
      setInputPage(0);
    } else if (value > maxDisplayPage) {
      setCurrentPage(maxDisplayPage);
      setInputPage(maxDisplayPage);
    } else if (value === 0 || value === maxDisplayPage) {
      setCurrentPage(value);
      setInputPage(value);
    } else if (value % 2 === 0) {
      // 偶数入力は-1して奇数に
      setCurrentPage(value - 1);
      setInputPage(value - 1);
    } else {
      setCurrentPage(value);
      setInputPage(value);
    }
  };

  // キーボード操作
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // 本番環境（Vercel）でのみ開発者ツールを無効化
      if (process.env.NODE_ENV === 'production' && typeof window !== 'undefined') {
        if ((e.ctrlKey && e.shiftKey && e.key === 'I') || 
            (e.ctrlKey && e.shiftKey && e.key === 'J') ||
            (e.ctrlKey && e.shiftKey && e.key === 'C') ||
            e.key === 'F12') {
          e.preventDefault();
          return;
        }
      }
      
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
      <div className="min-h-screen bg-gradient-main relative">
        {/* PC版の境界線 */}
        <div className="hidden md:block absolute left-1/2 top-0 h-full w-[960px] -translate-x-1/2 pointer-events-none">
          <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#b28247]" />
          <div className="absolute right-0 top-0 bottom-0 w-[3px] bg-[#b28247]" />
        </div>
        
        {/* メインコンテンツ */}
        <div className="h-screen">
          <div className="container-wrapper h-full">
            <div 
              className="h-full w-full md:max-w-[960px] md:mx-auto relative"
              style={{
                background: 'linear-gradient(135deg, #fbdfe1 0%, #cc8699 100%)'
              }}
            >
              {/* PDF表示エリア */}
              <div id="pdf-content" className="h-full relative overflow-hidden bg-white/10">
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
                        className="relative h-full flex-1 select-none"
                        style={{ 
                          maxWidth: displayPages.length === 1 ? '31.8%' : '45%',
                          // 単開きの場合、見開きの1ページ分の幅（45%）に対して、
                          // A4の縦横比（1.414）を考慮して幅を調整
                          // 45% × (1/1.414) ≈ 31.8%
                        }}
                        onContextMenu={(e) => e.preventDefault()}
                        onDragStart={(e) => e.preventDefault()}
                      >
                        {isLoading && (
                          <div className="absolute inset-0 flex items-center justify-center bg-white/50 z-20">
                            <div className="text-[#731a3d]">読み込み中...</div>
                          </div>
                        )}
                        <Image
                          src={`/img/pam/二子玉川参考書紹介'25${formatPageNumber(pageNum)}.webp`}
                          alt={`ページ ${pageNum}`}
                          fill
                          className="object-contain pointer-events-none"
                          onLoadingComplete={() => setIsLoading(false)}
                          onLoadStart={() => setIsLoading(true)}
                          priority={currentPage === 0 && pageNum === 1}
                          quality={95}
                          draggable={false}
                        />
                        {/* 透明なオーバーレイで画像を保護 */}
                        <div className="absolute inset-0 z-[1]" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* 固定フッター */}
              <div className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm border-t-2 border-[#b28247]/30 z-30">
                <div className="px-[3vw] py-[2vw] md:px-6 md:py-3">
                  {/* ページナビゲーション */}
                  <div className="flex items-center justify-between">
                    <button 
                      onClick={prevPage}
                      disabled={currentPage === 0}
                      className="px-4 py-2 bg-[#731a3d] text-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#b28247] transition-colors duration-300"
                      style={{ fontSize: 'clamp(0.875rem, 2vw, 1rem)' }}
                    >
                      ← 前へ
                    </button>
                    
                    <div className="flex items-center gap-2">
                      <input 
                        type="number" 
                        min="0" 
                        max={maxDisplayPage}
                        value={inputPage}
                        onChange={(e) => {
                          const value = parseInt(e.target.value);
                          setInputPage(value);
                        }}
                        onBlur={(e) => {
                          const value = parseInt(e.target.value);
                          if (!isNaN(value)) {
                            handlePageInput(value);
                          }
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            const value = parseInt(e.currentTarget.value);
                            if (!isNaN(value)) {
                              handlePageInput(value);
                            }
                          }
                        }}
                        className="w-16 text-center border border-[#b28247]/30 rounded px-2 py-1 bg-white/50 text-[#731a3d]"
                        style={{ fontSize: 'clamp(0.875rem, 2vw, 1rem)' }}
                      />
                      <span className="text-[#731a3d]" style={{ fontSize: 'clamp(0.875rem, 2vw, 1rem)' }}>
                        / {maxDisplayPage}
                      </span>
                    </div>
                    
                    <button 
                      onClick={nextPage}
                      disabled={currentPage === maxDisplayPage}
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
        </div>
      </div>
      
      <Footer />
    </>
  );
}