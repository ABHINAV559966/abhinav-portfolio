import {
  collection, addDoc, getDocs, onSnapshot, doc,
  updateDoc, deleteDoc, query, orderBy, serverTimestamp
} from 'firebase/firestore';
import { db } from './firebase';

const MESSAGES_COL = collection(db, 'contactMessages');

// Public: create message only
export const sendContactMessage = async (formData) => {
  await addDoc(MESSAGES_COL, {
    ...formData,
    read: false,
    createdAt: serverTimestamp(),
  });
};

// Admin only
export const subscribeToMessages = (callback) => {
  const q = query(MESSAGES_COL, orderBy('createdAt', 'desc'));
  return onSnapshot(q, (snap) => {
    const messages = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    callback(messages);
  });
};

export const markMessageRead = async (id, read = true) => {
  await updateDoc(doc(db, 'contactMessages', id), { read });
};

export const deleteMessage = async (id) => {
  await deleteDoc(doc(db, 'contactMessages', id));
};
