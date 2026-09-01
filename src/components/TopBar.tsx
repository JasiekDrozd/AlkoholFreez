import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import type { User } from 'firebase/auth';

interface TopBarProps {
  currentStreak: number;
  longestStreak: number;
  totalDays: number;
  daysIntoChallenge: number;
  daysRemaining: number;
  progressPercent: number;
  syncStatus: 'connecting' | 'synced' | 'offline';
  user: User | null;
  onLogout: () => Promise<void>;
}

const syncConfig = {
  connecting: { color: 'bg-accent-amber', animate: true },
  synced: { color: 'bg-accent-green', animate: false },
  offline: { color: 'bg-red-500', animate: false },
};

function Stat({ icon, value, suffix, label }: { icon: string; value: number; suffix?: string; label: string }) {
  return (
    <div className="flex items-center gap-1.5 px-2 py-1" title={label}>
      <span className="text-sm">{icon}</span>
      <span className="text-sm font-bold text-text-primary">
        {value}{suffix}
      </span>
      <span className="text-xs text-text-muted hidden lg:inline">{label}</span>
    </div>
  );
}

export function TopBar({
  currentStreak, longestStreak, totalDays, daysIntoChallenge, daysRemaining,
  progressPercent, syncStatus, user, onLogout,
}: TopBarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { color, animate } = syncConfig[syncStatus];

  const getMessage = () => {
    if (currentStreak === 0) return 'Zaznacz dzisiejszy dzień!';
    if (currentStreak <= 3) return 'Świetny start! 💪';
    if (currentStreak <= 7) return 'Pierwszy tydzień prawie za Tobą!';
    if (currentStreak <= 14) return 'Dwa tygodnie siły!';
    if (currentStreak <= 30) return 'Miesiąc! LEGENDA! 🏆';
    if (currentStreak <= 60) return 'Dwa miesiące! 💚';
    return 'Niepokonany! 🔥';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-0 z-40 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-3 mb-4"
      style={{ background: 'rgba(10, 10, 26, 0.85)', backdropFilter: 'blur(16px)' }}
    >
      <div className="max-w-[1600px] mx-auto flex items-center justify-between gap-4">
        {/* Left: Logo + message */}
        <div className="flex items-center gap-3 min-w-0">
          <span className="text-2xl">🧊</span>
          <div className="min-w-0">
            <h1 className="text-lg font-black leading-tight">
              <span className="shimmer-text">AlkoholFreez</span>
            </h1>
            <p className="text-xs text-text-muted truncate">{getMessage()}</p>
          </div>
        </div>

        {/* Center: Stats row */}
        <div className="hidden md:flex items-center gap-1 glass-card rounded-full px-2 py-0.5">
          <Stat icon="🔥" value={currentStreak} suffix="d" label="passa" />
          <div className="w-px h-4 bg-border" />
          <Stat icon="🏆" value={longestStreak} suffix="d" label="rekord" />
          <div className="w-px h-4 bg-border" />
          <Stat icon="✅" value={totalDays} label="dni" />
          <div className="w-px h-4 bg-border" />
          <Stat icon="📅" value={daysIntoChallenge} label="dzień" />
          <div className="w-px h-4 bg-border" />
          <Stat icon="⏳" value={daysRemaining} label="zostało" />
        </div>

        {/* Mobile stats: just streak */}
        <div className="flex md:hidden items-center gap-1 glass-card rounded-full px-2 py-0.5">
          <Stat icon="🔥" value={currentStreak} suffix="d" label="passa" />
          <div className="w-px h-4 bg-border" />
          <Stat icon="✅" value={totalDays} label="dni" />
        </div>

        {/* Right: User menu */}
        <div className="relative flex-shrink-0">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center gap-2 px-2.5 py-1.5 rounded-full glass-card text-xs font-medium cursor-pointer hover:border-white/10 transition-colors"
          >
            {user?.photoURL ? (
              <img src={user.photoURL} alt="" className="w-5 h-5 rounded-full" referrerPolicy="no-referrer" />
            ) : (
              <span>☁️</span>
            )}
            <div className={`w-2 h-2 rounded-full ${color} ${animate ? 'animate-pulse' : ''}`} />
          </button>

          <AnimatePresence>
            {menuOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setMenuOpen(false)} />
                <motion.div
                  initial={{ opacity: 0, y: -5, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -5, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-2 w-56 glass-card p-3 rounded-xl shadow-xl z-50"
                >
                  {user && (
                    <div className="mb-3 pb-3 border-b border-white/5">
                      <p className="text-xs font-semibold text-text-primary truncate">{user.displayName}</p>
                      <p className="text-xs text-text-muted truncate">{user.email}</p>
                    </div>
                  )}

                  {/* Mobile-only full stats */}
                  <div className="md:hidden mb-3 pb-3 border-b border-white/5 grid grid-cols-2 gap-1 text-xs text-text-secondary">
                    <div>🏆 Rekord: {longestStreak}d</div>
                    <div>📅 Dzień: {daysIntoChallenge}</div>
                    <div>⏳ Zostało: {daysRemaining}</div>
                    <div>📊 Postęp: {Math.round(progressPercent)}%</div>
                  </div>

                  <button
                    onClick={() => { setMenuOpen(false); onLogout(); }}
                    className="w-full text-left text-xs text-red-400 hover:text-red-300 transition-colors py-1.5 px-2 rounded-lg hover:bg-white/5"
                  >
                    Wyloguj się
                  </button>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Slim progress bar */}
      <div className="max-w-[1600px] mx-auto mt-2">
        <div className="h-1.5 bg-bg-primary/50 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            className="h-full rounded-full"
            style={{ background: 'linear-gradient(90deg, #10b981, #34d399, #6ee7b7)' }}
          />
        </div>
        <div className="flex justify-between mt-0.5 text-[10px] text-text-muted">
          <span>30 sie</span>
          <span>{Math.round(progressPercent)}%</span>
          <span>30 lis</span>
        </div>
      </div>
    </motion.div>
  );
}
