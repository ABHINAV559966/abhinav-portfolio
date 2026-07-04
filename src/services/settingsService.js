import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';
import { db } from './firebase';

const SETTINGS_DOC = doc(db, 'siteSettings', 'main');

export const defaultSettings = {
  accentColor: '#06b6d4',
  visibleSections: {
    hero: true,
    about: true,
    education: true,
    skills: true,
    projects: true,
    resume: true,
    certificates: true,
    contact: true,
  },
  seoTitle: 'Abhinav Adabala | AI & Data Science Portfolio',
  seoDescription:
    'B.Tech CSE (AI & Data Science) student at Vel Tech, Chennai. Aspiring Software Developer building modern web applications and AI-powered solutions.',
  footerText: '© 2026 Abhinav Adabala. All rights reserved.',
};

export const getSettings = async () => {
  const snap = await getDoc(SETTINGS_DOC);
  return snap.exists() ? snap.data() : defaultSettings;
};

export const updateSettings = async (data) => {
  await setDoc(SETTINGS_DOC, data, { merge: true });
};

export const subscribeToSettings = (callback) => {
  return onSnapshot(SETTINGS_DOC, (snap) => {
    callback(snap.exists() ? snap.data() : defaultSettings);
  });
};
