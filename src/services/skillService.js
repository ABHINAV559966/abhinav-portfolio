import {
  collection, doc, addDoc, updateDoc, deleteDoc,
  getDocs, onSnapshot, query, orderBy, writeBatch
} from 'firebase/firestore';
import { db } from './firebase';

const SKILLS_COL = collection(db, 'skills');

export const subscribeToSkills = (callback) => {
  const q = query(SKILLS_COL, orderBy('order', 'asc'));
  return onSnapshot(q, (snap) => {
    const skills = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    callback(skills);
  });
};

export const getSkills = async () => {
  const q = query(SKILLS_COL, orderBy('order', 'asc'));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
};

export const addSkill = async (skill) => {
  const skills = await getSkills();
  const order = skills.length > 0 ? Math.max(...skills.map((s) => s.order || 0)) + 1 : 0;
  return addDoc(SKILLS_COL, { ...skill, order, createdAt: new Date() });
};

export const updateSkill = async (id, data) => {
  await updateDoc(doc(db, 'skills', id), data);
};

export const deleteSkill = async (id) => {
  await deleteDoc(doc(db, 'skills', id));
};

export const reorderSkills = async (skills) => {
  const batch = writeBatch(db);
  skills.forEach((skill, index) => {
    batch.update(doc(db, 'skills', skill.id), { order: index });
  });
  await batch.commit();
};
