// magi/src/pages/d/[id].tsx
import { useRouter } from "next/router";
import { Discussion, discussions } from "../../lib/data"; // Adjust the import path as necessary
import { GetStaticProps, GetStaticPaths } from "next";

import "../../app/globals.css";
import { Navigation } from "../../components/Navigation";
import { DiscussionView } from "../../components/DiscussionView";
import { FooterNavigation } from "../../components/FooterNavigation";
import { DiscussionHead } from "../../components/DiscussionHead";

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
  return (
    <>
      <DiscussionHead discussion={discussion} />
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
