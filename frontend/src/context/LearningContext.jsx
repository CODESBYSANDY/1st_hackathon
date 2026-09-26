import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { DEFAULT_STUDENT_STATE } from '../data/mock/studentStateMock';
import { checkBackendHealth } from '../services/api/healthService';
import {
  subscribeToAuth,
  loginWithGoogle,
  loginAsDemoUser,
  logoutFromFirebase,
  getSavedAuthUser
} from '../services/firebase';

const LearningContext = createContext();

export const LearningProvider = ({ children }) => {
  const [activeDomain, setActiveDomain] = useState(() => {
    return localStorage.getItem('netra_domain') || 'web';
  });

  const [studentState, setStudentState] = useState(() => {
    const saved = localStorage.getItem('netra_student_state');
    const base = saved ? JSON.parse(saved) : DEFAULT_STUDENT_STATE;
    const authUser = getSavedAuthUser();
    if (authUser) {
      return {
        ...base,
        student: {
          ...base.student,
          id: authUser.uid,
          name: authUser.name,
          email: authUser.email,
          avatar: authUser.avatar,
          isFirebaseSynced: true,
          firebaseProject: 'placementpreparation-c7798'
        }
      };
    }
    return base;
  });

  const [authUser, setAuthUser] = useState(() => getSavedAuthUser());
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const [authError, setAuthError] = useState(null);

  const [backendHealth, setBackendHealth] = useState({
    isOnline: false,
    service: 'Checking...',
    status: 'checking'
  });

  // Verify backend connectivity on load
  useEffect(() => {
    let isMounted = true;
    checkBackendHealth().then((health) => {
      if (isMounted) setBackendHealth(health);
    });
    return () => { isMounted = false; };
  }, []);

  // Listen to Firebase auth changes & synchronize with student state
  useEffect(() => {
    const unsubscribe = subscribeToAuth((user) => {
      setAuthUser(user);
      if (user) {
        setStudentState((prev) => {
          const updated = {
            ...prev,
            student: {
              ...prev.student,
              id: user.uid,
              name: user.name,
              email: user.email,
              avatar: user.avatar,
              isFirebaseSynced: true,
              firebaseProject: 'placementpreparation-c7798'
            }
          };
          localStorage.setItem('netra_student_state', JSON.stringify(updated));
          return updated;
        });
      }
    });

    return () => {
      if (typeof unsubscribe === 'function') unsubscribe();
    };
  }, []);

  // Login with Google Action
  const handleGoogleSignIn = useCallback(async () => {
    setIsAuthLoading(true);
    setAuthError(null);
    try {
      const result = await loginWithGoogle();
      if (!result.success) {
        setAuthError(result.error || 'Failed to sign in with Google');
        return { success: false, error: result.error, code: result.code };
      }
      setAuthUser(result.user);
      setStudentState((prev) => {
        const updated = {
          ...prev,
          student: {
            ...prev.student,
            id: result.user.uid,
            name: result.user.name,
            email: result.user.email,
            avatar: result.user.avatar,
            isFirebaseSynced: true,
            firebaseProject: 'placementpreparation-c7798'
          }
        };
        localStorage.setItem('netra_student_state', JSON.stringify(updated));
        return updated;
      });
      return { success: true, user: result.user };
    } catch (err) {
      setAuthError(err.message);
      return { success: false, error: err.message };
    } finally {
      setIsAuthLoading(false);
    }
  }, []);

  // Guest / Demo Sign In Action
  const handleDemoSignIn = useCallback(async (role) => {
    setIsAuthLoading(true);
    setAuthError(null);
    try {
      const result = await loginAsDemoUser(role);
      setAuthUser(result.user);
      setStudentState((prev) => {
        const updated = {
          ...prev,
          student: {
            ...prev.student,
            id: result.user.uid,
            name: result.user.name,
            email: result.user.email,
            avatar: result.user.avatar,
            isFirebaseSynced: true,
            firebaseProject: 'placementpreparation-c7798'
          }
        };
        localStorage.setItem('netra_student_state', JSON.stringify(updated));
        return updated;
      });
      return { success: true, user: result.user };
    } catch (err) {
      setAuthError(err.message);
      return { success: false, error: err.message };
    } finally {
      setIsAuthLoading(false);
    }
  }, []);

  // Sign Out Action
  const handleSignOut = useCallback(async () => {
    setIsAuthLoading(true);
    try {
      await logoutFromFirebase();
      setAuthUser(null);
      setStudentState(DEFAULT_STUDENT_STATE);
      localStorage.removeItem('netra_auth_user');
      localStorage.removeItem('netra_student_state');
    } finally {
      setIsAuthLoading(false);
    }
  }, []);

  // Sync domain preference
  const selectDomain = (domainId) => {
    setActiveDomain(domainId);
    localStorage.setItem('netra_domain', domainId);
    setStudentState(prev => ({
      ...prev,
      student: { ...prev.student, domain: domainId }
    }));
  };

  // Add XP and Coins rewards
  const addRewards = (xpAmount = 0, coinsAmount = 0) => {
    setStudentState(prev => {
      const nextState = {
        ...prev,
        progress: {
          ...prev.progress,
          xp: prev.progress.xp + xpAmount,
          coins: prev.progress.coins + coinsAmount
        }
      };
      localStorage.setItem('netra_student_state', JSON.stringify(nextState));
      return nextState;
    });
  };

  // Complete a mission
  const completeMission = (missionId, xpReward = 20, coinReward = 10) => {
    addRewards(xpReward, coinReward);
  };

  return (
    <LearningContext.Provider
      value={{
        activeDomain,
        selectDomain,
        studentState,
        setStudentState,
        addRewards,
        completeMission,
        backendHealth,
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

