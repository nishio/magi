// read data from firestore
import { useRouter } from "next/router";
import Head from "next/head";
import { GetStaticProps, GetStaticPaths } from "next";
import { app } from "@/lib/firestore_app";
import {
  getFirestore,
  collection,
  getDoc,
  getDocs,
  doc,
  query,
  where,
} from "firebase/firestore";

import "../../app/globals.css";
import { takeOpinion } from "../../lib/takeOpinion";
import { Navigation } from "../../components/Navigation";
import { DiscussionView } from "../../components/DiscussionView";
import { Discussion } from "@/lib/data";

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = [] as { params: { id: string } }[];
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

  const firestore = getFirestore();
  const docRef = doc(firestore, "topics", id);
  // console.log(docRef);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) {
    return { notFound: true };
  }
  // console.log(docSnap);

  const discussion = docSnap.data();
  discussion.createdAt = discussion.createdAt.toDate().toISOString();
  // console.log({ discussion });
  return { props: { discussion } };
};

const DiscussionPage = ({ discussion }: { discussion: Discussion }) => {
  // console.log({ discussion });
  const content = `${discussion.topic}(${discussion.viewpoints
    .map((v) => takeOpinion(v.text).text)
    .join("/")})`;
  const title = `Plural Viewpoints - ${content}`;
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={content} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={content} />
        <meta property="og:type" content="article" />
      </Head>
      <div className="bg-slate-800 text-white min-h-screen">
        <div className="md:mx-4 md:my-4">
          <Navigation />
          <DiscussionView discussion={discussion} />
          <hr className="border-gray-400" />
          <Navigation />
        </div>
      </div>
    </>
  );
};

export default DiscussionPage;
