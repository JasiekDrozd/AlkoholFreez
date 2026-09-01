import { useState, useCallback, useEffect, useRef } from 'react';
import { dateToStr, strToDate, getDaysBetween, CHALLENGE_START, CHALLENGE_END, today as getToday } from '../utils/dates';
import { db, auth } from '../firebase';
import { doc, setDoc, onSnapshot } from 'firebase/firestore';
import { signInAnonymously, onAuthStateChanged } from 'firebase/auth';

const STORAGE_KEY = 'alkoholfreez-days';
const FIRESTORE_COLLECTION = 'trackers';
const FIRESTORE_DOC = 'jasiek';

export interface TrackerData {
  markedDays: Set<string>;
  toggleDay: (dateStr: string) => void;
  isMarked: (dateStr: string) => boolean;
  currentStreak: number;
  longestStreak: number;
  totalDays: number;
  challengeStart: Date;
  challengeEnd: Date;
  daysIntoChallenge: number;
  daysRemaining: number;
  progressPercent: number;
  previousStreak: { start: string; end: string; days: number };
  syncStatus: 'connecting' | 'synced' | 'offline';
}

function loadMarkedDays(): Set<string> {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return new Set(JSON.parse(stored));
    }
  } catch {
    // ignore
  }
  return new Set<string>();
}

function saveMarkedDays(days: Set<string>): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...days]));
}

function calculateCurrentStreak(markedDays: Set<string>): number {
  const t = getToday();
  let streak = 0;
  const d = new Date(t);

  while (true) {
    const str = dateToStr(d);
    if (markedDays.has(str)) {
      streak++;
      d.setDate(d.getDate() - 1);
    } else {
      break;
    }
  }
  return streak;
}

function calculateLongestStreak(markedDays: Set<string>): number {
  if (markedDays.size === 0) return 0;

  const sorted = [...markedDays].sort();
  let longest = 1;
  let current = 1;

  for (let i = 1; i < sorted.length; i++) {
    const prev = strToDate(sorted[i - 1]);
    const curr = strToDate(sorted[i]);
    const diff = getDaysBetween(prev, curr);

    if (diff === 1) {
      current++;
      longest = Math.max(longest, current);
    } else {
      current = 1;
    }
  }
  return longest;
}

export function useTracker(): TrackerData {
  const [markedDays, setMarkedDays] = useState<Set<string>>(loadMarkedDays);
  const [syncStatus, setSyncStatus] = useState<'connecting' | 'synced' | 'offline'>('connecting');
  const isRemoteUpdate = useRef(false);
  const authReady = useRef(false);

  // Sign in anonymously and listen to Firestore
  useEffect(() => {
    let unsubFirestore: (() => void) | null = null;

    const unsubAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        authReady.current = true;
        const docRef = doc(db, FIRESTORE_COLLECTION, FIRESTORE_DOC);

        unsubFirestore = onSnapshot(
          docRef,
          (snapshot) => {
            if (snapshot.exists()) {
              const data = snapshot.data();
              const remoteDays: string[] = data.markedDays || [];
              isRemoteUpdate.current = true;
              const newSet = new Set(remoteDays);
              setMarkedDays(newSet);
              saveMarkedDays(newSet);
            }
            setSyncStatus('synced');
          },
          () => {
            setSyncStatus('offline');
          }
        );
      }
    });

    signInAnonymously(auth).catch(() => {
      setSyncStatus('offline');
    });

    return () => {
      unsubAuth();
      unsubFirestore?.();
    };
  }, []);

  // Sync local changes to Firestore
  useEffect(() => {
    if (isRemoteUpdate.current) {
      isRemoteUpdate.current = false;
      return;
    }

    saveMarkedDays(markedDays);

    if (authReady.current) {
      const docRef = doc(db, FIRESTORE_COLLECTION, FIRESTORE_DOC);
      setDoc(docRef, { markedDays: [...markedDays] }, { merge: true }).catch(() => {
        setSyncStatus('offline');
      });
    }
  }, [markedDays]);

  const toggleDay = useCallback((dateStr: string) => {
    setMarkedDays(prev => {
      const next = new Set(prev);
      if (next.has(dateStr)) {
        next.delete(dateStr);
      } else {
        next.add(dateStr);
      }
      return next;
    });
  }, []);

  const isMarked = useCallback(
    (dateStr: string) => markedDays.has(dateStr),
    [markedDays]
  );

  const t = getToday();
  const totalChallengeDays = getDaysBetween(CHALLENGE_START, CHALLENGE_END) + 1;
  const daysIntoChallenge = Math.max(0, getDaysBetween(CHALLENGE_START, t) + 1);
  const daysRemaining = Math.max(0, getDaysBetween(t, CHALLENGE_END));
  const progressPercent = Math.min(100, (daysIntoChallenge / totalChallengeDays) * 100);

  return {
    markedDays,
    toggleDay,
    isMarked,
    currentStreak: calculateCurrentStreak(markedDays),
    longestStreak: calculateLongestStreak(markedDays),
    totalDays: markedDays.size,
    challengeStart: CHALLENGE_START,
    challengeEnd: CHALLENGE_END,
    daysIntoChallenge,
    daysRemaining,
    progressPercent,
    previousStreak: {
      start: '2026-02-01',
      end: '2026-05-31',
      days: 120,
    },
    syncStatus,
  };
}
