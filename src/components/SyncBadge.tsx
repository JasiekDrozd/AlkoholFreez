import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import type { User } from 'firebase/auth';

interface SyncBadgeProps {
  status: 'connecting' | 'synced' | 'offline';
  user: User | null;
  onLogout: () => Promise<void>;
}

const statusConfig = {
  connecting: { color: 'bg-accent-amber', text: 'Łączenie...', animate: true },
  synced: { color: 'bg-accent-green', text: 'Zsynchronizowane', animate: false },
  offline: { color: 'bg-red-500', text: 'Offline', animate: false },
};

export function SyncBadge({ status, user, onLogout }: SyncBadgeProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { color, text, animate } = statusConfig[status];

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-4 right-4 z-50"
    >
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full glass-card text-xs font-medium cursor-pointer hover:border-white/10 transition-colors"
      >
        {user?.photoURL ? (
          <img
            src={user.photoURL}
            alt=""
            className="w-5 h-5 rounded-full"
            referrerPolicy="no-referrer"
          />
        ) : (
          <span>☁️</span>
        )}
        <div className={`w-2 h-2 rounded-full ${color} ${animate ? 'animate-pulse' : ''}`} />
        <span className="text-text-secondary hidden sm:inline">{text}</span>
      </button>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -5, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -5, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-56 glass-card p-3 rounded-xl shadow-xl"
          >
            {user && (
              <div className="mb-3 pb-3 border-b border-white/5">
                <p className="text-xs font-semibold text-text-primary truncate">
                  {user.displayName}
                </p>
                <p className="text-xs text-text-muted truncate">
                  {user.email}
                </p>
              </div>
            )}

            <div className="flex items-center gap-2 mb-3 text-xs text-text-secondary">
              <div className={`w-2 h-2 rounded-full ${color}`} />
              {text}
            </div>

            <button
              onClick={() => { setMenuOpen(false); onLogout(); }}
              className="w-full text-left text-xs text-red-400 hover:text-red-300 transition-colors py-1.5 px-2 rounded-lg hover:bg-white/5"
            >
              Wyloguj się
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
