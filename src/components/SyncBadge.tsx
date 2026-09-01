import { motion } from 'framer-motion';

interface SyncBadgeProps {
  status: 'connecting' | 'synced' | 'offline';
}

const config = {
  connecting: { color: 'bg-accent-amber', text: 'Łączenie...', icon: '⏳' },
  synced: { color: 'bg-accent-green', text: 'Zsynchronizowane', icon: '☁️' },
  offline: { color: 'bg-red-500', text: 'Offline (localStorage)', icon: '📴' },
};

export function SyncBadge({ status }: SyncBadgeProps) {
  const { color, text, icon } = config[status];

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-4 right-4 z-50"
    >
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full glass-card text-xs font-medium">
        <span>{icon}</span>
        <div className={`w-2 h-2 rounded-full ${color} ${status === 'connecting' ? 'animate-pulse' : ''}`} />
        <span className="text-text-secondary">{text}</span>
      </div>
    </motion.div>
  );
}
