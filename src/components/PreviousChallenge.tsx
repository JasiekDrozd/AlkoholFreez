import { motion } from 'framer-motion';

export function PreviousChallenge() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="glass-card p-5"
    >
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="text-sm font-medium text-text-primary">Previous challenge</h3>
          <p className="text-[11px] text-text-muted">Feb — May 2026</p>
        </div>
        <div className="w-8 h-8 rounded-lg border border-border flex items-center justify-center">
          <svg className="w-4 h-4 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M18.75 4.236c.982.143 1.954.317 2.916.52A6.003 6.003 0 0016.27 9.728M18.75 4.236V4.5c0 2.108-.966 3.99-2.48 5.228m0 0a6.003 6.003 0 01-5.54 0" />
          </svg>
        </div>
      </div>

      <div className="flex items-baseline gap-2 mb-3">
        <span className="text-2xl font-semibold text-text-primary tabular-nums">120</span>
        <span className="text-xs text-text-muted">days alcohol-free</span>
      </div>

      <div className="h-1 bg-border-subtle rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 1.5, delay: 0.8, ease: 'easeOut' }}
          className="h-full rounded-full bg-accent"
        />
      </div>
      <p className="text-[11px] text-accent mt-1.5 font-medium">
        Completed
      </p>
    </motion.div>
  );
}
