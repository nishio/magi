// read data from firestore
import { useRouter } from "next/router";
import Head from "next/head";
import { GetStaticProps, GetStaticPaths } from "next";
import {
  getFirestore,
  collection,
  getDoc,
  getDocs,
  doc,
} from "firebase/firestore";

import "../../app/globals.css";
import { takeOpinion } from "../../lib/takeOpinion";
import { Navigation } from "../../components/Navigation";
import { DiscussionView } from "../../components/DiscussionView";
import { Discussion } from "@/lib/data";
import { firebaseConfig } from "@/lib/firestore_app";
import { initializeApp } from "firebase/app";
import { FooterNavigation } from "@/components/FooterNavigation";
import { DiscussionHead } from "@/components/DiscussionHead";

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = [] as { params: { id: string } }[];
  const app = initializeApp(firebaseConfig);
  const firestore = getFirestore(app);
  const querySnapshot = await getDocs(collection(firestore, "topics"));
  querySnapshot.forEach((doc) => {
    paths.push({ params: { id: doc.id } });
  });
  // console.log(paths);
  return { paths, fallback: "blocking" };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const id_ = context.params?.id;
  // if id is undefined, redirect to root page
  if (id_ === undefined) {
    return { redirect: { destination: "/", permanent: false } };
  }
  // if multiple ids are passed, use the first one
  const id = Array.isArray(id_) ? id_[0] : id_;
  // console.log({ id });

  const app = initializeApp(firebaseConfig);
  const firestore = getFirestore(app);
  const docRef = doc(firestore, "topics", id);
  // console.log(docRef);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) {
    return { notFound: true };
  }
  // console.log(docSnap);

  const discussion = docSnap.data();
  discussion.createdAt = discussion.createdAt.toDate().toISOString();
  discussion.id = id;
  // console.log({ discussion });
  return { props: { discussion } };
};

const DiscussionPage = ({ discussion }: { discussion: Discussion }) => {
  return (
    <>
      <DiscussionHead discussion={discussion} />{" "}
      <div className="bg-slate-800 text-white min-h-screen">
        <div className="md:mx-4 md:my-4">
          <Navigation />
          <DiscussionView discussion={discussion} />
          <FooterNavigation />
        </div>
      </div>
    </>
  );
};

export default DiscussionPage;
