import { useState, useEffect } from 'react';
import { subscribeToSkills } from '@services/skillService';

export const useSkills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = subscribeToSkills((data) => {
      setSkills(data);
      setLoading(false);
    });
    return unsub;
  }, []);

  return { skills, loading };
};
