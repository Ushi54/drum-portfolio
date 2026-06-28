import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useDrumSynth } from '../hooks/useDrumSynth';
import { Play, Volume2 } from 'lucide-react';

interface PadConfig {
  id: string;
  name: string;
  key: string;
  color: string;
  play: () => void;
}

export const DrumPad: React.FC = () => {
  const { playKick, playSnare, playHiHatClosed, playHiHatOpen, playTom, initAudio } = useDrumSynth();
  const [activePad, setActivePad] = useState<string | null>(null);
  const [hasStarted, setHasStarted] = useState(false);

  const pads: PadConfig[] = [
    { id: 'hihat-open', name: 'Hi-Hat (Open)', key: 'o', color: '#5c7b8c', play: playHiHatOpen },
    { id: 'hihat-closed', name: 'Hi-Hat (Closed)', key: 'i', color: '#336774', play: playHiHatClosed },
    { id: 'tom-high', name: 'High Tom', key: 'u', color: '#7e8f9c', play: () => playTom('high') },
    { id: 'tom-low', name: 'Low Tom', key: 'y', color: '#687882', play: () => playTom('low') },
    { id: 'snare', name: 'Snare', key: 's', color: '#a08a8f', play: playSnare },
    { id: 'kick', name: 'Kick Drum', key: 'space', color: '#7a868a', play: playKick },
  ];

  // キーボードイベントの処理
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      let key = e.key.toLowerCase();
      if (e.code === 'Space') {
        e.preventDefault();
        key = 'space';
      }

      const pad = pads.find((p) => p.key === key);
      if (pad) {
        triggerPad(pad.id, pad.play, pad.color);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const triggerPad = (id: string, playFn: () => void, color: string, clientX?: number, clientY?: number) => {
    setHasStarted(true);
    playFn();
    setActivePad(id);
    setTimeout(() => setActivePad(null), 100);

    // ドラム波紋イベントの発火
    const padElement = document.getElementById(`pad-${id}`);
    let x = clientX;
    let y = clientY;

    if (x === undefined || y === undefined) {
      if (padElement) {
        const rect = padElement.getBoundingClientRect();
        x = rect.left + rect.width / 2;
        y = rect.top + rect.height / 2;
      } else {
        x = window.innerWidth / 2;
        y = window.innerHeight / 2;
      }
    }

    const event = new CustomEvent('drum-hit', {
      detail: { x, y, color: hexToRgba(color, 0.4) },
    });
    window.dispatchEvent(event);
  };

  const hexToRgba = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  return (
    <section id="drum-pad" className="section-container">
      <div className="text-center mb-12">
        <h2 className="section-title">Play Drum Pad</h2>
        <p className="text-slate-400 max-w-xl mx-auto mt-4 font-sans">
          キーボードのキーを押すか、パッドをクリックしてドラムを演奏してみましょう。
          音が鳴ると同時に、水面に美しい波紋が広がります。
        </p>
      </div>

      {!hasStarted && (
        <div className="flex justify-center mb-8">
          <button 
            onClick={() => {
              initAudio();
              setHasStarted(true);
            }}
            className="btn-primary animate-pulse"
          >
            <Play className="w-5 h-5" />
            オーディオを有効にする
          </button>
        </div>
      )}

      {/* ドラムパッドの配置（簡易的なドラムセット風レイアウト） */}
      <div className="pad-grid">
        {pads.map((pad) => (
          <motion.div
            key={pad.id}
            id={`pad-${pad.id}`}
            onClick={(e) => triggerPad(pad.id, pad.play, pad.color, e.clientX, e.clientY)}
            className={`pad-item glass-panel ${activePad === pad.id ? 'active' : ''}`}
            style={{
              '--active-color': pad.color,
              '--active-glow': hexToRgba(pad.color, 0.5),
            } as React.CSSProperties}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="pad-glow" />
            <div className="pad-content">
              <span className="pad-key">{pad.key === 'space' ? 'Space' : pad.key.toUpperCase()}</span>
              <span className="pad-name font-serif">{pad.name}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* キーボードガイド */}
      <div className="glass-panel keyboard-guide mt-12 p-6 flex justify-between items-center max-w-lg mx-auto">
        <div className="flex items-center gap-3">
          <Volume2 className="w-5 h-5" style={{ color: '#336774' }} />
          <span className="text-sm text-slate-300">キーボード操作対応</span>
        </div>
        <div className="flex gap-2">
          {['Y', 'U', 'I', 'O', 'S', 'Space'].map((k) => (
            <span key={k} className="key-cap">{k}</span>
          ))}
        </div>
      </div>

      <style>{`
        .text-center { text-align: center; }
        .mb-12 { margin-bottom: 48px; }
        .mb-8 { margin-bottom: 32px; }
        .mt-12 { margin-top: 48px; }
        .max-w-xl { max-width: 36rem; }
        .max-w-lg { max-width: 32rem; }
        .p-6 { padding: 24px; }
        
        .pad-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          max-width: 800px;
          margin: 0 auto;
        }

        @media (max-width: 768px) {
          .pad-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 16px;
          }
        }

        .pad-item {
          aspect-ratio: 1.3;
          position: relative;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          border-radius: 4px; /* アッシュに合うよう少し直線的に */
        }

        .pad-item.active {
          border-color: var(--active-color) !important;
          box-shadow: 0 0 20px var(--active-glow) !important;
          background: rgba(255, 255, 255, 0.05) !important;
        }

        .pad-glow {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at center, var(--active-glow) 0%, transparent 70%);
          opacity: 0;
          transition: opacity 0.1s ease;
          pointer-events: none;
        }

        .pad-item.active .pad-glow {
          opacity: 1;
        }

        .pad-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          z-index: 2;
        }

        .pad-key {
          font-size: 1.5rem;
          font-weight: 800;
          color: var(--text-primary);
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          width: 50px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 6px rgba(0,0,0,0.2);
        }

        .pad-name {
          font-size: 0.95rem;
          color: var(--text-secondary);
          text-align: center;
        }

        .keyboard-guide {
          border-radius: 12px;
        }

        .key-cap {
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-bottom: 3px solid rgba(255, 255, 255, 0.3);
          border-radius: 6px;
          padding: 4px 10px;
          font-size: 0.8rem;
          font-weight: 700;
          color: white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        }
      `}</style>
    </section>
  );
};
