import { useState, useEffect } from 'react';
import { subscribeToProjects } from '@services/projectService';

export const useProjects = (adminMode = false) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = subscribeToProjects(adminMode, (data) => {
      setProjects(data);
      setLoading(false);
    });
    return unsub;
  }, [adminMode]);

  return { projects, loading };
};
