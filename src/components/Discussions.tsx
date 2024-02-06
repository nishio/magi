import { takeOpinion } from "@/lib/takeOpinion";
import Link from "next/link";
import { Discussion } from "../lib/data";
import { YesNoSpan } from "@/components/YesNoSpan";

export const Discussions = ({ discussions }: { discussions: Discussion[] }) => {
  const listItems = discussions.map((discussion) => (
    <li key={discussion.id} className="py-2">
      <Link
        href={`/d/${discussion.id}`}
        className="text-blue-300 hover:text-blue-500 underline"
      >
        {discussion.topic}
      </Link>
      <YesNoSpan v={takeOpinion(discussion.viewpoints[0].text).v} />
      <YesNoSpan v={takeOpinion(discussion.viewpoints[1].text).v} />
      <YesNoSpan v={takeOpinion(discussion.viewpoints[2].text).v} />
    </li>
  ));

  return <ul className="list-disc ml-4">{listItems}</ul>;
};
