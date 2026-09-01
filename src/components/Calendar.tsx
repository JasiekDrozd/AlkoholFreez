import { motion } from 'framer-motion';
import { DayCell } from './DayCell';
import { dateToStr, today as getToday, CHALLENGE_START, CHALLENGE_END } from '../utils/dates';
import confetti from 'canvas-confetti';

interface CalendarProps {
  markedDays: Set<string>;
  toggleDay: (dateStr: string) => void;
  isMarked: (dateStr: string) => boolean;
}

const WEEKDAYS = ['Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'Sb', 'Nd'];
const MONTH_NAMES = [
  'Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec',
  'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'
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
  const count = 80;
  const defaults = {
    origin: { y: 0.7 },
    colors: ['#10b981', '#34d399', '#6ee7b7', '#a7f3d0', '#8b5cf6'],
    zIndex: 9999,
  };

  confetti({
    ...defaults,
    particleCount: count,
    spread: 60,
    startVelocity: 30,
  });

  confetti({
    ...defaults,
    particleCount: Math.floor(count / 2),
    spread: 100,
    startVelocity: 45,
    decay: 0.92,
  });
}

function MonthGrid({
  year,
  month,
  isMarked,
  toggleDay,
}: {
  year: number;
  month: number;
  isMarked: (s: string) => boolean;
  toggleDay: (s: string) => void;
}) {
  const days = getMonthDays(year, month);
  const firstDayOfWeek = (days[0].getDay() + 6) % 7;
  const t = getToday();

  const handleClick = (dateStr: string) => {
    const wasMarked = isMarked(dateStr);
    toggleDay(dateStr);
    if (!wasMarked) {
      fireConfetti();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass-card p-4 sm:p-6"
    >
      <h3 className="text-lg sm:text-xl font-bold text-center mb-4 text-text-primary">
        {MONTH_NAMES[month]} {year}
      </h3>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {WEEKDAYS.map(day => (
          <div key={day} className="text-center text-xs font-medium text-text-muted py-1">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
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
    </motion.div>
  );
}

export function Calendar({ isMarked, toggleDay }: CalendarProps) {
  const months = [
    { year: 2026, month: 7 },  // Sierpień
    { year: 2026, month: 8 },  // Wrzesień
    { year: 2026, month: 9 },  // Październik
    { year: 2026, month: 10 }, // Listopad
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
      {months.map(({ year, month }, index) => (
        <motion.div
          key={`${year}-${month}`}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
        >
          <MonthGrid
            year={year}
            month={month}
            isMarked={isMarked}
            toggleDay={toggleDay}
          />
        </motion.div>
      ))}
    </div>
  );
}
