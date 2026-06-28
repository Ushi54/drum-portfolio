import React, { useEffect, useState } from 'react';

interface Ripple {
  id: number;
  x: number;
  y: number;
  color: string;
}

export const WaterEffect: React.FC = () => {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  useEffect(() => {
    const handleDrumHit = (e: Event) => {
      const customEvent = e as CustomEvent<{ x?: number; y?: number; color?: string }>;
      const { x, y, color } = customEvent.detail;

      // 座標が指定されていない場合は画面内のランダムな位置に発生
      const posX = x !== undefined ? x : Math.random() * window.innerWidth;
      const posY = y !== undefined ? y : Math.random() * window.innerHeight;
      const rippleColor = color || 'rgba(51, 103, 116, 0.35)';

      const newRipple: Ripple = {
        id: Date.now() + Math.random(),
        x: posX,
        y: posY,
        color: rippleColor,
      };

      setRipples((prev) => [...prev, newRipple].slice(-15)); // 最大15個に制限してパフォーマンス維持
    };

    window.addEventListener('drum-hit', handleDrumHit);
    return () => {
      window.removeEventListener('drum-hit', handleDrumHit);
    };
  }, []);

  // アニメーション終了後に波紋を削除
  const handleAnimationEnd = (id: number) => {
    setRipples((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <div className="water-bg">
      <div className="water-ripple" />
      
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="dynamic-ripple"
          style={{
            left: ripple.x,
            top: ripple.y,
            borderColor: ripple.color,
            boxShadow: `0 0 20px ${ripple.color}`,
          }}
          onAnimationEnd={() => handleAnimationEnd(ripple.id)}
        />
      ))}

      <style>{`
        .dynamic-ripple {
          position: absolute;
          width: 20px;
          height: 20px;
          border: 2px solid;
          border-radius: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none;
          animation: rippleExpand 1.5s cubic-bezier(0.1, 0.8, 0.3, 1) forwards;
          opacity: 0.8;
          z-index: -1;
        }

        @keyframes rippleExpand {
          0% {
            width: 0px;
            height: 0px;
            opacity: 0.8;
          }
          100% {
            width: 500px;
            height: 500px;
            opacity: 0;
            border-width: 1px;
          }
        }
      `}</style>
    </div>
  );
};
