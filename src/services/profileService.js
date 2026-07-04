import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from './firebase';

const PROFILE_DOC = doc(db, 'profile', 'main');

export const getProfile = async () => {
  const snap = await getDoc(PROFILE_DOC);
  return snap.exists() ? snap.data() : null;
};

export const updateProfile = async (data) => {
  await setDoc(PROFILE_DOC, data, { merge: true });
};

export const subscribeToProfile = (callback) => {
  return onSnapshot(PROFILE_DOC, (snap) => {
    callback(snap.exists() ? snap.data() : null);
  });
};

export const uploadProfileImage = async (file) => {
  const storageRef = ref(storage, 'profile/profile-image');
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);
  await setDoc(PROFILE_DOC, { imageURL: url }, { merge: true });
  return url;
};

export const deleteProfileImage = async () => {
  try {
    const storageRef = ref(storage, 'profile/profile-image');
    await deleteObject(storageRef);
    await setDoc(PROFILE_DOC, { imageURL: null }, { merge: true });
  } catch (e) {
    console.error('Delete profile image:', e);
  }
};
