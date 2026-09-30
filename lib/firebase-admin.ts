import { getApps, initializeApp, getApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import firebaseConfig from '../firebase-applet-config.json';

const app = getApps().length === 0 
  ? initializeApp({ projectId: firebaseConfig.projectId }) 
  : getApp();

export const db = getFirestore(app);
export const leadsCollection = db.collection('leads');
