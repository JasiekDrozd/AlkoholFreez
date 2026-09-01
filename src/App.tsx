import { Header } from './components/Header';
import { Calendar } from './components/Calendar';
import { Stats } from './components/Stats';
import { MotivationalCard } from './components/MotivationalCard';
import { PreviousChallenge } from './components/PreviousChallenge';
import { SyncBadge } from './components/SyncBadge';
import { LoginScreen } from './components/LoginScreen';
import { useTracker } from './hooks/useTracker';
import { useAuth } from './hooks/useAuth';

function App() {
  const { user, loading, error, signInWithGoogle, logout } = useAuth();
  const tracker = useTracker(user?.uid ?? null);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-4 animate-pulse">🧊</div>
          <p className="text-text-secondary text-sm">Ładowanie...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <LoginScreen onSignIn={signInWithGoogle} error={error} loading={loading} />;
  }

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 pb-12 max-w-[1600px] mx-auto">
      <SyncBadge status={tracker.syncStatus} user={user} onLogout={logout} />
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
