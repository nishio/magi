// magi/src/pages/d/[id].tsx
import { useRouter } from "next/router";
import { Discussion, discussions } from "../../app/data"; // Adjust the import path as necessary
import Head from "next/head";

import "../../app/globals.css";
import { takeOpinion } from "../../lib/takeOpinion";

const YesNo = ({ v }: { v: number }) => {
  if (v === 2) {
    return (
      <div className="bg-green-500 p-2">
        <p>STRONG YES</p>
      </div>
    );
  } else if (v == 1) {
    return (
      <div className="bg-green-700 p-2">
        <p>Yes</p>
      </div>
    );
  } else if (v == 0) {
    return (
      <div className="bg-gray-700 p-2">
        <p>Neutral</p>
      </div>
    );
  } else if (v == -1) {
    return (
      <div className="bg-red-700 p-2">
        <p>No</p>
      </div>
    );
  } else if (v == -2) {
    return (
      <div className="bg-red-500 p-2">
        <p>STRONG NO</p>
      </div>
    );
  } else {
    return (
      <div className="bg-gray-700 p-2">
        <p>System Error</p>
      </div>
    );
  }
};

const Consensus = ({ discussion }: { discussion: Discussion }) => {
  const vs = discussion.viewpoints.map((v) => takeOpinion(v.text).v);
  // if all is positive
  if (vs.every((v) => v > 0)) {
    return (
      <div className="text-center bg-green-500 p-2 border">
        <p>Consensus: Yes</p>
      </div>
    );
  }
  // if all is negative
  if (vs.every((v) => v < 0)) {
    return (
      <div className="text-center bg-red-500 p-2 border">
        <p>Consensus: No</p>
      </div>
    );
  }
  // if all is positive or neutral
  if (vs.every((v) => v >= 0)) {
    return (
      <div className="text-center bg-green-900 p-2 border">
        <p>Consensus: Weak Yes</p>
      </div>
    );
  }
  // if all is negative or neutral
  if (vs.every((v) => v <= 0)) {
    return (
      <div className="text-center bg-red-900 p-2 border">
        <p>Consensus: Weak No</p>
      </div>
    );
  }
  // else
  return (
    <div className="text-center bg-gray-700 p-2 border">
      <p>Not reaching a consensus</p>
    </div>
  );
};

const BackToTop = () => {
  return (
    <div className="text-center mt-4 md:hidden">
      <a
        href="#top"
        className="hover:underline flex justify-center items-center"
      >
        <span>Back to Top</span>
      </a>
    </div>
  );
};

const Navigation = () => {
  return (
    <nav className="flex flex-wrap items-center space-x-2 text-sm">
      <a href="/" className="hover:underline">
        Plural Viewpoints
      </a>
      <span className="whitespace-nowrap">{">"}</span>
      <a
        href="/#political-ideologies-for-the-21st-century"
        className="font-bold hover:underline"
      >
        POLITICAL IDEOLOGIES FOR THE 21ST CENTURY
      </a>
    </nav>
  );
};
const DiscussionPage = () => {
  const router = useRouter();
  const { id } = router.query;

  // Find the discussion by id
  const discussion = discussions.find((d) => d.id === id);

  if (!discussion) {
    return <div>Discussion not found</div>;
  }
  const optexts = discussion.viewpoints.map((v) => takeOpinion(v.text).text);
  const content = `${discussion.topic}[${optexts[0]}][${optexts[1]}][${optexts[2]}]`;
  return (
    <>
      <Head>
        <title>Plural Viewpoints</title>
        <meta name="description" content={content} />
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
            <div className="text-center">
              <a href="#detail-1" className="hover:underline">
                <p>{discussion.viewpoints[0].name}</p>
              </a>
              <YesNo v={takeOpinion(discussion.viewpoints[0].text).v} />
            </div>

            <div className="text-center">
              <a href="#detail-2" className="hover:underline">
                <p>{discussion.viewpoints[1].name}</p>
              </a>
              <YesNo v={takeOpinion(discussion.viewpoints[1].text).v} />
            </div>

            <div className="text-center">
              <a href="#detail-3" className="hover:underline">
                <p>{discussion.viewpoints[2].name}</p>
              </a>
              <YesNo v={takeOpinion(discussion.viewpoints[2].text).v} />
            </div>
          </div>
          <Consensus discussion={discussion} />
          <div className="mt-8">
            <h2 className="text-2xl font-semibold" id="detail-1">
              {discussion.viewpoints[0].name}
            </h2>
            <p className="text-sm text-gray-400">
              {discussion.viewpoints[0].text}
            </p>

            <BackToTop />
            <h2 className="text-2xl font-semibold mt-4" id="detail-2">
              {discussion.viewpoints[1].name}
            </h2>
            <p className="text-sm text-gray-400">
              {discussion.viewpoints[1].text}
            </p>

            <BackToTop />

            <h2 className="text-2xl font-semibold mt-4" id="detail-3">
              {discussion.viewpoints[2].name}
            </h2>
            <p className="text-sm text-gray-400">
              {discussion.viewpoints[2].text}
            </p>
          </div>
          <BackToTop />
          <hr className="border-gray-400" />
          <Navigation />
        </div>
      </div>
    </>
  );
};

export default DiscussionPage;
