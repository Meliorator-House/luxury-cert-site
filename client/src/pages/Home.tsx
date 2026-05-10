import { useEffect, useState } from "react";
import { Share2, Gift } from "lucide-react";
import { useLocation } from "wouter";

/**
 * Luxury Certificate Landing Page - Mobile Optimized
 * Design: Modern Luxury with Glassmorphism + iOS Animations + Ray Effects
 * 
 * Features:
 * - 2-second intro animation with loading text
 * - iOS-style emoji confetti (🎁🎉✨💝🎊)
 * - Transparent glowing icons with shimmer effects
 * - Working links and share functionality
 * - Dynamic certificate amounts (1000₽, 2000₽, 3000₽, 4000₽, 5000₽)
 * - Separate URLs for each amount (no visible selector)
 * - Smooth ray light effects
 * - Meliorator House background
 * - Night cricket ambient sound (10% volume)
 */

interface EmojiConfetti {
  id: string;
  emoji: string;
  left: number;
  delay: number;
  duration: number;
  size: number;
  rotation: number;
}

interface GlowingIcon {
  id: string;
  icon: string;
  x: number;
  y: number;
  delay: number;
}

interface RayEffect {
  id: string;
  angle: number;
  delay: number;
}

const CERTIFICATE_AMOUNTS = {
  "1000": { amount: "1000₽", path: "/cert/1000" },
  "2000": { amount: "2000₽", path: "/cert/2000" },
  "3000": { amount: "3000₽", path: "/cert/3000" },
  "4000": { amount: "4000₽", path: "/cert/4000" },
  "5000": { amount: "5000₽", path: "/cert/5000" },
};

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);
  const [emojiConfetti, setEmojiConfetti] = useState<EmojiConfetti[]>([]);
  const [isActivated, setIsActivated] = useState(false);
  const [glowingIcons, setGlowingIcons] = useState<GlowingIcon[]>([]);
  const [rayEffects, setRayEffects] = useState<RayEffect[]>([]);
  const [location] = useLocation();
  const [certificateAmount, setCertificateAmount] = useState("2000₽");

  // Detect certificate amount from URL
  useEffect(() => {
    const pathSegments = location.split("/");
    const amount = pathSegments[pathSegments.length - 1];
    
    if (amount in CERTIFICATE_AMOUNTS) {
      setCertificateAmount(CERTIFICATE_AMOUNTS[amount as keyof typeof CERTIFICATE_AMOUNTS].amount);
    }
  }, [location]);

  // Intro animation - 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
      // Trigger emoji confetti after intro
      generateEmojiConfetti();
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Cricket sound effect - auto play on load
  useEffect(() => {
    const audio = new Audio('/manus-storage/crickets_640d8ea3.wav');
    audio.volume = 0.1; // 10% volume
    audio.loop = true;
    audio.play().catch(err => {
      console.log('Audio autoplay prevented by browser:', err);
      // Add click listener to play on user interaction
      const playOnClick = () => {
        audio.play();
        document.removeEventListener('click', playOnClick);
      };
      document.addEventListener('click', playOnClick);
    });

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  // Generate iOS-style emoji confetti
  const generateEmojiConfetti = () => {
    const emojis = ["🎁", "🎉", "✨", "💝", "🎊", "🎈", "⭐", "💫"];
    const particles: EmojiConfetti[] = Array.from({ length: 40 }, (_, i) => ({
      id: `emoji-${i}`,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
      left: Math.random() * 100,
      delay: Math.random() * 0.5,
      duration: 2.5 + Math.random() * 1.5,
      size: 24 + Math.random() * 32,
      rotation: Math.random() * 360,
    }));
    setEmojiConfetti(particles);
  };

  // Generate glowing icons for background
  useEffect(() => {
    const icons: GlowingIcon[] = Array.from({ length: 8 }, (_, i) => ({
      id: `glow-${i}`,
      icon: ["🎁", "✨", "💎", "🌟"][Math.floor(Math.random() * 4)],
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 2,
    }));
    setGlowingIcons(icons);
  }, []);

  // Generate ray effects
  useEffect(() => {
    const rays: RayEffect[] = Array.from({ length: 6 }, (_, i) => ({
      id: `ray-${i}`,
      angle: (i * 60),
      delay: Math.random() * 2,
    }));
    setRayEffects(rays);
  }, []);

  const handleActivate = () => {
    // Open Telegram link
    window.open("https://t.me/meliorator_House163", "_blank");
    setIsActivated(true);
    generateEmojiConfetti();
    setTimeout(() => setIsActivated(false), 2500);
  };

  const handleGoToSite = () => {
    // Open website
    window.open("https://meliorator-house.ru", "_blank");
  };

  const handleShare = async () => {
    const shareText = `Я получил сертификат на сумму ${certificateAmount} от Мелиоратор Хаус! 🎁`;
    const shareUrl = window.location.href;

    // Try native share API first
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Мелиоратор Хаус - Сертификат",
          text: shareText,
          url: shareUrl,
        });
      } catch (err) {
        console.log("Share cancelled or failed");
      }
    } else {
      // Fallback: copy to clipboard
      const text = `${shareText}\n${shareUrl}`;
      navigator.clipboard.writeText(text).then(() => {
        alert("Контакты скопированы в буфер обмена!");
      });
    }

    // Trigger confetti
    setIsActivated(true);
    generateEmojiConfetti();
    setTimeout(() => setIsActivated(false), 2500);
  };

  return (
    <div className="w-screen h-screen overflow-hidden fixed inset-0 flex items-center justify-center" data-cricket-ambient="true">
      {/* Background with Meliorator House image */}
      <div 
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage: `url('/manus-storage/2778C516-1536-458D-B0D2-F15DE4041E6B_11694992.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      />

      {/* Dark overlay for better readability */}
      <div 
        className="absolute inset-0 -z-10"
        style={{
          background: 'rgba(0, 0, 0, 0.4)',
        }}
      />

      {/* Ray Light Effects */}
      <div className="absolute inset-0 -z-9 pointer-events-none overflow-hidden">
        {rayEffects.map((ray) => (
          <div
            key={ray.id}
            className="absolute"
            style={{
              width: '200%',
              height: '200%',
              left: '50%',
              top: '50%',
              transform: `translate(-50%, -50%) rotate(${ray.angle}deg)`,
              pointerEvents: 'none',
            }}
          >
            <div
              style={{
                position: 'absolute',
                left: '0',
                top: '50%',
                width: '100%',
                height: '80px',
                background: 'linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.15), transparent)',
                filter: 'blur(30px)',
                animation: `ray-sweep 8s ease-in-out infinite`,
                animationDelay: `${ray.delay}s`,
              }}
            />
          </div>
        ))}
      </div>

      {/* Shimmer overlay effect */}
      <div 
        className="absolute inset-0 -z-8 pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.08), transparent)',
          animation: 'shimmer 3s ease-in-out infinite',
        }}
      />

      {/* Glowing background icons */}
      <div className="absolute inset-0 -z-5 overflow-hidden">
        {glowingIcons.map((icon) => (
          <div
            key={icon.id}
            className="absolute text-4xl opacity-10 pointer-events-none"
            style={{
              left: `${icon.x}%`,
              top: `${icon.y}%`,
              animation: `float-icon 8s ease-in-out infinite`,
              animationDelay: `${icon.delay}s`,
              filter: 'blur(1px)',
            }}
          >
            {icon.icon}
          </div>
        ))}
      </div>

      {/* Hidden audio element for cricket sounds */}
      <audio
        id="cricket-audio"
        preload="auto"
        loop
        style={{ display: 'none' }}
      />

      {/* Intro Screen */}
      {showIntro && (
        <div 
          className="absolute inset-0 z-50 flex flex-col items-center justify-center"
          style={{
            background: 'rgba(15, 15, 15, 0.95)',
            backdropFilter: 'blur(10px)',
            animation: 'fadeOut 0.5s ease-out 1.5s forwards',
          }}
        >
          <div className="flex flex-col items-center gap-6">
            {/* Animated gift icon */}
            <div
              style={{
                animation: 'pulse-scale 1.5s ease-in-out infinite',
              }}
            >
              <Gift size={80} color="#d4af37" strokeWidth={1.5} />
            </div>
            
            {/* Loading text */}
            <div className="text-center">
              <p 
                className="text-2xl font-display tracking-widest mb-4"
                style={{
                  color: '#d4af37',
                  textShadow: '0 0 20px rgba(212, 175, 55, 0.5)',
                  animation: 'fadeInOut 2s ease-in-out',
                }}
              >
                Ваш сертификат
              </p>
              <p 
                className="text-lg font-body tracking-widest"
                style={{
                  color: '#f5f1e8',
                  opacity: 0.8,
                  animation: 'fadeInOut 2s ease-in-out 0.3s',
                }}
              >
                загружается...
              </p>
            </div>

            {/* Animated loading dots */}
            <div className="flex gap-2 mt-6">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-2 h-2 rounded-full"
                  style={{
                    backgroundColor: '#d4af37',
                    boxShadow: '0 0 10px rgba(212, 175, 55, 0.8)',
                    animation: `bounce 1.4s ease-in-out infinite`,
                    animationDelay: `${i * 0.2}s`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Emoji Confetti - iOS Style */}
      {emojiConfetti.map((particle) => (
        <div
          key={particle.id}
          className="fixed pointer-events-none font-display"
          style={{
            left: `${particle.left}%`,
            top: '-50px',
            fontSize: `${particle.size}px`,
            opacity: 0,
            animation: `fall-emoji ${particle.duration}s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${particle.delay}s forwards`,
            transform: `rotate(${particle.rotation}deg)`,
            textShadow: '0 0 10px rgba(212, 175, 55, 0.3)',
          }}
        >
          {particle.emoji}
        </div>
      ))}

      {/* Main content container - Mobile optimized */}
      <div className="relative z-10 w-full h-full max-w-md flex flex-col items-center justify-center px-4 py-8 overflow-hidden">
        {/* Certificate Card with Glassmorphism and Shimmer */}
        <div
          className="glass-strong rounded-3xl p-8 mb-6 border border-white/20 shadow-2xl w-full relative overflow-hidden"
          style={{
            animation: 'float 4s ease-in-out infinite',
            backdropFilter: 'blur(10px)',
            background: 'rgba(20, 20, 30, 0.7)',
            maxHeight: '50vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          {/* Shimmer effect on card */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.2), transparent)',
              animation: 'shimmer 3s ease-in-out infinite',
            }}
          />

          {/* Decorative top element with glowing icons */}
          <div className="flex justify-center mb-6 relative z-10">
            <div className="flex gap-3">
              {["🎁", "✨", "💎"].map((emoji, i) => (
                <div
                  key={i}
                  className="text-2xl"
                  style={{
                    opacity: 0.7,
                    filter: 'drop-shadow(0 0 12px rgba(212, 175, 55, 0.8))',
                    animation: `float-emoji 3s ease-in-out infinite`,
                    animationDelay: `${i * 0.3}s`,
                  }}
                >
                  {emoji}
                </div>
              ))}
            </div>
          </div>

          {/* Certificate Title */}
          <h1 
            className="font-display text-3xl sm:text-4xl text-center mb-1 relative z-10"
            style={{
              color: '#d4af37',
              textShadow: '0 0 20px rgba(212, 175, 55, 0.4)',
              letterSpacing: '0.1em',
            }}
          >
            ВАМ ДОСТУПЕН
          </h1>
          <h2 
            className="font-display text-4xl sm:text-5xl text-center mb-6 relative z-10"
            style={{
              color: '#d4af37',
              textShadow: '0 0 20px rgba(212, 175, 55, 0.4)',
              letterSpacing: '0.15em',
            }}
          >
            СЕРТИФИКАТ
          </h2>

          {/* Divider line */}
          <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-yellow-600 to-transparent mx-auto mb-6 relative z-10" />

          {/* Amount section */}
          <div className="text-center mb-6 relative z-10">
            <p 
              className="font-body text-xs sm:text-sm tracking-widest mb-2"
              style={{ color: '#f5f1e8', opacity: 0.8 }}
            >
              НА СУММУ:
            </p>
            <p 
              className="font-display text-5xl sm:text-6xl"
              style={{
                color: '#d4af37',
                textShadow: '0 0 30px rgba(212, 175, 55, 0.4)',
                animation: 'glow-pulse 2s ease-in-out infinite',
              }}
            >
              {certificateAmount}
            </p>
          </div>

          {/* Decorative bottom element */}
          <div className="flex justify-center relative z-10">
            <div className="flex gap-3">
              {["🎉", "💝", "🎊"].map((emoji, i) => (
                <div
                  key={i}
                  className="text-2xl"
                  style={{
                    opacity: 0.7,
                    filter: 'drop-shadow(0 0 12px rgba(212, 175, 55, 0.8))',
                    animation: `float-emoji 3s ease-in-out infinite`,
                    animationDelay: `${i * 0.3 + 1.5}s`,
                  }}
                >
                  {emoji}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons - Mobile optimized */}
        <div className="flex flex-col gap-3 w-full">
          {/* Primary Button - Activate */}
          <button
            onClick={handleActivate}
            className="w-full py-4 px-6 text-base font-semibold font-body tracking-wider rounded-2xl transition-all duration-300 active:scale-95 relative overflow-hidden group"
            style={{
              background: 'linear-gradient(135deg, #d4af37 0%, #e8d5c4 100%)',
              color: '#0f0f0f',
              border: '2px solid #d4af37',
              boxShadow: '0 8px 24px rgba(212, 175, 55, 0.3), 0 0 20px rgba(212, 175, 55, 0.2)',
              cursor: 'pointer',
              backdropFilter: 'blur(10px)',
            }}
            onMouseEnter={(e) => {
              const target = e.currentTarget as HTMLElement;
              target.style.boxShadow = '0 12px 32px rgba(212, 175, 55, 0.5), 0 0 40px rgba(212, 175, 55, 0.3)';
              target.style.transform = 'scale(1.02) translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              const target = e.currentTarget as HTMLElement;
              target.style.boxShadow = '0 8px 24px rgba(212, 175, 55, 0.3), 0 0 20px rgba(212, 175, 55, 0.2)';
              target.style.transform = 'scale(1) translateY(0)';
            }}
          >
            <span style={{ position: 'relative', zIndex: 2 }}>
              🎁 АКТИВИРОВАТЬ
            </span>
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
                animation: 'shimmer 2s ease-in-out infinite',
              }}
            />
          </button>

          {/* Secondary Button - Go to Site */}
          <button
            onClick={handleGoToSite}
            className="w-full py-4 px-6 text-base font-semibold font-body tracking-wider rounded-2xl transition-all duration-300 active:scale-95 backdrop-blur-md relative overflow-hidden group"
            style={{
              backgroundColor: 'rgba(212, 175, 55, 0.08)',
              color: '#d4af37',
              border: '2px solid rgba(212, 175, 55, 0.4)',
              boxShadow: '0 4px 16px rgba(212, 175, 55, 0.15), inset 0 1px 2px rgba(255, 255, 255, 0.1)',
              cursor: 'pointer',
              backdropFilter: 'blur(10px)',
            }}
            onMouseEnter={(e) => {
              const target = e.currentTarget as HTMLElement;
              target.style.boxShadow = '0 8px 24px rgba(212, 175, 55, 0.3), inset 0 1px 2px rgba(255, 255, 255, 0.1)';
              target.style.backgroundColor = 'rgba(212, 175, 55, 0.15)';
              target.style.transform = 'scale(1.02) translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              const target = e.currentTarget as HTMLElement;
              target.style.boxShadow = '0 4px 16px rgba(212, 175, 55, 0.15), inset 0 1px 2px rgba(255, 255, 255, 0.1)';
              target.style.backgroundColor = 'rgba(212, 175, 55, 0.08)';
              target.style.transform = 'scale(1) translateY(0)';
            }}
          >
            <span style={{ position: 'relative', zIndex: 2 }}>
              🌐 ПЕРЕЙТИ НА САЙТ
            </span>
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.2), transparent)',
                animation: 'shimmer 2s ease-in-out infinite',
              }}
            />
          </button>

          {/* Share Button */}
          <button
            onClick={handleShare}
            className="w-full py-4 px-6 text-base font-semibold font-body tracking-wider rounded-2xl flex items-center justify-center gap-2 transition-all duration-300 active:scale-95 backdrop-blur-md relative overflow-hidden group"
            style={{
              backgroundColor: 'rgba(45, 155, 109, 0.08)',
              color: '#2d9b6d',
              border: '2px solid rgba(45, 155, 109, 0.4)',
              boxShadow: '0 4px 16px rgba(45, 155, 109, 0.15), inset 0 1px 2px rgba(255, 255, 255, 0.1)',
              cursor: 'pointer',
              backdropFilter: 'blur(10px)',
            }}
            onMouseEnter={(e) => {
              const target = e.currentTarget as HTMLElement;
              target.style.boxShadow = '0 8px 24px rgba(45, 155, 109, 0.3), inset 0 1px 2px rgba(255, 255, 255, 0.1)';
              target.style.backgroundColor = 'rgba(45, 155, 109, 0.15)';
              target.style.transform = 'scale(1.02) translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              const target = e.currentTarget as HTMLElement;
              target.style.boxShadow = '0 4px 16px rgba(45, 155, 109, 0.15), inset 0 1px 2px rgba(255, 255, 255, 0.1)';
              target.style.backgroundColor = 'rgba(45, 155, 109, 0.08)';
              target.style.transform = 'scale(1) translateY(0)';
            }}
          >
            <Share2 size={18} style={{ filter: 'drop-shadow(0 0 8px rgba(45, 155, 109, 0.7))', position: 'relative', zIndex: 2 }} />
            <span style={{ position: 'relative', zIndex: 2 }}>ПОДЕЛИТЬСЯ</span>
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(45, 155, 109, 0.2), transparent)',
                animation: 'shimmer 2s ease-in-out infinite',
              }}
            />
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
            transform: translateY(-15px);
          }
        }

        @keyframes float-icon {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(10deg);
          }
        }

        @keyframes float-emoji {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-10px) rotate(5deg);
          }
        }

        @keyframes fall-emoji {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }

        @keyframes pulse-scale {
          0%, 100% {
            transform: scale(1);
            opacity: 0.8;
          }
          50% {
            transform: scale(1.1);
            opacity: 1;
          }
        }

        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes fadeInOut {
          0% {
            opacity: 0;
          }
          20% {
            opacity: 1;
          }
          80% {
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
        }

        @keyframes fadeOut {
          0% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            pointer-events: none;
          }
        }

        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }

        @keyframes glow-pulse {
          0%, 100% {
            text-shadow: 0 0 20px rgba(212, 175, 55, 0.4);
          }
          50% {
            text-shadow: 0 0 40px rgba(212, 175, 55, 0.8);
          }
        }

        @keyframes ray-sweep {
          0% {
            opacity: 0;
            transform: scaleY(0);
          }
          25% {
            opacity: 1;
          }
          75% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform: scaleY(1);
          }
        }

        /* Prevent scroll */
        * {
          -webkit-user-select: none;
          user-select: none;
        }

        body, html {
          overflow: hidden !important;
          width: 100vw !important;
          height: 100vh !important;
          margin: 0 !important;
          padding: 0 !important;
          position: fixed !important;
          top: 0 !important;
          left: 0 !important;
        }

        button {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          -webkit-tap-highlight-color: transparent;
          -webkit-appearance: none;
          appearance: none;
        }

        button:active {
          transform: scale(0.95) !important;
        }

        button:focus {
          outline: none;
        }

        a {
          text-decoration: none;
        }

        /* Mobile optimizations */
        @media (max-width: 768px) {
          body {
            font-size: 14px;
          }

          button {
            padding: 16px 20px !important;
            font-size: 15px !important;
            border-radius: 16px !important;
          }
        }

        @media (max-width: 640px) {
          body {
            touch-action: manipulation;
          }
        }
      `}</style>
    </div>
  );
}
