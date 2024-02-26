/* eslint-disable @next/next/no-img-element */
import { Discussion } from "../lib/data";
import { takeOpinion } from "../lib/takeOpinion";
import { YesNo } from "./YesNo";
import { Consensus } from "./Consensus";
import { BackToTop } from "./BackToTop";
import Image from "next/image";

export const DiscussionView = ({ discussion }: { discussion: Discussion }) => {
  return (
    <>
      {" "}
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
            <h2 className="text-2xl font-semibold" id={`detail-${index + 1}`}>
              {viewpoint.name}
            </h2>
            <p className="text-gray-400">{viewpoint.text}</p>
            <BackToTop />
          </div>
        ))}
      </div>
      {/* OGP Image: fill width image */}
      <div className="flex justify-center">
        <img
          src={`/api/ogp/${discussion.id}`}
          alt=""
          width={1200}
          height={630}
        />
      </div>
    </>
  );
};
