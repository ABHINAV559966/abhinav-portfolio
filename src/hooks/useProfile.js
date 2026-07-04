import { useState, useEffect } from 'react';
import { subscribeToProfile } from '@services/profileService';

export const useProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsub = subscribeToProfile((data) => {
      setProfile(data);
      setLoading(false);
    });
    return unsub;
  }, []);

  return { profile, loading, error };
};
