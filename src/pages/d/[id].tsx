// magi/src/pages/d/[id].tsx
import { useRouter } from "next/router";
import { Discussion, discussions } from "../../lib/data"; // Adjust the import path as necessary
import Head from "next/head";
import { GetStaticProps, GetStaticPaths } from "next";

import "../../app/globals.css";
import { takeOpinion } from "../../lib/takeOpinion";
import { Navigation } from "../../components/Navigation";
import { DiscussionView } from "../../components/DiscussionView";
import { FooterNavigation } from "../../components/FooterNavigation";

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
  const content = `${discussion.topic}(${discussion.viewpoints
    .map((v) => takeOpinion(v.text).text)
    .join("/")})`;
  const title = `⿻${content}`;
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={content} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={content} />
        <meta property="og:type" content="article" />
        <meta
          property="og:image"
          content={`https://magi-nishio.vercel.app/api/ogp/${discussion.id}`}
        />
      </Head>
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
