import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

export async function createOrGetDay(userId, dateStr) {
  const dayRef = doc(db, `users/${userId}/days/${dateStr}`);
  const docSnap = await getDoc(dayRef);

  if (!docSnap.exists()) {
    const newDay = {
      date: dateStr,
      createdAt: serverTimestamp(),
      lastUpdated: serverTimestamp(),
      pillars: {
        Body: [],
        Mind: [],
        Work: [],
        Tribe: [],
        Legacy: [],
      },
    };
    await setDoc(dayRef, newDay);
    return newDay;
  }

  return docSnap.data();
}
