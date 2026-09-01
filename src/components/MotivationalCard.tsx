import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import { quotes, type Quote } from '../data/quotes';

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
    enter: (dir: number) => ({ x: dir > 0 ? 200 : -200, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -200 : 200, opacity: 0 }),
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="glass-card p-5 sm:p-6 relative overflow-hidden min-h-[180px] flex flex-col"
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-[11px] font-medium text-text-muted uppercase tracking-wider">
          {currentQuote.category}
        </span>
        <span className="text-[11px] text-text-muted tabular-nums">
          {(currentIndex % shuffledQuotes.length) + 1}/{shuffledQuotes.length}
        </span>
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
            <p className="text-base sm:text-lg font-normal text-text-primary leading-relaxed mb-2">
              &ldquo;{currentQuote.text}&rdquo;
            </p>
            <p className="text-xs text-text-muted">
              — {currentQuote.author}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex justify-center gap-2 mt-3">
        <button
          onClick={prev}
          className="w-8 h-8 rounded-lg border border-border flex items-center justify-center text-text-muted hover:text-text-primary hover:border-text-muted transition-colors cursor-pointer"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={next}
          className="w-8 h-8 rounded-lg border border-border flex items-center justify-center text-text-muted hover:text-text-primary hover:border-text-muted transition-colors cursor-pointer"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </motion.div>
  );
}
