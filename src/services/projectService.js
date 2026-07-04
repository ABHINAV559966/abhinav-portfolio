import {
  collection, doc, addDoc, updateDoc, deleteDoc,
  getDocs, onSnapshot, query, orderBy, where, writeBatch
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from './firebase';

const PROJECTS_COL = collection(db, 'projects');

export const subscribeToProjects = (adminMode = false, callback) => {
  let q;
  if (adminMode) {
    q = query(PROJECTS_COL, orderBy('order', 'asc'));
  } else {
    q = query(PROJECTS_COL, where('published', '==', true), orderBy('order', 'asc'));
  }
  return onSnapshot(q, (snap) => {
    const projects = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    callback(projects);
  });
};

export const getProject = async (id) => {
  const { getDoc } = await import('firebase/firestore');
  const snap = await getDoc(doc(db, 'projects', id));
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
};

export const getAllProjects = async () => {
  const q = query(PROJECTS_COL, orderBy('order', 'asc'));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
};

export const addProject = async (projectData, imageFile) => {
  const projects = await getAllProjects();
  const order = projects.length > 0 ? Math.max(...projects.map((p) => p.order || 0)) + 1 : 0;
  let imageURL = null;
  let storagePath = null;

  const docRef = await addDoc(PROJECTS_COL, {
    ...projectData,
    imageURL: null,
    storagePath: null,
    order,
    createdAt: new Date(),
  });

  if (imageFile) {
    storagePath = `projects/${docRef.id}/cover-image`;
    const storageRef = ref(storage, storagePath);
    await uploadBytes(storageRef, imageFile);
    imageURL = await getDownloadURL(storageRef);
    await updateDoc(docRef, { imageURL, storagePath });
  }

  return { id: docRef.id, imageURL, storagePath };
};

export const updateProject = async (id, projectData, imageFile) => {
  let updates = { ...projectData };

  if (imageFile) {
    // Delete old image if exists
    if (projectData.storagePath) {
      try {
        await deleteObject(ref(storage, projectData.storagePath));
      } catch (e) {
        console.warn('Old project image not found:', e);
      }
    }
    const storagePath = `projects/${id}/cover-image`;
    const storageRef = ref(storage, storagePath);
    await uploadBytes(storageRef, imageFile);
    const imageURL = await getDownloadURL(storageRef);
    updates = { ...updates, imageURL, storagePath };
  }

  await updateDoc(doc(db, 'projects', id), { ...updates, updatedAt: new Date() });
};

export const deleteProject = async (id, storagePath) => {
  // Remove image from Storage first
  if (storagePath) {
    try {
      await deleteObject(ref(storage, storagePath));
    } catch (e) {
      console.warn('Project image delete skipped:', e);
    }
  }
  await deleteDoc(doc(db, 'projects', id));
};

export const reorderProjects = async (projects) => {
  const batch = writeBatch(db);
  projects.forEach((project, index) => {
    batch.update(doc(db, 'projects', project.id), { order: index });
  });
  await batch.commit();
};
