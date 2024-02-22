import { Discussion } from "../lib/data";
import Head from "next/head";
import { takeOpinion } from "../lib/takeOpinion";
import { getConsensusString } from "@/components/Consensus";
import { getYesNoEmoji } from "@/lib/getYesNoEmoji";

export const DiscussionHead = ({ discussion }: { discussion: Discussion }) => {
  const emojis = discussion.viewpoints
    .map((v) => getYesNoEmoji(takeOpinion(v.text)))
    .join("");
  const title = `⿻${emojis}: ${discussion.topic}`;
  const concensus = getConsensusString({ discussion });
  const content = `${concensus}`;

  return (
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
      <meta
        property="og:url"
        content={`https://magi-nishio.vercel.app/d/${discussion.id}`}
      />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={content} />
      <meta
        name="twitter:image"
        content={`https://magi-nishio.vercel.app/api/ogp/${discussion.id}`}
      />
    </Head>
  );
};
