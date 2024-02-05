// magi/src/pages/d/[id].tsx
import { useRouter } from "next/router";
import { Discussion, discussions } from "../../app/data"; // Adjust the import path as necessary
import Head from "next/head";
import { GetStaticProps, GetStaticPaths } from "next";

import "../../app/globals.css";
import { takeOpinion } from "../../lib/takeOpinion";
import { YesNo } from "../../components/YesNo";
import { Consensus } from "../../components/Consensus";
import { BackToTop } from "../../components/BackToTop";
import { Navigation } from "../../components/Navigation";

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = discussions.map((discussion) => ({
    params: { id: discussion.id },
  }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context.params?.id;
  const discussion = discussions.find((d) => d.id === id);
  if (!discussion) {
    return { notFound: true };
  }
  return { props: { discussion } };
};

const DiscussionPage = ({ discussion }: { discussion: Discussion }) => {
  const content = `${discussion.topic}[${discussion.viewpoints
    .map((v) => takeOpinion(v.text).text)
    .join("][")}]`;
  return (
    <>
      <Head>
        <title>Plural Viewpoints - {discussion.topic}</title>
        <meta name="description" content={content} />
        <meta
          property="og:title"
          content={`Plural Viewpoints - ${discussion.topic}`}
        />
        <meta property="og:description" content={content} />
        <meta property="og:type" content="article" />
      </Head>
      <div className="bg-slate-800 text-white min-h-screen">
        <div className="md:mx-4 md:my-4">
          <Navigation />
          <div className="mt-2 p-4 bg-slate-700 rounded-lg shadow-lg">
            <span className="block mb-1 text-sm text-gray-400 font-semibold">
              Discussion Topic:
            </span>
            <p className="text-white font-medium">{discussion.topic}</p>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-4">
            {discussion.viewpoints.map((viewpoint, index) => (
              <div key={index} className="text-center">
                <a href={`#detail-${index + 1}`} className="hover:underline">
                  <p className="text-lg md:text-xl">{viewpoint.name}</p>
                </a>
                <YesNo v={takeOpinion(viewpoint.text).v} />
              </div>
            ))}
          </div>
          <Consensus discussion={discussion} />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {discussion.viewpoints.map((viewpoint, index) => (
              <div key={index} className="mt-8">
                <h2
                  className="text-2xl font-semibold"
                  id={`detail-${index + 1}`}
                >
                  {viewpoint.name}
                </h2>
                <p className="text-gray-400">{viewpoint.text}</p>
                <BackToTop />
              </div>
            ))}
          </div>
          <hr className="border-gray-400" />
          <Navigation />
        </div>
      </div>
    </>
  );
};

export default DiscussionPage;
