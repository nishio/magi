import { initializeApp } from "firebase/app";
import { discussions } from "./data";
import * as QueryString from "qs";
import { firebaseConfig } from "./firestore_app";
import { doc, getDoc, getFirestore } from "firebase/firestore";

type paramType =
  | string
  | string[]
  | QueryString.ParsedQs
  | QueryString.ParsedQs[]
  | undefined;

export const get_discussion_by_id = async (id: paramType) => {
  id = Array.isArray(id) ? id[0] : id;
  if (typeof id !== "string") {
    throw new Error(`Invalid ID: ${id}`);
  }
  let discussion = discussions.find((d) => d.id === id);
  if (discussion) {
    return discussion;
  }

  // get from firestore
  const app = initializeApp(firebaseConfig);
  const firestore = getFirestore(app);
  const docRef = doc(firestore, "topics", id);
  // console.log(docRef);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) {
    throw new Error(`Not found: ${id}`);
  }
  // console.log(docSnap);

  const data = docSnap.data();
  discussion = {
    topic: data.topic,
    viewpoints: data.viewpoints,
    createdAt: data.createdAt.toDate().toISOString(),
    id: docSnap.id,
  };
  return discussion;
};
