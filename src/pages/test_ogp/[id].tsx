// read data from firestore
import Head from "next/head";

import "../../app/globals.css";
import { takeOpinion } from "../../lib/takeOpinion";
import { Navigation } from "../../components/Navigation";
import { DiscussionView } from "../../components/DiscussionView";
import { Discussion, discussions } from "@/lib/data";
import { generate_svg } from "../../lib/generate_svg";
import { GetStaticPaths, GetStaticProps } from "next";

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = discussions.map((discussion) => ({
    params: { id: discussion.id },
  }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context.params?.id;
  if (typeof id !== "string") {
    return { notFound: true };
  }
  const discussion = discussions.find((d) => d.id === id);
  if (!discussion) {
    return { notFound: true };
  }
  const content = `${discussion.topic}(${discussion.viewpoints
    .map((v) => takeOpinion(v.text).text)
    .join("/")})`;
  const title = `⿻${content}`;
  return { props: { id, content, title, discussion } };
};

const DiscussionPage = ({
  id,
  content,
  title,
  discussion,
}: {
  id: string;
  content: string;
  title: string;
  discussion: Discussion;
}) => {
  console.log({ id });

  const copySvgToClipboard = () => {
    const svgElement = document.getElementById("ogp-image")!;
    svgElement.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    const svgData = svgElement.outerHTML;
    const svgBlob = new Blob([svgData], {
      type: "image/svg+xml;charset=utf-8",
    });
    const URL = window.URL || window.webkitURL || window;
    const svgUrl = URL.createObjectURL(svgBlob);

    const downloadLink = document.createElement("a");
    downloadLink.href = svgUrl;
    downloadLink.download = "discussion.svg";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  const copyButton = (
    <button onClick={copySvgToClipboard}>Copy SVG to Clipboard</button>
  );

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
        <h2>OGP Image</h2>
        {copyButton}
        {generate_svg(discussion)}
      </div>
    </>
  );
};

export default DiscussionPage;
