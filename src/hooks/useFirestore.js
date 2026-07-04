import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '@services/firebase';

export const useFirestoreCollection = (collectionPath, orderByField = 'createdAt') => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      const col = collection(db, collectionPath);
      const q = query(col, orderBy(orderByField, 'desc'));
      const unsub = onSnapshot(
        q,
        (snap) => {
          setData(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
          setLoading(false);
        },
        (err) => {
          setError(err);
          setLoading(false);
        }
      );
      return unsub;
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  }, [collectionPath, orderByField]);

  return { data, loading, error };
};
