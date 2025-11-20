import { useState } from 'react';
import ArchitectureDiagram from './components/ArchitectureDiagram';

type MediaItem = 
  | { type: 'image'; src: string; name: string }
  | { type: 'video'; src: string; name: string }
  | { type: 'gallery'; images: string[]; name: string; description: string };

const App = () => {
  const [selectedMedia, setSelectedMedia] = useState<{ 
    type: 'image' | 'video' | 'gallery'; 
    src?: string; 
    images?: string[];
    currentIndex?: number;
  } | null>(null);

  const sampleMedia: MediaItem[] = [
    { type: 'image' as const, src: '/sample/image_test.png', name: 'Image Test' },
    { type: 'image' as const, src: '/sample/Raika_document_analyzer.png', name: 'Document Analyzer' },
    { type: 'image' as const, src: '/sample/Raika_winter.png', name: 'Raika Winter' },
    { type: 'video' as const, src: '/sample/Raika_introduce2.mp4', name: 'Raika Introduce' },
    { 
      type: 'gallery' as const, 
      images: ['/sample/Raika_architecture1+2.png', '/sample/Raika_Architecture.png'],
      name: 'PDF + Image 분석',
      description: '아키텍처 문서 멀티모달 분석'
    },
    { type: 'gallery' as const, 
      images: ['/sample/Raika_Movie_Find1.png', '/sample/Raika_Movie_Find2.png'],
      name: '영화 검색',
      description: '불확실한 줄거리만으로도 영화를 찾아줍니다.'
    },
    { type: 'image' as const,
      src: '/sample/Raika_NaWanRay.png',
      name: '음악 찾기' },
    { 
      type: 'gallery' as const, 
      images: ['/sample/Raika_Twenty_Questions_1.png', '/sample/Raika_Twenty_Questions_2.png'],
      name: '스무고개',
      description: '20 Questions 게임 시연'
    },
  ];

  const handleGalleryNav = (direction: 'prev' | 'next') => {
    if (!selectedMedia || selectedMedia.type !== 'gallery' || !selectedMedia.images) return;
    
    const currentIndex = selectedMedia.currentIndex || 0;
    const totalImages = selectedMedia.images.length;
    const newIndex = direction === 'next' 
      ? (currentIndex + 1) % totalImages 
      : (currentIndex - 1 + totalImages) % totalImages;
    
    setSelectedMedia({ ...selectedMedia, currentIndex: newIndex });
  };

  return (
    <div className="page">
      <header className="hero">
        <p className="kicker">Raika the Wolfdog · System Overview</p>
        <h1>Tech Stack &amp; Architecture</h1>
        <p>
          「Raika the Wolfdog」는 실시간 대화, 문서 분석, 외부 검색, 커스텀 TTS를 아우르는 풀스택 AI 컴패니언이다.
          아래 다이어그램은 Client · Server 간 데이터 흐름과 주요 서비스 컴포넌트를 한눈에 정리한다.
        </p>
      </header>

      <main className="content">
        <ArchitectureDiagram />

        <section className="details">
          <div>
            <h2>Backend Stack</h2>
            <ul>
              <li>Python · FastAPI · Uvicorn · python-socketio</li>
              <li>Multiprocessing 런처로 메인/DB/TTS 서버 분리</li>
              <li>DeepSeek OCR FastAPI 마이크로서비스 · PDF 전처리 파이프라인</li>
              <li>transformers · bitsandbytes 4-bit · peft (LoRA)</li>
              <li>LangChain · LangGraph 에이전트 파이프라인</li>
              <li>Sentence-transformers · scikit-learn 기반 벡터 검색</li>
            </ul>
          </div>
          <div>
            <h2>Data &amp; Infrastructure</h2>
            <ul>
              <li>MongoDB(motor)로 세션/히스토리 영속화</li>
              <li>Redis 캐시에 중간 응답 · OCR 결과 · 파일 메타데이터 보관</li>
              <li>AWS S3에 업로드 미디어 및 문서 저장</li>
              <li>Google Custom Search · OpenRouter · Weather/Time MCP 연동</li>
              <li>Custom TTS 서버가 WebSocket으로 오디오/에너지 스트림 전송</li>
            </ul>
          </div>
          <div>
            <h2>Experience Highlights</h2>
            <ul>
              <li>Socket.IO 기반 실시간 챗 &amp; 토큰 스트리밍</li>
              <li>페르소나 주입 + ShortTermMemory로 맥락 유지</li>
              <li>DeepSeek OCR 기반 PDF → 텍스트 자동 변환 &amp; LangGraph 분석</li>
              <li>업로드 문서 RAG, 웹 검색, 멀티모달 분석 지원</li>
              <li>요청에 따른 외부 모델 위임(OpenRouter)</li>
              <li>Live2D 연동 립싱크, 응답 중단/이어가기 UX</li>
            </ul>
          </div>
        </section>

        <section className="sample-media-section">
          <h2>샘플 시연 이미지 & 동영상</h2>
          <div className="media-grid">
            {sampleMedia.map((media, index) => (
              <div
                key={index}
                className="media-thumbnail"
                onClick={() => {
                  if (media.type === 'gallery') {
                    setSelectedMedia({ type: 'gallery', images: media.images, currentIndex: 0 });
                  } else if (media.type === 'image') {
                    setSelectedMedia({ type: 'image', src: media.src });
                  } else {
                    setSelectedMedia({ type: 'video', src: media.src });
                  }
                }}
              >
                {media.type === 'image' ? (
                  <img src={media.src} alt={media.name} />
                ) : media.type === 'video' ? (
                  <div className="video-thumbnail">
                    <video src={media.src} />
                    <div className="play-icon">▶</div>
                  </div>
                ) : (
                  <div className="gallery-thumbnail">
                    <div className="gallery-preview">
                      <img src={media.images[0]} alt={media.name} className="gallery-img-1" />
                      <img src={media.images[1]} alt={media.name} className="gallery-img-2" />
                    </div>
                    <div className="gallery-badge">
                      <span>📁 {media.images.length}장</span>
                    </div>
                  </div>
                )}
                <p className="media-name">{media.name}</p>
                {media.type === 'gallery' && (
                  <p className="media-description">{media.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>

      {selectedMedia && (
        <div className="media-modal" onClick={() => setSelectedMedia(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={() => setSelectedMedia(null)}>
              ✕
            </button>
            {selectedMedia.type === 'gallery' && selectedMedia.images ? (
              <>
                <img 
                  src={selectedMedia.images[selectedMedia.currentIndex || 0]} 
                  alt="Gallery Preview" 
                />
                <div className="gallery-controls">
                  <button 
                    className="gallery-nav prev" 
                    onClick={(e) => { e.stopPropagation(); handleGalleryNav('prev'); }}
                  >
                    ‹
                  </button>
                  <span className="gallery-counter">
                    {(selectedMedia.currentIndex || 0) + 1} / {selectedMedia.images.length}
                  </span>
                  <button 
                    className="gallery-nav next" 
                    onClick={(e) => { e.stopPropagation(); handleGalleryNav('next'); }}
                  >
                    ›
                  </button>
                </div>
              </>
            ) : selectedMedia.type === 'image' ? (
              <img src={selectedMedia.src} alt="Preview" />
            ) : (
              <video src={selectedMedia.src} controls autoPlay />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;


