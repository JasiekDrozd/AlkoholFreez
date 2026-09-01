import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { DayCell } from './DayCell';
import { dateToStr, today as getToday, CHALLENGE_START, CHALLENGE_END } from '../utils/dates';
import confetti from 'canvas-confetti';

interface CalendarProps {
  markedDays: Set<string>;
  toggleDay: (dateStr: string) => void;
  isMarked: (dateStr: string) => boolean;
}

const WEEKDAYS = ['Pn', 'Wt', 'Sr', 'Cz', 'Pt', 'Sb', 'Nd'];
const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

function getMonthDays(year: number, month: number): Date[] {
  const days: Date[] = [];
  const d = new Date(year, month, 1);
  while (d.getMonth() === month) {
    days.push(new Date(d));
    d.setDate(d.getDate() + 1);
  }
  return days;
}

function fireConfetti() {
  const defaults = {
    origin: { y: 0.7 },
    colors: ['#22c55e', '#4ade80', '#86efac', '#ffffff', '#a1a1aa'],
    zIndex: 9999,
  };
  confetti({ ...defaults, particleCount: 60, spread: 55, startVelocity: 28 });
  confetti({ ...defaults, particleCount: 30, spread: 90, startVelocity: 40, decay: 0.92 });
}

function ConfirmDialog({ day, onConfirm, onCancel }: { day: number; onConfirm: () => void; onCancel: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      onClick={onCancel}
    >
      <div className="fixed inset-0 bg-black/60" />
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.15 }}
        className="relative glass-card p-5 max-w-xs w-full text-center"
        onClick={e => e.stopPropagation()}
      >
        <p className="text-sm text-text-primary mb-1">Unmark day {day}?</p>
        <p className="text-xs text-text-muted mb-4">This will remove the day from your streak.</p>
        <div className="flex gap-2">
          <button
            onClick={onCancel}
            className="flex-1 px-3 py-2 text-xs rounded-lg border border-border text-text-secondary hover:bg-bg-card-hover transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-3 py-2 text-xs rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-colors cursor-pointer"
          >
            Unmark
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function MonthGrid({
  year, month, isMarked, toggleDay, onUnmarkRequest,
}: {
  year: number; month: number;
  isMarked: (s: string) => boolean;
  toggleDay: (s: string) => void;
  onUnmarkRequest: (dateStr: string, day: number) => void;
}) {
  const days = getMonthDays(year, month);
  const firstDayOfWeek = (days[0].getDay() + 6) % 7;
  const t = getToday();

  const handleClick = (dateStr: string, day: number) => {
    const wasMarked = isMarked(dateStr);
    if (wasMarked) {
      onUnmarkRequest(dateStr, day);
    } else {
      toggleDay(dateStr);
      fireConfetti();
    }
  };

  return (
    <div className="glass-card p-4">
      <h3 className="text-sm font-medium text-text-secondary text-center mb-3 tracking-wide uppercase">
        {MONTH_NAMES[month]} {year}
      </h3>

      <div className="grid grid-cols-7 gap-0.5 mb-1">
        {WEEKDAYS.map(day => (
          <div key={day} className="text-center text-[10px] font-medium text-text-muted py-1">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-0.5">
        {Array.from({ length: firstDayOfWeek }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}
        {days.map(date => {
          const dateStr = dateToStr(date);
          const todayStr = dateToStr(t);
          const startStr = dateToStr(CHALLENGE_START);
          const endStr = dateToStr(CHALLENGE_END);
          const isInRange = dateStr >= startStr && dateStr <= endStr;
          const isFuture = dateStr > todayStr;
          const isToday = dateStr === todayStr;

          return (
            <DayCell
              key={dateStr}
              date={date}
              dateStr={dateStr}
              isMarked={isMarked(dateStr)}
              isToday={isToday}
              isInRange={isInRange}
              isFuture={isFuture}
              onClick={() => handleClick(dateStr, date.getDate())}
            />
          );
        })}
      </div>
    </div>
  );
}

export function Calendar({ isMarked, toggleDay }: CalendarProps) {
  const [confirmTarget, setConfirmTarget] = useState<{ dateStr: string; day: number } | null>(null);

  const months = [
    { year: 2026, month: 7 },
    { year: 2026, month: 8 },
    { year: 2026, month: 9 },
    { year: 2026, month: 10 },
  ];

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
        {months.map(({ year, month }, index) => (
          <motion.div
            key={`${year}-${month}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08, duration: 0.4 }}
          >
            <MonthGrid
              year={year}
              month={month}
              isMarked={isMarked}
              toggleDay={toggleDay}
              onUnmarkRequest={(dateStr, day) => setConfirmTarget({ dateStr, day })}
            />
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {confirmTarget && (
          <ConfirmDialog
            day={confirmTarget.day}
            onConfirm={() => {
              toggleDay(confirmTarget.dateStr);
              setConfirmTarget(null);
            }}
            onCancel={() => setConfirmTarget(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
