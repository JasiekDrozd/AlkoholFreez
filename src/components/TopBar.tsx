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

function Stat({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex items-baseline gap-1 px-2.5 py-1">
      <span className="text-sm font-semibold text-text-primary tabular-nums">{value}</span>
      <span className="text-[11px] text-text-muted">{label}</span>
    </div>
  );
}

export function TopBar({
  currentStreak, longestStreak, totalDays, daysIntoChallenge, daysRemaining,
  progressPercent, syncStatus, user, onLogout,
}: TopBarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const syncDot = syncStatus === 'synced' ? 'bg-accent' :
                  syncStatus === 'connecting' ? 'bg-yellow-500 animate-pulse' :
                  'bg-red-500';

  return (
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-0 z-40 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-2.5 mb-4 border-b border-border-subtle"
      style={{ background: 'rgba(9,9,11,0.9)', backdropFilter: 'blur(12px)' }}
    >
      <div className="max-w-[1600px] mx-auto flex items-center justify-between gap-3">
        {/* Left: Logo */}
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-7 h-7 rounded-lg border border-border flex items-center justify-center flex-shrink-0">
            <svg className="w-3.5 h-3.5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <span className="text-sm font-semibold text-text-primary tracking-tight">AlkoholFreez</span>
        </div>

        {/* Center: Stats */}
        <div className="hidden md:flex items-center border border-border rounded-lg divide-x divide-border">
          <Stat value={currentStreak} label="streak" />
          <Stat value={longestStreak} label="best" />
          <Stat value={totalDays} label="total" />
          <Stat value={daysIntoChallenge} label="day" />
          <Stat value={daysRemaining} label="left" />
        </div>

        {/* Mobile: compact */}
        <div className="flex md:hidden items-center border border-border rounded-lg divide-x divide-border">
          <Stat value={currentStreak} label="streak" />
          <Stat value={totalDays} label="total" />
        </div>

        {/* Right: User */}
        <div className="relative flex-shrink-0">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center gap-2 px-2 py-1.5 rounded-lg border border-border text-xs cursor-pointer hover:bg-bg-card-hover transition-colors"
          >
            {user?.photoURL ? (
              <img src={user.photoURL} alt="" className="w-5 h-5 rounded-full" referrerPolicy="no-referrer" />
            ) : (
              <svg className="w-4 h-4 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
            )}
            <div className={`w-1.5 h-1.5 rounded-full ${syncDot}`} />
          </button>

          <AnimatePresence>
            {menuOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setMenuOpen(false)} />
                <motion.div
                  initial={{ opacity: 0, y: -4, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -4, scale: 0.97 }}
                  transition={{ duration: 0.12 }}
                  className="absolute right-0 mt-2 w-52 glass-card p-2.5 z-50"
                >
                  {user && (
                    <div className="mb-2 pb-2 border-b border-border px-1.5">
                      <p className="text-xs font-medium text-text-primary truncate">{user.displayName || 'Anonymous'}</p>
                      {user.email && <p className="text-[11px] text-text-muted truncate">{user.email}</p>}
                    </div>
                  )}

                  {/* Mobile stats */}
                  <div className="md:hidden mb-2 pb-2 border-b border-border grid grid-cols-2 gap-0.5 text-[11px] text-text-secondary px-1.5">
                    <div>Best: {longestStreak}d</div>
                    <div>Day: {daysIntoChallenge}</div>
                    <div>Left: {daysRemaining}</div>
                    <div>Progress: {Math.round(progressPercent)}%</div>
                  </div>

                  <button
                    onClick={() => { setMenuOpen(false); onLogout(); }}
                    className="w-full text-left text-xs text-text-muted hover:text-red-400 transition-colors py-1.5 px-1.5 rounded hover:bg-bg-card-hover flex items-center gap-2"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                    </svg>
                    Sign out
                  </button>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Progress bar */}
      <div className="max-w-[1600px] mx-auto mt-2">
        <div className="h-1 bg-border-subtle rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="h-full rounded-full bg-accent"
          />
        </div>
        <div className="flex justify-between mt-0.5 text-[10px] text-text-muted tabular-nums">
          <span>Aug 30</span>
          <span>{Math.round(progressPercent)}%</span>
          <span>Nov 30</span>
        </div>
      </div>
    </motion.div>
  );
}
