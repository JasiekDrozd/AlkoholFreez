import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import { quotes, categoryIcons, categoryLabels, type Quote } from '../data/quotes';

function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function MotivationalCard() {
  const [shuffledQuotes] = useState(() => shuffleArray(quotes));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const currentQuote: Quote = shuffledQuotes[currentIndex % shuffledQuotes.length];

  const next = useCallback(() => {
    setDirection(1);
    setCurrentIndex(i => (i + 1) % shuffledQuotes.length);
  }, [shuffledQuotes.length]);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex(i => (i - 1 + shuffledQuotes.length) % shuffledQuotes.length);
  }, [shuffledQuotes.length]);

  useEffect(() => {
    const interval = setInterval(next, 12000);
    return () => clearInterval(interval);
  }, [next]);

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0, scale: 0.9 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -300 : 300, opacity: 0, scale: 0.9 }),
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7 }}
      className="glass-card p-6 sm:p-8 relative overflow-hidden min-h-[200px] flex flex-col"
    >
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent-green via-accent-blue to-accent-purple" />

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-lg">{categoryIcons[currentQuote.category]}</span>
          <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">
            {categoryLabels[currentQuote.category]}
          </span>
        </div>
        <div className="flex gap-1">
          {shuffledQuotes.map((_, i) => (
            <div
              key={i}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                i === currentIndex % shuffledQuotes.length
                  ? 'bg-accent-green w-4'
                  : 'bg-border'
              }`}
            />
          )).slice(0, 8)}
          {shuffledQuotes.length > 8 && (
            <span className="text-[10px] text-text-muted ml-1">+{shuffledQuotes.length - 8}</span>
          )}
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center relative">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="text-center"
          >
            <p className="text-lg sm:text-xl lg:text-2xl font-medium text-text-primary leading-relaxed mb-3">
              "{currentQuote.text}"
            </p>
            <p className="text-sm text-text-secondary italic">
              — {currentQuote.author}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex justify-center gap-3 mt-4">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={prev}
          className="w-10 h-10 rounded-full bg-bg-primary/50 flex items-center justify-center text-text-secondary hover:text-text-primary transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={next}
          className="w-10 h-10 rounded-full bg-bg-primary/50 flex items-center justify-center text-text-secondary hover:text-text-primary transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </motion.button>
      </div>
    </motion.div>
  );
}
