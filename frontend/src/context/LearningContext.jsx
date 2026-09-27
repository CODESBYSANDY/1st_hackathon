import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { checkBackendHealth } from '../services/api/healthService';
import { ApiClient } from '../services/api/client';
import {
  subscribeToAuth,
  loginWithGoogle,
  loginAsDemoUser,
  logoutFromFirebase,
  getSavedAuthUser
} from '../services/firebase';

const LearningContext = createContext();

/**
 * Empty student state — shown when no real data exists yet.
 * Safe defaults for all properties.
 */
const EMPTY_STUDENT_STATE = {
  student: {
    id: null,
    name: 'Student',
    email: null,
    avatar: null,
    domain: null,
    isFirebaseSynced: false,
  },
  progress: {
    overall: 0,
    xp: 0,
    streak: 0,
    coins: 0,
    levelNumber: 1,
    rank: 'Beginner',
    completedLessons: 0,
    totalLessons: 0,
  },
  current_activity: null,
  skills: {},
  weak_areas: [],
  strong_areas: [],
  next_action: null,
  recent_activities: [],
};

export const LearningProvider = ({ children }) => {
  const [activeDomain, setActiveDomain] = useState(() => {
    return localStorage.getItem('netra_domain') || null;
  });

  const [studentState, setStudentState] = useState(EMPTY_STUDENT_STATE);
  const [authUser, setAuthUser] = useState(() => getSavedAuthUser());
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const [authError, setAuthError] = useState(null);

  // Backend data states
  const [backendUser, setBackendUser] = useState(null);
  const [domains, setDomains] = useState([]);
  const [journey, setJourney] = useState(null);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [dataError, setDataError] = useState(null);
  const [backendHealth, setBackendHealth] = useState({
    isOnline: false,
    service: 'Checking...',
    status: 'checking'
  });

  const syncAttempted = useRef(false);

  // ─────────────────────────────────────────
  //  Backend Health Check
  // ─────────────────────────────────────────
  useEffect(() => {
    let isMounted = true;
    checkBackendHealth().then((health) => {
      if (isMounted) setBackendHealth(health);
    }).catch(() => {
      if (isMounted) {
        setBackendHealth({ isOnline: false, service: 'Offline', status: 'error' });
      }
    });
    return () => { isMounted = false; };
  }, []);

  // ─────────────────────────────────────────
  //  Fetch user profile from backend /users/me
  // ─────────────────────────────────────────
  const syncUserWithBackend = useCallback(async () => {
    if (!ApiClient.getAuthToken()) return null;
    try {
      const userData = await ApiClient.get('/users/me');
      setBackendUser(userData);
      if (userData?.selected_domain) {
        setActiveDomain(userData.selected_domain);
        localStorage.setItem('netra_domain', userData.selected_domain);
      }
      return userData;
    } catch (err) {
      console.warn('[AVIRA] /users/me failed:', err.message);
      setDataError('Unable to sync your learning profile.');
      return null;
    }
  }, []);

  // ─────────────────────────────────────────
  //  Fetch available domains
  // ─────────────────────────────────────────
  const fetchDomains = useCallback(async () => {
    try {
      const data = await ApiClient.get('/learning/domains');
      const domainList = Array.isArray(data) ? data : [];
      setDomains(domainList);
      return domainList;
    } catch (err) {
      console.warn('[AVIRA] /learning/domains failed:', err.message);
      return [];
    }
  }, []);

  // Fetch domains on initial load
  useEffect(() => {
    fetchDomains();
  }, [fetchDomains]);

  // ─────────────────────────────────────────
  //  Fetch journey for current domain
  // ─────────────────────────────────────────
  const fetchJourney = useCallback(async (domainId) => {
    if (!domainId || !ApiClient.getAuthToken()) return null;
    try {
      const data = await ApiClient.get(`/learning/domains/${domainId}/journey`);
      setJourney(data);

      // Update studentState skills from journey response if available
      if (data?.skills && typeof data.skills === 'object' && Object.keys(data.skills).length > 0) {
        setStudentState(prev => ({
          ...prev,
          skills: data.skills,
          progress: {
            ...prev?.progress,
            completedLessons: data.completed_count || 0,
            totalLessons: data.total_count || 0,
            overall: data.total_count > 0
              ? Math.round((data.completed_count / data.total_count) * 100)
              : 0,
          }
        }));
      }

      return data;
    } catch (err) {
      console.warn('[AVIRA] /journey failed:', err.message);
      return null;
    }
  }, []);

  // ─────────────────────────────────────────
  //  Full backend sync on auth
  // ─────────────────────────────────────────
  const fullBackendSync = useCallback(async () => {
    setIsLoadingData(true);
    setDataError(null);
    try {
      const [user, domainList] = await Promise.all([
        syncUserWithBackend(),
        fetchDomains(),
      ]);

      const domainToFetch = user?.selected_domain || activeDomain;
      if (domainToFetch) {
        await fetchJourney(domainToFetch);
      }
    } catch (err) {
      setDataError('Unable to sync your learning progress.');
    } finally {
      setIsLoadingData(false);
    }
  }, [syncUserWithBackend, fetchDomains, fetchJourney, activeDomain]);

  // ─────────────────────────────────────────
  //  Firebase Auth Listener
  // ─────────────────────────────────────────
  useEffect(() => {
    const unsubscribe = subscribeToAuth(async (user) => {
      setAuthUser(user);
      if (user) {
        // Update student state with auth user info
        setStudentState(prev => ({
          ...prev,
          student: {
            ...prev.student,
            id: user.uid,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            isFirebaseSynced: user.provider !== 'demo-guest',
          }
        }));

        // Sync with backend (only for real Firebase users)
        if (user.provider !== 'demo-guest' && !syncAttempted.current) {
          syncAttempted.current = true;
          setTimeout(() => fullBackendSync(), 200);
        }
      } else {
        setStudentState(EMPTY_STUDENT_STATE);
        setBackendUser(null);
        setJourney(null);
        syncAttempted.current = false;
      }
    });

    return () => {
      if (typeof unsubscribe === 'function') unsubscribe();
    };
  }, [fullBackendSync]);

  // ─────────────────────────────────────────
  //  Login with Google
  // ─────────────────────────────────────────
  const handleGoogleSignIn = useCallback(async () => {
    setIsAuthLoading(true);
    setAuthError(null);
    syncAttempted.current = false;
    try {
      const result = await loginWithGoogle();
      if (!result.success) {
        setAuthError(result.error || 'Failed to sign in with Google');
        return { success: false, error: result.error, code: result.code };
      }
      setAuthUser(result.user);
      return { success: true, user: result.user };
    } catch (err) {
      setAuthError(err.message);
      return { success: false, error: err.message };
    } finally {
      setIsAuthLoading(false);
    }
  }, []);

  // ─────────────────────────────────────────
  //  Guest / Demo Sign In
  // ─────────────────────────────────────────
  const handleDemoSignIn = useCallback(async (role) => {
    setIsAuthLoading(true);
    setAuthError(null);
    try {
      const result = await loginAsDemoUser(role);
      setAuthUser(result.user);
      setStudentState(prev => ({
        ...prev,
        student: {
          ...prev.student,
          id: result.user.uid,
          name: result.user.name,
          email: result.user.email,
          avatar: result.user.avatar,
          isFirebaseSynced: false,
        }
      }));
      // Fetch domains for demo user (public endpoint)
      fetchDomains();
      return { success: true, user: result.user };
    } catch (err) {
      setAuthError(err.message);
      return { success: false, error: err.message };
    } finally {
      setIsAuthLoading(false);
    }
  }, [fetchDomains]);

  // ─────────────────────────────────────────
  //  Sign Out
  // ─────────────────────────────────────────
  const handleSignOut = useCallback(async () => {
    setIsAuthLoading(true);
    try {
      await logoutFromFirebase();
      setAuthUser(null);
      setStudentState(EMPTY_STUDENT_STATE);
      setBackendUser(null);
      setJourney(null);
      setDomains([]);
      setActiveDomain(null);
      syncAttempted.current = false;
      localStorage.removeItem('netra_auth_user');
      localStorage.removeItem('netra_student_state');
      localStorage.removeItem('netra_domain');
    } finally {
      setIsAuthLoading(false);
    }
  }, []);

  // ─────────────────────────────────────────
  //  Domain Selection
  // ─────────────────────────────────────────
  const selectDomain = useCallback(async (domainId) => {
    if (!domainId) return;
    setActiveDomain(domainId);
    localStorage.setItem('netra_domain', domainId);
    setStudentState(prev => ({
      ...prev,
      student: { ...prev.student, domain: domainId }
    }));

    // Call backend to persist selection if authenticated
    if (ApiClient.getAuthToken()) {
      try {
        await ApiClient.post(`/learning/domains/${domainId}/select`);
        await fetchJourney(domainId);
      } catch (err) {
        console.warn('[AVIRA] Domain selection failed:', err.message);
      }
    }
  }, [fetchJourney]);

  // ─────────────────────────────────────────
  //  Safe Rewards updater
  // ─────────────────────────────────────────
  const addRewards = useCallback((xp = 0, coins = 0) => {
    setStudentState(prev => ({
      ...prev,
      progress: {
        ...prev?.progress,
        xp: (prev?.progress?.xp || 0) + (Number(xp) || 0),
        coins: (prev?.progress?.coins || 0) + (Number(coins) || 0),
      }
    }));
  }, []);

  // ─────────────────────────────────────────
  //  Retry backend sync
  // ─────────────────────────────────────────
  const retryBackendSync = useCallback(async () => {
    syncAttempted.current = false;
    setDataError(null);
    await fullBackendSync();
  }, [fullBackendSync]);

  return (
    <LearningContext.Provider
      value={{
        activeDomain,
        selectDomain,
        studentState,
        setStudentState,
        backendHealth,
        // Backend data
        backendUser,
        domains,
        journey,
        isLoadingData,
        dataError,
        retryBackendSync,
        fetchJourney,
        fetchDomains,
        addRewards,
        // Auth states & actions
        authUser,
        isAuthenticated: !!authUser,
        isAuthLoading,
        authError,
        handleGoogleSignIn,
        handleDemoSignIn,
        handleSignOut
      }}
    >
      {children}
    </LearningContext.Provider>
  );
};

export const useLearning = () => {
  const context = useContext(LearningContext);
  if (!context) {
    throw new Error('useLearning must be used within a LearningProvider');
  }
  return context;
};
