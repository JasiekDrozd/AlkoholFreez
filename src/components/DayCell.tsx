import { motion, AnimatePresence } from 'framer-motion';

interface DayCellProps {
  date: Date;
  dateStr: string;
  isMarked: boolean;
  isToday: boolean;
  isInRange: boolean;
  isFuture: boolean;
  onClick: () => void;
}

export function DayCell({ date, isMarked, isToday, isInRange, isFuture, onClick }: DayCellProps) {
  const day = date.getDate();
  const canClick = isInRange && !isFuture;

  return (
    <motion.button
      onClick={canClick ? onClick : undefined}
      className={`
        relative aspect-square rounded-xl flex items-center justify-center text-sm font-semibold
        transition-all duration-200 select-none
        ${canClick ? 'cursor-pointer' : 'cursor-default'}
        ${!isInRange ? 'opacity-20' : ''}
        ${isFuture && isInRange ? 'opacity-40' : ''}
        ${isToday ? 'ring-2 ring-accent-purple ring-offset-2 ring-offset-bg-primary' : ''}
        ${isMarked ? 'text-white' : 'text-text-secondary hover:text-text-primary'}
        ${!isMarked && canClick ? 'hover:bg-bg-card-hover' : ''}
      `}
      whileHover={canClick ? { scale: 1.08 } : {}}
      whileTap={canClick ? { scale: 0.92 } : {}}
      layout
    >
      <AnimatePresence mode="wait">
        {isMarked ? (
          <motion.div
            key="marked"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            className="absolute inset-0 rounded-xl bg-gradient-to-br from-accent-green to-emerald-600 flex items-center justify-center shadow-lg shadow-accent-green/25"
          >
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-white font-bold text-sm"
            >
              {day}
            </motion.span>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center shadow-md"
            >
              <svg className="w-2.5 h-2.5 text-accent-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </motion.div>
          </motion.div>
        ) : (
          <motion.span
            key="unmarked"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {day}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
