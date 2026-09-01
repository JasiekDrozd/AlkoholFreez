import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface StatsProps {
  currentStreak: number;
  longestStreak: number;
  totalDays: number;
  daysIntoChallenge: number;
  daysRemaining: number;
  progressPercent: number;
}

function AnimatedNumber({ value, duration = 1.2 }: { value: number; duration?: number }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(start + (end - start) * eased);
      setDisplay(current);
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [value, duration]);

  return <>{display}</>;
}

interface StatCardProps {
  icon: string;
  label: string;
  value: number;
  suffix?: string;
  color: string;
  delay: number;
}

function StatCard({ icon, label, value, suffix = '', color, delay }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay, type: 'spring', stiffness: 200 }}
      whileHover={{ scale: 1.03, y: -4 }}
      className="glass-card p-4 sm:p-5 flex flex-col items-center gap-2 group"
    >
      <span className="text-2xl sm:text-3xl group-hover:scale-110 transition-transform duration-300">
        {icon}
      </span>
      <div className={`text-3xl sm:text-4xl font-black ${color}`}>
        <AnimatedNumber value={value} />
        {suffix && <span className="text-lg ml-0.5">{suffix}</span>}
      </div>
      <span className="text-xs sm:text-sm text-text-secondary font-medium text-center">
        {label}
      </span>
    </motion.div>
  );
}

export function Stats({
  currentStreak,
  longestStreak,
  totalDays,
  daysIntoChallenge,
  daysRemaining,
  progressPercent,
}: StatsProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
        <StatCard
          icon="🔥"
          label="Obecna passa"
          value={currentStreak}
          suffix="d"
          color="text-accent-green-light"
          delay={0}
        />
        <StatCard
          icon="🏆"
          label="Najdłuższa passa"
          value={longestStreak}
          suffix="d"
          color="text-accent-amber"
          delay={0.1}
        />
        <StatCard
          icon="✅"
          label="Zaznaczonych dni"
          value={totalDays}
          color="text-accent-green"
          delay={0.2}
        />
        <StatCard
          icon="📅"
          label="Dzień wyzwania"
          value={daysIntoChallenge}
          color="text-accent-blue"
          delay={0.3}
        />
        <StatCard
          icon="⏳"
          label="Dni do końca"
          value={daysRemaining}
          color="text-accent-purple"
          delay={0.4}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="glass-card p-4 sm:p-6"
      >
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-semibold text-text-secondary">Postęp wyzwania</span>
          <span className="text-sm font-bold text-accent-green">
            <AnimatedNumber value={Math.round(progressPercent)} />%
          </span>
        </div>
        <div className="h-4 bg-bg-primary rounded-full overflow-hidden relative">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 1.5, ease: 'easeOut', delay: 0.6 }}
            className="h-full rounded-full relative"
            style={{
              background: 'linear-gradient(90deg, #10b981, #34d399, #6ee7b7)',
            }}
          >
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)',
                backgroundSize: '200% 100%',
                animation: 'shimmer 2s linear infinite',
              }}
            />
          </motion.div>
        </div>
        <div className="flex justify-between mt-2 text-xs text-text-muted">
          <span>30 sie 2026</span>
          <span>30 lis 2026</span>
        </div>
      </motion.div>
    </div>
  );
}
