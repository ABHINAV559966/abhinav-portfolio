import {
  doc, setDoc, getDoc, onSnapshot,
  collection, addDoc, getDocs, query, orderBy, updateDoc
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from './firebase';

const RESUME_DOC = doc(db, 'resume', 'current');
const HISTORY_COL = collection(db, 'resume', 'current', 'history');

export const getCurrentResume = async () => {
  const snap = await getDoc(RESUME_DOC);
  return snap.exists() ? snap.data() : null;
};

export const subscribeToResume = (callback) => {
  return onSnapshot(RESUME_DOC, (snap) => {
    callback(snap.exists() ? snap.data() : null);
  });
};

export const uploadResume = async (file, adminUID) => {
  if (!file || file.type !== 'application/pdf') {
    throw new Error('Only PDF files are allowed.');
  }
  if (file.size > 10 * 1024 * 1024) {
    throw new Error('File size must be under 10MB.');
  }

  const storageRef = ref(storage, 'resume/latest-resume.pdf');
  await uploadBytes(storageRef, file);
  const pdfURL = await getDownloadURL(storageRef);
  const now = new Date();

  // Save current
  await setDoc(RESUME_DOC, {
    pdfURL,
    fileName: file.name,
    updatedAt: now,
    uploadedBy: adminUID,
  });

  // Save to history
  await addDoc(HISTORY_COL, {
    pdfURL,
    fileName: file.name,
    uploadedAt: now,
    uploadedBy: adminUID,
    isCurrent: true,
  });

  return pdfURL;
};

export const getResumeHistory = async () => {
  const q = query(HISTORY_COL, orderBy('uploadedAt', 'desc'));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
};

export const deleteResume = async () => {
  try {
    await deleteObject(ref(storage, 'resume/latest-resume.pdf'));
  } catch (e) {
    console.warn('Resume file delete:', e);
  }
  await setDoc(RESUME_DOC, { pdfURL: null, fileName: null, updatedAt: new Date() });
};
