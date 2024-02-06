import { NextPage } from "next";
import Head from "next/head";
import React from "react";
import "../app/globals.css";

import { useEffect, useState } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "@/lib/firestore_app";
import { Discussion, discussions } from "@/lib/data";
import { Navigation } from "@/components/Navigation";
import { Discussions } from "@/components/Discussions";

const TopicsList = () => {
  const [topics, setTopics] = useState([] as Discussion[]);

  useEffect(() => {
    const fetchTopics = async () => {
      const app = initializeApp(firebaseConfig);
      const firestore = getFirestore(app);
      const querySnapshot = await getDocs(collection(firestore, "topics"));
      const topicsData: any[] = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setTopics(topicsData);
    };

    fetchTopics();
  }, []);

  return (
    <div>
      <Discussions discussions={topics} />
    </div>
  );
};

// export default TopicsList;

const TopicsPage: NextPage = () => {
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
        <p>Including user-generated topics.</p>
        <TopicsList />
        <Discussions discussions={discussions} />
      </div>
    </>
  );
};

export default TopicsPage;
