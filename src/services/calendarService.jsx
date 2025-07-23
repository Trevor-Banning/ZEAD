import { db } from "../firebase";
import { collection, doc, getDoc, setDoc, getDocs } from "firebase/firestore";

const eventsCollection = collection(db, "events");

// Save array of events to a specific date
export async function saveEventsForDate(dateKey, items) {
  const docRef = doc(eventsCollection, dateKey);
  await setDoc(docRef, { items });
}

//Get all events for today
export async function getEventsForToday() {
  const today = new Date();
  const dateKey = `${today.getFullYear()}-${
    today.getMonth() + 1
  }-${today.getDate()}`;
  return await getEventsForDate(dateKey);
}

// Get all events for a specific date
export async function getEventsForDate(dateKey) {
  const docRef = doc(eventsCollection, dateKey);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? docSnap.data().items : [];
}

// Get the entire event map (all days w/ events)
export async function getAllEvents() {
  const snapshot = await getDocs(eventsCollection);
  const result = {};
  snapshot.forEach((doc) => {
    result[doc.id] = doc.data().items;
  });
  return result;
}
