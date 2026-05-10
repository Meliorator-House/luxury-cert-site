import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Share2 } from "lucide-react";

/**
 * Luxury Certificate Landing Page
 * Design: Modern Luxury with Glassmorphism
 * 
 * Color Palette:
 * - Background: Deep Charcoal (#0f0f0f)
 * - Accent: Warm Gold (#d4af37)
 * - Text: Cream (#f5f1e8)
 * 
 * Typography:
 * - Display: Playfair Display (serif) - elegant, bold
 * - Body: Montserrat (sans-serif) - clean, modern
 */

interface Confetti {
  id: string;
  left: number;
  delay: number;
  duration: number;
  size: number;
}

export default function Home() {
  const [confetti, setConfetti] = useState<Confetti[]>([]);
  const [isActivated, setIsActivated] = useState(false);

  // Generate confetti particles on mount
  useEffect(() => {
    const particles: Confetti[] = Array.from({ length: 50 }, (_, i) => ({
      id: `confetti-${i}`,
      left: Math.random() * 100,
      delay: Math.random() * 0.3,
      duration: 2 + Math.random() * 1,
      size: 4 + Math.random() * 12,
    }));
    setConfetti(particles);
  }, []);

  const handleActivate = () => {
    setIsActivated(true);
    // Reset after animation
    setTimeout(() => setIsActivated(false), 2500);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center overflow-hidden relative">
      {/* Background with gradient and pattern */}
      <div 
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage: `url('https://d2xsxph8kpxj0f.cloudfront.net/310519663513334830/Zd4fQswhgtYQ8xXhTb4EZz/luxury-gradient-bg-2j8mSveZ4wku2BaC7uekmR.webp')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      />

      {/* Animated pattern overlay */}
      <div 
        className="absolute inset-0 -z-10 opacity-30 animate-pulse"
        style={{
          backgroundImage: `url('https://d2xsxph8kpxj0f.cloudfront.net/310519663513334830/Zd4fQswhgtYQ8xXhTb4EZz/abstract-luxury-pattern-oPCJkyoEa7zdUiZjd9ehD7.webp')`,
          backgroundSize: '400px 400px',
          backgroundPosition: 'center',
          animation: 'float 20s ease-in-out infinite',
        }}
      />

      {/* Confetti particles */}
      {isActivated && confetti.map((particle) => (
        <div
          key={particle.id}
          className="absolute pointer-events-none"
          style={{
            left: `${particle.left}%`,
            top: '-10px',
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: 0,
            animation: `fall ${particle.duration}s linear ${particle.delay}s forwards`,
            backgroundColor: ['#d4af37', '#f5f1e8', '#b76e79'][Math.floor(Math.random() * 3)],
            borderRadius: Math.random() > 0.5 ? '50%' : '4px',
          }}
        />
      ))}

      {/* Main content container */}
      <div className="relative z-10 w-full max-w-2xl px-4 py-12">
        {/* Certificate Card with Glassmorphism */}
        <div
          className="glass-strong rounded-2xl p-12 mb-8 border border-white/20 shadow-2xl"
          style={{
            animation: 'float 4s ease-in-out infinite',
            backdropFilter: 'blur(10px)',
            background: 'rgba(20, 20, 30, 0.6)',
          }}
        >
          {/* Decorative top element */}
          <div className="flex justify-center mb-8">
            <div className="flex gap-2">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="w-1 h-1 rounded-full"
                  style={{
                    backgroundColor: '#d4af37',
                    boxShadow: '0 0 10px rgba(212, 175, 55, 0.6)',
                  }}
                />
              ))}
            </div>
          </div>

          {/* Certificate Title */}
          <h1 
            className="font-display text-4xl md:text-5xl text-center mb-2"
            style={{
              color: '#d4af37',
              textShadow: '0 0 20px rgba(212, 175, 55, 0.3)',
              letterSpacing: '0.1em',
            }}
          >
            ВАМ ДОСТУПЕН
          </h1>
          <h2 
            className="font-display text-5xl md:text-6xl text-center mb-8"
            style={{
              color: '#d4af37',
              textShadow: '0 0 20px rgba(212, 175, 55, 0.3)',
              letterSpacing: '0.15em',
            }}
          >
            СЕРТИФИКАТ
          </h2>

          {/* Divider line */}
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-yellow-600 to-transparent mx-auto mb-8" />

          {/* Amount section */}
          <div className="text-center mb-12">
            <p 
              className="font-body text-sm tracking-widest mb-3"
              style={{ color: '#f5f1e8', opacity: 0.8 }}
            >
              НА СУММУ:
            </p>
            <p 
              className="font-display text-6xl md:text-7xl"
              style={{
                color: '#d4af37',
                textShadow: '0 0 30px rgba(212, 175, 55, 0.4)',
              }}
            >
              2000₽
            </p>
          </div>

          {/* Decorative bottom element */}
          <div className="flex justify-center">
            <div className="flex gap-2">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="w-1 h-1 rounded-full"
                  style={{
                    backgroundColor: '#d4af37',
                    boxShadow: '0 0 10px rgba(212, 175, 55, 0.6)',
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-4 w-full">
          <button
            onClick={handleActivate}
            className="w-full py-6 px-6 text-lg font-semibold font-body tracking-wider rounded-lg"
            style={{
              backgroundColor: '#d4af37',
              color: '#0f0f0f',
              border: '2px solid #d4af37',
              boxShadow: '0 0 20px rgba(212, 175, 55, 0.3)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              const target = e.currentTarget as HTMLElement;
              target.style.boxShadow = '0 0 40px rgba(212, 175, 55, 0.6)';
              target.style.transform = 'scale(1.02)';
            }}
            onMouseLeave={(e) => {
              const target = e.currentTarget as HTMLElement;
              target.style.boxShadow = '0 0 20px rgba(212, 175, 55, 0.3)';
              target.style.transform = 'scale(1)';
            }}
          >
            АКТИВИРОВАТЬ
          </button>

          <button
            className="w-full py-6 px-6 text-lg font-semibold font-body tracking-wider rounded-lg"
            style={{
              backgroundColor: 'transparent',
              color: '#d4af37',
              border: '2px dashed #d4af37',
              boxShadow: '0 0 15px rgba(212, 175, 55, 0.2)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              const target = e.currentTarget as HTMLElement;
              target.style.boxShadow = '0 0 30px rgba(212, 175, 55, 0.4)';
              target.style.backgroundColor = 'rgba(212, 175, 55, 0.1)';
            }}
            onMouseLeave={(e) => {
              const target = e.currentTarget as HTMLElement;
              target.style.boxShadow = '0 0 15px rgba(212, 175, 55, 0.2)';
              target.style.backgroundColor = 'transparent';
            }}
          >
            ПЕРЕЙТИ НА САЙТ
          </button>

          <button
            className="w-full py-6 px-6 text-lg font-semibold font-body tracking-wider rounded-lg flex items-center justify-center gap-2"
            style={{
              backgroundColor: 'transparent',
              color: '#2d9b6d',
              border: '2px dashed #2d9b6d',
              boxShadow: '0 0 15px rgba(45, 155, 109, 0.2)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              const target = e.currentTarget as HTMLElement;
              target.style.boxShadow = '0 0 30px rgba(45, 155, 109, 0.4)';
              target.style.backgroundColor = 'rgba(45, 155, 109, 0.1)';
            }}
            onMouseLeave={(e) => {
              const target = e.currentTarget as HTMLElement;
              target.style.boxShadow = '0 0 15px rgba(45, 155, 109, 0.2)';
              target.style.backgroundColor = 'transparent';
            }}
          >
            <Share2 size={20} />
            ПОДЕЛИТЬСЯ СЕРТИФИКАТОМ
          </button>
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes fall {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }

        /* Smooth transitions */
        button {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        button:active {
          transform: scale(0.98);
        }
      `}</style>
    </div>
  );
}
