import React, { useState, useEffect, useRef } from 'react';
import { Heart, Sparkles, Star, Gift, Cake, Music, Volume2, VolumeX, Flame } from 'lucide-react';

export default function BirthdayWish() {
  const [showContent, setShowContent] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [particles, setParticles] = useState([]);
  const [sparkles, setSparkles] = useState([]);
  const [touchStart, setTouchStart] = useState(0);

  // NEW STATES
  const [candlesBlown, setCandlesBlown] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  // AUDIO SETUP (Replace this URL with your actual song link)
  // Tip: Put an mp3 file in your public folder and use "/song.mp3"
  const audioUrl = "https://res.cloudinary.com/dpp8mm1mz/video/upload/v1769106689/Dooron_Dooron_-_Paresh_Pahuja_Piano_Cover_by_Ron_256kbps_pt0dxa.webm";
  const audioRef = useRef(new Audio(audioUrl));

  useEffect(() => {
    audioRef.current.loop = true;
    return () => {
      audioRef.current.pause();
    };
  }, []);

  const toggleMusic = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => console.log("Audio play failed:", e));
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 300);
    return () => clearTimeout(timer);
  }, []);

  // Particle System
  useEffect(() => {
    const interval = setInterval(() => {
      setParticles(prev => {
        const newParticles = [...prev];
        if (newParticles.length > 30) newParticles.shift();
        return [...newParticles, {
          id: Math.random(),
          left: Math.random() * 100,
          delay: 0,
          duration: 3 + Math.random() * 2,
          type: Math.random() > 0.5 ? 'heart' : 'star',
          size: 10 + Math.random() * 20
        }];
      });
    }, 400);
    return () => clearInterval(interval);
  }, [currentPage]);

  // Sparkle System
  useEffect(() => {
    const interval = setInterval(() => {
      setSparkles(prev => {
        const newSparkles = [...prev];
        if (newSparkles.length > 20) newSparkles.shift();
        return [...newSparkles, {
          id: Math.random(),
          left: Math.random() * 100,
          top: Math.random() * 100,
          delay: 0,
          duration: 0.8 + Math.random()
        }];
      });
    }, 300);
    return () => clearInterval(interval);
  }, []);

  const handleTouchStart = (e) => setTouchStart(e.touches[0].clientX);

  const handleTouchEnd = (e) => {
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    if (Math.abs(diff) > 50) {
      if (diff > 0) setCurrentPage((prev) => Math.min(prev + 1, pages.length - 1));
      else setCurrentPage((prev) => Math.max(prev - 1, 0));
    }
  };

  const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, pages.length - 1));

  const pages = [
    {
      // 1. Intro - The "Digital Gift" Hook
      bg: 'from-pink-600 via-rose-500 to-purple-600',
      content: (
        <div className="text-center px-4 animate-fadeIn flex flex-col items-center justify-center h-full">

          {/* Glowing Icon Container - Added spacing below */}
          <div className="relative mb-10">
            <div className="absolute inset-0 animate-ping opacity-30 delay-75">
              <Sparkles className="w-24 h-24 mx-auto text-yellow-200" />
            </div>
            <Heart className="w-24 h-24 mx-auto text-white animate-pulse relative z-10 drop-shadow-[0_0_10px_rgba(255,255,255,0.6)]" fill="currentColor" />
          </div>

          {/* Title - Added spacing below */}
          <h1 className="text-6xl font-bold text-white mb-8 drop-shadow-lg animate-slideUp" style={{ fontFamily: 'cursive' }}>
            Hy Ayushi
          </h1>

          {/* Glassmorphism Text Box - Improved internal spacing */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-xl max-w-sm mx-auto animate-slideUp space-y-6" style={{ animationDelay: '0.2s' }}>
            <p className="text-2xl text-white font-medium leading-relaxed">
              I know you said <span className="text-yellow-300 font-bold">"no gifts"</span>...
            </p>
            {/* <div className="w-16 h-1 bg-white/30 mx-auto rounded-full"></div> */}
            <p className="text-lg text-pink-100 opacity-90 leading-relaxed">
              ...so I coded this little corner of the internet just for you instead.
            </p>
          </div>

          {/* Interactive Button-like CTA - Added spacing above */}
          <div className="mt-12 animate-slideUp" style={{ animationDelay: '0.4s' }}>
            <div className="inline-block px-10 py-4 bg-white/20 rounded-full border border-white/40 text-white font-bold tracking-widest uppercase text-sm animate-bounce shadow-[0_0_20px_rgba(255,255,255,0.3)] backdrop-blur-md hover:bg-white/30 transition-all">
              Press here →
            </div>
          </div>

        </div>
      )
    },
    {
      // 2. Birthday Greeting
      bg: 'from-violet-600 via-purple-600 to-fuchsia-600',
      content: (
        <div className="text-center space-y-6 px-4 animate-fadeIn">
          <div className="flex justify-center gap-4 mb-6">
            <Star className="w-10 h-10 text-yellow-300 animate-spin" style={{ animationDuration: '4s' }} fill="currentColor" />
            <Cake className="w-16 h-16 text-white animate-bounce drop-shadow-xl" />
            <Star className="w-10 h-10 text-yellow-300 animate-spin" style={{ animationDuration: '4s' }} fill="currentColor" />
          </div>
          <h2 className="text-5xl font-bold text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.3)] mb-6 animate-slideUp" style={{ fontFamily: 'cursive' }}>
            Happy Birthday!
          </h2>
          <div className="space-y-4 animate-slideUp" style={{ animationDelay: '0.1s' }}>
            <p className="text-2xl text-white leading-relaxed drop-shadow-md">To a truly</p>
            <p className="text-3xl text-yellow-200 font-bold drop-shadow-lg">wonderful soul ✨</p>
          </div>
          <div className="text-6xl mt-8 animate-pulse drop-shadow-xl">🎉</div>
        </div>
      )
    },
    {
      // 3. Reconnection Context
      bg: 'from-orange-400 via-pink-500 to-rose-600',
      content: (
        <div className="text-center space-y-6 px-4 animate-fadeIn">
          <div className="relative mb-6">
            <div className="absolute inset-0 animate-ping opacity-30">
              <Sparkles className="w-20 h-20 mx-auto text-yellow-200" />
            </div>
            <Sparkles className="w-20 h-20 mx-auto text-yellow-300 animate-pulse relative z-10" />
          </div>
          <h2 className="text-4xl font-bold text-white drop-shadow-lg mb-6 animate-slideUp" style={{ fontFamily: 'cursive' }}>
            You know what?
          </h2>
          <div className="space-y-5 animate-slideUp" style={{ animationDelay: '0.1s' }}>
            <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/30 transform hover:scale-105 transition-transform">
              <p className="text-xl text-white font-medium leading-relaxed drop-shadow-sm">
                Even though life took us on different paths for a while...
              </p>
            </div>
            <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/30 transform hover:scale-105 transition-transform">
              <p className="text-xl text-white font-medium leading-relaxed drop-shadow-sm">
                I'm so incredibly grateful we found our way back 🧡
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      // 4. HIDDEN POLAROID (New Feature)
      bg: 'from-pink-500 via-red-500 to-yellow-500',
      content: (
        <div className="text-center space-y-6 px-4 animate-fadeIn">
          <h2 className="text-3xl font-bold text-white mb-4 drop-shadow-md" style={{ fontFamily: 'cursive' }}>
            Kept This One Safe
          </h2>

          <div className="relative w-64 h-80 mx-auto bg-white p-4 pb-12 shadow-2xl rotate-3 transform transition-all duration-500 hover:rotate-0 hover:scale-105 cursor-pointer group rounded-sm">
            <div className="w-full h-full bg-gray-200 overflow-hidden relative border border-gray-100">
              {/* REPLACE THE SRC BELOW WITH HER PHOTO URL */}
              <img
                src="https://res.cloudinary.com/dpp8mm1mz/image/upload/v1769105324/WhatsApp_Image_2026-01-22_at_11.37.59_PM_ozvkz0.jpg"
                alt="Birthday Girl"
                className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-white font-bold drop-shadow-md text-2xl">✨</span>
              </div>
            </div>
            <div className="absolute bottom-3 left-0 right-0 text-center text-gray-600 text-xl font-medium" style={{ fontFamily: 'cursive' }}>
              Beautiful as always
            </div>
          </div>

          <p className="text-white/90 text-sm mt-4 italic font-medium">
            (Tap the photo 😉)
          </p>
        </div>
      )
    },
    {
      // 5. INTERACTIVE CAKE (New Feature)
      bg: 'from-indigo-600 via-purple-600 to-pink-600',
      content: (
        <div className="text-center space-y-8 px-4 animate-fadeIn">
          <h2 className="text-4xl font-bold text-white mb-8 drop-shadow-lg" style={{ fontFamily: 'cursive' }}>
            Make a Wish!
          </h2>

          <div
            className="relative w-48 h-48 mx-auto mt-10 cursor-pointer transition-transform active:scale-95"
            onClick={(e) => {
              e.stopPropagation(); // Prevent page navigation when clicking cake
              setCandlesBlown(true);
            }}
          >
            {/* Cake Base */}
            <div className="absolute bottom-0 w-full h-32 bg-pink-300 rounded-lg shadow-2xl flex items-center justify-center border-b-8 border-pink-400">
              <span className="text-4xl">🎂</span>
            </div>

            {/* Candles Container */}
            <div className="absolute -top-6 left-0 right-0 flex justify-center gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="relative flex flex-col items-center">
                  {/* Flame */}
                  {!candlesBlown && (
                    <div className="w-4 h-6 bg-yellow-400 rounded-[50%] animate-bounce shadow-[0_0_20px_rgba(255,255,0,0.8)] mb-1 relative">
                      <div className="absolute inset-0 bg-orange-500 rounded-[50%] opacity-50 animate-pulse"></div>
                    </div>
                  )}
                  {/* Smoke after blowing */}
                  {candlesBlown && (
                    <div className="absolute -top-10 text-gray-200 text-2xl animate-pulse opacity-80" style={{ animationDuration: '2s' }}>💨</div>
                  )}
                  {/* Candle Stick */}
                  <div className="w-3 h-12 bg-white border border-gray-200 shadow-sm rounded-sm"></div>
                </div>
              ))}
            </div>
          </div>

          <p className="text-white text-xl font-medium mt-12 transition-all duration-500 drop-shadow-md">
            {!candlesBlown ? "Tap the candles to blow them out 🌬️" : "Yay! May your wish come true! ✨"}
          </p>
        </div>
      )
    },
    {
      // 6. Final Heart-Touching Conclusion
      bg: 'from-indigo-500 via-purple-500 to-pink-500',
      content: (
        <div className="text-center space-y-6 px-4 animate-fadeIn">

          {/* Replaced Cake with a Glowing Heart for emotion */}
          <div className="relative mb-8">
            <div className="absolute inset-0 animate-ping opacity-30">
              <Heart className="w-24 h-24 mx-auto text-pink-300" />
            </div>
            <Heart className="w-24 h-24 mx-auto text-white animate-pulse relative z-10 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]" fill="currentColor" />
          </div>

          <h2 className="text-3xl font-bold text-white drop-shadow-md animate-slideUp" style={{ fontFamily: 'cursive' }}>
            One last thing...
          </h2>

          {/* Sincere Message in a Glass Box */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl animate-slideUp transform transition-all hover:scale-105" style={{ animationDelay: '0.2s' }}>
            <p className="text-xl text-white leading-relaxed font-light italic">
              "Genuinely, I'm just really glad we're talking again. You are, and always have been, someone very special to me."
            </p>
          </div>

          <div className="space-y-4 mt-8 animate-slideUp" style={{ animationDelay: '0.4s' }}>
            <p className="text-3xl text-yellow-200 font-bold drop-shadow-lg" style={{ fontFamily: 'cursive' }}>
              Happy Birthday, Ayushi ❤️
            </p>

            <p className="text-xs text-white/60 mt-8 tracking-widest uppercase font-semibold">
              (I'm always just a text away)
            </p>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 overflow-hidden relative font-sans select-none">
      <style>{`
        @keyframes float {
          0% { transform: translateY(0) rotate(0deg) scale(1); opacity: 0; }
          10% { opacity: 0.8; }
          90% { opacity: 0.8; }
          100% { transform: translateY(-120vh) rotate(360deg) scale(0.5); opacity: 0; }
        }
        @keyframes sparkle {
          0%, 100% { opacity: 0; transform: scale(0); }
          50% { opacity: 1; transform: scale(1); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.8s ease-out; }
        .animate-slideUp { animation: slideUp 0.8s ease-out forwards; opacity: 0; }
      `}</style>

      {/* MUSIC BUTTON (Floating) */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          toggleMusic();
        }}
        className="absolute top-6 right-6 z-50 bg-white/10 backdrop-blur-md p-3 rounded-full text-white hover:bg-white/20 transition-all border border-white/30 shadow-lg group"
      >
        {isPlaying ? (
          <Volume2 className="w-6 h-6 animate-pulse text-yellow-300" />
        ) : (
          <VolumeX className="w-6 h-6 opacity-70" />
        )}
      </button>

      {/* Dynamic Background Wrapper */}
      <div className={`absolute inset-0 bg-linear-to-br ${pages[currentPage].bg} transition-colors duration-1000`} />

      {/* Particles */}
      {particles.map(particle => (
        particle.type === 'heart' ? (
          <Heart
            key={particle.id}
            className="absolute text-pink-300 pointer-events-none drop-shadow-lg"
            fill="currentColor"
            style={{
              left: `${particle.left}%`,
              bottom: '-50px',
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              animation: `float ${particle.duration}s ease-in-out`,
              animationDelay: `${particle.delay}s`,
              opacity: 0.5
            }}
          />
        ) : (
          <Star
            key={particle.id}
            className="absolute text-yellow-200 pointer-events-none drop-shadow-lg"
            fill="currentColor"
            style={{
              left: `${particle.left}%`,
              bottom: '-50px',
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              animation: `float ${particle.duration}s ease-in-out`,
              animationDelay: `${particle.delay}s`,
              opacity: 0.5
            }}
          />
        )
      ))}

      {sparkles.map(sparkle => (
        <Sparkles
          key={sparkle.id}
          className="absolute text-yellow-100 pointer-events-none"
          style={{
            left: `${sparkle.left}%`,
            top: `${sparkle.top}%`,
            width: '20px',
            height: '20px',
            animation: `sparkle ${sparkle.duration}s ease-in-out`,
            animationDelay: `${sparkle.delay}s`
          }}
        />
      ))}

      <div
        className={`w-full max-w-md mx-4 relative z-10 transition-all duration-1000 ${showContent ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="bg-white/10 rounded-[2.5rem] shadow-2xl p-8 min-h-162.5 flex flex-col justify-center transition-all duration-700 cursor-pointer backdrop-blur-xl border border-white/20 relative overflow-hidden"
          onClick={nextPage}
          style={{
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), inset 0 0 0 1px rgba(255, 255, 255, 0.1)'
          }}
        >
          {pages[currentPage].content}

          <div className="flex justify-center gap-2 mt-8 absolute bottom-8 left-0 right-0">
            {pages.map((_, idx) => (
              <div
                key={idx}
                className={`h-2 rounded-full transition-all duration-500 shadow-sm ${idx === currentPage ? 'bg-white w-8' : 'bg-white/30 w-2'
                  }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}