import { db } from "@/config";
import { addDoc, collection, getDocs } from "firebase/firestore";

export const firebaseClient = {
  async getAll(collectionName: string) {
    const snapshot = await getDocs(collection(db, collectionName));
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  },

  async add(collectionName: string, data: Record<string, any>) {
    const docRef = await addDoc(collection(db, collectionName), data);
    return docRef.id;
  },
};