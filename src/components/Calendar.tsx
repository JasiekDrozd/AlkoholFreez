import { motion } from 'framer-motion';
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

function MonthGrid({
  year, month, isMarked, toggleDay,
}: {
  year: number; month: number;
  isMarked: (s: string) => boolean;
  toggleDay: (s: string) => void;
}) {
  const days = getMonthDays(year, month);
  const firstDayOfWeek = (days[0].getDay() + 6) % 7;
  const t = getToday();

  const handleClick = (dateStr: string) => {
    const wasMarked = isMarked(dateStr);
    toggleDay(dateStr);
    if (!wasMarked) fireConfetti();
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
              onClick={() => handleClick(dateStr)}
            />
          );
        })}
      </div>
    </div>
  );
}

export function Calendar({ isMarked, toggleDay }: CalendarProps) {
  const months = [
    { year: 2026, month: 7 },
    { year: 2026, month: 8 },
    { year: 2026, month: 9 },
    { year: 2026, month: 10 },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
      {months.map(({ year, month }, index) => (
        <motion.div
          key={`${year}-${month}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.08, duration: 0.4 }}
        >
          <MonthGrid year={year} month={month} isMarked={isMarked} toggleDay={toggleDay} />
        </motion.div>
      ))}
    </div>
  );
}
