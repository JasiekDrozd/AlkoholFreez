import { motion } from 'framer-motion';

interface HeaderProps {
  currentStreak: number;
}

export function Header({ currentStreak }: HeaderProps) {
  const getMessage = () => {
    if (currentStreak === 0) return 'Zaznacz dzisiejszy dzień!';
    if (currentStreak <= 3) return 'Świetny start! Tak trzymaj! 💪';
    if (currentStreak <= 7) return 'Pierwszy tydzień prawie za Tobą!';
    if (currentStreak <= 14) return 'Dwa tygodnie siły! Jesteś niesamowity!';
    if (currentStreak <= 30) return 'Miesiąc bez alkoholu? LEGENDA! 🏆';
    if (currentStreak <= 60) return 'Dwa miesiące! Twoje ciało Ci dziękuje! 💚';
    return 'Niepokonany! Jesteś maszyną! 🔥';
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, type: 'spring' }}
      className="text-center py-6 sm:py-10"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        className="inline-flex items-center gap-3 mb-4"
      >
        <span className="text-4xl sm:text-5xl">🧊</span>
        <h1 className="text-4xl sm:text-6xl font-black tracking-tight">
          <span className="shimmer-text">AlkoholFreez</span>
        </h1>
        <span className="text-4xl sm:text-5xl">🧊</span>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-text-secondary text-base sm:text-lg font-medium"
      >
        30 sierpnia — 30 listopada 2026 · 93 dni wyzwania
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-4 inline-block"
      >
        <motion.span
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="inline-block px-4 py-2 rounded-full bg-accent-green/10 border border-accent-green/20 text-accent-green-light text-sm font-semibold"
        >
          {getMessage()}
        </motion.span>
      </motion.div>
    </motion.header>
  );
}
