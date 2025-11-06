import { useState } from 'react';
import ArchitectureDiagram from './components/ArchitectureDiagram';

const App = () => {
  const [selectedMedia, setSelectedMedia] = useState<{ type: 'image' | 'video'; src: string } | null>(null);

  const sampleMedia = [
    { type: 'image' as const, src: '/sample/image_test.png', name: 'Image Test' },
    { type: 'image' as const, src: '/sample/Raika_document_analyzer.png', name: 'Document Analyzer' },
    { type: 'image' as const, src: '/sample/Raika_winter.png', name: 'Raika Winter' },
    { type: 'video' as const, src: '/sample/Raika_Introduce2.mp4', name: 'Raika Introduce' },
  ];

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
              <li>transformers · bitsandbytes 4-bit · peft (LoRA)</li>
              <li>LangChain · LangGraph 에이전트 파이프라인</li>
              <li>Sentence-transformers · scikit-learn 기반 벡터 검색</li>
            </ul>
          </div>
          <div>
            <h2>Data &amp; Infrastructure</h2>
            <ul>
              <li>MongoDB(motor)로 세션/히스토리 영속화</li>
              <li>Redis 캐시에 중간 응답 · 파일 메타데이터 보관</li>
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
                onClick={() => setSelectedMedia({ type: media.type, src: media.src })}
              >
                {media.type === 'image' ? (
                  <img src={media.src} alt={media.name} />
                ) : (
                  <div className="video-thumbnail">
                    <video src={media.src} />
                    <div className="play-icon">▶</div>
                  </div>
                )}
                <p className="media-name">{media.name}</p>
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
            {selectedMedia.type === 'image' ? (
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

