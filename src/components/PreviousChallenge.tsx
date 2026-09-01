import { motion } from 'framer-motion';

export function PreviousChallenge() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.9 }}
      className="glass-card p-4 sm:p-6"
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-xl bg-accent-amber/10 flex items-center justify-center">
          <span className="text-xl">🏅</span>
        </div>
        <div>
          <h3 className="font-bold text-text-primary text-sm">Poprzednie wyzwanie</h3>
          <p className="text-xs text-text-muted">Luty — Maj 2026</p>
        </div>
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-3xl font-black text-accent-amber">120</span>
        <span className="text-sm text-text-secondary">dni bez alkoholu</span>
      </div>
      <div className="mt-3 h-2 bg-bg-primary rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 2, delay: 1.2, ease: 'easeOut' }}
          className="h-full rounded-full bg-gradient-to-r from-accent-amber to-yellow-400"
        />
      </div>
      <p className="text-xs text-accent-amber/70 mt-2 font-medium">
        ✨ Ukończone! Możesz to zrobić ponownie!
      </p>
    </motion.div>
  );
}
