import {
  collection, doc, addDoc, updateDoc, deleteDoc,
  getDocs, onSnapshot, query, orderBy
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from './firebase';

const CERTS_COL = collection(db, 'certificates');

export const subscribeToCertificates = (callback) => {
  const q = query(CERTS_COL, orderBy('date', 'desc'));
  return onSnapshot(q, (snap) => {
    const certs = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    callback(certs);
  });
};

export const getAllCertificates = async () => {
  const q = query(CERTS_COL, orderBy('date', 'desc'));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
};

export const addCertificate = async (certData, file) => {
  const docRef = await addDoc(CERTS_COL, {
    ...certData,
    fileURL: null,
    storagePath: null,
    fileType: null,
    createdAt: new Date(),
  });

  if (file) {
    const storagePath = `certificates/${docRef.id}/certificate-file`;
    const storageRef = ref(storage, storagePath);
    await uploadBytes(storageRef, file);
    const fileURL = await getDownloadURL(storageRef);
    const fileType = file.type === 'application/pdf' ? 'pdf' : 'image';
    await updateDoc(docRef, { fileURL, storagePath, fileType });
  }

  return docRef.id;
};

export const updateCertificate = async (id, certData, file) => {
  let updates = { ...certData };

  if (file) {
    if (certData.storagePath) {
      try {
        await deleteObject(ref(storage, certData.storagePath));
      } catch (e) {
        console.warn('Old cert file not found:', e);
      }
    }
    const storagePath = `certificates/${id}/certificate-file`;
    const storageRef = ref(storage, storagePath);
    await uploadBytes(storageRef, file);
    const fileURL = await getDownloadURL(storageRef);
    const fileType = file.type === 'application/pdf' ? 'pdf' : 'image';
    updates = { ...updates, fileURL, storagePath, fileType };
  }

  await updateDoc(doc(db, 'certificates', id), { ...updates, updatedAt: new Date() });
};

export const deleteCertificate = async (id, storagePath) => {
  if (storagePath) {
    try {
      await deleteObject(ref(storage, storagePath));
    } catch (e) {
      console.warn('Cert file delete skipped:', e);
    }
  }
  await deleteDoc(doc(db, 'certificates', id));
};
