import { NextPage } from "next";
import Head from "next/head";
import React from "react";
import "../app/globals.css";

import { getFirestore, collection, getDocs } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "@/lib/firestore_app";
import { Discussion, discussions } from "@/lib/data";
import { Navigation } from "@/components/Navigation";
import { Discussions } from "@/components/Discussions";
import Link from "next/link";
import { AddTopic } from "@/components/AddTopic";

const TopicsPage: NextPage = () => {
  const [topicsData, setTopicData] = React.useState<Discussion[] | null>(null);

  const NewTopics = () => {
    if (topicsData === null) {
      return (
        <div>
          <span className="animate-spin">🤔</span> loading latest topics...
        </div>
      );
    }
    return (
      <>
        <div>✅ loaded latest topics</div>
        <Discussions discussions={topicsData} in_firestore={true} />
      </>
    );
  };

  React.useEffect(() => {
    const fetchData = async () => {
      const app = initializeApp(firebaseConfig);
      const firestore = getFirestore(app);
      const querySnapshot = await getDocs(collection(firestore, "topics"));
      const topicsData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
        createdAt: doc.data().createdAt.toDate().toISOString(),
      })) as Discussion[];

      setTopicData(topicsData);
    };

    fetchData();
  }, []);

  return (
    <>
      <Head>
        <title>Topics | ⿻Plural Viewpoints</title>
        <meta
          name="description"
          content="Explore various topics from multiple viewpoints."
        />
      </Head>
      <div className="bg-slate-800 text-white min-h-screen">
        <Navigation />
        <h1 className="text-4xl font-bold">Discussion Topics</h1>
        <p>
          Including user-generated topics. What is this? See{" "}
          <Link
            href="/"
            className="text-blue-300 hover:text-blue-500 underline"
          >
            INDEX
          </Link>
          . Want to add your topic? Visit {AddTopic}.
        </p>
        <NewTopics />
        <Discussions discussions={discussions} in_firestore={false} />
      </div>
    </>
  );
};

export default TopicsPage;
