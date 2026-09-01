import { Header } from './components/Header';
import { Calendar } from './components/Calendar';
import { Stats } from './components/Stats';
import { MotivationalCard } from './components/MotivationalCard';
import { PreviousChallenge } from './components/PreviousChallenge';
import { SyncBadge } from './components/SyncBadge';
import { useTracker } from './hooks/useTracker';

function App() {
  const tracker = useTracker();

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 pb-12 max-w-[1600px] mx-auto">
      <SyncBadge status={tracker.syncStatus} />
      <Header currentStreak={tracker.currentStreak} />

      <Stats
        currentStreak={tracker.currentStreak}
        longestStreak={tracker.longestStreak}
        totalDays={tracker.totalDays}
        daysIntoChallenge={tracker.daysIntoChallenge}
        daysRemaining={tracker.daysRemaining}
        progressPercent={tracker.progressPercent}
      />

      <div className="mt-6 sm:mt-8">
        <Calendar
          markedDays={tracker.markedDays}
          toggleDay={tracker.toggleDay}
          isMarked={tracker.isMarked}
        />
      </div>

      <div className="mt-6 sm:mt-8 grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="lg:col-span-2">
          <MotivationalCard />
        </div>
        <PreviousChallenge />
      </div>

      <footer className="mt-12 text-center text-xs text-text-muted pb-4">
        <p>Jasiek's AlkoholFreez Challenge · Wersja dla siebie 💚</p>
      </footer>
    </div>
  );
}

export default App;
