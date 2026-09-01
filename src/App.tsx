import { Calendar } from './components/Calendar';
import { MotivationalCard } from './components/MotivationalCard';
import { PreviousChallenge } from './components/PreviousChallenge';
import { TopBar } from './components/TopBar';
import { LoginScreen } from './components/LoginScreen';
import { useTracker } from './hooks/useTracker';
import { useAuth } from './hooks/useAuth';

function App() {
  const { user, loading, error, signInWithGoogle, signInAnon, logout, isLocalhost } = useAuth();
  const tracker = useTracker(user?.uid ?? null);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-5 h-5 border-2 border-border border-t-accent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <LoginScreen
        onSignIn={signInWithGoogle}
        onSignInAnon={signInAnon}
        showAnon={isLocalhost}
        error={error}
        loading={loading}
      />
    );
  }

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 pb-8 max-w-[1600px] mx-auto">
      <TopBar
        currentStreak={tracker.currentStreak}
        longestStreak={tracker.longestStreak}
        totalDays={tracker.totalDays}
        daysIntoChallenge={tracker.daysIntoChallenge}
        daysRemaining={tracker.daysRemaining}
        progressPercent={tracker.progressPercent}
        syncStatus={tracker.syncStatus}
        user={user}
        onLogout={logout}
      />

      <Calendar
        markedDays={tracker.markedDays}
        toggleDay={tracker.toggleDay}
        isMarked={tracker.isMarked}
      />

      <div className="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-3">
        <div className="lg:col-span-2">
          <MotivationalCard />
        </div>
        <PreviousChallenge />
      </div>
    </div>
  );
}

export default App;
