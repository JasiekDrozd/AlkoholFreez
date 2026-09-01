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
        relative aspect-square rounded-lg flex items-center justify-center text-sm font-medium
        transition-all duration-150 select-none
        ${canClick ? 'cursor-pointer' : 'cursor-default'}
        ${!isInRange ? 'opacity-15' : ''}
        ${isFuture && isInRange ? 'opacity-30' : ''}
        ${isToday && !isMarked ? 'ring-1 ring-text-muted ring-offset-1 ring-offset-bg-primary' : ''}
        ${isMarked ? 'text-bg-primary' : 'text-text-secondary'}
        ${!isMarked && canClick ? 'hover:bg-border-subtle' : ''}
      `}
      whileHover={canClick ? { scale: 1.06 } : {}}
      whileTap={canClick ? { scale: 0.94 } : {}}
      layout
    >
      <AnimatePresence mode="wait">
        {isMarked ? (
          <motion.div
            key="marked"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ type: 'spring', stiffness: 500, damping: 20 }}
            className="absolute inset-0 rounded-lg bg-accent flex items-center justify-center"
          >
            <span className="text-bg-primary font-semibold text-sm">{day}</span>
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
